import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  FolderKanban, 
  Briefcase, 
  Bookmark, 
  Bell, 
  UserCheck, 
  ArrowLeft,
  LogOut,
  Sparkles
} from 'lucide-react';

export const DashboardLayout = ({ children, currentRoute, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const sidebarLinks = [
    { label: 'Overview', route: 'dashboard', icon: LayoutDashboard },
    { label: 'My Courses', route: 'my-courses', icon: BookOpen },
    { label: 'ATS Resume Builder', route: 'resume-builder', icon: FileText },
    { label: 'Portfolio Builder', route: 'portfolio-builder', icon: FolderKanban },
    { label: 'Job Applications', route: 'my-applications', icon: Briefcase },
    { label: 'Saved Bookmarks', route: 'bookmarks', icon: Bookmark },
    { label: 'Notifications', route: 'notifications', icon: Bell, badge: unreadCount },
    { label: 'Profile Settings', route: 'profile-settings', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 dark:bg-slate-950">
      
      {/* Learner Dashboard Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 flex flex-col border-r border-slate-800">
        
        {/* Brand */}
        <div className="flex items-center gap-3 pb-6 mb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm text-white tracking-tight leading-tight">
              Learner Hub
            </h2>
            <p className="text-[11px] text-teal-400 font-semibold">Digital Skill Bootcamp</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-slate-800/80 rounded-xl p-3 mb-6 flex items-center gap-3 border border-slate-700">
          <img 
            src={currentUser?.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed=Learner'} 
            alt={currentUser?.full_name} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
          />
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-white truncate">{currentUser?.full_name || 'Learner'}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser?.headline || 'Learner'}</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="space-y-1 flex-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </div>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Public Portal
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
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
