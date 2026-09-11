import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  ClipboardList, 
  TrendingUp,
  Activity,
  BrainCircuit,
  MapPin,
  Clock,
  ArrowRight,
  Bell
} from 'lucide-react';
import { dashboardStats, aiInsights, alerts, correctiveActions } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

// --- Reusable UI Components ---
const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
  <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">{title}</div>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const RiskBadge = ({ level }) => {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[level] || styles.Low}`}>
      {level} Risk
    </span>
  );
};

// --- Main Dashboard ---
const MineManagerDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">{t('riskOverview') || 'Corporate Risk Dashboard'}</h1>
          <p className="text-slate-500 text-sm mt-1">{t('overview') || 'Cross-mine governance visibility and active alerts.'}</p>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
          {t('prototypeMsg') || 'Data simulated for SIH prototype'}
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Mines" 
          value={dashboardStats.activeMines} 
          icon={Activity} 
          colorClass="bg-sky-100 text-sky-600" 
          subtitle="All CIL subsidiaries connected"
        />
        <StatCard 
          title="Critical Risks" 
          value={dashboardStats.criticalRisks} 
          icon={AlertTriangle} 
          colorClass="bg-red-100 text-red-600" 
          subtitle="+2 since yesterday"
        />
        <StatCard 
          title="Overdue Actions" 
          value={dashboardStats.overdueActions} 
          icon={Clock} 
          colorClass="bg-yellow-100 text-yellow-600" 
          subtitle="Escalations active"
        />
        <StatCard 
          title="Avg Compliance" 
          value={`${dashboardStats.averageCompliance}%`} 
          icon={TrendingUp} 
          colorClass="bg-emerald-100 text-emerald-600" 
          subtitle="Across 5 tracked domains"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Intelligence & Active Alerts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Risk Intelligence Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#0f4c81] p-4 flex items-center gap-3">
              <BrainCircuit className="text-yellow-400 w-6 h-6" />
              <h2 className="text-white font-bold tracking-wide">AI Risk Intelligence</h2>
              <span className="ml-auto text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                Predictive Analysis
              </span>
            </div>
            
            <div className="p-0 divide-y divide-slate-100">
              {aiInsights.map(insight => (
                <div key={insight.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <RiskBadge level={insight.riskLevel} />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {insight.mineId}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      Confidence: {insight.confidenceScore}%
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{insight.finding}</h3>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded p-3 mb-3 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">Why:</span> {insight.reason}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm font-semibold text-[#0f4c81] flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      Action: {insight.recommendedAction}
                    </div>
                    <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 font-semibold px-4 py-1.5 rounded text-slate-700 transition-colors">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corrective Actions Table */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-slate-500" />
                Priority Corrective Actions
              </h2>
              <button className="text-sm text-[#0f4c81] font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3">Action ID</th>
                    <th className="px-5 py-3">Description</th>
                    <th className="px-5 py-3">Assignee</th>
                    <th className="px-5 py-3">Deadline</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {correctiveActions.map(action => (
                    <tr key={action.id} className="hover:bg-slate-50 cursor-pointer">
                      <td className="px-5 py-3 font-semibold text-slate-700">{action.id}</td>
                      <td className="px-5 py-3 font-medium text-slate-800">{action.title}</td>
                      <td className="px-5 py-3 text-slate-600">{action.assignedTo}</td>
                      <td className={`px-5 py-3 font-semibold ${action.status === 'Overdue' ? 'text-red-600' : 'text-slate-600'}`}>
                        {action.deadline}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          action.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          action.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {action.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Live Alert Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 rounded-t-lg flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-500" />
                Live Alerts
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
            
            <div className="p-4 space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded border-l-4 ${
                  alert.severity === 'Critical' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'High' ? 'border-orange-500 bg-orange-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1.5 leading-snug">
                    {alert.message}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location: {alert.mineId}
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded border border-slate-200 transition-colors">
                View Alert History
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MineManagerDashboard;
