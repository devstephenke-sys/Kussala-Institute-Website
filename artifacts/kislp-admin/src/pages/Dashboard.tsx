import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { FileText, Newspaper, HeartHandshake, Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStats()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  }

  const { content_stats, recent_activity } = stats || {};

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">CMS Executive Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Kussala Digital Platform Content Overview & Publishing Status</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/articles"
            className="bg-[#002B49] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#001e33] transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> New Article
          </Link>
          <Link
            href="/news"
            className="bg-[#C5A059] text-[#002B49] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#b08c48] transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> New News
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-50 text-[#002B49] rounded-xl">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Articles</p>
            <h3 className="text-3xl font-bold text-[#002B49] mt-1">{content_stats?.articles?.total || 0}</h3>
            <div className="flex gap-3 text-xs mt-2 font-medium">
              <span className="text-amber-600 flex items-center gap-1"><Clock size={12}/> {content_stats?.articles?.draft || 0} Drafts</span>
              <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> {content_stats?.articles?.published || 0} Published</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-amber-50 text-[#C5A059] rounded-xl">
            <Newspaper size={28} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">News & Events</p>
            <h3 className="text-3xl font-bold text-[#002B49] mt-1">{content_stats?.news?.total || 0}</h3>
            <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 size={12}/> {content_stats?.news?.published || 0} Active Published
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl">
            <HeartHandshake size={28} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Impact Stories</p>
            <h3 className="text-3xl font-bold text-[#002B49] mt-1">{content_stats?.impact?.total || 0}</h3>
            <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 size={12}/> {content_stats?.impact?.published || 0} Public Stories
            </p>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#002B49] flex items-center gap-2">
            <Clock size={18} className="text-[#C5A059]" />
            Recent System Activity & Publishing Audit
          </h2>
          <Link href="/audit-logs" className="text-xs font-semibold text-[#002B49] hover:underline">
            View Full Logs →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Resource</th>
                <th className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {recent_activity && recent_activity.length > 0 ? (
                recent_activity.map((log: any) => (
                  <tr key={log.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-gray-900">{log.user_name || "System"}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        log.action.includes("CREATE") ? "bg-green-100 text-green-800" :
                        log.action.includes("UPDATE") ? "bg-blue-100 text-blue-800" :
                        log.action.includes("DELETE") ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs font-semibold text-gray-600">{log.resource_type}</td>
                    <td className="px-6 py-3.5 text-xs text-gray-600 max-w-md truncate">{log.details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No activity logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
