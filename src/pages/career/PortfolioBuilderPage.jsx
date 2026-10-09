import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { FolderKanban, Plus, ExternalLink, Code, Trash2, Globe, ShieldCheck } from 'lucide-react';

export const PortfolioBuilderPage = () => {
  const { getUserPortfolios, savePortfolioProject, deletePortfolioProject } = useJobs();

  const portfolios = getUserPortfolios();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills_raw: '',
    tools_raw: '',
    github_url: '',
    live_url: '',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    is_public: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skills = formData.skills_raw.split(',').map(s => s.trim()).filter(Boolean);
    const tools = formData.tools_raw.split(',').map(t => t.trim()).filter(Boolean);

    savePortfolioProject({
      ...formData,
      skills,
      tools
    });

    setModalOpen(false);
    setFormData({
      title: '',
      description: '',
      skills_raw: '',
      tools_raw: '',
      github_url: '',
      live_url: '',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      is_public: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-teal-500" /> Student Portfolio Showcase
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Display your live capstone projects, GitHub repos, and digital work to potential employers.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow flex items-center gap-1.5 text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {portfolios.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3 max-w-md mx-auto">
          <FolderKanban className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">No Portfolio Projects Yet</h3>
          <p className="text-xs text-slate-500">Add your first capstone project to share with hiring recruiters.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600"
          >
            Add Portfolio Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-slate-200">
                  <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${proj.is_public ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {proj.is_public ? 'Public' : 'Private'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{proj.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {proj.skills?.map((s, i) => (
                      <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-blue-600 flex items-center gap-1 text-xs font-bold">
                      <Code className="w-4 h-4" /> Repo
                    </a>
                  )}
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-blue-600 flex items-center gap-1 text-xs font-bold">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => deletePortfolioProject(proj.id)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Add Portfolio Project</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Project Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <textarea
                required
                rows={3}
                placeholder="Project Description *"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="text"
                placeholder="Skills Used (e.g. React, Tailwind, Flexbox)"
                value={formData.skills_raw}
                onChange={(e) => setFormData({ ...formData, skills_raw: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="url"
                placeholder="GitHub Repository URL"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="url"
                placeholder="Live Demo URL (GitHub Pages / Netlify / Vercel)"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
