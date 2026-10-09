import React from 'react';
import { storage } from '../../services/StorageService';
import { useCourses } from '../../context/CourseContext';
import { useJobs } from '../../context/JobContext';
import { BarChart3, TrendingUp, Users, BookOpen, Award } from 'lucide-react';

export const AdminReportsPage = () => {
  const users = storage.getUsers();
  const { courses, enrollments, certificates } = useCourses();
  const { jobs, applications } = useJobs();

  const reportMetrics = [
    { title: 'Total Registered Youth', value: users.length, category: 'User Registrations' },
    { title: 'Active Learners in Courses', value: enrollments.length, category: 'Course Engagement' },
    { title: 'Verifiable Certificates Issued', value: certificates.length, category: 'Learning Outcome' },
    { title: 'Submitted Job Applications', value: applications.length, category: 'Career Readiness' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Platform Analytics & Outcome Reports</h1>
        <p className="text-xs text-slate-500">Transparent reporting on youth learning progress and employability stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportMetrics.map((r, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase">{r.category}</span>
            <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{r.value}</p>
            <p className="text-xs text-slate-500">{r.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Course Completion Breakdown</h2>
        <div className="space-y-3">
          {courses.map(c => {
            const courseEnr = enrollments.filter(e => e.course_id === c.id);
            const courseDone = courseEnr.filter(e => e.status === 'completed');
            const percent = courseEnr.length > 0 ? Math.round((courseDone.length / courseEnr.length) * 100) : 0;
            return (
              <div key={c.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{c.title}</span>
                  <span>{percent}% Completion ({courseEnr.length} Enrolled)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
