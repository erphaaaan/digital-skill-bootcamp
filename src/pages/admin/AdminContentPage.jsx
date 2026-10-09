import React, { useState } from 'react';
import { storage } from '../../services/StorageService';
import { useNotifications } from '../../context/NotificationContext';
import { FileEdit, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminContentPage = () => {
  const { showToast } = useNotifications();
  const [faqs, setFaqs] = useState(storage.getFaqs());
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newQ || !newA) return;
    const updated = [...faqs, { q: newQ, a: newA }];
    storage.saveFaqs(updated);
    setFaqs(updated);
    setNewQ('');
    setNewA('');
    showToast('FAQ entry added.', 'success');
  };

  const handleDeleteFaq = (idx) => {
    const updated = faqs.filter((_, i) => i !== idx);
    storage.saveFaqs(updated);
    setFaqs(updated);
    showToast('FAQ deleted.', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Content & FAQ Manager</h1>
        <p className="text-xs text-slate-500">Manage homepage questions and public information pages.</p>
      </div>

      <form onSubmit={handleAddFaq} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Add New FAQ</h2>
        <input
          type="text"
          required
          placeholder="Question"
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
        />
        <textarea
          rows={3}
          required
          placeholder="Answer"
          value={newA}
          onChange={(e) => setNewA(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
        />
        <button type="submit" className="px-4 py-2 rounded-xl font-bold text-white bg-blue-600 text-xs">
          Add FAQ
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{f.q}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{f.a}</p>
            </div>
            <button onClick={() => handleDeleteFaq(i)} className="text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
