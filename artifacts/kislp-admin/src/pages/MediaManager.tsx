import React, { useState, useEffect } from "react";
import { Upload, Copy, Check, FileText, Image as ImageIcon } from "lucide-react";
import { api } from "../services/api";

export default function MediaManager() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = () => {
    setLoading(true);
    api.getMedia()
      .then((data) => setMediaList(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      await api.uploadMedia(formData);
      fetchMedia();
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and manage image assets and documents for articles and news.</p>
        </div>

        <label className="bg-[#002B49] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 cursor-pointer hover:bg-[#001e33] transition-all">
          <Upload size={18} />
          {uploading ? "Uploading..." : "Upload New File"}
          <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" accept="image/*,application/pdf" />
        </label>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading media library...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
              <div className="h-36 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {item.mime_type.startsWith("image/") ? (
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <FileText size={40} className="text-gray-400" />
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <p className="text-xs font-semibold text-gray-800 truncate" title={item.filename}>{item.filename}</p>
                <button
                  onClick={() => copyUrl(item.url, item.id)}
                  className="w-full py-1.5 px-2 bg-gray-50 hover:bg-[#C5A059] hover:text-[#002B49] rounded text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                  {copiedId === item.id ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
