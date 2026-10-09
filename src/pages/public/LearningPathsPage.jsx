import React from 'react';
import { useCourses } from '../../context/CourseContext';
import { Compass, Clock, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export const LearningPathsPage = ({ onNavigate }) => {
  const { learningPaths, courses, isEnrolled, enrollCourse } = useCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Career Roadmaps
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          Structured Learning Paths for Beginners
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Step-by-step career sequences designed to guide you from absolute zero to building real portfolio projects and applying for entry-level positions.
        </p>
      </div>

      {/* Path List */}
      <div className="space-y-8">
        {learningPaths.map((path) => {
          const pathCourses = courses.filter(c => path.course_ids?.includes(c.id));
          return (
            <div 
              key={path.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
            >
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
                    {path.category}
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                    {path.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                    {path.description}
                  </p>
                </div>

                <div className="space-y-2 text-right md:text-right">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                    <Clock className="w-4 h-4 text-teal-500" /> {path.estimated_duration}
                  </div>
                </div>
              </div>

              {/* Target Job Roles */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Career Roles:</h3>
                <div className="flex flex-wrap gap-2">
                  {path.target_roles?.map((role, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-blue-500" /> {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Sequence Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Course Modules:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pathCourses.map((c, i) => {
                    const enrolled = isEnrolled(c.id);
                    return (
                      <div 
                        key={c.id} 
                        className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</p>
                            <p className="text-[11px] text-slate-500">{c.duration_hours} hrs • {c.level}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!enrolled) enrollCourse(c.id);
                            onNavigate('course-detail', { courseId: c.id });
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 transition-colors"
                        >
                          {enrolled ? 'Resume' : 'Enroll'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
