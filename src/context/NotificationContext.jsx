import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/StorageService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const allNotifs = storage.getNotifications();
      const userNotifs = allNotifs.filter(n => n.user_id === currentUser.id);
      setNotifications(userNotifs);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addNotification = (title, message, type = 'system') => {
    if (!currentUser) return;
    const allNotifs = storage.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      user_id: currentUser.id,
      title,
      message,
      type,
      is_read: false,
      created_at: new Date().toISOString()
    };
    const updated = [newNotif, ...allNotifs];
    storage.saveNotifications(updated);
    setNotifications(prev => [newNotif, ...prev]);
    showToast(title, 'success');
  };

  const markAsRead = (id) => {
    const allNotifs = storage.getNotifications();
    const updated = allNotifs.map(n => n.id === id ? { ...n, is_read: true } : n);
    storage.saveNotifications(updated);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllAsRead = () => {
    if (!currentUser) return;
    const allNotifs = storage.getNotifications();
    const updated = allNotifs.map(n => n.user_id === currentUser.id ? { ...n, is_read: true } : n);
    storage.saveNotifications(updated);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const value = {
    notifications,
    toast,
    showToast,
    addNotification,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter(n => !n.is_read).length
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Global Toast Component */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-4 flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
            toast.type === 'success' ? 'bg-emerald-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`} />
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 flex-1">{toast.message}</p>
          <button 
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
