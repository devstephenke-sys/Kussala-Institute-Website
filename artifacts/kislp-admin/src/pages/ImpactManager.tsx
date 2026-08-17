import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ArchiveIcon, Globe } from "lucide-react";
import { api } from "../services/api";

const STATUS_BADGE: Record<string, string> = {
  published: "bg-green-100 text-green-800 border border-green-200",
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-amber-100 text-amber-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-indigo-100 text-indigo-800",
  archived: "bg-rose-100 text-rose-700",
};

const IMPACT_CATEGORIES = [
  "South Sudan",
  "Kenya",
  "Uganda",
  "Ethiopia",
  "DRC",
  "Horn of Africa",
  "Great Lakes Region",
  "East Africa",
  "Regional",
];

export default function ImpactManager({ user }: { user: any }) {
  const [impactStories, setImpactStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [impactCategory, setImpactCategory] = useState("South Sudan");
  const [beneficiaryInfo, setBeneficiaryInfo] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isEditor = user?.role === "EDITOR" || isAdmin;

  const fetchImpact = () => {
    setLoading(true);
    api
      .getAdminImpact()
      .then((res) => setImpactStories(res.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImpact();
  }, []);

  const openCreateModal = () => {
    setEditingStory(null);
    setTitle("");
    setSummary("");
    setContent("");
    setFeaturedImage("");
    setImpactCategory("South Sudan");
    setBeneficiaryInfo("");
    setLocation("");
    setStatus("draft");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (story: any) => {
    setEditingStory(story);
    setTitle(story.title);
    setSummary(story.summary || "");
    setContent(story.content);
    setFeaturedImage(story.featured_image || "");
    setImpactCategory(story.impact_category || "South Sudan");
    setBeneficiaryInfo(story.beneficiary_info || "");
    setLocation(story.location || "");
    setStatus(story.status);
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      title,
      summary,
      content,
      featured_image: featuredImage,
      impact_category: impactCategory,
      beneficiary_info: beneficiaryInfo,
      location,
      status,
    };
    try {
      if (editingStory) {
        await api.updateImpact(editingStory.id, payload);
      } else {
        await api.createImpact(payload);
      }
      setShowModal(false);
      fetchImpact();
    } catch (err: any) {
      setError(err.message || "Failed to save impact story");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, storyTitle: string) => {
    if (!window.confirm(`Permanently delete "${storyTitle}"?\n\nThis cannot be undone.`)) return;
    try {
      await api.deleteImpact(id);
      fetchImpact();
    } catch (err: any) {
      alert(err.message || "Failed to delete impact story");
    }
  };

  const handleUnpublish = async (story: any) => {
    if (!window.confirm(`Unpublish "${story.title}"? It will be removed from the public website.`)) return;
    try {
      await api.updateImpact(story.id, { ...story, status: "draft" });
      fetchImpact();
    } catch (err: any) {
      alert(err.message || "Failed to unpublish impact story");
    }
  };

  const handleArchive = async (story: any) => {
    if (!window.confirm(`Archive "${story.title}"?`)) return;
    try {
      await api.updateImpact(story.id, { ...story, status: "archived" });
      fetchImpact();
    } catch (err: any) {
      alert(err.message || "Failed to archive impact story");
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">Impact Stories Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Document field outcomes, beneficiary reports, and regional conflict transformation metrics.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#C5A059] text-[#002B49] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#b08c48] transition-all shadow-sm"
        >
          <Plus size={18} /> New Impact Story
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading impact stories...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Region</th>
                <th className="px-6 py-3.5">Beneficiaries</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {impactStories.length > 0 ? (
                impactStories.map((story) => (
                  <tr key={story.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{story.title}</p>
                      {story.location && (
                        <p className="text-xs text-gray-400 mt-0.5">📍 {story.location}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">{story.impact_category}</td>
                    <td className="px-6 py-4 text-xs text-gray-600">{story.beneficiary_info || "—"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          STATUS_BADGE[story.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {story.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit — always available */}
                        <button
                          onClick={() => openEditModal(story)}
                          title="Edit Story"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={13} /> Edit
                        </button>

                        {/* Unpublish — only for published stories, editors/admins */}
                        {story.status === "published" && isEditor && (
                          <button
                            onClick={() => handleUnpublish(story)}
                            title="Revert to Draft"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                          >
                            <Globe size={13} /> Unpublish
                          </button>
                        )}

                        {/* Archive — for published/approved, editors/admins */}
                        {["published", "approved", "in_review"].includes(story.status) && isEditor && (
                          <button
                            onClick={() => handleArchive(story)}
                            title="Archive Story"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            <ArchiveIcon size={13} /> Archive
                          </button>
                        )}

                        {/* Delete — admins only */}
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(story.id, story.title)}
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
                    No impact stories found. Click "New Impact Story" to add one.
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#002B49]">
                  {editingStory ? "Edit Impact Story" : "Create Impact Story"}
                </h3>
                {editingStory?.status === "published" && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    ✅ This story is LIVE on the public website. Changes go live immediately on save.
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

            {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Youth Leaders Rebuild Communities in Jonglei"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Summary</label>
                <textarea
                  rows={2}
                  placeholder="Brief description for listing views..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Full Story Content *
                </label>
                <textarea
                  rows={7}
                  required
                  placeholder="Full impact narrative, outcomes, and beneficiary testimonials..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Region</label>
                  <select
                    value={impactCategory}
                    onChange={(e) => setImpactCategory(e.target.value)}
                    className="w-full p-2.5 border rounded-lg text-sm"
                  >
                    {IMPACT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Juba, South Sudan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="/gallery/impact-story.jpg"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Beneficiary Info
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1,200 youth leaders"
                    value={beneficiaryInfo}
                    onChange={(e) => setBeneficiaryInfo(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Publishing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm font-semibold text-[#002B49]"
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
                  {saving ? "Saving..." : editingStory ? "Update Story" : "Create Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
