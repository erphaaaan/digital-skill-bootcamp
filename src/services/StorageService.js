import {
  INITIAL_COURSES,
  INITIAL_LEARNING_PATHS,
  INITIAL_JOBS,
  INITIAL_MENTORS,
  INITIAL_RESOURCES,
  INITIAL_FAQS
} from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'dsb_users_v1',
  CURRENT_USER: 'dsb_current_user_v1',
  COURSES: 'dsb_courses_v1',
  LEARNING_PATHS: 'dsb_paths_v1',
  ENROLLMENTS: 'dsb_enrollments_v1',
  LESSON_PROGRESS: 'dsb_lesson_progress_v1',
  QUIZ_ATTEMPTS: 'dsb_quiz_attempts_v1',
  SUBMISSIONS: 'dsb_submissions_v1',
  CERTIFICATES: 'dsb_certificates_v1',
  JOBS: 'dsb_jobs_v1',
  JOB_APPLICATIONS: 'dsb_job_applications_v1',
  BOOKMARKS: 'dsb_bookmarks_v1',
  NOTIFICATIONS: 'dsb_notifications_v1',
  RESUMES: 'dsb_resumes_v1',
  PORTFOLIOS: 'dsb_portfolios_v1',
  MENTORS: 'dsb_mentors_v1',
  RESOURCES: 'dsb_resources_v1',
  SUPPORT_MESSAGES: 'dsb_support_messages_v1',
  FAQS: 'dsb_faqs_v1',
  AUDIT_LOGS: 'dsb_audit_logs_v1'
};

// Default Initial Accounts for immediate testing
const INITIAL_USERS = [
  {
    id: 'usr-learner-1',
    email: 'learner@bootcamp.org',
    password: 'learner123', // Demo account
    full_name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    role: 'learner',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    headline: 'Aspiring Web Developer & Tech Student',
    location: 'Bengaluru, Karnataka',
    education: 'B.Sc Computer Science (2025)',
    career_interests: ['Web Development', 'Frontend Engineering', 'Open Source'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    learning_goals: 'Build a responsive portfolio and land a remote frontend internship by Q4.',
    created_at: '2026-02-01T10:00:00.000Z'
  },
  {
    id: 'usr-instructor-1',
    email: 'instructor@bootcamp.org',
    password: 'instructor123',
    full_name: 'Priya Patel',
    phone: '+91 98765 11223',
    role: 'instructor',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    headline: 'Lead Web Development Instructor',
    location: 'Mumbai, Maharashtra',
    skills: ['React', 'Node.js', 'UI Design'],
    created_at: '2026-01-01T10:00:00.000Z'
  },
  {
    id: 'usr-admin-1',
    email: 'admin@bootcamp.org',
    password: 'admin123',
    full_name: 'Administrator (Youth Skill Lead)',
    phone: '+91 98111 22334',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    headline: 'Platform Director & Content Moderator',
    location: 'New Delhi, India',
    created_at: '2026-01-01T10:00:00.000Z'
  }
];

class StorageService {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEARNING_PATHS)) {
      localStorage.setItem(STORAGE_KEYS.LEARNING_PATHS, JSON.stringify(INITIAL_LEARNING_PATHS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MENTORS)) {
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(INITIAL_MENTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(INITIAL_FAQS));
    }
    // Collections defaults
    const defaults = [
      STORAGE_KEYS.ENROLLMENTS,
      STORAGE_KEYS.LESSON_PROGRESS,
      STORAGE_KEYS.QUIZ_ATTEMPTS,
      STORAGE_KEYS.SUBMISSIONS,
      STORAGE_KEYS.CERTIFICATES,
      STORAGE_KEYS.JOB_APPLICATIONS,
      STORAGE_KEYS.BOOKMARKS,
      STORAGE_KEYS.NOTIFICATIONS,
      STORAGE_KEYS.RESUMES,
      STORAGE_KEYS.PORTFOLIOS,
      STORAGE_KEYS.SUPPORT_MESSAGES,
      STORAGE_KEYS.AUDIT_LOGS
    ];

    defaults.forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });

    // Default seed enrollment for learner-1 to show initial state on login
    const enrollments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '[]');
    if (enrollments.length === 0) {
      const defaultEnrollment = [
        {
          id: 'enr-seed-1',
          user_id: 'usr-learner-1',
          course_id: 'course-1',
          enrolled_at: '2026-02-10T11:00:00.000Z',
          progress_percent: 25,
          status: 'active'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(defaultEnrollment));

      const defaultProgress = [
        { id: 'prog-1', user_id: 'usr-learner-1', lesson_id: 'les-1', completed_at: '2026-02-10T11:15:00.000Z' }
      ];
      localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(defaultProgress));

      const defaultNotifications = [
        {
          id: 'notif-1',
          user_id: 'usr-learner-1',
          title: 'Welcome to Full-Stack Web Development!',
          message: 'Your enrollment in Full-Stack Web Development Foundation has been confirmed.',
          type: 'enrollment',
          is_read: false,
          created_at: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(defaultNotifications));
    }
  }

  // Generic getter & setter
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (err) {
      console.error(`Error reading ${key}:`, err);
      return [];
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing ${key}:`, err);
    }
  }

  // Users
  getUsers() { return this.get(STORAGE_KEYS.USERS); }
  saveUsers(users) { this.set(STORAGE_KEYS.USERS, users); }

  getCurrentUser() {
    try {
      const item = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      return null;
    }
  }
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // Courses
  getCourses() { return this.get(STORAGE_KEYS.COURSES); }
  saveCourses(courses) { this.set(STORAGE_KEYS.COURSES, courses); }

  getLearningPaths() { return this.get(STORAGE_KEYS.LEARNING_PATHS); }
  saveLearningPaths(paths) { this.set(STORAGE_KEYS.LEARNING_PATHS, paths); }

  // Enrollments & Progress
  getEnrollments() { return this.get(STORAGE_KEYS.ENROLLMENTS); }
  saveEnrollments(enrollments) { this.set(STORAGE_KEYS.ENROLLMENTS, enrollments); }

  getLessonProgress() { return this.get(STORAGE_KEYS.LESSON_PROGRESS); }
  saveLessonProgress(progress) { this.set(STORAGE_KEYS.LESSON_PROGRESS, progress); }

  getQuizAttempts() { return this.get(STORAGE_KEYS.QUIZ_ATTEMPTS); }
  saveQuizAttempts(attempts) { this.set(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts); }

  getSubmissions() { return this.get(STORAGE_KEYS.SUBMISSIONS); }
  saveSubmissions(submissions) { this.set(STORAGE_KEYS.SUBMISSIONS, submissions); }

  getCertificates() { return this.get(STORAGE_KEYS.CERTIFICATES); }
  saveCertificates(certs) { this.set(STORAGE_KEYS.CERTIFICATES, certs); }

  // Jobs
  getJobs() { return this.get(STORAGE_KEYS.JOBS); }
  saveJobs(jobs) { this.set(STORAGE_KEYS.JOBS, jobs); }

  getJobApplications() { return this.get(STORAGE_KEYS.JOB_APPLICATIONS); }
  saveJobApplications(apps) { this.set(STORAGE_KEYS.JOB_APPLICATIONS, apps); }

  // Bookmarks & Notifications
  getBookmarks() { return this.get(STORAGE_KEYS.BOOKMARKS); }
  saveBookmarks(bookmarks) { this.set(STORAGE_KEYS.BOOKMARKS, bookmarks); }

  getNotifications() { return this.get(STORAGE_KEYS.NOTIFICATIONS); }
  saveNotifications(notifs) { this.set(STORAGE_KEYS.NOTIFICATIONS, notifs); }

  // Resumes & Portfolios
  getResumes() { return this.get(STORAGE_KEYS.RESUMES); }
  saveResumes(resumes) { this.set(STORAGE_KEYS.RESUMES, resumes); }

  getPortfolios() { return this.get(STORAGE_KEYS.PORTFOLIOS); }
  savePortfolios(portfolios) { this.set(STORAGE_KEYS.PORTFOLIOS, portfolios); }

  // Support & Audit
  getSupportMessages() { return this.get(STORAGE_KEYS.SUPPORT_MESSAGES); }
  saveSupportMessages(msgs) { this.set(STORAGE_KEYS.SUPPORT_MESSAGES, msgs); }

  getFaqs() { return this.get(STORAGE_KEYS.FAQS); }
  saveFaqs(faqs) { this.set(STORAGE_KEYS.FAQS, faqs); }

  getAuditLogs() { return this.get(STORAGE_KEYS.AUDIT_LOGS); }
  saveAuditLogs(logs) { this.set(STORAGE_KEYS.AUDIT_LOGS, logs); }
}

export const storage = new StorageService();
