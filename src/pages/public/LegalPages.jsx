import React from 'react';
import { ShieldCheck, Lock, Accessibility } from 'lucide-react';

export const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 dark:text-slate-200">
    <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
      <ShieldCheck className="w-8 h-8 text-blue-600" />
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: January 2026 • Digital Skill Bootcamp India</p>
      </div>
    </div>
    
    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
      <h2 className="font-bold text-base text-slate-900 dark:text-white">1. Platform Usage & Mission</h2>
      <p>Digital Skill Bootcamp for Unemployed Youth provides free digital education, resume creation tools, portfolio showcases, and career opportunities to support job-seekers across India. Access to core learning resources is completely free.</p>
      
      <h2 className="font-bold text-base text-slate-900 dark:text-white">2. No Employment Guarantees</h2>
      <p>While the platform offers practical training, ATS resume building, and job listings, we explicitly do NOT guarantee employment outcomes, specific salary numbers, or placement guarantees. Employment depends on individual learner effort and external employer decisions.</p>

      <h2 className="font-bold text-base text-slate-900 dark:text-white">3. Code of Conduct & Integrity</h2>
      <p>Learners agree to submit original assignment work and complete practice quizzes honestly. Plagiarism or unauthorized commercial reselling of bootcamp materials is strictly prohibited.</p>
    </div>
  </div>
);

export const PrivacyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 dark:text-slate-200">
    <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
      <Lock className="w-8 h-8 text-teal-500" />
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: January 2026 • Digital Privacy Compliance</p>
      </div>
    </div>

    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
      <h2 className="font-bold text-base text-slate-900 dark:text-white">1. Information We Collect</h2>
      <p>We collect essential account profile details (Name, Email, Phone number, Career interests, Education level) to provide course progress tracking and resume creation features.</p>

      <h2 className="font-bold text-base text-slate-900 dark:text-white">2. How Data is Used</h2>
      <p>Your profile data is strictly used for course progress persistence, certificate generation, ATS resume exports, and processing your job applications when you explicitly submit them to verified job listings.</p>

      <h2 className="font-bold text-base text-slate-900 dark:text-white">3. Data Control & Security</h2>
      <p>We never sell your personal information to third-party advertisers. You may edit or request account deletion at any time via Profile Settings.</p>
    </div>
  </div>
);

export const AccessibilityPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 dark:text-slate-200">
    <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
      <Accessibility className="w-8 h-8 text-purple-600" />
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Accessibility Statement</h1>
        <p className="text-xs text-slate-500">WCAG 2.2 AA Conformance • Inclusive Design</p>
      </div>
    </div>

    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
      <h2 className="font-bold text-base text-slate-900 dark:text-white">Our Commitment to Accessibility</h2>
      <p>Digital Skill Bootcamp is committed to ensuring digital accessibility for individuals with disabilities, including learners using screen readers, keyboard navigation, or mobile assistive devices.</p>

      <h2 className="font-bold text-base text-slate-900 dark:text-white">Accessibility Features Implemented:</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Semantic HTML5 structural elements (header, main, nav, article, footer)</li>
        <li>Sufficient WCAG AA color contrast ratio across background and typography tokens</li>
        <li>Visible keyboard focus rings for interactive form controls and buttons</li>
        <li>Accessible mobile layout without horizontal overflow down to 320px screen width</li>
      </ul>
    </div>
  </div>
);
