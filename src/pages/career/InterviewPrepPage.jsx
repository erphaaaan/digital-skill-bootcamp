import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Award, Zap } from 'lucide-react';

export const InterviewPrepPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const questions = [
    {
      category: 'HR & Behavior',
      q: 'Tell me about yourself and why you chose a digital career.',
      a: 'Structure using the STAR framework: Mention your academic background, your training in this Digital Skill Bootcamp, the practical capstone projects you built (e.g., Responsive Web Apps or Data Dashboards), and how your skills align with entry-level growth.'
    },
    {
      category: 'Technical (Frontend / Web)',
      q: 'What is the difference between inline, inline-block, and block elements in CSS?',
      a: 'Block elements take up the full available width and start on a new line (e.g., <div>, <h1>). Inline elements only take up as much width as necessary and do not start on a new line (e.g., <span>, <a>). Inline-block behaves like an inline element but respects width and height properties.'
    },
    {
      category: 'Technical (Data Analytics)',
      q: 'How does VLOOKUP work in Excel and what is its main limitation?',
      a: 'VLOOKUP searches for a value in the first column of a table array and returns a value in the same row from a specified column. Its limitation is that it can only look to the right of the key column (solved by XLOOKUP or INDEX-MATCH).'
    },
    {
      category: 'Soft Skills & Communication',
      q: 'How do you handle feedback on your code or design work when client requests changes?',
      a: 'Explain that you view feedback as an opportunity for product improvement. You listen actively, clarify requirements, discuss trade-offs professionally, and implement revised solutions efficiently.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Interview Preparation Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Master common HR, technical, and behavioral interview questions for entry-level digital roles.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{item.category}</span>
                  <span>{item.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Recommended Expert Answer Guide:</p>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
