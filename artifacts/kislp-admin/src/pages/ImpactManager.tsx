import React, { useState, useEffect } from "react";
import { Plus, Edit2 } from "lucide-react";
import { api } from "../services/api";

export default function ImpactManager({ user }: { user: any }) {
  const [impactStories, setImpactStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [impactCategory, setImpactCategory] = useState("South Sudan");
  const [beneficiaryInfo, setBeneficiaryInfo] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);

  const fetchImpact = () => {
    setLoading(true);
    api.getAdminImpact()
      .then((res) => setImpactStories(res.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImpact();
  }, []);

  const openCreateModal = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setFeaturedImage("");
    setImpactCategory("South Sudan");
    setBeneficiaryInfo("");
    setLocation("");
    setStatus("draft");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.createImpact({ title, summary, content, featured_image: featuredImage, impact_category: impactCategory, beneficiary_info: beneficiaryInfo, location, status });
      setShowModal(false);
      fetchImpact();
    } catch (err: any) {
      alert(err.message || "Failed to create impact story");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">Impact Stories Management</h1>
          <p className="text-sm text-gray-500 mt-1">Document field outcomes, beneficiary reports, and regional conflict transformation metrics.</p>
        </div>
        <button onClick={openCreateModal} className="bg-[#C5A059] text-[#002B49] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2">
          <Plus size={18} /> New Impact Story
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading impact stories...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Region</th>
                <th className="px-6 py-3.5">Beneficiaries</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {impactStories.map((story) => (
                <tr key={story.id} className="hover:bg-gray-50/60">
                  <td className="px-6 py-4 font-semibold text-gray-900">{story.title}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{story.impact_category}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{story.beneficiary_info || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                      {story.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#002B49]">Create Impact Story</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <input type="text" required placeholder="Story Title *" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 border rounded text-sm" />
              <textarea rows={2} placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border rounded text-sm" />
              <textarea rows={5} required placeholder="Full Story Content *" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2.5 border rounded text-sm font-mono" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Region (e.g. South Sudan)" value={impactCategory} onChange={(e) => setImpactCategory(e.target.value)} className="p-2 border rounded text-sm" />
                <input type="text" placeholder="Beneficiary Info" value={beneficiaryInfo} onChange={(e) => setBeneficiaryInfo(e.target.value)} className="p-2 border rounded text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Featured Image URL" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="p-2 border rounded text-sm" />
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded text-sm font-semibold">
                  <option value="draft">Draft</option>
                  {user?.role !== "CONTRIBUTOR" && <option value="published">Published</option>}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#002B49] text-white rounded font-bold">{saving ? "Saving..." : "Save Story"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
