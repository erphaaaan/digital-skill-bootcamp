import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '../../data/seedData';
import { BookOpen, ShieldAlert, Briefcase, Search, ArrowRight } from 'lucide-react';

export const CareerResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRes, setSelectedRes] = useState(null);

  const filtered = INITIAL_RESOURCES.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Career Guides & Online Safety Resources
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Articles on freelancing, job hunting, LinkedIn optimization, and scam prevention.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search guides (e.g. freelancing, scams, ATS)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 text-[10px] font-bold">
                {res.category}
              </span>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{res.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">{res.summary}</p>
            </div>

            <button
              onClick={() => setSelectedRes(res)}
              className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              Read Full Article <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Article Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-2xl w-full border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-blue-600 uppercase">{selectedRes.category}</span>
              <button onClick={() => setSelectedRes(null)} className="text-xs font-bold text-slate-500">✕ Close</button>
            </div>
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">{selectedRes.title}</h2>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <div dangerouslySetInnerHTML={{ __html: selectedRes.content.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
