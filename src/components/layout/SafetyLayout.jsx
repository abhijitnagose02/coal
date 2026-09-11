import React from 'react';
import { Outlet } from 'react-router-dom';
import SafetyTopBar from './SafetyTopBar';
import SafetyBottomNav from './SafetyBottomNav';

const SafetyLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-200 font-sans text-slate-900 antialiased justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-xl flex flex-col min-h-screen bg-slate-50 relative shadow-2xl border-x border-slate-300">
        <SafetyTopBar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20">
          <Outlet />
        </main>
        
        <SafetyBottomNav />
      </div>
    </div>
  );
};

export default SafetyLayout;
