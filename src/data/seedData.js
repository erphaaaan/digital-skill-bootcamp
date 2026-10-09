// Seed Data for Digital Skill Bootcamp for Unemployed Youth (India Focus)

export const INITIAL_COURSES = [
  {
    id: 'course-1',
    slug: 'full-stack-web-dev',
    title: 'Full-Stack Web Development Foundation',
    category: 'Web Development',
    level: 'Beginner',
    duration_hours: 45,
    lessons_count: 24,
    thumbnail_url: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
    instructor: 'Rajesh Kumar (Former Senior Engineer)',
    description: 'Learn modern Web Development from zero. Master HTML5, CSS3, JavaScript ES6+, Responsive Layouts, Git, and React basics through 6 hands-on portfolio projects.',
    outcomes: [
      'Build responsive websites using Semantic HTML5 and modern CSS Flexbox/Grid',
      'Add interactivity using JavaScript ES6+, Async/Await, and DOM manipulation',
      'Version control your projects with Git and host them live on GitHub Pages',
      'Understand React component architecture and state management',
      'Build an ATS-friendly personal developer portfolio'
    ],
    prerequisites: ['Basic computer literacy', 'English reading capability', 'Smartphone or Laptop with internet'],
    tools_required: ['VS Code / Replit', 'GitHub Account', 'Google Chrome'],
    price: 0,
    is_published: true,
    created_at: '2026-01-10T10:00:00.000Z',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Web Fundamentals & Semantic HTML5',
        order_index: 1,
        lessons: [
          {
            id: 'les-1',
            title: 'How the Web Works & Setting Up VS Code',
            type: 'video',
            duration_mins: 15,
            video_url: 'https://www.youtube.com/embed/gT0LhB-m5jE',
            content: 'Welcome to your first web development lesson! In this video, we explore how browsers communicate with web servers via HTTP/HTTPS, how domain names resolve, and how to configure VS Code with essential extensions for rapid development.',
            is_free_preview: true
          },
          {
            id: 'les-2',
            title: 'Mastering Semantic HTML Structure & Accessibility',
            type: 'text',
            duration_mins: 20,
            content: `
### Why Semantic HTML Matters
Semantic HTML tags like \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, and \`<footer>\` communicate meaning to both browsers and screen readers.

#### Key Tags to Remember:
1. **\`<header>\`**: Contains brand logo, title, and primary navigation.
2. **\`<main>\`**: Represents the unique dominant content of the page.
3. **\`<article>\`**: Self-contained composition intended for independent distribution.
4. **\`<button>\` vs \`<a>\`**: Use \`<button>\` for user actions (submitting forms, opening modals) and \`<a>\` for page navigation.

#### Hands-on Challenge:
Create a web page structure for a digital resume containing your name, contact links, career objective, and education list.
            `,
            is_free_preview: true
          },
          {
            id: 'les-3',
            title: 'Module 1 Knowledge Quiz',
            type: 'quiz',
            duration_mins: 10,
            quiz: {
              id: 'quiz-1',
              title: 'HTML5 & Accessibility Quiz',
              passing_score: 70,
              questions: [
                {
                  id: 'q1',
                  question_text: 'Which tag should be used for the main navigation menu of a website?',
                  options: ['<div class="nav">', '<nav>', '<menu-section>', '<aside>'],
                  correct_option_index: 1,
                  explanation: '<nav> is the semantic HTML5 element specifically designated for major navigation links.'
                },
                {
                  id: 'q2',
                  question_text: 'What is the primary difference between a <button> and an <a> tag?',
                  options: [
                    'Buttons are only for forms; links are for styling',
                    'Buttons trigger actions on the current page; <a> tags navigate to URLs',
                    'They are completely identical in functionality',
                    '<a> tags cannot have click listeners'
                  ],
                  correct_option_index: 1,
                  explanation: '<a> tags represent hyperlinks to navigate between pages or anchors, whereas <button> triggers script actions or form submissions.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Styling with Modern CSS & Flexbox',
        order_index: 2,
        lessons: [
          {
            id: 'les-4',
            title: 'CSS Box Model, Colors & Flexbox Layouts',
            type: 'video',
            duration_mins: 25,
            video_url: 'https://www.youtube.com/embed/K74l26pE4YA',
            content: 'In this session, learn how margin, border, padding, and content dimensions calculate page layout. Then master CSS Flexbox properties: `display: flex`, `justify-content`, and `align-items`.',
            is_free_preview: false
          },
          {
            id: 'les-5',
            title: 'Capstone Project 1: Build a Responsive Landing Page',
            type: 'assignment',
            duration_mins: 60,
            content: `
### Project Requirements:
1. Build a responsive single-page landing page for a local Kirana store or digital service.
2. Must include a sticky Navbar, Hero section with dual CTAs, Feature Cards grid, and Footer.
3. Submit your GitHub Repository link and hosted GitHub Pages live demo link below.
            `
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'digital-marketing-growth',
    title: 'Digital Marketing & Social Media Growth Associate',
    category: 'Digital Marketing',
    level: 'Beginner',
    duration_hours: 35,
    lessons_count: 18,
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    instructor: 'Sneha Kulkarni (Ex-Growth Lead)',
    description: 'Master practical digital marketing: Content Creation, Canva Design, Search Engine Optimization (SEO), Meta & Instagram Ads management, Email Newsletters, and Analytics.',
    outcomes: [
      'Create high-converting social media posts using Canva and AI copy tools',
      'Conduct keyword research and optimize website content for Google SEO',
      'Set up and run budget-friendly Meta (Facebook/Instagram) ad campaigns',
      'Analyze campaign performance metrics (CTR, CPC, Conversion Rate) using Google Analytics'
    ],
    prerequisites: ['Basic familiarity with Instagram and Facebook', 'Interest in digital branding'],
    tools_required: ['Canva Free', 'Google Keyword Planner', 'Meta Business Suite'],
    price: 0,
    is_published: true,
    created_at: '2026-01-15T10:00:00.000Z',
    modules: [
      {
        id: 'mod-dm-1',
        title: 'Module 1: Foundations of Content Strategy & Branding',
        order_index: 1,
        lessons: [
          {
            id: 'les-dm-1',
            title: 'Defining Target Audiences & Buyer Personas in India',
            type: 'video',
            duration_mins: 18,
            video_url: 'https://www.youtube.com/embed/nU-IIXBWlS4',
            content: 'Understand how Indian consumer demographics, language preferences, and purchasing habits influence social media engagements.',
            is_free_preview: true
          },
          {
            id: 'les-dm-2',
            title: 'Canva Design Quickstart for Social Media Graphics',
            type: 'text',
            duration_mins: 25,
            content: `
### Creating High-Impact Visual Content
1. **Hierarchy**: Contrast headlines with clear body copy.
2. **Branding**: Stick to 2 dominant brand colors and 1 complementary background.
3. **Call-to-Action**: Every post must invite the viewer to comment, share, or click link in bio.
            `,
            is_free_preview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'data-analytics-excel-sql',
    title: 'Data Analytics Foundation with Excel & SQL',
    category: 'Data Analytics',
    level: 'Beginner',
    duration_hours: 40,
    lessons_count: 20,
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    instructor: 'Vikram Sethi (Data Consultant)',
    description: 'Transform raw data into business insights. Learn Microsoft Excel formulas, VLOOKUP/XLOOKUP, Pivot Tables, SQL query basics (SELECT, WHERE, GROUP BY, JOINs), and visual dashboards.',
    outcomes: [
      'Clean messy datasets using Excel formulas and Data Validation rules',
      'Summarize thousands of rows instantly with Pivot Tables and Charts',
      'Query relational databases using SQL syntax in DB Fiddle / PostgreSQL',
      'Build interactive business reporting dashboards for non-technical stakeholders'
    ],
    prerequisites: ['Basic math skills', 'Comfortable working with numbers'],
    tools_required: ['Microsoft Excel / Google Sheets', 'Browser SQL Sandbox'],
    price: 0,
    is_published: true,
    created_at: '2026-01-20T10:00:00.000Z',
    modules: [
      {
        id: 'mod-da-1',
        title: 'Module 1: Excel Mastery & Data Cleaning',
        order_index: 1,
        lessons: [
          {
            id: 'les-da-1',
            title: 'Essential Excel Formulas: SUMIFS, COUNTIFS, VLOOKUP & XLOOKUP',
            type: 'video',
            duration_mins: 22,
            video_url: 'https://www.youtube.com/embed/rwbho0CgEAE',
            content: 'Step-by-step tutorial on mastering VLOOKUP and XLOOKUP for data retrieval across multiple spreadsheet tabs.',
            is_free_preview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'ui-ux-graphic-design',
    title: 'UI/UX Design & Figma Fundamentals',
    category: 'Graphic Design',
    level: 'Beginner',
    duration_hours: 30,
    lessons_count: 16,
    thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    instructor: 'Ananya Verma (Lead UI Designer)',
    description: 'Design beautiful, accessible user interfaces for web and mobile apps. Learn Figma wireframing, component design systems, typography scale, and responsive mobile mockups.',
    outcomes: [
      'Master Figma tools, auto-layout, components, and design variants',
      'Conduct basic user research and create interactive wireframes',
      'Design accessible UI components conforming to WCAG contrast standards'
    ],
    prerequisites: ['Creative mindset', 'Laptop with Chrome browser'],
    tools_required: ['Figma Free Account'],
    price: 0,
    is_published: true,
    created_at: '2026-02-01T10:00:00.000Z',
    modules: []
  },
  {
    id: 'course-5',
    slug: 'ai-productivity-tools',
    title: 'AI Productivity & Prompt Engineering Masterclass',
    category: 'Artificial Intelligence',
    level: 'Beginner',
    duration_hours: 20,
    lessons_count: 12,
    thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    instructor: 'Kiran Rao (AI Specialist)',
    description: 'Leverage generative AI to multiply your workplace productivity. Learn professional prompt writing for ChatGPT, Claude, Microsoft Copilot, automated email drafting, and data synthesis.',
    outcomes: [
      'Write structured prompts using the Context-Role-Task-Format framework',
      'Automate administrative, writing, and research tasks ethically',
      'Understand AI hallucination risks and data privacy safety'
    ],
    prerequisites: ['None - complete beginner friendly'],
    tools_required: ['ChatGPT Free / Claude / Copilot'],
    price: 0,
    is_published: true,
    created_at: '2026-02-10T10:00:00.000Z',
    modules: []
  },
  {
    id: 'course-6',
    slug: 'virtual-assistant-freelancing',
    title: 'Virtual Assistance & Remote Freelancing Guide',
    category: 'Freelancing',
    level: 'Beginner',
    duration_hours: 25,
    lessons_count: 14,
    thumbnail_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    instructor: 'Pooja Nair (Freelance Consultant)',
    description: 'Start earning remotely as a Virtual Assistant or freelance digital specialist. Learn email management, scheduling, client onboarding, Upwork/Fiverr profile optimization, and invoicing.',
    outcomes: [
      'Set up compelling freelance profiles on global and Indian gig platforms',
      'Write winning proposal pitches to secure initial freelance clients',
      'Manage client deliverables, contracts, and cross-border payments'
    ],
    prerequisites: ['Good English communication', 'Computer or Smartphone'],
    tools_required: ['Google Workspace', 'Upwork / Fiverr Account'],
    price: 0,
    is_published: true,
    created_at: '2026-02-15T10:00:00.000Z',
    modules: []
  }
];

export const INITIAL_LEARNING_PATHS = [
  {
    id: 'path-1',
    slug: 'frontend-web-developer',
    title: 'Frontend Web Developer Path',
    category: 'Web Development',
    estimated_duration: '3 Months (8 hrs/week)',
    target_roles: ['Junior Web Developer', 'Frontend Trainee', 'UI Developer'],
    description: 'Comprehensive pathway to take you from computer basics to building live React applications and landing entry-level web engineering roles.',
    course_ids: ['course-1', 'course-4'],
    skills_gained: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Git/GitHub', 'Responsive Design', 'ATS Resume']
  },
  {
    id: 'path-2',
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing & Social Media Executive',
    category: 'Digital Marketing',
    estimated_duration: '2 Months (6 hrs/week)',
    target_roles: ['Social Media Executive', 'Digital Marketing Intern', 'SEO Specialist'],
    description: 'Learn content strategy, social media visuals with Canva, Google search ranking, and ad campaign execution for businesses.',
    course_ids: ['course-2', 'course-5', 'course-6'],
    skills_gained: ['Social Media Marketing', 'Canva Design', 'SEO Fundamentals', 'Meta Ads', 'Copywriting']
  },
  {
    id: 'path-3',
    slug: 'junior-data-analyst',
    title: 'Junior Data Analyst Path',
    category: 'Data Analytics',
    estimated_duration: '2.5 Months (8 hrs/week)',
    target_roles: ['Data Analyst Intern', 'MIS Executive', 'Business Reporting Analyst'],
    description: 'Master spreadsheets, data cleaning, SQL query writing, and business intelligence dashboards for data-driven decision making.',
    course_ids: ['course-3', 'course-5'],
    skills_gained: ['Excel Advanced', 'Pivot Tables', 'SQL Queries', 'Data Cleaning', 'Dashboarding']
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Junior React Frontend Developer',
    company_name: 'TechCorp Solutions India',
    location: 'Bengaluru, Karnataka (Remote Available)',
    work_type: 'Remote',
    employment_type: 'Full-Time',
    salary_range: '₹4.20 - ₹5.80 LPA',
    experience_level: 'Entry Level (0-1 yrs)',
    skills_required: ['React', 'JavaScript', 'HTML5/CSS3', 'Git'],
    description: 'We are seeking an enthusiastic Junior Frontend Developer to join our core product team. You will write clean HTML/CSS/React components, fix bug tickets, and collaborate with UI designers.',
    deadline: '2026-11-30',
    is_verified: true,
    status: 'active',
    posted_at: '2026-10-01T09:00:00.000Z'
  },
  {
    id: 'job-2',
    title: 'Social Media Marketing Trainee',
    company_name: 'GrowthMedia Digital',
    location: 'Mumbai, Maharashtra (Hybrid)',
    work_type: 'Hybrid',
    employment_type: 'Internship',
    salary_range: '₹15,000 - ₹20,000 / month Stipend',
    experience_level: 'Fresher',
    skills_required: ['Canva', 'Instagram Reels', 'Content Copywriting', 'SEO'],
    description: 'Help manage client social media handles! Design weekly posts on Canva, write engaging captions, monitor analytics, and assist with Meta ad setup.',
    deadline: '2026-11-15',
    is_verified: true,
    status: 'active',
    posted_at: '2026-10-03T11:30:00.000Z'
  },
  {
    id: 'job-3',
    title: 'Data Analyst & Spreadsheet Specialist',
    company_name: 'Insight Analytics Lab',
    location: 'Hyderabad, Telangana (Remote)',
    work_type: 'Remote',
    employment_type: 'Full-Time',
    salary_range: '₹3.80 - ₹4.80 LPA',
    experience_level: 'Entry Level (0-2 yrs)',
    skills_required: ['Microsoft Excel', 'SQL', 'Pivot Tables', 'Data Cleaning'],
    description: 'Analyze daily client operations data, clean incoming CSV files, create automated weekly summary reports in Excel, and execute basic SQL SELECT queries.',
    deadline: '2026-12-05',
    is_verified: true,
    status: 'active',
    posted_at: '2026-10-05T14:15:00.000Z'
  },
  {
    id: 'job-4',
    title: 'Junior UI/UX Designer',
    company_name: 'CreativePixel Studio',
    location: 'Delhi NCR (Onsite)',
    work_type: 'Onsite',
    employment_type: 'Full-Time',
    salary_range: '₹3.50 - ₹4.50 LPA',
    experience_level: 'Fresher / Trainee',
    skills_required: ['Figma', 'Wireframing', 'UI Components', 'User Research'],
    description: 'Join our design squad to design mobile app screens, web landing pages, and interactive prototypes in Figma for fast-growing startups.',
    deadline: '2026-11-20',
    is_verified: false,
    status: 'active',
    posted_at: '2026-10-07T16:00:00.000Z'
  }
];

export const INITIAL_MENTORS = [
  {
    id: 'mentor-1',
    name: 'Rajesh Kumar',
    title: 'Senior Full-Stack Engineer',
    company: 'Infosys Tech Alumni',
    expertise: ['Web Development', 'React & JavaScript', 'Technical Interviews'],
    bio: '10+ years building web applications. Passionate about mentoring fresh engineering graduates and self-taught coders from Tier-2 and Tier-3 cities in India.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    available_slots: ['Saturday 10:00 AM IST', 'Sunday 4:00 PM IST']
  },
  {
    id: 'mentor-2',
    name: 'Sneha Kulkarni',
    title: 'Digital Marketing Strategist',
    company: 'Zomato Growth Lead',
    expertise: ['Social Media', 'Meta Ads', 'Career Transition'],
    bio: 'Helped 50+ young professionals launch remote marketing careers. Expert in portfolio creation and client pitching.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    available_slots: ['Friday 6:00 PM IST', 'Saturday 2:00 PM IST']
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    category: 'Interview Preparation',
    title: '10 Essential Soft Skills & HR Interview Questions in India',
    read_time: '6 min read',
    summary: 'Master the STAR method (Situation, Task, Action, Result) to answer questions like "Tell me about yourself" and "What is your biggest weakness?" with confidence.',
    content: `
### The STAR Method for Interview Success
When an interviewer asks you to describe a past project or challenge:
1. **S - Situation**: Set the context briefly (e.g., "During my Web Development Capstone...").
2. **T - Task**: Describe the goal or problem you had to solve.
3. **A - Action**: Detail the specific steps *you* took using your digital skills.
4. **R - Result**: Share the outcome or result (e.g., "The project achieved a 98% Lighthouse accessibility score").
    `
  },
  {
    id: 'res-2',
    category: 'Freelancing & Remote Work',
    title: 'Step-by-Step Guide to Getting Your First Freelance Gig on Upwork',
    read_time: '8 min read',
    summary: 'Learn how to construct an engaging bio title, price your beginner hourly rates, craft customized proposals, and maintain a 100% Job Success Score.',
    content: `
### Crafting a Winning Proposal
- **Greeting**: Use the client's name or reference their specific project title.
- **First Sentence**: State how you will solve their immediate problem within the first 2 lines.
- **Showcase Proof**: Attach a direct link to your live portfolio item from this Bootcamp.
    `
  },
  {
    id: 'res-3',
    category: 'Online Safety',
    title: 'How to Identify & Avoid Work-From-Home Job Scams',
    read_time: '5 min read',
    summary: 'Protect yourself! Authentic employers will NEVER ask you to pay money for registration, security deposits, or laptop kits.',
    content: `
### Golden Rules of Online Safety:
1. **Never pay money to get a job**: Legitimate companies pay *you*, not the other way around.
2. **Beware of Telegram/WhatsApp-only recruiters**: Verify company domain emails.
3. **Check GST & Registration**: Search the company on official portals.
    `
  }
];

export const INITIAL_FAQS = [
  {
    q: 'Who can join the Digital Skill Bootcamp?',
    a: 'Any unemployed young person, recent graduate, student, or career seeker in India looking to gain job-ready digital skills. All beginner courses require zero prior coding or technical background.'
  },
  {
    q: 'Are the courses and career services really 100% free?',
    a: 'Yes! All core learning paths, lessons, practice quizzes, ATS resume builder, portfolio creator, and job portal access are completely free for learners.'
  },
  {
    q: 'Can I learn using a mobile phone?',
    a: 'Yes! The platform is engineered mobile-first. You can view video lessons, read course materials, attempt quizzes, and apply for jobs directly on your smartphone.'
  },
  {
    q: 'Will the platform guarantee me a job?',
    a: 'We do not promise guaranteed jobs or artificial placement claims. We provide practical skills, portfolio tools, ATS resume creation, and direct connections to verified job listings so you become genuinely employable.'
  },
  {
    q: 'How do I receive a Verifiable Certificate of Completion?',
    a: 'Once you complete all lessons in a course, submit required assignments, and pass the final quiz with a score of 70% or higher, your official Verifiable Certificate with a unique verification code will automatically be generated in your dashboard.'
  }
];
