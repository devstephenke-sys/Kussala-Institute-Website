import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { api } from "../services/api";

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

  const fetchNews = () => {
    setLoading(true);
    api.getAdminNews()
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

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">News & Events Management</h1>
          <p className="text-sm text-gray-500 mt-1">Publish press releases, summit announcements, and institutional updates.</p>
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
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        item.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No news entries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 shadow-2xl">
            <h3 className="font-serif font-bold text-xl text-[#002B49]">
              {editingNews ? "Edit News Item" : "Create News Item"}
            </h3>
            {error && <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Content *</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border text-sm font-mono focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm font-semibold"
                  >
                    <option value="draft">Draft</option>
                    {user?.role !== "CONTRIBUTOR" && <option value="published">Published</option>}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#002B49] text-white rounded-lg text-sm font-bold">
                  {saving ? "Saving..." : "Save News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
