import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Clock3, MapPin, ShieldCheck, CheckSquare,
  AlertTriangle, Wrench, Sparkles, Users, FileText,
  BrainCircuit, ChevronRight, Activity, Zap, CheckCircle2,
  AlertOctagon, Compass, Radio, Bell, PhoneCall
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
    approvals,
    approveRequest,
    openAiExplanation,
    openActionDetail,
    openSiteDrawer
  } = useManager();

  const [timeLeft, setTimeLeft] = useState('04h 42m left');
  const [notifications, setNotifications] = useState([]);

  // Load simulated cross-role notifications
  useEffect(() => {
    const loadNotifications = () => {
      const stored = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
      setNotifications(stored);
    };

    loadNotifications();
    window.addEventListener('storage', loadNotifications);
    // Poll just in case storage event doesn't fire across same-window React routes
    const interval = setInterval(loadNotifications, 2000);

    return () => {
      window.removeEventListener('storage', loadNotifications);
      clearInterval(interval);
    };
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem('managerNotifications');
    setNotifications([]);
  };

  const handleNotificationAction = (id, action) => {
    // Both accept and decline clear the notification from the dashboard in this demo
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('managerNotifications', JSON.stringify(updated));
  };

  // Compute stats
  // For Shri Asheesh Kumar, taking the second word as the first name, otherwise the first word.
  const rawName = mineDetails?.manager?.name || currentUser?.name || 'Asheesh Kumar';
  const managerName = rawName.includes('Shri ') ? rawName.replace('Shri ', '').trim() : rawName.trim();
  const pendingActions = (attentionItems?.length || 3) + notifications.length;
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

      {/* 0. NEW NOTIFICATIONS (EVIDENCE FROM SAFETY OFFICER) */}
      {notifications.length > 0 && (
        <div className="bg-blue-600 rounded-3xl p-5 shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-white animate-pulse" />
              </div>
              <h3 className="font-black">New Safety Alerts ({notifications.length})</h3>
            </div>
            <button onClick={clearNotifications} className="text-xs font-bold bg-blue-700 px-3 py-1.5 rounded-lg active:bg-blue-800 transition-colors">
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className={`${n.isEmergencyCall ? 'bg-red-700/50 border-red-500/50' : 'bg-blue-700/50 border-blue-500/50'} border rounded-2xl p-4`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  {n.isEmergencyCall && (
                    <div className="flex items-center gap-1.5 bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-black shadow-sm animate-[pulse_2s_ease-in-out_infinite]">
                      <PhoneCall className="w-3.5 h-3.5" /> CALLING MANAGER...
                    </div>
                  )}
                </div>
                <p className={`text-xs font-medium mb-3 ${n.isEmergencyCall ? 'text-red-200' : 'text-blue-200'}`}>{n.message}</p>
                {n.evidence && (
                  <div className={`${n.isEmergencyCall ? 'bg-red-800/50 border-red-600/50' : 'bg-blue-800/50 border-blue-600/50'} rounded-xl p-2 border mb-3`}>
                    <span className={`block text-[10px] font-bold uppercase mb-2 ${n.isEmergencyCall ? 'text-red-300' : 'text-blue-300'}`}>Attached {n.evidence.type}</span>
                    {n.evidence.type === 'photo' ? (
                      <img src={n.evidence.url} alt="Evidence" className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <video src={n.evidence.url} controls className="w-full h-32 object-cover rounded-lg" />
                    )}
                  </div>
                )}

                {(n.title.includes('EMERGENCY') || n.title.includes('High')) ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleNotificationAction(n.id, 'accept')} className={`flex-1 py-2 rounded-xl text-xs font-black shadow-sm transition-transform active:scale-95 ${n.isEmergencyCall ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
                      Accept
                    </button>
                    <button onClick={() => handleNotificationAction(n.id, 'decline')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 ${n.isEmergencyCall ? 'bg-red-900/50 text-red-200 border border-red-500/30 hover:bg-red-900' : 'bg-blue-900/50 text-blue-200 border border-blue-500/30 hover:bg-blue-900'}`}>
                      Decline
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleNotificationAction(n.id, 'dismiss')} className="w-full py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 bg-blue-900/50 text-blue-200 border border-blue-500/30 hover:bg-blue-900">
                    Dismiss
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 1. GREETING & STATUS */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('dashboard.greeting', { name: managerName }) || `Welcome, ${managerName}`}
          </h2>
          <div className="flex items-center gap-2">

          </div>
        </div>

        {/* 2. CURRENT SHIFT & MINE STATUS CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 relative overflow-hidden group">
          {/* Top accent line - Deep Coal Blue */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003366]"></div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <img src="/clock_logo.png" alt="Shift Clock" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {t('dashboard.currentShift') || 'CURRENT SHIFT'}
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  06:00 - 14:00
                </div>
                <div className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                  {mineDetails?.name || 'Kamptee Colliery'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row badges */}
          <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm font-black text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
              {timeLeft}
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

              <div>
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">
                  CRITICAL SAFETY
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Ventilation Fan  Vibration Alert
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">

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

              <div>
                <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-0.5">
                  AI  INSIGHT
                </div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  Methane Drift Trend
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
          {(() => {
            const blastingApproval = approvals?.find(a => a.id === "APR-504");
            const isApproved = blastingApproval?.status === "Approved";

            return (
              <div
                onClick={() => !isApproved && navigate('/manager/approvals')}
                className={`bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex items-center justify-between gap-3 transition-all hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] ${!isApproved ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center gap-3.5">

                  <div>
                    <div className={`text-[10px] font-bold ${isApproved ? 'text-emerald-600' : 'text-amber-600'} uppercase tracking-wider mb-0.5`}>
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
                  <button
                    onClick={(e) => {
                      if (!isApproved) {
                        e.stopPropagation();
                        approveRequest("APR-504");
                      }
                    }}
                    disabled={isApproved}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${isApproved
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200 cursor-not-allowed opacity-80'
                      : 'bg-[#0f4c81] text-white border-[#0f4c81] hover:bg-[#0b3b60] cursor-pointer shadow-xs'
                      }`}
                  >
                    {isApproved ? 'Signed-off' : 'Sign-off'}
                  </button>
                </div>
              </div>
            );
          })()}
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
    </div>
  );
};

export default ManagerDashboard;
