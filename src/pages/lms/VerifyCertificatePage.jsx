import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { ShieldCheck, Search, Award, CheckCircle2, XCircle } from 'lucide-react';

export const VerifyCertificatePage = ({ initialCode }) => {
  const { certificates } = useCourses();
  const [code, setCode] = useState(initialCode || '');
  const [searched, setSearched] = useState(!!initialCode);

  const matchedCert = certificates.find(
    c => c.verification_code?.toUpperCase() === code.trim().toUpperCase() || c.id?.toUpperCase() === code.trim().toUpperCase()
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
          Certificate Verification Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Verify the authenticity of completion credentials issued by Digital Skill Bootcamp for Unemployed Youth.
        </p>
      </div>

      <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            required
            placeholder="Enter Verification Code (e.g. DSB-9812-2026)"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setSearched(false);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs"
        >
          Verify Code
        </button>
      </form>

      {searched && (
        <div className="animate-fade-in">
          {matchedCert ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-8 border border-emerald-300 dark:border-emerald-800 space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-full">
                AUTHENTIC CREDENTIAL VERIFIED
              </span>
              
              <div className="space-y-1 pt-2">
                <p className="text-xs text-slate-500">Learner Name:</p>
                <p className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">{matchedCert.learner_name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500">Course Completed:</p>
                <p className="font-heading font-bold text-lg text-blue-900 dark:text-blue-300">{matchedCert.course_title}</p>
              </div>

              <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800 grid grid-cols-2 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <span className="font-bold block">Issue Date:</span>
                  <span>{matchedCert.issue_date}</span>
                </div>
                <div>
                  <span className="font-bold block">Code:</span>
                  <span className="font-mono font-bold">{matchedCert.verification_code}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 dark:bg-red-950/40 rounded-3xl p-8 border border-red-300 dark:border-red-800 space-y-3 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Certificate Not Found</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                No active certificate record matches code "{code}". Please check for typos.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
