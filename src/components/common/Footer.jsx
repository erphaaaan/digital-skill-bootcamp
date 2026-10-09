import React from 'react';
import { BookOpen, Heart, Shield, Globe, Award, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #14213D 0%, #2563EB 50%, #14B8A6 100%)' }}>
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Digital Skill Bootcamp
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Learn Digital Skills. Build Your Future. Get Career Ready. An accessible learning & employment preparation platform empowering unemployed youth, recent graduates, and beginners across India.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-2">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-teal-400" /> Market: India (₹ INR)
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-400" /> WCAG 2.2 AA Accessible
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Explore Learning
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-blue-400 transition-colors">
                  All Courses Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learning-paths')} className="hover:text-blue-400 transition-colors">
                  Structured Learning Paths
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-blue-400 transition-colors">
                  Career Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interview-prep')} className="hover:text-blue-400 transition-colors">
                  Interview Preparation
                </button>
              </li>
            </ul>
          </div>

          {/* Career Services */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Career Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('resume-builder')} className="hover:text-blue-400 transition-colors">
                  ATS Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio-builder')} className="hover:text-blue-400 transition-colors">
                  Portfolio Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentorship')} className="hover:text-blue-400 transition-colors">
                  Mentorship Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-resources')} className="hover:text-blue-400 transition-colors">
                  Career Guides & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Platform & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('accessibility')} className="hover:text-blue-400 transition-colors">
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Digital Skill Bootcamp for Unemployed Youth. All rights reserved.</p>
          <p className="text-center md:text-right">
            Designed for impact across rural & urban communities in India. Asia/Kolkata Timezone.
          </p>
        </div>

      </div>
    </footer>
  );
};
