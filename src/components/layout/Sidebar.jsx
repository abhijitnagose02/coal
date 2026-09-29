import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, ShieldCheck, ClipboardList, AlertTriangle, Map, 
  Settings, HardHat, FileText, Bell, MessageSquare, BrainCircuit,
  CheckSquare, PlusCircle, Activity, Wifi, Users, BarChart3, TrendingUp,
  Globe, Search, FileBadge, FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const getNavItems = (role) => {
    switch (role) {
      case 'manager':
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Home', path: '/', icon: LayoutDashboard },
          { name: t('compliance'), path: '/compliance', icon: ShieldCheck },
          { name: t('inspections'), path: '/inspections', icon: ClipboardList },
          { name: t('violations') || 'Violations', path: '/violations', icon: AlertTriangle },
          { name: t('correctiveActions'), path: '/actions', icon: CheckSquare },
          { name: t('contractors'), path: '/contractors', icon: HardHat },
          { name: t('alerts') || 'Alerts', path: '/alerts', icon: Bell },
          { name: t('grievances') || 'Grievances', path: '/grievances', icon: MessageSquare },
          { name: t('reports') || 'Reports', path: '/reports', icon: FileText },
          { name: t('aiInsights'), path: '/ai-insights', icon: BrainCircuit },
        ];
      case 'safety_officer':
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('dashboard') || 'Today\'s Tasks', path: '/', icon: CheckSquare },
          { name: t('inspections'), path: '/inspections', icon: ClipboardList },
          { name: t('observations') || 'Safety Observations', path: '/observations', icon: Search },
          { name: t('incidents'), path: '/incidents', icon: AlertTriangle },
          { name: t('violations') || 'Violations', path: '/violations', icon: AlertTriangle },
          { name: t('correctiveActions'), path: '/actions', icon: CheckSquare },
          { name: t('alertsEscalations') || 'Alerts', path: '/alerts', icon: Bell },
          { name: t('grievances') || 'Grievances', path: '/grievances', icon: MessageSquare },
        ];
      case 'employee': // Field Inspector
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('dashboard') || 'Today\'s Tasks', path: '/', icon: CheckSquare },
          { name: t('newInspection') || 'New Inspection', path: '/inspections/new', icon: PlusCircle },
          { name: t('quickReport') || 'Quick Report', path: '/quick-report', icon: AlertTriangle },
          { name: t('myStatus') || 'My Status', path: '/my-status', icon: Activity },
          { name: t('grievances') || 'Grievances', path: '/grievances', icon: MessageSquare },
          { name: t('syncStatus') || 'Sync Status', path: '/sync-status', icon: Wifi },
        ];
      case 'subsidiary_gm':
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Home', path: '/', icon: LayoutDashboard },
          { name: t('mineComparison') || 'Mine Comparison', path: '/comparison', icon: BarChart3 },
          { name: t('riskHeatmap') || 'Risk Heatmap', path: '/heatmap', icon: Map },
          { name: t('violations') || 'Violations', path: '/violations', icon: AlertTriangle },
          { name: t('escalations') || 'Escalations', path: '/escalations', icon: Bell },
          { name: t('aiInsights'), path: '/ai-insights', icon: BrainCircuit },
          { name: t('analytics') || 'Cross-Mine Analytics', path: '/analytics', icon: TrendingUp },
          { name: t('reports') || 'Reports', path: '/reports', icon: FileText },
        ];
      case 'cil_hq_director':
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Enterprise Home', path: '/', icon: Globe },
          { name: t('subsidiaries') || 'Subsidiaries', path: '/subsidiaries', icon: Users },
          { name: t('analytics') || 'Cross-Mine Analytics', path: '/analytics', icon: TrendingUp },
          { name: t('systemicRisks') || 'Systemic Risks', path: '/systemic-risks', icon: AlertTriangle },
          { name: t('aiInsights'), path: '/ai-insights', icon: BrainCircuit },
          { name: t('trends') || 'Trends', path: '/trends', icon: BarChart3 },
          { name: t('reports') || 'Reports', path: '/reports', icon: FileText },
        ];
      case 'ministry': // DGMS Regulator
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Regulator Home', path: '/', icon: LayoutDashboard },
          { name: t('mines') || 'Mines', path: '/mines', icon: Map },
          { name: t('compliance'), path: '/compliance', icon: ShieldCheck },
          { name: t('violations') || 'Violations', path: '/violations', icon: AlertTriangle },
          { name: t('inspections'), path: '/inspections', icon: ClipboardList },
          { name: t('evidence') || 'Evidence', path: '/evidence', icon: FolderOpen },
          { name: t('auditTrail') || 'Audit Trail', path: '/audit-trail', icon: Search },
          { name: t('reports') || 'Reports', path: '/reports', icon: FileText },
        ];
      case 'contractor':
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Home', path: '/', icon: LayoutDashboard },
          { name: t('compliance'), path: '/compliance', icon: ShieldCheck },
          { name: t('licences') || 'Licences', path: '/licences', icon: FileBadge },
          { name: t('navigation.training'), path: '/training', icon: Users },
          { name: t('navigation.myTasks') || 'Tasks', path: '/tasks', icon: CheckSquare },
          { name: t('correctiveActions'), path: '/actions', icon: AlertTriangle },
          { name: t('navigation.documents'), path: '/documents', icon: FolderOpen },
        ];
      case 'worker':
        return [
          { heading: t('overview') || 'OVERVIEW' },
          { name: t('navigation.dashboard'), path: '/', icon: LayoutDashboard },
          { heading: t('navigation.myWork') || 'MY WORK' },
          { name: t('navigation.myTasks'), path: '/worker/tasks', icon: CheckSquare },
          { name: t('navigation.myReports'), path: '/worker/reports', icon: FileText },
          { name: t('navigation.myCorrectiveActions'), path: '/worker/actions', icon: AlertTriangle },
          { heading: t('navigation.attendance') || 'ATTENDANCE' },
          { name: t('navigation.attendance'), path: '/worker/attendance', icon: ClipboardList },
          { name: t('navigation.myShifts'), path: '/worker/shifts', icon: HardHat },
          { heading: t('navigation.myCompliance') || 'COMPLIANCE & DEVELOPMENT' },
          { name: t('navigation.myCompliance'), path: '/worker/compliance', icon: ShieldCheck },
          { name: t('navigation.training'), path: '/worker/training', icon: FileBadge },
          { name: t('navigation.documents'), path: '/worker/documents', icon: FolderOpen },
          { heading: t('navigation.requests') || 'SERVICES' },
          { name: t('grievances') || 'Requests / Grievances', path: '/worker/grievances', icon: MessageSquare },
          { name: t('navigation.notifications'), path: '/worker/notifications', icon: Bell },
          { heading: t('navigation.history') || 'ACTIVITY' },
          { name: t('navigation.history'), path: '/worker/history', icon: Activity },
          { heading: t('account') || 'ACCOUNT' },
          { name: t('profile'), path: '/worker/profile', icon: Users },
          { name: t('navigation.settings'), path: '/settings', icon: Settings },
        ];
      default:
        return [
          { heading: t('governance') || 'Governance Modules' },
          { name: t('navigation.dashboard') || 'Home', path: '/', icon: LayoutDashboard }
        ];
    }
  };

  if (!currentUser) return null;

  const navItems = getNavItems(currentUser.role);

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 bg-[#0f4c81] text-white font-bold text-xl tracking-wider shadow-md">
        <span className="text-yellow-400 mr-2">⚒</span> KoylaSetu
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col space-y-1 px-3">
          {navItems.map((item, idx) => {
            if (item.heading) {
              return (
                <div key={`heading-${idx}`} className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 mt-5 first:mt-0">
                  {item.heading}
                </div>
              );
            }
            
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive && item.path === window.location.pathname
                      ? 'bg-slate-800 text-white border-l-4 border-yellow-400' 
                      : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-slate-900 text-xs border-t border-slate-800">
        <div className="flex justify-between items-center text-slate-500 mb-1">
          <span>System Status</span>
          <span className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Online</span>
        </div>
        <div className="text-[10px] text-slate-600">
          Last sync: Just now
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
