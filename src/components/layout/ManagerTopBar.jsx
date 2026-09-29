import React, { useState, useEffect } from 'react';
import { Bell, Globe, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

const ManagerTopBar = () => {
  const { currentUser } = useAuth();
  const managerContext = useManager();
  const { language, setLanguage, languages } = useLanguage();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = () => {
      const stored = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
      setLocalNotifications(stored);
    };
    
    loadNotifications();
    window.addEventListener('storage', loadNotifications);
    const interval = setInterval(loadNotifications, 2000);
    
    return () => {
      window.removeEventListener('storage', loadNotifications);
      clearInterval(interval);
    };
  }, []);

  const clearLocalNotifications = () => {
    localStorage.removeItem('managerNotifications');
    setLocalNotifications([]);
    setShowNotifications(false);
  };

  const systemAlerts = managerContext?.attentionItems?.length || 0;
  const totalUnread = systemAlerts + localNotifications.length;

  return (
    <header className="sticky top-0 z-50 bg-[#003366] px-5 py-3.5 flex items-center justify-between shadow-md relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden shadow-sm shrink-0">
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"} 
            alt={currentUser?.name} 
            className="w-full h-full object-cover bg-white" 
          />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight">{currentUser?.name || 'Amit Sharma'}</h1>
          <p className="text-[11px] font-medium text-blue-200">
            {managerContext?.mineDetails?.manager?.designation || 'Mine Manager'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        
        {/* Language Switcher */}
        <div className="relative flex items-center">
          <Globe className="w-4 h-4 text-blue-200 absolute left-2 pointer-events-none" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-md py-1.5 pl-8 pr-6 hover:bg-white/20 transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-white/50"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code} className="text-slate-800 bg-white">
                {l.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full text-white/80 hover:bg-white/10 transition"
        >
          <Bell className="w-5 h-5" />
          {totalUnread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#003366]">
              {totalUnread}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-black text-slate-800">Notifications</h3>
            {localNotifications.length > 0 && (
              <button onClick={clearLocalNotifications} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                Clear Field Evidence
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {localNotifications.length === 0 && systemAlerts === 0 ? (
              <div className="p-6 text-center text-slate-500 font-medium text-sm">
                No new notifications
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {/* Field Evidence Notifications (from local storage) */}
                {localNotifications.map(n => (
                  <div key={n.id} className="p-4 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Field Evidence</span>
                      <span className="text-[10px] font-bold text-slate-400">Just now</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{n.title}</h4>
                    <p className="text-xs font-medium text-slate-600 mb-3">{n.message}</p>
                    {n.evidence && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-black">
                        {n.evidence.type === 'photo' ? (
                          <img src={n.evidence.url} alt="Evidence" className="w-full h-32 object-contain" />
                        ) : (
                          <video src={n.evidence.url} controls className="w-full h-32 object-contain" />
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* System Alerts */}
                {managerContext?.attentionItems?.map(item => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${item.severity === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>
                        {item.type}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-xs font-medium text-slate-500 line-clamp-2">{item.description}</p>
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

export default ManagerTopBar;
