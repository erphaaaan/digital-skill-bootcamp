import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/StorageService';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { addNotification, showToast } = useNotifications();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [resources, setResources] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  const reloadJobData = () => {
    setJobs(storage.getJobs());
    setApplications(storage.getJobApplications());
    setMentors(storage.get(storage.STORAGE_KEYS?.MENTORS || 'dsb_mentors_v1'));
    setResources(storage.get(storage.STORAGE_KEYS?.RESOURCES || 'dsb_resources_v1'));
    setResumes(storage.getResumes());
    setPortfolios(storage.getPortfolios());
  };

  useEffect(() => {
    reloadJobData();
  }, [currentUser]);

  // Apply to Job
  const applyForJob = (jobId, coverNote = '', selectedResumeId = null) => {
    if (!currentUser) {
      showToast('Please log in or register to apply for jobs.', 'error');
      return false;
    }

    const existing = applications.find(
      a => a.user_id === currentUser.id && a.job_id === jobId
    );

    if (existing) {
      showToast('You have already applied for this position.', 'info');
      return false;
    }

    const job = jobs.find(j => j.id === jobId);
    const newApp = {
      id: `app-${Date.now()}`,
      user_id: currentUser.id,
      job_id: jobId,
      job_title: job?.title || 'Job Position',
      company_name: job?.company_name || 'Employer',
      applicant_name: currentUser.full_name,
      applicant_email: currentUser.email,
      applicant_phone: currentUser.phone || '',
      cover_note: coverNote,
      resume_id: selectedResumeId,
      status: 'applied',
      applied_at: new Date().toISOString()
    };

    const updated = [newApp, ...applications];
    storage.saveJobApplications(updated);
    setApplications(updated);

    addNotification(
      'Application Submitted!',
      `Your application for "${job?.title}" at ${job?.company_name} was successfully sent.`,
      'job'
    );
    showToast('Job application submitted successfully!', 'success');
    return true;
  };

  const hasApplied = (jobId) => {
    if (!currentUser) return false;
    return applications.some(a => a.user_id === currentUser.id && a.job_id === jobId);
  };

  const withdrawApplication = (applicationId) => {
    const updated = applications.filter(a => a.id !== applicationId);
    storage.saveJobApplications(updated);
    setApplications(updated);
    showToast('Application withdrawn.', 'info');
  };

  // ATS Resume Builder
  const getUserResume = () => {
    if (!currentUser) return null;
    const all = storage.getResumes();
    return all.find(r => r.user_id === currentUser.id) || null;
  };

  const saveUserResume = (resumeData) => {
    if (!currentUser) return;
    const all = storage.getResumes();
    const existingIndex = all.findIndex(r => r.user_id === currentUser.id);

    const updatedEntry = {
      id: existingIndex >= 0 ? all[existingIndex].id : `res-${Date.now()}`,
      user_id: currentUser.id,
      ...resumeData,
      updated_at: new Date().toISOString()
    };

    let updated;
    if (existingIndex >= 0) {
      updated = all.map((r, i) => i === existingIndex ? updatedEntry : r);
    } else {
      updated = [...all, updatedEntry];
    }

    storage.saveResumes(updated);
    setResumes(updated);
    showToast('ATS Resume saved successfully!', 'success');
    return updatedEntry;
  };

  // Portfolio Projects
  const getUserPortfolios = () => {
    if (!currentUser) return [];
    const all = storage.getPortfolios();
    return all.filter(p => p.user_id === currentUser.id);
  };

  const savePortfolioProject = (projData) => {
    if (!currentUser) return;
    const all = storage.getPortfolios();

    let updated;
    if (projData.id) {
      updated = all.map(p => p.id === projData.id ? { ...p, ...projData, updated_at: new Date().toISOString() } : p);
      showToast('Portfolio project updated.', 'success');
    } else {
      const newProj = {
        ...projData,
        id: `port-${Date.now()}`,
        user_id: currentUser.id,
        created_at: new Date().toISOString()
      };
      updated = [newProj, ...all];
      showToast('New project added to your portfolio!', 'success');
    }

    storage.savePortfolios(updated);
    setPortfolios(updated);
  };

  const deletePortfolioProject = (projId) => {
    const all = storage.getPortfolios();
    const updated = all.filter(p => p.id !== projId);
    storage.savePortfolios(updated);
    setPortfolios(updated);
    showToast('Portfolio project removed.', 'info');
  };

  // Admin Job CRUD & Status Moderation
  const saveJobAdmin = (jobData) => {
    let updated;
    if (jobData.id) {
      updated = jobs.map(j => j.id === jobData.id ? { ...j, ...jobData } : j);
      showToast('Job listing updated.', 'success');
    } else {
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}`,
        is_verified: jobData.is_verified ?? true,
        status: 'active',
        posted_at: new Date().toISOString()
      };
      updated = [newJob, ...jobs];
      showToast('New job opportunity posted!', 'success');
    }
    storage.saveJobs(updated);
    setJobs(updated);
  };

  const updateApplicationStatusAdmin = (appId, newStatus) => {
    const updated = applications.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    storage.saveJobApplications(updated);
    setApplications(updated);
    showToast(`Application status updated to "${newStatus}".`, 'success');
  };

  const value = {
    jobs,
    applications,
    mentors,
    resources,
    resumes,
    portfolios,
    applyForJob,
    hasApplied,
    withdrawApplication,
    getUserResume,
    saveUserResume,
    getUserPortfolios,
    savePortfolioProject,
    deletePortfolioProject,
    saveJobAdmin,
    updateApplicationStatusAdmin,
    reloadJobData
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
