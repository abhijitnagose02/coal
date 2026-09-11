import React from 'react';
import { Link } from 'react-router-dom';
import { useSafety } from '../../context/SafetyContext';
import { 
  ShieldAlert, AlertTriangle, ClipboardCheck, Users, 
  MapPin, Activity, ChevronRight, ShieldCheck, 
  HardHat, BookOpen, Clock3
} from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';

const SafetyDashboard = () => {
  const { profile, safetyMetrics, incidents, inspections, contractors } = useSafety();
  const { t } = useLanguage();

  const openIncidents = incidents?.filter(i => i.status === 'Open').length || 0;
  const pendingInspections = inspections?.filter(i => i.status === 'Pending').length || 0;
  
  // High priority incidents
  const criticalIncidents = incidents?.filter(i => i.priority === 'High' && i.status === 'Open') || [];

  return (
    <div className="w-full px-4 pt-6 pb-28 space-y-8 lg:px-8">
      
      {/* GREETING & STATUS */}
      <div className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('dashboard.greeting', { name: profile?.name?.split(' ')[0] || 'Safety Officer' })}
          </h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('dashboard.online')}
            </span>
          </div>
        </div>

        {/* SAFETY SCORE CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500"></div>
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-105">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Mine Safety Score
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  {safetyMetrics?.safetyScore || 92}/100
                  {safetyMetrics?.safetyScore >= 90 && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">Excellent</span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" /> {profile?.location || 'Kamptee Colliery'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm font-black text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <Clock3 className="w-4 h-4" /> {safetyMetrics?.daysWithoutLTI || 145} {t('dashboard.daysWithoutLTI') || 'Days Without LTI'}
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW METRICS */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.myDay')}</h3>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <AlertTriangle className="w-7 h-7 text-amber-500 mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('incidents') || 'Incidents'}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {openIncidents} {t('common.open') || 'Open'}
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <ClipboardCheck className="w-7 h-7 text-blue-500 mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('inspections') || 'Inspections'}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate w-full">
              {pendingInspections} {t('common.pending') || 'Pending'}
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <ShieldAlert className="w-7 h-7 text-red-500 mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Violations</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {safetyMetrics?.activeViolations || 0} Active
            </div>
          </div>
        </div>
      </div>

      {/* PRIORITIES */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.priorities')}</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {criticalIncidents.map(incident => (
            <div key={incident.id} className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-white border-b-slate-200 flex flex-col transition-all hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="pt-1 flex-1">
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Critical Incident</div>
                  <h4 className="text-lg font-black text-slate-900 leading-tight">{incident.description}</h4>
                  <div className="inline-flex items-center mt-2 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {incident.time}
                  </div>
                </div>
              </div>
              
              <Link to="/incidents" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-200">
                Investigate Now
              </Link>
            </div>
          ))}
          
          {criticalIncidents.length === 0 && (
            <div className="p-6 text-center text-sm font-bold text-emerald-600 bg-emerald-50 rounded-2xl border border-emerald-100">
              No critical incidents requiring immediate action.
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.quickActions')}</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link to="/incidents/new" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('dashboard.logIncident') || 'Log Incident'}</span>
          </Link>
          
          <Link to="/inspections/new" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shadow-sm">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('dashboard.newInspection') || 'New Inspection'}</span>
          </Link>
          
          <Link to="/contractors" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center shadow-sm">
              <HardHat className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('contractors') || 'Contractors'}</span>
          </Link>
          
          <Link to="/training" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('navigation.training') || 'Training'}</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default SafetyDashboard;
