import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, CheckCheck, Circle } from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Notification Center</h1>
          <p className="text-xs text-slate-500">In-app alerts for course updates, certificates, and job status.</p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
          <Bell className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div 
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                n.is_read
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70'
                  : 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 font-medium'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
                  <p className="text-[10px] text-slate-400 pt-1">{new Date(n.created_at).toLocaleString('en-IN')}</p>
                </div>
                {!n.is_read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
