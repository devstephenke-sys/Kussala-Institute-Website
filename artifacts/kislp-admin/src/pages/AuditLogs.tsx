import React, { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { api } from "../services/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAuditLogs()
      .then((data) => setLogs(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-serif font-bold text-3xl text-[#002B49] flex items-center gap-3">
          <ShieldAlert className="text-[#C5A059]" /> System Audit & Activity Logs
        </h1>
        <p className="text-sm text-gray-500 mt-1">Immutable trail of administrative publishing actions, role edits, and logins.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading audit logs...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b">
              <tr>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Action</th>
                <th className="px-6 py-3.5">Resource</th>
                <th className="px-6 py-3.5">IP Address</th>
                <th className="px-6 py-3.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/60 text-xs">
                  <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-3.5 font-bold text-gray-900">{log.user_name || "System"}</td>
                  <td className="px-6 py-3.5 font-semibold text-blue-700">{log.action}</td>
                  <td className="px-6 py-3.5 text-gray-700">{log.resource_type}</td>
                  <td className="px-6 py-3.5 font-mono text-gray-500">{log.ip_address || "127.0.0.1"}</td>
                  <td className="px-6 py-3.5 text-gray-600 max-w-md truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
