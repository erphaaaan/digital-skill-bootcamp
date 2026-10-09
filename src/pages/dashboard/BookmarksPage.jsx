import React from 'react';
import { useCourses } from '../../context/CourseContext';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';

export const BookmarksPage = ({ onNavigate }) => {
  const { bookmarks, toggleBookmark } = useCourses();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Saved Bookmarks</h1>
        <p className="text-xs text-slate-500">Quick access to courses and items you saved for later.</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">No saved bookmarks yet</p>
          <p className="text-xs text-slate-500">Click the bookmark icon on any course or resource to save it here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <div key={bm.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{bm.item_title || 'Saved Item'}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">{bm.item_type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-1"
                >
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleBookmark(bm.item_type, bm.item_id, bm.item_title)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
