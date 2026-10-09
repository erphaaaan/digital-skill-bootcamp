import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { BookOpen, Clock, Award, ArrowRight } from 'lucide-react';

export const MyCoursesPage = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, certificates } = useCourses();

  const userEnrollments = enrollments.filter(e => e.user_id === currentUser?.id);

  const enrolledList = userEnrollments.map(e => {
    const course = courses.find(c => c.id === e.course_id);
    const cert = certificates.find(c => c.user_id === currentUser?.id && c.course_id === e.course_id);
    return { ...e, course, cert };
  }).filter(e => e.course);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            My Enrolled Courses
          </h1>
          <p className="text-xs text-slate-500 mt-1">Track your progress and resume lessons.</p>
        </div>
        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
        >
          Explore Catalog
        </button>
      </div>

      {enrolledList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">No Enrolled Courses</h3>
          <p className="text-xs text-slate-500">You have not enrolled in any skill bootcamp courses yet.</p>
          <button
            onClick={() => onNavigate('courses')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600"
          >
            Browse Free Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledList.map(({ course, progress_percent, status, cert }) => (
            <div 
              key={course.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 text-[10px] font-bold">
                    {course.category}
                  </span>
                  {status === 'completed' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-600" /> Completed
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{course.title}</h3>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 font-semibold">
                    <span>Course Progress</span>
                    <span>{progress_percent || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${progress_percent || 0}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
                    onNavigate('lesson-viewer', { courseId: course.id, lessonId: firstLessonId });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                >
                  Resume Lesson <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {cert && (
                  <button
                    onClick={() => onNavigate('certificate-view', { certId: cert.id })}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 border border-amber-300 hover:bg-amber-100 flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600" /> View Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
