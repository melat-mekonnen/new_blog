
"use client";

import Image from "next/image";
import { useState } from "react";
import { useBlogContext } from "@/contexts/BlogContext";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  LogOut,
  Save,
  X,
  Calendar,
  User,
  BookOpen,
} from "lucide-react";

export default function BlogPage() {
  const {
    posts,
    siteSettings,
    setSiteSettings,
    search,
    setSearch,
    isAdmin,
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
  } = useBlogContext();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-8 w-96 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Admin Access</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-4 border border-border rounded-xl mb-6 bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-all font-medium"
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 bg-muted text-muted-foreground py-3 rounded-xl hover:bg-muted/80 transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Editor Modal */}
      {editingPost && (
        <PostEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => setEditingPost(null)}
        />
      )}

      {/* Settings Editor Modal */}
      {editingSettings && (
        <SettingsEditor
          settings={siteSettings}
          onSave={(settings) => {
            setSiteSettings(settings);
            setEditingSettings(false);
          }}
          onCancel={() => setEditingSettings(false)}
        />
      )}

      {/* Enhanced Admin Panel */}
      {isAdmin && (
        <div className="fixed top-20 left-0 right-0 bg-gradient-to-r from-primary via-primary to-primary-darker text-primary-foreground p-4 z-40 shadow-lg border-b border-primary/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-lg">Admin Mode</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingSettings(true)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <Settings size={18} />
                Settings
              </button>
              <button
                onClick={() =>
                  setEditingPost({
                    id: 0,
                    title: "",
                    excerpt: "",
                    content: "",
                    image: "",
                    date: new Date().toISOString().split("T")[0],
                    author: "EGA Team",
                    published: true,
                  })
                }
                className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-green-500/30 transition-all duration-200 border border-green-400/30"
              >
                <Plus size={18} />
                New Post
              </button>
              <button
                onClick={() => setShowOnlyPublished(!showOnlyPublished)}
                className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-400/30"
              >
                {showOnlyPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                {showOnlyPublished ? "Show All" : "Published Only"}
              </button>
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-400/30"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-primary to-primary-darker bg-clip-text text-transparent leading-tight">
            {siteSettings.title}
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground mb-8 leading-relaxed">
            {siteSettings.subtitle}
          </p>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card/50 backdrop-blur-sm border border-border text-foreground placeholder-muted-foreground px-12 py-4 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                It all started with 5 passionate people wanting to unite youngsters
                who share a love for gaming. From humble beginnings, the community
                grew to include gamification companies, game studios, developers, and
                events.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Our Mission:</strong> "{siteSettings.mission}"
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Our Focus:</strong> {siteSettings.quote}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-lg">
                <blockquote className="text-lg italic text-muted-foreground text-center">
                  "{siteSettings.mission}"
                </blockquote>
                <div className="mt-6 text-center">
                  <p className="font-bold text-primary text-xl">#LetThereBeGames</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Latest Articles</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-darker mx-auto rounded-full"></div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className={`group bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  !post.published ? "opacity-70" : ""
                }`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {!post.published && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Draft
                    </div>
                  )}
                  
                  {isAdmin && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => togglePostVisibility(post.id)}
                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
                      >
                        {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-primary hover:text-primary-darker font-semibold transition-colors group">
                    Read More 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-xl text-muted-foreground">No posts found matching your search.</p>
          </div>
        )}
      </section>

      {/* Admin Login Button */}
      {!isAdmin && (
        <div className="text-center pb-12">
          <button
            onClick={() => setShowAdminLogin(true)}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors font-medium"
          >
            Admin Access
          </button>
        </div>
      )}
    </main>
  );
}

// Enhanced Post Editor Component
function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: any;
  onSave: (post: any) => void;
  onCancel: () => void;
}) {
  const [editedPost, setEditedPost] = useState(post);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10">
          <h3 className="text-2xl font-bold text-foreground">
            {post.id === 0 ? "Create New Post" : "Edit Post"}
          </h3>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Title</label>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Excerpt</label>
            <textarea
              value={editedPost.excerpt}
              onChange={(e) =>
                setEditedPost({ ...editedPost, excerpt: e.target.value })
              }
              className="w-full p-4 border border-border rounded-xl h-24 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Content</label>
            <textarea
              value={editedPost.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
              className="w-full p-4 border border-border rounded-xl h-48 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Image URL</label>
              <input
                type="url"
                value={editedPost.image}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, image: e.target.value })
                }
                className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Author</label>
              <input
                type="text"
                value={editedPost.author}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, author: e.target.value })
                }
                className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Date</label>
              <input
                type="date"
                value={editedPost.date}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, date: e.target.value })
                }
                className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editedPost.published}
                  onChange={(e) =>
                    setEditedPost({
                      ...editedPost,
                      published: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-semibold text-foreground">Published</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-border flex gap-3 justify-end bg-muted/20">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedPost)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Settings Editor Component
function SettingsEditor({
  settings,
  onSave,
  onCancel,
}: {
  settings: any;
  onSave: (settings: any) => void;
  onCancel: () => void;
}) {
  const [editedSettings, setEditedSettings] = useState(settings);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10">
          <h3 className="text-2xl font-bold text-foreground">Site Settings</h3>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Site Title</label>
            <input
              type="text"
              value={editedSettings.title}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, title: e.target.value })
              }
              className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Subtitle</label>
            <textarea
              value={editedSettings.subtitle}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  subtitle: e.target.value,
                })
              }
              className="w-full p-4 border border-border rounded-xl h-24 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Mission Statement</label>
            <textarea
              value={editedSettings.mission}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  mission: e.target.value,
                })
              }
              className="w-full p-4 border border-border rounded-xl h-32 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Quote</label>
            <textarea
              value={editedSettings.quote}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, quote: e.target.value })
              }
              className="w-full p-4 border border-border rounded-xl h-32 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Hero Image URL</label>
            <input
              type="url"
              value={editedSettings.heroImage}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  heroImage: e.target.value,
                })
              }
              className="w-full p-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="p-6 border-t border-border flex gap-3 justify-end bg-muted/20">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedSettings)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
