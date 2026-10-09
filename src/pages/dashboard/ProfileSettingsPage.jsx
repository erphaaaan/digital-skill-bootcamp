import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { User, MapPin, GraduationCap, Sparkles, Save, Globe, FileText } from 'lucide-react';

export const ProfileSettingsPage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useNotifications();

  const [formData, setFormData] = useState({
    full_name: currentUser?.full_name || '',
    headline: currentUser?.headline || '',
    location: currentUser?.location || '',
    education: currentUser?.education || '',
    skills_raw: (currentUser?.skills || []).join(', '),
    learning_goals: currentUser?.learning_goals || '',
    portfolio_url: currentUser?.portfolio_url || '',
    resume_url: currentUser?.resume_url || '',
    avatar_url: currentUser?.avatar_url || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills_raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateProfile({
      full_name: formData.full_name,
      headline: formData.headline,
      location: formData.location,
      education: formData.education,
      skills: skillsArray,
      learning_goals: formData.learning_goals,
      portfolio_url: formData.portfolio_url,
      resume_url: formData.resume_url,
      avatar_url: formData.avatar_url
    });

    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Learner Profile & Preferences</h1>
        <p className="text-xs text-slate-500">Manage your public information, career goals, and skills.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* Avatar preview */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <img 
            src={formData.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed=User'} 
            alt="Profile Avatar" 
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/20"
          />
          <div className="space-y-1 flex-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Avatar Image URL</label>
            <input
              type="url"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Bengaluru, Karnataka"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Professional Headline</label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="Aspiring Web Developer & Tech Learner"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Education Qualification</label>
          <input
            type="text"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            placeholder="B.Sc Computer Science / Higher Secondary"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Skills (Comma separated)</label>
          <input
            type="text"
            value={formData.skills_raw}
            onChange={(e) => setFormData({ ...formData, skills_raw: e.target.value })}
            placeholder="HTML5, CSS3, JavaScript, Git, Canva"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Learning Goals & Aspirations</label>
          <textarea
            rows={3}
            value={formData.learning_goals}
            onChange={(e) => setFormData({ ...formData, learning_goals: e.target.value })}
            placeholder="Build a frontend portfolio and secure an entry-level remote job."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow flex items-center gap-2 text-sm"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>

      </form>
    </div>
  );
};
