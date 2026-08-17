import React, { useState, useEffect } from "react";
import { Plus, Shield } from "lucide-react";
import { api } from "../services/api";

export default function UsersManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("CONTRIBUTOR");

  const fetchUsers = () => {
    setLoading(true);
    api.getUsers()
      .then((data) => setUsers(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser({ email, password, full_name: fullName, role });
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Failed to create user");
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#002B49]">Users & Role Governance</h1>
          <p className="text-sm text-gray-500 mt-1">Manage staff accounts, assign RBAC permissions, and control access levels.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#C5A059] text-[#002B49] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2">
          <Plus size={18} /> Add New Staff Member
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading user accounts...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold border-b">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Assigned Role</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60">
                  <td className="px-6 py-4 font-semibold text-gray-900">{u.full_name}</td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-[#002B49] rounded font-bold text-xs">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-green-600 font-semibold">{u.is_active ? "Active" : "Disabled"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-xl text-[#002B49]">Add Staff Account</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input type="text" required placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2.5 border rounded text-sm" />
              <input type="email" required placeholder="Email Address *" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 border rounded text-sm" />
              <input type="password" required placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 border rounded text-sm" />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2.5 border rounded text-sm font-semibold text-[#002B49]">
                <option value="CONTRIBUTOR">CONTRIBUTOR (Create Drafts Only)</option>
                <option value="EDITOR">EDITOR (Review & Publish Content)</option>
                <option value="ADMIN">ADMIN (Full Content & User Access)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN (System Owner)</option>
              </select>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#002B49] text-white rounded font-bold">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
