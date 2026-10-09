import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { useNotifications } from '../../context/NotificationContext';
import { FileCheck, ExternalLink, CheckCircle2, MessageSquare } from 'lucide-react';

export const AdminSubmissionsPage = () => {
  const { submissions } = useCourses();
  const { showToast } = useNotifications();
  const [selectedSub, setSelectedSub] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleReview = (e) => {
    e.preventDefault();
    showToast('Feedback & Review saved for ' + selectedSub.learner_name, 'success');
    setSelectedSub(null);
    setFeedback('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Student Assignment Submissions</h1>
        <p className="text-xs text-slate-500">Review capstone project links, assign grades, and provide feedback.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border space-y-2">
          <FileCheck className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">No Submitted Assignments</p>
          <p className="text-xs text-slate-500">Student capstone project submissions will appear here for staff review.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b">
              <tr>
                <th className="p-3">Learner</th>
                <th className="p-3">Project Link</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{sub.learner_name}</td>
                  <td className="p-3">
                    {sub.project_url ? (
                      <a href={sub.project_url} target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> View Project Link
                      </a>
                    ) : (
                      <span className="text-slate-400">Text Submission</span>
                    )}
                  </td>
                  <td className="p-3 font-bold text-emerald-600 uppercase">{sub.status}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedSub(sub);
                        setFeedback(sub.feedback || '');
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-600"
                    >
                      Review & Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Review Submission: {selectedSub.learner_name}</h3>
            <form onSubmit={handleReview} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Instructor Feedback</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Great work on responsive layout! Good use of semantic tags."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setSelectedSub(null)} className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600">Save Grade & Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
