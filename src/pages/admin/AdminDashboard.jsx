import React from 'react';
import { storage } from '../../services/StorageService';
import { useCourses } from '../../context/CourseContext';
import { useJobs } from '../../context/JobContext';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const AdminDashboard = ({ onNavigate }) => {
  const users = storage.getUsers();
  const { courses, enrollments, certificates } = useCourses();
  const { jobs, applications } = useJobs();

  const totalLearners = users.filter(u => u.role === 'learner').length;
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length;
  const completionRate = enrollments.length > 0 ? Math.round((completedEnrollments / enrollments.length) * 100) : 0;
  const pendingApps = applications.filter(a => a.status === 'applied').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-teal-500" /> Executive Platform Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics and system governance for Digital Skill Bootcamp.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('admin-courses')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
          >
            Manage Courses
          </button>
          <button
            onClick={() => onNavigate('admin-jobs')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
          >
            Moderate Jobs
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Users</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{users.length}</p>
          <p className="text-[11px] text-slate-500">{totalLearners} Active Learners</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Published Courses</span>
            <BookOpen className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{courses.length}</p>
          <p className="text-[11px] text-slate-500">{enrollments.length} Total Enrollments</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{completionRate}%</p>
          <p className="text-[11px] text-slate-500">{certificates.length} Certificates Issued</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Job Opportunities</span>
            <Briefcase className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{jobs.length}</p>
          <p className="text-[11px] text-amber-600 font-bold">{pendingApps} Applications Pending</p>
        </div>

      </div>

      {/* Quick Admin Actions & Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Registered Users */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Recent User Registrations
            </h2>
            <button onClick={() => onNavigate('admin-users')} className="text-xs font-bold text-blue-600 hover:underline">
              View All Users
            </button>
          </div>

          <div className="space-y-2">
            {users.slice(0, 4).map(u => (
              <div key={u.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.full_name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{u.full_name}</p>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  u.role === 'instructor' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
            Platform System Health
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 flex items-center justify-between font-bold">
              <span>Database Sync Engine</span>
              <span>Online & Persistence Active</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 flex items-center justify-between font-bold">
              <span>Certificate Generator</span>
              <span>100% Operational</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 flex items-center justify-between font-bold">
              <span>ATS Resume Renderer</span>
              <span>Ready</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
