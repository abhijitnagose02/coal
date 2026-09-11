import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSafety } from '../../context/SafetyContext';
import { useLanguage } from '../../context/LanguageContext';

const SafetyTopBar = () => {
  const { currentUser } = useAuth();
  const { profile, incidents } = useSafety();
  const { t } = useLanguage();
  
  const unreadAlerts = incidents?.filter(i => i.status === 'Open').length || 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 px-5 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden shadow-sm shrink-0">
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"} 
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
        <button className="relative p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition">
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {unreadAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default SafetyTopBar;
