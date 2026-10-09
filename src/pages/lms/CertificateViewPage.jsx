import React from 'react';
import { useCourses } from '../../context/CourseContext';
import { Award, ShieldCheck, Printer, ArrowLeft, ExternalLink } from 'lucide-react';

export const CertificateViewPage = ({ certId, onNavigate }) => {
  const { certificates } = useCourses();

  const cert = certificates.find(c => c.id === certId || c.verification_code === certId) || certificates[0] || {
    id: 'DSB-DEMO-9912',
    learner_name: 'Rahul Sharma',
    course_title: 'Full-Stack Web Development Foundation',
    issue_date: 'February 20, 2026',
    verification_code: 'DSB-DEMO-9912'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('verify-certificate', { certCode: cert.verification_code })}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Public Verification Link
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-14 border-8 border-slate-900 shadow-2xl relative space-y-8 text-center print-certificate">
        
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-teal-400" />
            </div>
            <div className="text-left">
              <span className="font-heading font-extrabold text-lg text-slate-900 block leading-tight">
                Digital Skill Bootcamp
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Youth Employability Initiative • India
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 block">VERIFICATION CODE</span>
            <span className="text-xs font-mono font-extrabold text-blue-600 block">{cert.verification_code}</span>
          </div>
        </div>

        <div className="space-y-4 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Official Verifiable Certificate of Completion</p>

          <p className="text-sm italic text-slate-600">This is to certify that</p>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 border-b-2 border-slate-300 pb-2 max-w-md mx-auto">
            {cert.learner_name}
          </h2>

          <p className="text-sm italic text-slate-600">has successfully completed all required modules, capstone projects, and assessments for</p>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-blue-900 max-w-xl mx-auto">
            {cert.course_title}
          </h3>
        </div>

        <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 items-center text-xs">
          <div className="text-left space-y-1">
            <p className="font-bold text-slate-900">Issue Date:</p>
            <p className="text-slate-600 font-medium">{cert.issue_date}</p>
          </div>

          <div className="text-right space-y-1">
            <div className="inline-flex items-center gap-1 text-teal-600 font-extrabold">
              <ShieldCheck className="w-4 h-4" /> Authenticity Verified
            </div>
            <p className="text-[10px] text-slate-400">National Skill Framework Compliant</p>
          </div>
        </div>

      </div>

    </div>
  );
};
