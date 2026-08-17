import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Check, Link as LinkIcon } from "lucide-react";
import { api } from "../services/api";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Featured Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.uploadMedia(formData);
      if (res && res.url) {
        onChange(res.url);
        setUrlInput(res.url);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const applyUrl = () => {
    onChange(urlInput);
  };

  const clearImage = () => {
    onChange("");
    setUrlInput("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase text-gray-700">{label}</label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded font-medium ${mode === "upload" ? "bg-[#002B49] text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded font-medium ${mode === "url" ? "bg-[#002B49] text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            Image URL
          </button>
        </div>
      </div>

      {error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      {value ? (
        <div className="relative group rounded-lg border border-gray-300 overflow-hidden bg-gray-50 p-2 flex items-center gap-4">
          <img
            src={value}
            alt="Preview"
            className="w-16 h-16 object-cover rounded border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Invalid+Image";
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-800 truncate">{value}</p>
            <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1 mt-0.5">
              <Check size={12} /> Image Attached
            </p>
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Remove Image"
          >
            <X size={16} />
          </button>
        </div>
      ) : mode === "upload" ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
            ${dragActive ? "border-[#C5A059] bg-amber-50/50" : "border-gray-300 hover:border-gray-400 bg-gray-50/50"}
            ${uploading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-full border border-gray-200 shadow-sm text-[#002B49]">
              {uploading ? <div className="animate-spin text-sm">⌛</div> : <Upload size={20} />}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">
                {uploading ? "Uploading Image..." : "Click or Drag & Drop image here"}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">Supports PNG, JPG, WEBP, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C5A059] outline-none"
            />
          </div>
          <button
            type="button"
            onClick={applyUrl}
            className="px-4 py-2 bg-[#002B49] text-white text-xs font-bold rounded-lg hover:bg-[#001e33]"
          >
            Set URL
          </button>
        </div>
      )}
    </div>
  );
}
