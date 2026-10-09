import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { 
  BookOpen, 
  Compass, 
  Briefcase, 
  Info, 
  Mail, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Bell, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ currentRoute, onNavigate }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { unreadCount, notifications, markAsRead } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: 'home', icon: Sparkles },
    { label: 'Explore Courses', route: 'courses', icon: BookOpen },
    { label: 'Learning Paths', route: 'learning-paths', icon: Compass },
    { label: 'Career Opportunities', route: 'jobs', icon: Briefcase },
    { label: 'About Us', route: 'about', icon: Info },
    { label: 'Contact', route: 'contact', icon: Mail },
  ];

  const handleNavClick = (route) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Platform Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #14213D 0%, #2563EB 50%, #14B8A6 100%)' }}>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
              Digital Skill Bootcamp
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-teal-600 dark:text-teal-400 uppercase block">
              Youth Employability Initiative
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 relative">
              {/* Notification Center Trigger */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Notifications ({unreadCount})
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-4">No notifications yet.</p>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n.id} 
                            onClick={() => markAsRead(n.id)}
                            className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                              n.is_read ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400' : 'bg-blue-50 dark:bg-blue-950/40 text-slate-900 dark:text-slate-100 font-medium border-l-2 border-blue-600'
                            }`}
                          >
                            <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                            <p className="mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard Navigation */}
              {isAdmin ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  Admin Panel
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => handleNavClick('courses')}
                className="px-4 py-2 text-sm font-bold text-white rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #14213D 0%, #2563EB 100%)' }}
              >
                Start Learning Free
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-blue-500" />
                {link.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'dashboard')}
                  className="w-full text-center py-2.5 rounded-xl font-bold text-white bg-blue-600 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {isAdmin ? 'Go to Admin Panel' : 'My Learner Dashboard'}
                </button>
                <button
                  onClick={logout}
                  className="w-full text-center py-2 text-sm text-red-600 dark:text-red-400 font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2.5 text-center font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('courses')}
                  className="py-2.5 text-center font-bold text-white bg-blue-600 rounded-xl"
                >
                  Start Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
