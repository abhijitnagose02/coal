import React, { useState, useEffect } from 'react';
import { Bell, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSafety } from '../../context/SafetyContext';
import { useLanguage } from '../../context/LanguageContext';

import { useNavigate } from 'react-router-dom';

const SafetyTopBar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { profile, incidents } = useSafety();
  const { t } = useLanguage();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState([]);

  useEffect(() => {
    const loadAlerts = () => {
      const stored = JSON.parse(localStorage.getItem('safetyNotifications') || '[]');
      setSafetyAlerts(stored);
    };
    loadAlerts();
    window.addEventListener('storage', loadAlerts);
    const interval = setInterval(loadAlerts, 2000);
    return () => {
      window.removeEventListener('storage', loadAlerts);
      clearInterval(interval);
    };
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem('safetyNotifications');
    setSafetyAlerts([]);
    setShowNotifications(false);
  };
  
  const unreadAlerts = incidents?.filter(i => i.status === 'Open').length || 0;
  const totalUnread = unreadAlerts + safetyAlerts.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 px-5 py-3.5 flex items-center justify-between shadow-sm relative">
      <div 
        className="flex items-center gap-3 cursor-pointer active:opacity-70 transition-opacity"
        onClick={() => navigate('/profile')}
      >
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden shadow-sm shrink-0 bg-white">
          <img 
            src={currentUser?.avatar || "/dhairya_deulkar.jpg"} 
            alt={profile?.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">{profile?.name || 'Safety Officer'}</h1>
          <p className="text-[11px] font-medium text-slate-500">
            {profile?.designation || t('safetyOfficer') || 'Chief Safety Officer'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
        >
          <Bell className="w-5 h-5" />
          {totalUnread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {totalUnread}
            </span>
          )}
        </button>
        <button onClick={logout} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition" title="Log out">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-black text-slate-800">Messages & Alerts</h3>
            {safetyAlerts.length > 0 && (
              <button onClick={clearNotifications} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                Clear Manager Replies
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {safetyAlerts.length === 0 && unreadAlerts === 0 ? (
              <div className="p-6 text-center text-slate-500 font-medium text-sm">
                No new messages
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {/* Notifications */}
                {safetyAlerts.map(n => (
                  <div key={n.id} className={`p-4 hover:bg-slate-50 transition-colors border-l-4 ${n.isWorkerReport ? 'bg-blue-50/50 border-blue-500' : 'bg-emerald-50/50 border-emerald-500'}`}>
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${n.isWorkerReport ? 'text-blue-700' : 'text-emerald-700'}`}>
                        {n.isWorkerReport ? 'Worker Report' : 'Manager Reply'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Just now</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{n.title}</h4>
                    <p className="text-xs font-medium text-slate-700">{n.message}</p>
                    <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${n.isWorkerReport ? 'text-blue-600' : 'text-emerald-600'}`}>
                      <CheckCircle2 className="w-3 h-3" /> {n.isWorkerReport ? 'Received via Worker Portal' : 'Instruction Received'}
                    </div>
                  </div>
                ))}

                {/* Local Incident System Alerts */}
                {incidents?.filter(i => i.status === 'Open').map(item => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                        Open Incident
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{item.type}</h4>
                    <p className="text-xs font-medium text-slate-500">Location: {item.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default SafetyTopBar;
