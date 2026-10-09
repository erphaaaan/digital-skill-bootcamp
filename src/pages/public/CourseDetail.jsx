import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronDown, 
  Lock, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  User, 
  Wrench,
  ArrowRight
} from 'lucide-react';

export const CourseDetail = ({ courseId, onNavigate }) => {
  const { courses, isEnrolled, enrollCourse, getUserEnrollment } = useCourses();
  const [openModuleId, setOpenModuleId] = useState('mod-1');

  const course = courses.find(c => c.id === courseId) || courses[0];
  const enrolled = isEnrolled(course?.id);
  const userEnrollment = getUserEnrollment(course?.id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Course not found.</p>
      </div>
    );
  }

  const handleEnrollOrResume = () => {
    if (!enrolled) {
      const success = enrollCourse(course.id);
      if (success) {
        const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
        onNavigate('lesson-viewer', { courseId: course.id, lessonId: firstLessonId });
      }
    } else {
      const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
      onNavigate('lesson-viewer', { courseId: course.id, lessonId: firstLessonId });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600/30 text-blue-300 border border-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                {course.category}
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                {course.level} Level
              </span>
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                100% Free
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" /> {course.duration_hours} Estimated Hours
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-400" /> Instructor: {course.instructor}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Verifiable Certificate Included
              </span>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-5">
            <div className="relative rounded-xl overflow-hidden h-40 bg-slate-700">
              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
            </div>

            {enrolled && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Your Progress</span>
                  <span>{userEnrollment?.progress_percent || 0}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-400 h-full transition-all"
                    style={{ width: `${userEnrollment?.progress_percent || 0}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleEnrollOrResume}
              className="w-full py-3.5 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              {enrolled ? (
                <>Resume Learning <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Enroll Free & Start Learning <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Instant access • No credit card required • Self-paced
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Outcomes, Modules, Prerequisites */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Learning Outcomes */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
              What You Will Learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.outcomes?.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum & Modules Accordion */}
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
              Course Syllabus & Modules
            </h2>

            {course.modules?.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                Syllabus modules are currently being updated by the instructor.
              </p>
            ) : (
              course.modules?.map((mod) => {
                const isOpen = openModuleId === mod.id;
                return (
                  <div 
                    key={mod.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
                      className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between text-sm sm:text-base"
                    >
                      <span>{mod.title}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 space-y-2 border-t border-slate-100 dark:border-slate-800/80">
                        {mod.lessons?.map((les) => (
                          <div 
                            key={les.id}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              {les.type === 'video' && <PlayCircle className="w-4 h-4 text-blue-500" />}
                              {les.type === 'text' && <FileText className="w-4 h-4 text-teal-500" />}
                              {les.type === 'quiz' && <HelpCircle className="w-4 h-4 text-purple-500" />}
                              <span className="font-semibold text-slate-900 dark:text-slate-100">{les.title}</span>
                            </div>
                            <span className="text-slate-400 text-[11px] font-mono">{les.duration_mins} mins</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Info Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-500" /> Required Tools
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {course.tools_required?.map((t, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-teal-500" /> Course Instructor
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{course.instructor}</p>
            <p className="text-xs text-slate-500">Certified EdTech Instructor focusing on beginner youth development.</p>
          </div>

        </div>

      </section>

    </div>
  );
};
