import React, { useState } from 'react';
import { INITIAL_MENTORS } from '../../data/seedData';
import { useNotifications } from '../../context/NotificationContext';
import { Users, Calendar, CheckCircle2, Star, MessageSquare } from 'lucide-react';

export const MentorshipPage = () => {
  const { showToast } = useNotifications();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    showToast(`Mentorship request submitted with ${selectedMentor.name} for ${selectedSlot}!`, 'success');
    setSelectedMentor(null);
    setSelectedSlot('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Mentorship & Career Guidance Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Connect with experienced tech leads, designers, and growth marketers for 1-on-1 advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_MENTORS.map((m) => (
          <div key={m.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={m.avatar_url} alt={m.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{m.name}</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{m.title} • {m.company}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.bio}</p>

              <div className="flex flex-wrap gap-1.5">
                {m.expertise?.map((e, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-teal-600 font-bold">100% Free Sessions</span>
              <button
                onClick={() => {
                  setSelectedMentor(m);
                  setSelectedSlot(m.available_slots?.[0] || '');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Request 1-on-1 Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Schedule Session with {selectedMentor.name}
            </h3>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Available Slot:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                >
                  {selectedMentor.available_slots?.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
