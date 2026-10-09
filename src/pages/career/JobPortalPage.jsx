import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Briefcase, Search, ShieldCheck, MapPin, Clock, Send, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

export const JobPortalPage = ({ onNavigate }) => {
  const { jobs, applications, applyForJob, hasApplied, withdrawApplication, getUserResume } = useJobs();
  const { currentUser } = useAuth();
  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'my-applications'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedArrangement, setSelectedArrangement] = useState('All');

  const [applyModalJob, setApplyModalJob] = useState(null);
  const [coverNote, setCoverNote] = useState('');

  const types = ['All', 'Full-Time', 'Part-Time', 'Internship', 'Freelance'];
  const arrangements = ['All', 'Remote', 'Hybrid', 'Onsite'];

  const userApplications = applications.filter(a => a.user_id === currentUser?.id);
  const userResume = getUserResume();

  const filteredJobs = jobs.filter(j => {
    if (j.status !== 'active') return false;
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || j.employment_type === selectedType;
    const matchesArrangement = selectedArrangement === 'All' || j.work_type === selectedArrangement;

    return matchesSearch && matchesType && matchesArrangement;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalJob) return;

    const success = applyForJob(applyModalJob.id, coverNote, userResume?.id);
    if (success) {
      setApplyModalJob(null);
      setCoverNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-blue-600" /> Career & Internship Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover entry-level remote jobs, internships, and freelance opportunities.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Explore Opportunities ({filteredJobs.length})
          </button>
          <button
            onClick={() => {
              if (!currentUser) {
                showToast('Please log in to view your submitted applications.', 'error');
                onNavigate('login');
              } else {
                setActiveTab('my-applications');
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my-applications'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            My Applications ({userApplications.length})
          </button>
        </div>
      </div>

      {/* BROWSE TAB */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title, company, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white"
            >
              {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Employment Types' : t}</option>)}
            </select>

            <select
              value={selectedArrangement}
              onChange={(e) => setSelectedArrangement(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white"
            >
              {arrangements.map(a => <option key={a} value={a}>{a === 'All' ? 'All Work Arrangements' : a}</option>)}
            </select>
          </div>

          {/* Job Cards */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border space-y-3 max-w-md mx-auto">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">No Matching Listings</h3>
              <p className="text-xs text-slate-500">Try changing your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((j) => {
                const applied = hasApplied(j.id);
                return (
                  <div 
                    key={j.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 text-[10px] font-bold">
                          {j.employment_type} • {j.work_type}
                        </span>
                        {j.is_verified && (
                          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified Partner
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{j.title}</h3>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{j.company_name} • {j.location}</p>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{j.description}</p>

                      <div className="pt-1 text-xs font-extrabold text-teal-600 dark:text-teal-400">
                        Salary/Stipend: {j.salary_range}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Deadline: {j.deadline}</span>
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            showToast('Please log in to apply for job listings.', 'error');
                            onNavigate('login');
                          } else if (!applied) {
                            setApplyModalJob(j);
                          }
                        }}
                        disabled={applied}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          applied
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                        }`}
                      >
                        {applied ? '✓ Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* MY APPLICATIONS TAB */}
      {activeTab === 'my-applications' && (
        <div className="space-y-4">
          {userApplications.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border space-y-3 max-w-md mx-auto">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">No Submitted Applications</h3>
              <p className="text-xs text-slate-500">Apply to job listings in the Explore tab to track your status here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userApplications.map((app) => (
                <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Applied on {new Date(app.applied_at).toLocaleDateString('en-IN')}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{app.job_title}</h3>
                    <p className="text-xs text-slate-500">{app.company_name}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                      app.status === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
                      app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {app.status.replace('_', ' ')}
                    </span>

                    <button
                      onClick={() => withdrawApplication(app.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Withdraw Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Internal Application Submission Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Apply for {applyModalJob.title}
            </h3>
            <p className="text-xs text-slate-500">{applyModalJob.company_name} • {applyModalJob.location}</p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Applicant ATS Resume:</p>
                <p className="text-slate-500">{userResume ? `Attached: ${userResume.personal?.full_name}'s ATS Resume` : 'No ATS Resume saved yet. You can create one in Dashboard.'}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cover Note / Pitch *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why your digital skills make you a strong candidate..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
