import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { HelpCircle, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Award } from 'lucide-react';

export const QuizScreen = ({ courseId, quizId, onNavigate }) => {
  const { courses, submitQuizAttempt } = useCourses();

  const course = courses.find(c => c.id === courseId) || courses[0];
  
  // Find quiz from lessons
  let targetQuiz = null;
  course?.modules?.forEach(mod => {
    mod.lessons?.forEach(les => {
      if (les.quiz && (les.quiz.id === quizId || !quizId)) {
        targetQuiz = les.quiz;
      }
    });
  });

  // Default Fallback Quiz if not found
  const quiz = targetQuiz || {
    id: 'quiz-default',
    title: 'Digital Skills Foundation Quiz',
    passing_score: 70,
    questions: [
      {
        id: 'q1',
        question_text: 'Which HTML element is used for the main title of a web page?',
        options: ['<title>', '<h1>', '<header>', '<main>'],
        correct_option_index: 1,
        explanation: '<h1> represents the main top-level heading of a document.'
      },
      {
        id: 'q2',
        question_text: 'What does CSS Flexbox handle primarily?',
        options: ['Database queries', '1D page layouts and alignment', 'Server hosting', 'Graphic illustrations'],
        correct_option_index: 1,
        explanation: 'CSS Flexbox is designed for one-dimensional layout and alignment of elements.'
      }
    ]
  };

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_option_index) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / quiz.questions.length) * 100);
    const isPassed = percent >= (quiz.passing_score || 70);

    setScorePercent(percent);
    setPassed(isPassed);
    setSubmitted(true);

    submitQuizAttempt(quiz.id, percent, isPassed, selectedAnswers);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScorePercent(0);
    setPassed(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigate('lesson-viewer', { courseId: course.id })}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Lessons
        </button>
        <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
          Passing Threshold: {quiz.passing_score}%
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{course.title}</span>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">{quiz.title}</h1>
        </div>

        {/* Results Banner */}
        {submitted && (
          <div className={`p-6 rounded-2xl border text-center space-y-3 ${
            passed 
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-900 dark:text-emerald-100'
              : 'bg-red-50 dark:bg-red-950/50 border-red-300 text-red-900 dark:text-red-100'
          }`}>
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-xl text-white shadow" style={{ background: passed ? '#059669' : '#DC2626' }}>
              {passed ? '✓' : '✕'}
            </div>
            <h2 className="font-heading font-extrabold text-2xl">
              {passed ? 'Quiz Passed!' : 'Needs Revision'}
            </h2>
            <p className="text-sm font-bold">
              Score: {scorePercent}% ({passed ? 'Qualified for Certificate' : 'Score below 70% required'})
            </p>
            {!passed && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            )}
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions?.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correct_option_index;

            return (
              <div 
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
              >
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {qIndex + 1}. {q.question_text}
                </p>

                <div className="space-y-2">
                  {q.options?.map((opt, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    let optionStyle = 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200';

                    if (submitted) {
                      if (optIndex === q.correct_option_index) {
                        optionStyle = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 border-emerald-400 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100 border-red-400 line-through';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-blue-600 font-bold';
                    }

                    return (
                      <button
                        type="button"
                        key={optIndex}
                        onClick={() => handleSelect(q.id, optIndex)}
                        className={`w-full p-3 rounded-xl text-left text-xs border transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIndex === q.correct_option_index && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && q.explanation && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200 border border-blue-200">
                    <span className="font-bold">Explanation:</span> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <button
              type="submit"
              disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors shadow text-sm"
            >
              Submit Quiz Answers
            </button>
          )}
        </form>

      </div>

    </div>
  );
};
