import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerTopBar from '../layout/ManagerTopBar';
import ManagerBottomNav from '../layout/ManagerBottomNav';

const ManagerLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-200 font-sans text-slate-900 antialiased justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-xl flex flex-col min-h-screen bg-slate-50 relative shadow-2xl border-x border-slate-300">
        <ManagerTopBar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20">
          <Outlet />
        </main>
        
        <ManagerBottomNav />
      </div>
    </div>
  );
};

export default ManagerLayout;
