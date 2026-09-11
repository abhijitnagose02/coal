import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Clock3, MapPin, ShieldCheck, CheckSquare, 
  AlertTriangle, Wrench, Sparkles, Users, FileText, 
  BrainCircuit, ChevronRight, Activity, Zap, CheckCircle2,
  AlertOctagon, Compass, Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { 
    mineDetails, 
    kpis, 
    attentionItems, 
    aiInsights, 
    correctiveActions, 
    workforceData,
    openAiExplanation, 
    openActionDetail,
    openSiteDrawer 
  } = useManager();

  const [timeLeft, setTimeLeft] = useState('04h 42m left');

  // Compute stats
  const managerName = mineDetails?.manager?.name?.split(' ')[0] || currentUser?.name?.split(' ')[0] || 'Amit';
  const pendingActions = attentionItems?.length || 3;
  const workforcePresent = workforceData?.presentToday || 806;
  const workforceTotal = workforceData?.totalRequired || 840;
  const workforcePercent = Math.round((workforcePresent / workforceTotal) * 100);

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Keep lively countdown state
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 pt-4 pb-24 space-y-7">
      
      {/* 1. GREETING & STATUS */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('dashboard.greeting') ? t('dashboard.greeting').replace('{name}', managerName) : `Good morning, ${managerName}`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('dashboard.online') || 'Online'}
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
              Pit Head · Duty
            </span>
          </div>
        </div>

        {/* 2. CURRENT SHIFT & MINE STATUS CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 relative overflow-hidden group">
          {/* Top accent line - Deep Coal Blue */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003366]"></div>
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003366] flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-105">
                <Clock className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {t('dashboard.currentShift') || 'CURRENT SHIFT'}
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  06:00 - 14:00
                </div>
                <div className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#003366]" /> {mineDetails?.name || 'Kamptee Colliery'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom row badges */}
          <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm font-black text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
              <Clock3 className="w-4 h-4" /> {timeLeft}
            </div>
            <div className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              {t('dashboard.onSchedule') || 'On Schedule'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MY DAY (3-Column Icon Grid) */}
      <div className="space-y-3.5">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.myDay') || 'My Day'}</h3>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Attendance / Workforce */}
          <div 
            onClick={() => navigate('/manager/workforce')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <ShieldCheck className="w-7 h-7 text-emerald-500 mb-2.5" />
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('navigation.attendance') || 'Attendance'}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {t('dashboard.present') || 'Present'}
            </div>
          </div>
          
          {/* Shift */}
          <div 
            onClick={() => navigate('/manager/shifts')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <Clock3 className="w-7 h-7 text-[#003366] mb-2.5" />
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('dashboard.shift') || 'Shift'}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate w-full">
              {t('mock.morningShift') || 'Morning Shift'}
            </div>
          </div>
          
          {/* Tasks with Red Dot Badge */}
          <div 
            onClick={() => navigate('/manager/actions')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            {pendingActions > 0 && (
              <div className="absolute top-0 right-0 w-8 h-8 bg-red-50 rounded-bl-2xl flex items-start justify-end p-1.5 border-b border-l border-red-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            )}
            <CheckSquare className="w-7 h-7 text-amber-500 mb-2.5" />
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('navigation.myTasks') || 'Tasks'}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {pendingActions} {t('common.pending') || 'Pending'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. MY PRIORITIES (Horizontal Scroll / Stacked Priority Cards) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between pl-1 pr-1">
          <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.priorities') || 'My Priorities'}</h3>
          <span className="text-xs font-bold text-[#003366] cursor-pointer hover:underline" onClick={() => navigate('/manager/actions')}>
            View all
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-3.5">
          {/* Priority 1: Critical Safety */}
          <div 
            onClick={() => openAiExplanation('AI-VENT-01')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex items-center justify-between gap-3 transition-all hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">
                  CRITICAL SAFETY
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Ventilation Fan #2 Vibration Alert
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
                  Airflow 1,120 m³/min · DGMS Reg 153
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                Action
              </span>
            </div>
          </div>

          {/* Priority 2: Corrective Action */}
          <div 
            onClick={() => openActionDetail('CA-2024-001')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex items-center justify-between gap-3 transition-all hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6 text-[#003366]" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">
                  CORRECTIVE ACTION
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Haulage Rope NDT Certification
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
                  Shaft-2 Hoist · Overdue in 2 Days
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                2 Days
              </span>
            </div>
          </div>

          {/* Priority 3: AI Governance Insight */}
          <div 
            onClick={() => openAiExplanation('AI-GAS-02')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex items-center justify-between gap-3 transition-all hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-0.5">
                  AI PREDICTIVE INSIGHT
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Methane Drift Trend (+18%)
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
                  Seam-III continuous sensor anomaly
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                Diagnosed
              </span>
            </div>
          </div>

          {/* Priority 4: Statutory Approval */}
          <div 
            onClick={() => navigate('/manager/approvals')}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex items-center justify-between gap-3 transition-all hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">
                  STATUTORY APPROVAL
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Overburden Blasting Clearance
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
                  Zone 4B · Pre-blast clearance sign-off
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Sign-off
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS (Icon-First Manager Tools) */}
      <div className="space-y-3.5">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">Quick Actions</h3>
        
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {/* Action 1: Log Inspection */}
          <button 
            onClick={() => navigate('/manager/inspections')}
            className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-white border-b-slate-200 shadow-xs flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">Inspect</span>
          </button>

          {/* Action 2: Hazard Alert */}
          <button 
            onClick={() => navigate('/manager/alerts')}
            className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-white border-b-slate-200 shadow-xs flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">Hazard</span>
          </button>

          {/* Action 3: Live Mine Map */}
          <button 
            onClick={() => navigate('/manager/gis')}
            className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-white border-b-slate-200 shadow-xs flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">Map</span>
          </button>

          {/* Action 4: AI Copilot */}
          <button 
            onClick={() => openAiExplanation('AI-VENT-01')}
            className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-white border-b-slate-200 shadow-xs flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">AI Assist</span>
          </button>
        </div>
      </div>

      {/* 6. MINE TELEMETRY PULSE (Compact icon chips) */}
      <div className="space-y-3.5">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">Statutory Telemetry</h3>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200">
          <div className="grid grid-cols-2 gap-3">
            {/* Telemetry 1 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">CH4 Methane</div>
                <div className="text-xs font-black text-slate-900">0.28% (Safe)</div>
              </div>
            </div>

            {/* Telemetry 2 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">CO Carbon Monox</div>
                <div className="text-xs font-black text-slate-900">4 ppm (Safe)</div>
              </div>
            </div>

            {/* Telemetry 3 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Airflow Incline-4</div>
                <div className="text-xs font-black text-amber-700">1,120 m³/min</div>
              </div>
            </div>

            {/* Telemetry 4 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Strata Sensor</div>
                <div className="text-xs font-black text-slate-900">12.4 MPa (Normal)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManagerDashboard;
