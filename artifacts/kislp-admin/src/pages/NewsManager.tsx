import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ArchiveIcon, Globe } from "lucide-react";
import { api } from "../services/api";
import RichTextEditor from "../components/RichTextEditor";
import ImageUploader from "../components/ImageUploader";

const STATUS_BADGE: Record<string, string> = {
  published: "bg-green-100 text-green-800 border border-green-200",
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-amber-100 text-amber-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-indigo-100 text-indigo-800",
  archived: "bg-rose-100 text-rose-700",
};

const NEWS_CATEGORIES = [
  "Announcement",
  "Press Release",
  "Event",
  "Research",
  "Partnership",
  "Award",
  "Training",
  "Other",
];

export default function NewsManager({ user }: { user: any }) {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isEditor = user?.role === "EDITOR" || isAdmin;

  const fetchNews = () => {
    setLoading(true);
    api
      .getAdminNews()
      .then((res) => setNewsList(res.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingNews(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setFeaturedImage("");
    setCategory("Announcement");
    setStatus("draft");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setEditingNews(item);
    setTitle(item.title);
    setExcerpt(item.excerpt || "");
    setContent(item.content);
    setFeaturedImage(item.featured_image || "");
    setCategory(item.category || "Announcement");
    setStatus(item.status);
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const payload = { title, excerpt, content, featured_image: featuredImage, category, status };
    try {
      if (editingNews) {
        await api.updateNews(editingNews.id, payload);
      } else {
        await api.createNews(payload);
      }
      setShowModal(false);
      fetchNews();
    } catch (err: any) {
      setError(err.message || "Failed to save news.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Permanently delete "${itemTitle}"?\n\nThis cannot be undone.`)) return;
    try {
      await api.deleteNews(id);
      fetchNews();
    } catch (err: any) {
      alert(err.message || "Failed to delete news item");
    }
  };

  const handleUnpublish = async (item: any) => {
    if (!window.confirm(`Unpublish "${item.title}"? It will revert to Draft and be removed from the public website.`)) return;
    try {
      await api.updateNews(item.id, { ...item, status: "draft" });
      fetchNews();
    } catch (err: any) {
      alert(err.message || "Failed to unpublish news item");
    }
  };

  const handleArchive = async (item: any) => {
    if (!window.confirm(`Archive "${item.title}"?`)) return;
    try {
      await api.updateNews(item.id, { ...item, status: "archived" });
      fetchNews();
    } catch (err: any) {
      alert(err.message || "Failed to archive news item");
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">News & Events Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Publish press releases, summit announcements, and institutional updates.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#C5A059] text-[#002B49] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#b08c48] transition-all shadow-sm"
        >
          <Plus size={18} /> Create News Release
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading news releases...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Headline</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {newsList.length > 0 ? (
                newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      {item.excerpt && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.excerpt}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          STATUS_BADGE[item.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          title="Edit News Item"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={13} /> Edit
                        </button>

                        {item.status === "published" && isEditor && (
                          <button
                            onClick={() => handleUnpublish(item)}
                            title="Revert to Draft"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                          >
                            <Globe size={13} /> Unpublish
                          </button>
                        )}

                        {["published", "approved", "in_review"].includes(item.status) && isEditor && (
                          <button
                            onClick={() => handleArchive(item)}
                            title="Archive News Item"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            <ArchiveIcon size={13} /> Archive
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            title="Permanently Delete"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No news entries found. Click "Create News Release" to add one.
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
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#002B49]">
                  {editingNews ? "Edit News Item" : "Create News Release"}
                </h3>
                {editingNews?.status === "published" && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    ✅ This item is LIVE. Changes will go live immediately on save.
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  News Content (Rich Text) *
                </label>
                <RichTextEditor
                  value={content}
                  onChange={(val) => setContent(val)}
                  placeholder="Write full news article content..."
                  minHeight="220px"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploader
                  value={featuredImage}
                  onChange={(url) => setFeaturedImage(url)}
                  label="Featured Image"
                />
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm"
                  >
                    {NEWS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Publishing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm font-semibold text-[#002B49]"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="submitted">Submit for Review</option>
                  {isEditor && (
                    <>
                      <option value="in_review">In Review</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published (Live)</option>
                      <option value="archived">Archived (Hidden)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#002B49] text-white rounded-lg text-sm font-bold hover:bg-[#001e33] disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingNews ? "Update News" : "Create News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
