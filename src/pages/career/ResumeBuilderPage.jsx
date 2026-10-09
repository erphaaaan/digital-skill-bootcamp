import React, { useState, useEffect } from 'react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { FileText, Save, Printer, Plus, Trash2, CheckCircle2, User, Mail, Phone, MapPin } from 'lucide-react';

export const ResumeBuilderPage = () => {
  const { currentUser } = useAuth();
  const { getUserResume, saveUserResume } = useJobs();

  const existingResume = getUserResume();

  const [personal, setPersonal] = useState(existingResume?.personal || {
    full_name: currentUser?.full_name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '+91 ',
    location: currentUser?.location || 'Bengaluru, India',
    linkedin: '',
    github: ''
  });

  const [summary, setSummary] = useState(existingResume?.summary || 'Enthusiastic digital skill bootcamp learner with practical hands-on experience in modern web development, responsive design, and Git.');
  const [skills, setSkills] = useState(existingResume?.skills || ['HTML5', 'CSS3', 'JavaScript', 'React Basics', 'Git & GitHub', 'Flexbox']);
  const [newSkill, setNewSkill] = useState('');

  const [education, setEducation] = useState(existingResume?.education || [
    { degree: 'Bachelor of Science (Computer Science)', institution: 'State University', year: '2025' }
  ]);

  const [projects, setProjects] = useState(existingResume?.projects || [
    { title: 'Responsive E-Commerce Landing Page', tech: 'HTML5, CSS Flexbox, JavaScript', desc: 'Designed and hosted a fully responsive product landing page with accessible menu navigation.' }
  ]);

  const [experience, setExperience] = useState(existingResume?.experience || [
    { title: 'Web Development Trainee', organization: 'Digital Skill Bootcamp', period: 'Jan 2026 - Present', details: 'Completed 45+ hours of practical coursework, passed module assessments, and built portfolio projects.' }
  ]);

  const handleSave = () => {
    saveUserResume({
      personal,
      summary,
      skills,
      education,
      projects,
      experience
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', institution: '', year: '' }]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { title: '', tech: '', desc: '' }]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-blue-600" /> Guided ATS Resume Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build a clean, single-column ATS-optimized resume tailored for Indian employers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow flex items-center gap-1.5 text-xs"
          >
            <Save className="w-4 h-4" /> Save ATS Resume
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl font-bold text-slate-900 bg-slate-200 dark:bg-slate-800 dark:text-white hover:bg-slate-300 shadow flex items-center gap-1.5 text-xs"
          >
            <Printer className="w-4 h-4" /> Export PDF / Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Editor Column */}
        <div className="space-y-6 no-print">
          
          {/* Personal Info */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={personal.full_name}
                onChange={(e) => setPersonal({ ...personal, full_name: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={personal.email}
                onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={personal.phone}
                onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <input
                type="text"
                placeholder="Location (City, State)"
                value={personal.location}
                onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Professional Summary</h2>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Concise 2-3 sentence overview of your digital skills and career objective..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
            />
          </div>

          {/* Technical Skills */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Technical Skills</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. React, SQL, Canva)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {skills.map((s, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  {s}
                  <button onClick={() => removeSkill(idx)} className="text-slate-400 hover:text-red-500">✕</button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Projects</h2>
              <button onClick={addProject} className="text-xs font-bold text-blue-600 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {projects.map((p, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 relative">
                <button onClick={() => removeProject(idx)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xs">
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) => {
                    const copy = [...projects];
                    copy[idx].title = e.target.value;
                    setProjects(copy);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs font-bold"
                />
                <input
                  type="text"
                  placeholder="Technologies Used (e.g. HTML, CSS, JavaScript)"
                  value={p.tech}
                  onChange={(e) => {
                    const copy = [...projects];
                    copy[idx].tech = e.target.value;
                    setProjects(copy);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                />
                <textarea
                  rows={2}
                  placeholder="Bullet point description of project results..."
                  value={p.desc}
                  onChange={(e) => {
                    const copy = [...projects];
                    copy[idx].desc = e.target.value;
                    setProjects(copy);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Live ATS Resume Preview Column */}
        <div className="sticky top-20 bg-white text-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-300 shadow-2xl space-y-6 resume-preview-container">
          
          {/* Resume Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 uppercase tracking-tight">
              {personal.full_name || 'YOUR NAME'}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {[personal.location, personal.phone, personal.email].filter(Boolean).join(' • ')}
            </p>
          </div>

          {/* Summary */}
          {summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Technical Skills
              </h2>
              <p className="text-xs text-slate-800 font-semibold">{skills.join(' • ')}</p>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Technical Projects
              </h2>
              {projects.map((p, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{p.title || 'Project Title'}</span>
                    <span className="font-normal italic text-slate-600">{p.tech}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Education & Training
              </h2>
              {education.map((e, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-800 font-bold">
                  <span>{e.degree} - {e.institution}</span>
                  <span className="text-slate-600 font-normal">{e.year}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
