import React, { useState } from "react";
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
} from "lucide-react";
import { useBlogContext } from "@/contexts/BlogContext";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  published: boolean;
}

interface SiteSettings {
  title: string;
  subtitle: string;
  mission: string;
  quote: string;
  heroImage: string;
}

function App() {
  const {
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
  } = useBlogContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
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

      {/* Admin Panel */}
      {isAdmin && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-semibold">Admin Mode Active</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditingSettings(true)}
                className="flex items-center gap-1 bg-red-700 px-3 py-1 rounded hover:bg-red-800"
              >
                <Settings size={16} />
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
                className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded hover:bg-green-700"
              >
                <Plus size={16} />
                New Post
              </button>
              <button
                onClick={() => setShowOnlyPublished(!showOnlyPublished)}
                className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                {showOnlyPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                {showOnlyPublished ? "Show All" : "Published Only"}
              </button>
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1 bg-red-700 px-3 py-1 rounded hover:bg-red-800"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={`${isAdmin ? "pt-12" : ""}`}>
        {/* Hero Section */}
        <section
          className="relative h-96 flex flex-col items-center justify-center px-6 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${siteSettings.heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-extrabold mb-4 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {siteSettings.title}
            </h1>
            <p className="max-w-3xl text-xl text-gray-200 mb-8">
              {siteSettings.subtitle}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 rounded-full border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto p-8 space-y-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  It all started with 5 passionate people wanting to unite
                  youngsters who share a love for gaming. From humble
                  beginnings, the community grew to include gamification
                  companies, game studios, developers, and events.
                </p>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Our Mission
                  </h3>
                  <p className="text-purple-300 italic text-lg">
                    "{siteSettings.mission}"
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  EGA Community Focus
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {siteSettings.quote}
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg">
                  <p className="text-white font-bold text-xl text-center">
                    #LetThereBeGames
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto p-8">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Latest Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 ${
                    !post.published ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {!post.published && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Draft
                      </div>
                    )}
                    {isAdmin && (
                      <div className="absolute top-2 left-2 flex gap-1">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => togglePostVisibility(post.id)}
                          className="bg-yellow-600 text-white p-1 rounded hover:bg-yellow-700"
                        >
                          {post.published ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No posts found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
          <div className="max-w-6xl mx-auto p-8 text-center">
            <p className="text-gray-400 mb-4">
              © 2024 Ethiopian Games Association. All rights reserved.
            </p>
            {!isAdmin && (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                Admin
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

// Post Editor Component
function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [editedPost, setEditedPost] = useState(post);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {post.id === 0 ? "Create New Post" : "Edit Post"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              value={editedPost.excerpt}
              onChange={(e) =>
                setEditedPost({ ...editedPost, excerpt: e.target.value })
              }
              className="w-full p-3 border rounded-lg h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={editedPost.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
              className="w-full p-3 border rounded-lg h-40"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={editedPost.image}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, image: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={editedPost.author}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, author: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={editedPost.date}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, date: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editedPost.published}
                  onChange={(e) =>
                    setEditedPost({
                      ...editedPost,
                      published: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Published</span>
              </label>
            </div>
          </div>
        </div>
        <div className="p-6 border-t flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedPost)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Editor Component
function SettingsEditor({
  settings,
  onSave,
  onCancel,
}: {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
  onCancel: () => void;
}) {
  const [editedSettings, setEditedSettings] = useState(settings);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold">Site Settings</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Title</label>
            <input
              type="text"
              value={editedSettings.title}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, title: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <textarea
              value={editedSettings.subtitle}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  subtitle: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mission Statement
            </label>
            <textarea
              value={editedSettings.mission}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  mission: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quote</label>
            <textarea
              value={editedSettings.quote}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, quote: e.target.value })
              }
              className="w-full p-3 border rounded-lg h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Hero Image URL
            </label>
            <input
              type="url"
              value={editedSettings.heroImage}
              onChange={(e) =>
                setEditedSettings({
                  ...editedSettings,
                  heroImage: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
        <div className="p-6 border-t flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedSettings)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
