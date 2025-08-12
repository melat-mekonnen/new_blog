
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  published: boolean;
}

export interface SiteSettings {
  title: string;
  subtitle: string;
  mission: string;
  quote: string;
  heroImage: string;
}

interface BlogContextType {
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  search: string;
  setSearch: (search: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
  editingSettings: boolean;
  setEditingSettings: (editing: boolean) => void;
  showOnlyPublished: boolean;
  setShowOnlyPublished: (show: boolean) => void;
  handleAdminLogin: () => void;
  handleAdminLogout: () => void;
  handleSavePost: (post: BlogPost) => Promise<void>;
  handleDeletePost: (id: number) => Promise<void>;
  togglePostVisibility: (id: number) => Promise<void>;
  filteredPosts: BlogPost[];
  loading: boolean;
  refreshPosts: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    title: "Ethiopian Games Association Blog",
    subtitle: "Sharing stories, insights, and updates about games, gamification, and the community.",
    mission: "Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.",
    quote: "Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.",
    heroImage: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600",
  });

  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [showOnlyPublished, setShowOnlyPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const adminPass = "admin123"; // In production, this should be properly secured

  // Load posts from API
  const refreshPosts = async () => {
    try {
      setLoading(true);
      const published = showOnlyPublished ? 'true' : 'false';
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      
      const response = await fetch(`/api/blog/posts?published=${published}${searchParam}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load settings from API
  const refreshSettings = async () => {
    try {
      const response = await fetch('/api/blog/settings');
      if (response.ok) {
        const data = await response.json();
        setSiteSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Load data on mount and when dependencies change
  useEffect(() => {
    refreshPosts();
  }, [showOnlyPublished, search]);

  useEffect(() => {
    refreshSettings();
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === adminPass) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setShowOnlyPublished(false);
    } else {
      alert("Invalid password");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowOnlyPublished(true);
    setEditingPost(null);
    setEditingSettings(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesVisibility = showOnlyPublished ? post.published : true;
    return matchesSearch && matchesVisibility;
  });

  const handleSavePost = async (post: BlogPost) => {
    try {
      setLoading(true);
      
      if (post.id === 0) {
        // New post
        const response = await fetch('/api/blog/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (response.ok) {
          await refreshPosts();
        } else {
          const error = await response.json();
          alert(`Error creating post: ${error.error}`);
          return;
        }
      } else {
        // Update existing post
        const response = await fetch(`/api/blog/posts/${post.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (response.ok) {
          await refreshPosts();
        } else {
          const error = await response.json();
          alert(`Error updating post: ${error.error}`);
          return;
        }
      }
      
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setLoading(true);
      
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refreshPosts();
      } else {
        const error = await response.json();
        alert(`Error deleting post: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setLoading(false);
    }
  };

  const togglePostVisibility = async (id: number) => {
    try {
      setLoading(true);
      const post = posts.find(p => p.id === id);
      if (!post) return;

      const updatedPost = { ...post, published: !post.published };
      
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        await refreshPosts();
      } else {
        const error = await response.json();
        alert(`Error updating post visibility: ${error.error}`);
      }
    } catch (error) {
      console.error('Error toggling post visibility:', error);
      alert('Error updating post visibility');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (settings: SiteSettings) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/blog/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        setSiteSettings(data);
        setEditingSettings(false);
      } else {
        const error = await response.json();
        alert(`Error saving settings: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const value: BlogContextType = {
    posts,
    setPosts,
    siteSettings,
    setSiteSettings: handleSaveSettings,
    search,
    setSearch,
    isAdmin,
    setIsAdmin,
    adminPassword,
    setAdminPassword,
    showAdminLogin,
    setShowAdminLogin,
    editingPost,
    setEditingPost,
    editingSettings,
    setEditingSettings,
    showOnlyPublished,
    setShowOnlyPublished,
    handleAdminLogin,
    handleAdminLogout,
    handleSavePost,
    handleDeletePost,
    togglePostVisibility,
    filteredPosts,
    loading,
    refreshPosts,
    refreshSettings,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
