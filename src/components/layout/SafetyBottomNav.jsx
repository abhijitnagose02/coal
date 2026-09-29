import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, AlertTriangle, ShieldCheck, User } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useLanguage } from '../../context/LanguageContext';

const SafetyBottomNav = () => {
  const { incidents } = useSafety();
  const { t } = useLanguage();
  
  const openIncidents = incidents?.filter(i => i.status === 'Open').length || 0;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-white/95 backdrop-blur border-t border-slate-200/80 px-4 py-2">
      <div className="flex items-center justify-around">
        <NavLink 
          to="/"
          end
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t('navigation.dashboard') || 'Home'}</span>
        </NavLink>
        
        <NavLink 
          to="/inspections"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('inspections') || 'Inspections'}</span>
        </NavLink>
        
        <NavLink 
          to="/incidents"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('incidents') || 'Incidents'}</span>
          {openIncidents > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
              {openIncidents}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/contractors"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('contractors') || 'Contractors'}</span>
        </NavLink>
        
        <NavLink 
          to="/profile"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('navigation.profile') || 'Profile'}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default SafetyBottomNav;
