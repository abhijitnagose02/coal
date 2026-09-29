import React from 'react';
import { Bell, AlertOctagon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorker } from '../../context/WorkerContext';
import { useLanguage } from '../../context/LanguageContext';

const WorkerTopBar = () => {
  const { currentUser, logout } = useAuth();
  const workerContext = useWorker();
  const { t } = useLanguage();
  
  const unreadNotifications = workerContext?.notifications?.filter(n => !n.read).length || 0;

  const handleSOS = () => {
    // In a real app, this would trigger an immediate emergency workflow
    alert('SOS Emergency Alert Sent to Safety Officer and Mine Manager!');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 px-5 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden shadow-sm shrink-0">
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=150&auto=format&fit=crop&q=80"} 
            alt={currentUser?.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">{currentUser?.name || 'Rahul Kumar'}</h1>
          <p className="text-[11px] font-medium text-slate-500">
            {workerContext?.profile?.designation || 'Heavy Machinery Operator'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleSOS}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all animate-pulse hover:animate-none font-bold text-xs"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>SOS</span>
        </button>
        <button className="relative p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition">
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {unreadNotifications}
            </span>
          )}
        </button>
        <button 
          onClick={logout}
          className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 border border-slate-200 transition"
          title="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default WorkerTopBar;
