"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  handleSavePost: (post: BlogPost) => void;
  handleDeletePost: (id: number) => void;
  togglePostVisibility: (id: number) => void;
  filteredPosts: BlogPost[];
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
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "How Gaming Builds Resilience and Discipline",
      excerpt: "Explore how games teach valuable life skills like resilience and continuous growth.",
      content: "Gaming has evolved far beyond entertainment. Modern games challenge players to develop critical thinking, strategic planning, and emotional resilience. Through repeated failures and successes, gamers learn to adapt, persevere, and continuously improve their skills.",
      image: "/assets/images/events/mobile_legend_championship.webp", // Local image
      date: "2024-01-15",
      author: "EGA Team",
      published: true,
    },
    {
      id: 2,
      title: "Connecting Communities Through Games",
      excerpt: "Discover how gaming brings people together to create culture and economy.",
      content: "Games serve as a universal language that transcends geographical and cultural boundaries. They create shared experiences, foster teamwork, and build lasting friendships. The gaming community in Ethiopia is growing rapidly, connecting young minds and creating opportunities.",
      image: "/assets/images/events/mobile_legend_championship.webp", // Local image
      date: "2024-01-10",
      author: "EGA Team",
      published: true,
    },
    {
      id: 3,
      title: "The Role of Gamification in Modern Development",
      excerpt: "Understand the impact of gamification companies and studios on the industry.",
      content: "Gamification is revolutionizing how we approach education, business, and personal development. By incorporating game mechanics into non-game contexts, we can increase engagement, motivation, and learning outcomes.",
      image: "/assets/images/events/mobile_legend_championship.webp", // Local image
      date: "2024-01-05",
      author: "EGA Team",
      published: false,
    },
  ]);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    title: "Ethiopian Games Association Blog",
    subtitle:
      "Sharing stories, insights, and updates about games, gamification, and the community.",
    mission:
      "Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.",
    quote:
      "Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.",
    heroImage:
      "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600",
  });

  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [showOnlyPublished, setShowOnlyPublished] = useState(true);

  const adminPass = "admin123"; // In production, this should be properly secured

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

  const handleSavePost = (post: BlogPost) => {
    if (post.id === 0) {
      // New post
      const newPost = { ...post, id: Math.max(...posts.map((p) => p.id)) + 1 };
      setPosts([newPost, ...posts]);
    } else {
      // Update existing post
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const togglePostVisibility = (id: number) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const value: BlogContextType = {
    posts,
    setPosts,
    siteSettings,
    setSiteSettings,
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
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}; 