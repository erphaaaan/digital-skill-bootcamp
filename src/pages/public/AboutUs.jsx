import React from 'react';
import { Target, Heart, Eye, ShieldCheck, Smartphone, Users, Globe, Award } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          About The Initiative
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          Empowering Unemployed Youth Through Practical Digital Education
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          We exist to transform potential into employability. By offering free, accessible, and structured digital skill bootcamps, we help young people across India gain job-ready competencies and career opportunities.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            To provide accessible digital learning, portfolio building, ATS resume tools, and employment preparation for unemployed youth, enabling them to secure meaningful employment, freelancing contracts, or entrepreneurial opportunities.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            An inclusive digital economy where every young person in India—regardless of financial background, gender, or geographic location—has the skills and tools required to participate in modern digital careers.
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl">The Problem We Are Solving</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">1. Skill Mismatch</h3>
            <p>Traditional academic education often leaves recent graduates without practical, hands-on software, data, or marketing skills demanded by modern employers.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">2. High Cost Barrier</h3>
            <p>Expensive private EdTech bootcamps exclude youth from low-income or rural backgrounds who cannot afford tens of thousands of rupees upfront.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">3. Lack of Work Proof</h3>
            <p>Job applicants struggle without a portfolio of real projects or an ATS-optimized resume tailored to entry-level job roles.</p>
          </div>
        </div>
      </div>

      {/* Target Beneficiaries & Values */}
      <div className="space-y-8">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-center text-slate-900 dark:text-white">
          Who We Serve & Our Core Commitments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Unemployed Youth</h3>
            <p className="text-xs text-slate-500">Graduates and school leavers seeking entry-level digital roles.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Globe className="w-6 h-6 text-teal-500 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Rural & Tier 2/3 Cities</h3>
            <p className="text-xs text-slate-500">Learners accessing education primarily via mobile smartphones.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Smartphone className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Mobile-First Learning</h3>
            <p className="text-xs text-slate-500">Optimized interface for viewing lessons on low bandwidth.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Honest & Ethical</h3>
            <p className="text-xs text-slate-500">No fake statistics, false salary guarantees, or hidden fees.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
