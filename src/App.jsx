import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CourseProvider } from './context/CourseContext';
import { JobProvider } from './context/JobContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { AboutUs } from './pages/public/AboutUs';
import { CourseCatalog } from './pages/public/CourseCatalog';
import { CourseDetail } from './pages/public/CourseDetail';
import { LearningPathsPage } from './pages/public/LearningPathsPage';
import { ContactPage } from './pages/public/ContactPage';
import { TermsPage, PrivacyPage, AccessibilityPage } from './pages/public/LegalPages';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Learner Dashboard Pages
import { LearnerDashboard } from './pages/dashboard/LearnerDashboard';
import { MyCoursesPage } from './pages/dashboard/MyCoursesPage';
import { BookmarksPage } from './pages/dashboard/BookmarksPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { ProfileSettingsPage } from './pages/dashboard/ProfileSettingsPage';

// LMS Pages
import { LessonViewer } from './pages/lms/LessonViewer';
import { QuizScreen } from './pages/lms/QuizScreen';
import { CertificateViewPage } from './pages/lms/CertificateViewPage';
import { VerifyCertificatePage } from './pages/lms/VerifyCertificatePage';

// Career Pages
import { ResumeBuilderPage } from './pages/career/ResumeBuilderPage';
import { PortfolioBuilderPage } from './pages/career/PortfolioBuilderPage';
import { InterviewPrepPage } from './pages/career/InterviewPrepPage';
import { CareerResourcesPage } from './pages/career/CareerResourcesPage';
import { JobPortalPage } from './pages/career/JobPortalPage';
import { MentorshipPage } from './pages/career/MentorshipPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminJobsPage } from './pages/admin/AdminJobsPage';
import { AdminSubmissionsPage } from './pages/admin/AdminSubmissionsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState({});
  const { currentUser, isAdmin } = useAuth();

  const handleNavigate = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Full Screen LMS / Lesson Viewer
  if (currentRoute === 'lesson-viewer') {
    return (
      <LessonViewer 
        courseId={routeParams.courseId} 
        initialLessonId={routeParams.lessonId} 
        onNavigate={handleNavigate} 
      />
    );
  }

  // Render Admin Layout Pages
  if (currentRoute.startsWith('admin-')) {
    if (!currentUser || !isAdmin) {
      return (
        <PublicLayout currentRoute="login" onNavigate={handleNavigate}>
          <LoginPage onNavigate={handleNavigate} />
        </PublicLayout>
      );
    }

    return (
      <AdminLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
        {currentRoute === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentRoute === 'admin-users' && <AdminUsersPage />}
        {currentRoute === 'admin-courses' && <AdminCoursesPage onNavigate={handleNavigate} />}
        {currentRoute === 'admin-jobs' && <AdminJobsPage />}
        {currentRoute === 'admin-submissions' && <AdminSubmissionsPage />}
        {currentRoute === 'admin-reports' && <AdminReportsPage />}
        {currentRoute === 'admin-content' && <AdminContentPage />}
      </AdminLayout>
    );
  }

  // Render Learner Dashboard Layout Pages
  const dashboardRoutes = [
    'dashboard', 
    'my-courses', 
    'resume-builder', 
    'portfolio-builder', 
    'my-applications', 
    'bookmarks', 
    'notifications', 
    'profile-settings'
  ];

  if (dashboardRoutes.includes(currentRoute)) {
    if (!currentUser) {
      return (
        <PublicLayout currentRoute="login" onNavigate={handleNavigate}>
          <LoginPage onNavigate={handleNavigate} />
        </PublicLayout>
      );
    }

    return (
      <DashboardLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
        {currentRoute === 'dashboard' && <LearnerDashboard onNavigate={handleNavigate} />}
        {currentRoute === 'my-courses' && <MyCoursesPage onNavigate={handleNavigate} />}
        {currentRoute === 'resume-builder' && <ResumeBuilderPage />}
        {currentRoute === 'portfolio-builder' && <PortfolioBuilderPage />}
        {currentRoute === 'my-applications' && <JobPortalPage onNavigate={handleNavigate} />}
        {currentRoute === 'bookmarks' && <BookmarksPage onNavigate={handleNavigate} />}
        {currentRoute === 'notifications' && <NotificationsPage />}
        {currentRoute === 'profile-settings' && <ProfileSettingsPage />}
      </DashboardLayout>
    );
  }

  // Render Public Layout Pages
  return (
    <PublicLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
      {currentRoute === 'home' && <Home onNavigate={handleNavigate} />}
      {currentRoute === 'about' && <AboutUs />}
      {currentRoute === 'courses' && <CourseCatalog onNavigate={handleNavigate} />}
      {currentRoute === 'course-detail' && <CourseDetail courseId={routeParams.courseId} onNavigate={handleNavigate} />}
      {currentRoute === 'learning-paths' && <LearningPathsPage onNavigate={handleNavigate} />}
      {currentRoute === 'contact' && <ContactPage />}
      {currentRoute === 'terms' && <TermsPage />}
      {currentRoute === 'privacy' && <PrivacyPage />}
      {currentRoute === 'accessibility' && <AccessibilityPage />}
      {currentRoute === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentRoute === 'register' && <RegisterPage onNavigate={handleNavigate} />}
      
      {/* Career Pages */}
      {currentRoute === 'interview-prep' && <InterviewPrepPage />}
      {currentRoute === 'career-resources' && <CareerResourcesPage />}
      {currentRoute === 'jobs' && <JobPortalPage onNavigate={handleNavigate} />}
      {currentRoute === 'mentorship' && <MentorshipPage />}

      {/* LMS Subviews */}
      {currentRoute === 'quiz-screen' && <QuizScreen courseId={routeParams.courseId} quizId={routeParams.quizId} onNavigate={handleNavigate} />}
      {currentRoute === 'certificate-view' && <CertificateViewPage certId={routeParams.certId} onNavigate={handleNavigate} />}
      {currentRoute === 'verify-certificate' && <VerifyCertificatePage initialCode={routeParams.certCode} />}
    </PublicLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CourseProvider>
          <JobProvider>
            <AppContent />
          </JobProvider>
        </CourseProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
