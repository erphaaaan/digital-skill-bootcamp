import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/StorageService';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import confetti from 'canvas-confetti';

const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { addNotification, showToast } = useNotifications();

  const [courses, setCourses] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [lessonProgress, setLessonProgress] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const reloadData = () => {
    setCourses(storage.getCourses());
    setLearningPaths(storage.getLearningPaths());
    setEnrollments(storage.getEnrollments());
    setLessonProgress(storage.getLessonProgress());
    setQuizAttempts(storage.getQuizAttempts());
    setSubmissions(storage.getSubmissions());
    setCertificates(storage.getCertificates());
    setBookmarks(storage.getBookmarks());
  };

  useEffect(() => {
    reloadData();
  }, [currentUser]);

  // Enrollment
  const enrollCourse = (courseId) => {
    if (!currentUser) {
      showToast('Please log in or register to enroll in courses.', 'error');
      return false;
    }

    const existing = enrollments.find(
      e => e.user_id === currentUser.id && e.course_id === courseId
    );

    if (existing) {
      showToast('You are already enrolled in this course.', 'info');
      return true;
    }

    const newEnrollment = {
      id: `enr-${Date.now()}`,
      user_id: currentUser.id,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress_percent: 0,
      status: 'active'
    };

    const updated = [...enrollments, newEnrollment];
    storage.saveEnrollments(updated);
    setEnrollments(updated);

    const course = courses.find(c => c.id === courseId);
    addNotification(
      'Enrollment Confirmed!',
      `You have successfully enrolled in "${course?.title || 'Course'}". Start learning today!`,
      'enrollment'
    );
    return true;
  };

  const isEnrolled = (courseId) => {
    if (!currentUser) return false;
    return enrollments.some(e => e.user_id === currentUser.id && e.course_id === courseId);
  };

  const getUserEnrollment = (courseId) => {
    if (!currentUser) return null;
    return enrollments.find(e => e.user_id === currentUser.id && e.course_id === courseId);
  };

  // Lesson Progress
  const markLessonComplete = (lessonId, courseId) => {
    if (!currentUser) return;

    const allProgress = storage.getLessonProgress();
    const existing = allProgress.find(
      p => p.user_id === currentUser.id && p.lesson_id === lessonId
    );

    let updatedProgress = allProgress;
    if (!existing) {
      const newEntry = {
        id: `prog-${Date.now()}`,
        user_id: currentUser.id,
        lesson_id: lessonId,
        completed_at: new Date().toISOString()
      };
      updatedProgress = [...allProgress, newEntry];
      storage.saveLessonProgress(updatedProgress);
      setLessonProgress(updatedProgress);
    }

    // Recalculate Course Completion Percentage
    if (courseId) {
      recalculateCourseProgress(courseId, updatedProgress);
    }
  };

  const isLessonCompleted = (lessonId) => {
    if (!currentUser) return false;
    return lessonProgress.some(p => p.user_id === currentUser.id && p.lesson_id === lessonId);
  };

  const recalculateCourseProgress = (courseId, currentProgress = lessonProgress) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !currentUser) return;

    const allLessons = [];
    course.modules?.forEach(mod => {
      mod.lessons?.forEach(les => allLessons.push(les));
    });

    if (allLessons.length === 0) return;

    const userCompletedCount = allLessons.filter(les =>
      currentProgress.some(p => p.user_id === currentUser.id && p.lesson_id === les.id)
    ).length;

    const percent = Math.round((userCompletedCount / allLessons.length) * 100);

    const allEnr = storage.getEnrollments();
    const updatedEnr = allEnr.map(e => {
      if (e.user_id === currentUser.id && e.course_id === courseId) {
        const isCompletedNow = percent >= 100;
        return {
          ...e,
          progress_percent: percent,
          status: isCompletedNow ? 'completed' : 'active',
          completed_at: isCompletedNow ? new Date().toISOString() : e.completed_at
        };
      }
      return e;
    });

    storage.saveEnrollments(updatedEnr);
    setEnrollments(updatedEnr);

    if (percent >= 100) {
      issueCertificate(course);
    }
  };

  // Quiz Attempt
  const submitQuizAttempt = (quizId, score, passed, answers) => {
    if (!currentUser) return;

    const newAttempt = {
      id: `attempt-${Date.now()}`,
      user_id: currentUser.id,
      quiz_id: quizId,
      score,
      passed,
      answers,
      attempted_at: new Date().toISOString()
    };

    const updated = [newAttempt, ...quizAttempts];
    storage.saveQuizAttempts(updated);
    setQuizAttempts(updated);

    if (passed) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      showToast(`Quiz Passed with ${score}%! Excellent job.`, 'success');
    } else {
      showToast(`Score: ${score}%. You need 70% to pass. Review content and try again.`, 'error');
    }
  };

  // Assignment Submission
  const submitAssignment = (lessonId, courseId, data) => {
    if (!currentUser) return;

    const newSub = {
      id: `sub-${Date.now()}`,
      user_id: currentUser.id,
      lesson_id: lessonId,
      course_id: courseId,
      learner_name: currentUser.full_name,
      submission_text: data.submission_text || '',
      project_url: data.project_url || '',
      file_url: data.file_url || '',
      status: 'submitted',
      feedback: '',
      submitted_at: new Date().toISOString()
    };

    const updated = [newSub, ...submissions];
    storage.saveSubmissions(updated);
    setSubmissions(updated);

    markLessonComplete(lessonId, courseId);
    showToast('Assignment submitted successfully for review!', 'success');
  };

  // Certificate Generation
  const issueCertificate = (course) => {
    if (!currentUser) return;
    const existing = certificates.find(
      c => c.user_id === currentUser.id && c.course_id === course.id
    );
    if (existing) return;

    const certCode = `DSB-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newCert = {
      id: certCode,
      user_id: currentUser.id,
      course_id: course.id,
      learner_name: currentUser.full_name,
      course_title: course.title,
      issue_date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      verification_code: certCode
    };

    const updated = [newCert, ...certificates];
    storage.saveCertificates(updated);
    setCertificates(updated);

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } catch (e) {}

    addNotification(
      '🎉 Certificate Earned!',
      `Congratulations ${currentUser.full_name}! You completed "${course.title}". Download your certificate in the dashboard.`,
      'certificate'
    );
  };

  // Bookmarks
  const toggleBookmark = (itemType, itemId, itemTitle) => {
    if (!currentUser) {
      showToast('Please login to save bookmarks.', 'error');
      return;
    }

    const existingIndex = bookmarks.findIndex(
      b => b.user_id === currentUser.id && b.item_type === itemType && b.item_id === itemId
    );

    let updated;
    if (existingIndex >= 0) {
      updated = bookmarks.filter((_, idx) => idx !== existingIndex);
      showToast('Removed from saved bookmarks.', 'info');
    } else {
      const newBM = {
        id: `bm-${Date.now()}`,
        user_id: currentUser.id,
        item_type: itemType,
        item_id: itemId,
        item_title: itemTitle,
        created_at: new Date().toISOString()
      };
      updated = [...bookmarks, newBM];
      showToast('Added to saved bookmarks.', 'success');
    }

    storage.saveBookmarks(updated);
    setBookmarks(updated);
  };

  const isBookmarked = (itemType, itemId) => {
    if (!currentUser) return false;
    return bookmarks.some(
      b => b.user_id === currentUser.id && b.item_type === itemType && b.item_id === itemId
    );
  };

  // Admin Course CRUD
  const saveCourseAdmin = (courseData) => {
    let updated;
    if (courseData.id) {
      updated = courses.map(c => c.id === courseData.id ? { ...c, ...courseData, updated_at: new Date().toISOString() } : c);
      showToast('Course updated successfully!', 'success');
    } else {
      const newCourse = {
        ...courseData,
        id: `course-${Date.now()}`,
        slug: courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        lessons_count: (courseData.modules || []).reduce((acc, m) => acc + (m.lessons || []).length, 0),
        price: 0,
        is_published: true,
        created_at: new Date().toISOString()
      };
      updated = [newCourse, ...courses];
      showToast('New course published successfully!', 'success');
    }
    storage.saveCourses(updated);
    setCourses(updated);
  };

  const deleteCourseAdmin = (courseId) => {
    const updated = courses.filter(c => c.id !== courseId);
    storage.saveCourses(updated);
    setCourses(updated);
    showToast('Course deleted successfully.', 'info');
  };

  const value = {
    courses,
    learningPaths,
    enrollments,
    lessonProgress,
    quizAttempts,
    submissions,
    certificates,
    bookmarks,
    enrollCourse,
    isEnrolled,
    getUserEnrollment,
    markLessonComplete,
    isLessonCompleted,
    submitQuizAttempt,
    submitAssignment,
    toggleBookmark,
    isBookmarked,
    saveCourseAdmin,
    deleteCourseAdmin,
    reloadData
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
