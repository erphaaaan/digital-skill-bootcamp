import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { useNotifications } from '../../context/NotificationContext';
import { 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  ChevronRight, 
  BookOpen,
  Award,
  Send
} from 'lucide-react';

export const LessonViewer = ({ courseId, initialLessonId, onNavigate }) => {
  const { courses, markLessonComplete, isLessonCompleted, submitAssignment } = useCourses();
  const { showToast } = useNotifications();

  const course = courses.find(c => c.id === courseId) || courses[0];

  // Flatten all lessons into an ordered array for linear navigation
  const allLessons = [];
  course?.modules?.forEach(mod => {
    mod.lessons?.forEach(les => {
      allLessons.push({ ...les, moduleTitle: mod.title });
    });
  });

  const [currentLessonId, setCurrentLessonId] = useState(
    initialLessonId || allLessons[0]?.id || 'les-1'
  );

  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentProjectUrl, setAssignmentProjectUrl] = useState('');
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);

  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const completed = isLessonCompleted(currentLesson?.id);

  if (!course || !currentLesson) {
    return (
      <div className="p-8 text-center">
        <p>Lesson content not found.</p>
        <button onClick={() => onNavigate('courses')} className="mt-4 text-blue-600 font-bold">Return to Courses</button>
      </div>
    );
  }

  const handleNextLesson = () => {
    markLessonComplete(currentLesson.id, course.id);
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    } else {
      showToast('Congratulations! You completed the final lesson in this course.', 'success');
      onNavigate('my-courses');
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
    }
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!assignmentText && !assignmentProjectUrl) {
      showToast('Please enter your project reflection or GitHub live demo link.', 'error');
      return;
    }
    submitAssignment(currentLesson.id, course.id, {
      submission_text: assignmentText,
      project_url: assignmentProjectUrl
    });
    setSubmissionModalOpen(false);
    setAssignmentText('');
    setAssignmentProjectUrl('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-slate-950 border-r border-slate-800 flex flex-col h-auto md:h-screen sticky top-0">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 space-y-2">
          <button 
            onClick={() => onNavigate('course-detail', { courseId: course.id })}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Course Overview
          </button>
          <h2 className="font-heading font-bold text-sm text-white line-clamp-1">{course.title}</h2>
        </div>

        {/* Modules & Lessons List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.modules?.map((mod) => (
            <div key={mod.id} className="space-y-2">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{mod.title}</h3>
              <div className="space-y-1">
                {mod.lessons?.map((les) => {
                  const isCurrent = les.id === currentLessonId;
                  const isDone = isLessonCompleted(les.id);
                  return (
                    <button
                      key={les.id}
                      onClick={() => setCurrentLessonId(les.id)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white font-bold shadow'
                          : isDone
                          ? 'bg-slate-900 text-emerald-400 border border-slate-800'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 line-clamp-1">
                        {les.type === 'video' && <PlayCircle className="w-4 h-4 flex-shrink-0" />}
                        {les.type === 'text' && <FileText className="w-4 h-4 flex-shrink-0" />}
                        {les.type === 'quiz' && <HelpCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />}
                        {les.type === 'assignment' && <Award className="w-4 h-4 flex-shrink-0 text-teal-400" />}
                        <span className="truncate">{les.title}</span>
                      </div>

                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </aside>

      {/* Main Content Stage */}
      <main className="flex-1 flex flex-col overflow-y-auto min-h-screen">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">{currentLesson.moduleTitle}</span>
            <h1 className="font-heading font-bold text-lg text-white">{currentLesson.title}</h1>
          </div>

          <button
            onClick={() => markLessonComplete(currentLesson.id, course.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              completed
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>

        {/* Lesson View Stage */}
        <div className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Video Player */}
          {currentLesson.type === 'video' && (
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 shadow-2xl">
              {currentLesson.video_url ? (
                <iframe
                  src={currentLesson.video_url}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                  Video Tutorial Player
                </div>
              )}
            </div>
          )}

          {/* Text / Article Content */}
          {currentLesson.content && (
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {/* Quiz Trigger Card */}
          {currentLesson.type === 'quiz' && currentLesson.quiz && (
            <div className="bg-gradient-to-r from-purple-950 to-slate-900 rounded-2xl p-8 border border-purple-800/60 text-center space-y-4">
              <HelpCircle className="w-12 h-12 text-purple-400 mx-auto" />
              <h2 className="font-heading font-extrabold text-2xl text-white">Module Assessment Quiz</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Test your understanding! Pass with 70% or higher to qualify for your course certificate.
              </p>
              <button
                onClick={() => onNavigate('quiz-screen', { courseId: course.id, quizId: currentLesson.quiz.id })}
                className="px-6 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg text-sm"
              >
                Start Practice Quiz Now
              </button>
            </div>
          )}

          {/* Assignment Submission Card */}
          {currentLesson.type === 'assignment' && (
            <div className="bg-gradient-to-r from-teal-950 to-slate-900 rounded-2xl p-8 border border-teal-800/60 text-center space-y-4">
              <Award className="w-12 h-12 text-teal-400 mx-auto" />
              <h2 className="font-heading font-extrabold text-2xl text-white">Capstone Assignment Submission</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Submit your project GitHub link or live website demo to demonstrate practical mastery.
              </p>
              <button
                onClick={() => setSubmissionModalOpen(true)}
                className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg text-sm"
              >
                Submit Assignment Project
              </button>
            </div>
          )}

        </div>

        {/* Bottom Pagination Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={handlePrevLesson}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Lesson
          </button>

          <span className="text-xs font-mono text-slate-500">
            {currentIndex + 1} / {allLessons.length}
          </span>

          <button
            onClick={handleNextLesson}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            {currentIndex === allLessons.length - 1 ? 'Finish Course' : 'Next Lesson'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Assignment Submission Modal */}
      {submissionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Submit Assignment Project</h3>
            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">GitHub / Live Demo URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={assignmentProjectUrl}
                  onChange={(e) => setAssignmentProjectUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Project Reflection & Notes</label>
                <textarea
                  rows={4}
                  placeholder="Describe your implementation and key learnings..."
                  value={assignmentText}
                  onChange={(e) => setAssignmentText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmissionModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
