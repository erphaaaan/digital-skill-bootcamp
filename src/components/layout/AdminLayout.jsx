import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  BookOpenCheck, 
  Briefcase, 
  FileCheck, 
  BarChart3, 
  FileEdit, 
  ArrowLeft,
  LogOut
} from 'lucide-react';

export const AdminLayout = ({ children, currentRoute, onNavigate }) => {
  const { currentUser, logout } = useAuth();

  const adminLinks = [
    { label: 'Overview', route: 'admin-dashboard', icon: ShieldCheck },
    { label: 'User Management', route: 'admin-users', icon: Users },
    { label: 'Course Manager', route: 'admin-courses', icon: BookOpenCheck },
    { label: 'Job Moderation', route: 'admin-jobs', icon: Briefcase },
    { label: 'Submissions Review', route: 'admin-submissions', icon: FileCheck },
    { label: 'Reports & Analytics', route: 'admin-reports', icon: BarChart3 },
    { label: 'Content & FAQs', route: 'admin-content', icon: FileEdit },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 dark:bg-slate-950">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-slate-300 p-4 flex flex-col border-r border-slate-800">
        
        {/* Brand */}
        <div className="flex items-center gap-3 pb-6 mb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm text-white tracking-tight leading-tight">
              Admin Portal
            </h2>
            <p className="text-[11px] text-teal-400 font-semibold">Digital Skill Bootcamp</p>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="bg-slate-900 rounded-xl p-3 mb-6 flex items-center gap-3 border border-slate-800">
          <img 
            src={currentUser?.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed=Admin'} 
            alt={currentUser?.full_name} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400"
          />
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-white truncate">{currentUser?.full_name || 'Administrator'}</p>
            <p className="text-xs text-teal-400 truncate font-semibold">Super Admin</p>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1 flex-1">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-teal-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Public Portal
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out Admin
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};
