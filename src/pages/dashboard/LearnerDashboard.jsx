import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { useJobs } from '../../context/JobContext';
import { 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  FileText, 
  FolderKanban, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Bookmark
} from 'lucide-react';

export const LearnerDashboard = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, certificates, lessonProgress } = useCourses();
  const { applications, getUserResume, getUserPortfolios } = useJobs();

  const userEnrollments = enrollments.filter(e => e.user_id === currentUser?.id);
  const userCertificates = certificates.filter(c => c.user_id === currentUser?.id);
  const userApplications = applications.filter(a => a.user_id === currentUser?.id);
  const userResume = getUserResume();
  const userPortfolios = getUserPortfolios();

  const activeEnrollments = userEnrollments.map(e => {
    const course = courses.find(c => c.id === e.course_id);
    return { ...e, course };
  }).filter(e => e.course);

  // Career Checklist calculation
  const checklist = [
    { label: 'Enroll in first digital skill course', done: userEnrollments.length > 0 },
    { label: 'Complete at least 1 lesson module', done: lessonProgress.length > 0 },
    { label: 'Build ATS Resume', done: !!userResume },
    { label: 'Create at least 1 Portfolio project', done: userPortfolios.length > 0 },
    { label: 'Apply for entry-level job or internship', done: userApplications.length > 0 },
    { label: 'Earn course certificate of completion', done: userCertificates.length > 0 }
  ];

  const checklistCompleted = checklist.filter(c => c.done).length;
  const checklistPercent = Math.round((checklistCompleted / checklist.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Learner Command Center
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Welcome back, {currentUser?.full_name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentUser?.headline || 'Continue building your digital skills and career portfolio today.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 transition-colors shadow flex items-center gap-1.5"
          >
            Explore New Courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {userEnrollments.length}
          </p>
          <p className="text-[11px] text-slate-500">Active learning tracks</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Certificates Earned</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {userCertificates.length}
          </p>
          <p className="text-[11px] text-slate-500">Verifiable credentials</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Job Applications</span>
            <Briefcase className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {userApplications.length}
          </p>
          <p className="text-[11px] text-slate-500">Submitted applications</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Career Readiness</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {checklistPercent}%
          </p>
          <p className="text-[11px] text-slate-500">Employability checklist</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Active Enrolled Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              In-Progress Courses
            </h2>
            <button 
              onClick={() => onNavigate('my-courses')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All My Courses
            </button>
          </div>

          {activeEnrollments.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">No courses enrolled yet</p>
              <p className="text-xs text-slate-500">Enroll in your first free digital skill course to get started.</p>
              <button
                onClick={() => onNavigate('courses')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeEnrollments.map(({ course, progress_percent }) => (
                <div 
                  key={course.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img src={course.thumbnail_url} alt={course.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{course.category}</span>
                      <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-1">{course.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: `${progress_percent}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{progress_percent}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
                      onNavigate('lesson-viewer', { courseId: course.id, lessonId: firstLessonId });
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Resume Lesson
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Career Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Career Preparation Shortcuts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('resume-builder')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-1 hover:border-blue-500 transition-colors"
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">ATS Resume Builder</p>
                <p className="text-xs text-slate-500">Create or edit your ATS resume for job submissions.</p>
              </button>

              <button
                onClick={() => onNavigate('portfolio-builder')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-1 hover:border-teal-500 transition-colors"
              >
                <FolderKanban className="w-5 h-5 text-teal-500" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">Portfolio Builder</p>
                <p className="text-xs text-slate-500">Add live project links and screenshots.</p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Career Preparation Checklist */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Employability Checklist
            </h2>
            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 text-white' : 'border border-slate-300'}`}>
                    {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={item.done ? 'line-through text-slate-400' : 'font-medium'}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
