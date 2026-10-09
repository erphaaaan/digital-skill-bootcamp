import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Award, 
  Users, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  ChevronDown, 
  Search,
  Star,
  Zap,
  GraduationCap
} from 'lucide-react';

export const Home = ({ onNavigate }) => {
  const { courses, learningPaths, isEnrolled, enrollCourse } = useCourses();
  const { jobs } = useJobs();
  const { currentUser } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const publishedCourses = courses.filter(c => c.is_published).slice(0, 3);
  const activeJobs = jobs.filter(j => j.status === 'active').slice(0, 3);

  const benefits = [
    { title: '100% Free Beginner-Friendly Courses', desc: 'Designed specifically for first-time learners with no prior technical background.', icon: GraduationCap },
    { title: 'Hands-On Capstone Projects', desc: 'Build real portfolio projects (websites, spreadsheets, designs) to showcase to employers.', icon: Zap },
    { title: 'Optimized for Mobile Phones', desc: 'Access video lessons, quizzes, and job applications seamlessly on your smartphone.', icon: Smartphone },
    { title: 'Self-Paced & Flexible Schedule', desc: 'Learn at your own pace alongside your daily commitments with offline downloadable resources.', icon: Clock },
    { title: 'ATS Resume & Portfolio Builder', desc: 'Automatically generate job-ready ATS resumes and public project portfolios.', icon: Briefcase },
    { title: 'Verifiable Completion Certificates', desc: 'Earn official certificates backed by unique verification codes for employer validation.', icon: Award }
  ];

  const faqs = [
    {
      q: 'Who can join the Digital Skill Bootcamp?',
      a: 'Any unemployed young person, recent graduate, student, or career seeker in India looking to gain practical digital skills. No prior coding or technical knowledge is required.'
    },
    {
      q: 'Do I need prior digital skills or a expensive laptop?',
      a: 'Not at all! Our courses start from complete computer and internet basics. The entire platform is mobile-responsive so you can complete lessons on your smartphone.'
    },
    {
      q: 'Are all courses and career services completely free?',
      a: 'Yes, 100% free. All learning paths, quizzes, resume builders, portfolio tools, and job portal applications are free for learners.'
    },
    {
      q: 'Will the platform guarantee me a job?',
      a: 'We do not promise artificial job guarantees or unrealistic placement claims. Instead, we equip you with real, verifiable skills, portfolio projects, ATS resumes, and direct connections to active job opportunities.'
    },
    {
      q: 'How do I earn a Verifiable Certificate?',
      a: 'Complete all required lessons in a course, submit your project assignments, and pass the final quiz with a score of 70% or higher. Your verifiable certificate will instantly be issued.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-semibold text-blue-300">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Empowering Unemployed Youth Across India
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Turn Your Potential Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Digital Career.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Learn in-demand digital skills, build real-world projects, generate ATS-ready resumes, and prepare for employment with a practical learning platform designed for aspiring professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #14B8A6 100%)' }}
              >
                Explore Free Courses <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('learning-paths')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-blue-400" /> Find Your Learning Path
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-extrabold text-white font-heading">100%</p>
                <p className="text-xs text-slate-400">Free Access</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-teal-400 font-heading">6+</p>
                <p className="text-xs text-slate-400">Skill Tracks</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-blue-400 font-heading">₹0</p>
                <p className="text-xs text-slate-400">Cost for Learners</p>
              </div>
            </div>

          </div>

          {/* Hero Visual Card */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-lg">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400">bootcamp.org/dashboard</span>
              </div>

              {/* Sample Learner Dashboard Preview Card */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
                      HTML
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Full-Stack Web Development</p>
                      <p className="text-[10px] text-slate-400">Module 2: Flexbox & Layouts</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                    75% Done
                  </span>
                </div>

                <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-600/30 text-teal-400 flex items-center justify-center font-bold">
                      ATS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">ATS Resume Score</p>
                      <p className="text-[10px] text-slate-400">Formatted for Indian Employers</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-800/50">
                    Ready
                  </span>
                </div>

                <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold">
                      JOB
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Junior React Developer</p>
                      <p className="text-[10px] text-slate-400">Bengaluru • ₹4.5 LPA</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-800/50">
                    Applied
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: TRUST AND MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Built to Bridge the Employability Gap
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            Millions of young people in India have talent and potential, but lack access to practical, job-relevant skills and professional guidance. Our mission is to democratize digital education by providing structured, project-based training that prepares youth for employment, freelancing, and digital entrepreneurship.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Practical Skill First</h3>
              <p className="text-xs text-slate-500 mt-1">Real projects, zero fluff</p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 mx-auto flex items-center justify-center mb-2">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Mobile Optimized</h3>
              <p className="text-xs text-slate-500 mt-1">Learn anywhere on phone</p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 mx-auto flex items-center justify-center mb-2">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Career Preparation</h3>
              <p className="text-xs text-slate-500 mt-1">ATS Resumes & Portfolios</p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Transparent Impact</h3>
              <p className="text-xs text-slate-500 mt-1">No fake job promises</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED LEARNING PATHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Featured Learning Paths
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Step-by-step career roadmaps designed to make you employment ready.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('learning-paths')}
            className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:underline self-start sm:self-auto"
          >
            View All Paths <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <div 
              key={path.id} 
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                    {path.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {path.estimated_duration}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {path.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {path.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {path.skills_gained?.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate('learning-paths')}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  View Path Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              How It Works: 4 Simple Steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
              Clear, transparent journey from zero experience to career preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold font-heading text-lg mx-auto flex items-center justify-center shadow-md">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Create Free Account</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Sign up in 30 seconds with your email or phone number. No hidden fees.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white font-extrabold font-heading text-lg mx-auto flex items-center justify-center shadow-md">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Choose a Digital Skill</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Select Web Development, Digital Marketing, Data Analytics, or Graphic Design.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-extrabold font-heading text-lg mx-auto flex items-center justify-center shadow-md">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Build Real Projects</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Complete practical assignments, pass quizzes, and earn verifiable certificates.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold font-heading text-lg mx-auto flex items-center justify-center shadow-md">
                4
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Apply for Opportunities</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Generate an ATS resume, publish your portfolio, and apply for verified entry jobs.</p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: PLATFORM BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Designed for Real Employability Outcomes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Everything you need to go from a beginner to a job-ready candidate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{b.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Start learning practical skills today.
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedCourses.map((c) => {
            const enrolled = isEnrolled(c.id);
            return (
              <div 
                key={c.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img 
                      src={c.thumbnail_url} 
                      alt={c.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                      100% Free
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {c.level}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{c.category}</p>
                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {c.duration_hours} Hours
                  </span>
                  <button
                    onClick={() => {
                      if (!enrolled) enrollCourse(c.id);
                      onNavigate('course-detail', { courseId: c.id });
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      enrolled
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                    }`}
                  >
                    {enrolled ? 'Resume Course' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: CAREER OPPORTUNITIES PREVIEW */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Job & Internship Portal</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                Active Career Opportunities
              </h2>
            </div>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-teal-400 font-bold text-sm flex items-center gap-1 hover:underline self-start sm:self-auto"
            >
              Browse All Opportunities <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeJobs.map((j) => (
              <div 
                key={j.id} 
                className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px] font-bold border border-blue-800/60">
                      {j.employment_type}
                    </span>
                    {j.is_verified && (
                      <span className="text-[10px] font-semibold text-teal-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base text-white">{j.title}</h3>
                  <p className="text-xs text-slate-300 font-medium">{j.company_name} • {j.location}</p>
                  
                  <div className="pt-2 text-xs font-bold text-teal-400">
                    Salary: {j.salary_range}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="w-full py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about joining and learning on the platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #14213D 0%, #2563EB 50%, #14B8A6 100%)' }}>
          
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl max-w-2xl mx-auto leading-tight">
            Your Next Opportunity Starts With One Skill.
          </h2>

          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of young professionals across India building practical digital skills, portfolios, and job readiness. Completely free.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate(currentUser ? 'dashboard' : 'register')}
              className="px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-105 text-sm uppercase tracking-wider"
            >
              {currentUser ? 'Go to My Dashboard' : 'Start Learning Free Today'}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
