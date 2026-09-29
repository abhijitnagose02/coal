import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, CheckSquare, Bell, User } from 'lucide-react';
import { useManager } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

const ManagerBottomNav = () => {
  const managerContext = useManager();
  const { t } = useLanguage();
  const pendingActions = managerContext?.attentionItems?.length || 0;
  const overdueTasks = managerContext?.correctiveActions?.filter(a => a.status === 'Overdue').length || 0;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-white/95 backdrop-blur border-t border-slate-200/80 px-4 py-2">
      <div className="flex items-center justify-around">
        <NavLink 
          to="/manager"
          end
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t('navigation.dashboard') || 'Home'}</span>
        </NavLink>
        
        <NavLink 
          to="/manager/inspections"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('inspections') || 'Inspections'}</span>
        </NavLink>
        
        <NavLink 
          to="/manager/actions"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative ${isActive ? 'text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('navigation.myTasks') || 'Tasks'}</span>
          {overdueTasks > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {overdueTasks}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/manager/alerts"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative ${isActive ? 'text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <Bell className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('alertsEscalations') || 'Alerts'}</span>
          {pendingActions > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
              {pendingActions}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/manager/profile"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('navigation.profile') || 'Profile'}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default ManagerBottomNav;
