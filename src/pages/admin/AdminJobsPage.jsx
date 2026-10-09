import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { Briefcase, Plus, ShieldCheck, Edit3, CheckCircle2 } from 'lucide-react';

export const AdminJobsPage = () => {
  const { jobs, applications, saveJobAdmin, updateApplicationStatusAdmin } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'applications'

  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    location: 'Bengaluru, India',
    work_type: 'Remote',
    employment_type: 'Full-Time',
    salary_range: '₹4.0 - ₹5.5 LPA',
    description: '',
    deadline: '2026-12-31',
    is_verified: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveJobAdmin(formData);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Job & Internship Moderation</h1>
          <p className="text-xs text-slate-500">Post verified opportunities and review student job applications.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'listings' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}
          >
            Manage Listings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}
          >
            Review Applications ({applications.length})
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-2 rounded-xl font-bold text-white bg-slate-900 text-xs flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Post Opportunity
          </button>
        </div>
      </div>

      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j) => (
            <div key={j.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 uppercase">{j.employment_type} • {j.work_type}</span>
                {j.is_verified && <span className="text-[10px] font-bold text-teal-600 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified</span>}
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{j.title}</h3>
              <p className="text-xs text-slate-500">{j.company_name} • {j.location}</p>
              <p className="text-xs font-bold text-teal-600">{j.salary_range}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b">
              <tr>
                <th className="p-3">Applicant</th>
                <th className="p-3">Position</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{app.applicant_name} <br/><span className="font-normal text-slate-400">{app.applicant_email}</span></td>
                  <td className="p-3">{app.job_title} <br/><span className="text-slate-400">{app.company_name}</span></td>
                  <td className="p-3 uppercase font-bold text-blue-600">{app.status}</td>
                  <td className="p-3 text-right">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatusAdmin(app.id, e.target.value)}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border text-xs font-bold"
                    >
                      <option value="applied">Applied</option>
                      <option value="under_review">Under Review</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Post Opportunity</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" />
              <input type="text" required placeholder="Company Name" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" />
              <input type="text" placeholder="Salary Range (e.g. ₹4.0 LPA)" value={formData.salary_range} onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" />
              <textarea rows={3} required placeholder="Job Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" />
              
              <div className="flex gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
