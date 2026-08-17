import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, Clock, Eye, AlertCircle } from "lucide-react";
import { api } from "../services/api";

interface User {
  role: string;
}

export default function ArticlesManager({ user }: { user: User }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchArticles = () => {
    setLoading(true);
    api.getAdminArticles()
      .then((res) => setArticles(res.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setFeaturedImage("");
    setTags("");
    setStatus("draft");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (article: any) => {
    setEditingArticle(article);
    setTitle(article.title);
    setExcerpt(article.excerpt || "");
    setContent(article.content);
    setFeaturedImage(article.featured_image || "");
    setTags(article.tags || "");
    setStatus(article.status);
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title,
      excerpt,
      content,
      featured_image: featuredImage,
      tags,
      status,
    };

    try {
      if (editingArticle) {
        await api.updateArticle(editingArticle.id, payload);
      } else {
        await api.createArticle(payload);
      }
      setShowModal(false);
      fetchArticles();
    } catch (err: any) {
      setError(err.message || "Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await api.deleteArticle(id);
      fetchArticles();
    } catch (err: any) {
      alert(err.message || "Failed to delete article");
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">Articles Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage institutional articles, research papers, and editorial approval workflow.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#C5A059] text-[#002B49] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#b08c48] transition-all shadow-sm"
        >
          <Plus size={18} /> Create New Article
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading articles...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Author</th>
                <th className="px-6 py-3.5">Created Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.length > 0 ? (
                articles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 text-base">{art.title}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">/articles/{art.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        art.status === "published" ? "bg-green-100 text-green-800 border border-green-200" :
                        art.status === "draft" ? "bg-gray-100 text-gray-700" :
                        art.status === "submitted" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {art.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-700">
                      {art.author?.full_name || "Author"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(art.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(art)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={16} />
                      </button>
                      {user?.role !== "CONTRIBUTOR" && (
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No articles found. Click "Create New Article" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-serif font-bold text-xl text-[#002B49]">
                {editingArticle ? "Edit Article" : "Create New Article"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                ✕
              </button>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Strategic Leadership in Fragile States"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary for catalog previews..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Main Body Content *</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full article content (supports HTML/markdown)..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="/gallery/peace-conference-nairobi.jpg or upload URL"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Leadership, Peacebuilding, Governance"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Publishing Workflow Status *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] outline-none text-sm font-semibold text-[#002B49]"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="submitted">Submit for Review</option>
                  {user?.role !== "CONTRIBUTOR" && (
                    <>
                      <option value="in_review">In Review (Editor)</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published (Public)</option>
                      <option value="archived">Archived</option>
                    </>
                  )}
                </select>
                {user?.role === "CONTRIBUTOR" && (
                  <p className="text-[11px] text-amber-600 font-medium mt-1">
                    * As a Contributor, you can save drafts or submit for review. Publishing requires Editor or Admin approval.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#002B49] text-white rounded-lg text-sm font-bold hover:bg-[#001e33] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
