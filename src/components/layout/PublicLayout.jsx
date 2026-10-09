import React from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const PublicLayout = ({ children, currentRoute, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar currentRoute={currentRoute} onNavigate={onNavigate} />
      <main className="flex-1">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
