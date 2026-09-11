import React from 'react';
import { Bell, Menu, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

const ManagerTopBar = () => {
  const { currentUser } = useAuth();
  const managerContext = useManager();
  const { language, setLanguage, languages } = useLanguage();
  
  const unreadAlerts = managerContext?.attentionItems?.length || 0;

  return (
    <header className="sticky top-0 z-40 bg-[#003366] px-5 py-3.5 flex items-center justify-between shadow-md">
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

        <button className="relative p-2 rounded-full text-white/80 hover:bg-white/10 transition">
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#003366]">
              {unreadAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default ManagerTopBar;
