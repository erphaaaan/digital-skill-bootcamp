import React, { useState } from 'react';
import { storage } from '../../services/StorageService';
import { useNotifications } from '../../context/NotificationContext';
import { Users, Search, Shield, UserX, UserCheck, Edit3 } from 'lucide-react';

export const AdminUsersPage = () => {
  const { showToast } = useNotifications();
  const [users, setUsers] = useState(storage.getUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (userId) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'suspended' ? 'active' : 'suspended';
        showToast(`User ${u.full_name} status set to ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    });
    storage.saveUsers(updated);
    setUsers(updated);
  };

  const changeRole = (userId, newRole) => {
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    storage.saveUsers(updated);
    setUsers(updated);
    showToast('Role updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">User Account Governance</h1>
        <p className="text-xs text-slate-500">Manage user accounts, assign roles, and audit access.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white"
        >
          <option value="All">All Roles</option>
          <option value="learner">Learners</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Administrators</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={u.avatar_url} alt={u.full_name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{u.full_name}</p>
                      <p className="text-[10px] text-slate-400">{u.location || 'India'}</p>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300 font-mono">{u.email}</td>
                  <td className="p-3.5">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="bg-transparent border border-slate-200 rounded px-2 py-0.5 font-bold cursor-pointer text-xs"
                    >
                      <option value="learner">Learner</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.status === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {u.status || 'active'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs ${
                        u.status === 'suspended'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
