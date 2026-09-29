import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from '../../context/WorkerContext';
import {
  Clock, AlertTriangle, Wrench, CheckSquare,
  MapPin, AlertCircle, Award, ChevronRight,
  ShieldCheck, Activity, BookOpen, Clock3
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WorkerDashboard = () => {
  const { profile, tasks, attendance, shifts, correctiveActions, notifications } = useWorker();
  const { language, setLanguage, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState('03:42:00');

  // Helper to translate mock data
  const tm = (str) => {
    const map = {
      'Morning Shift': t('mock.morningShift'),
      'Safety Refresher': t('mock.safetyRefresher'),
      'Mining Area A': t('mock.miningAreaA'),
      'Kamptee Colliery': t('mock.kampteeColliery'),
      'Mining Worker': t('mock.miningWorker'),
      'Mining Operations': t('mock.miningOperations'),
      'WCL': t('mock.wcl'),
      'Replace worn out safety boots': t("mock.Replace worn out safety boots"),
      'Task Assigned: Clear Conveyor Belt Jam': t("mock.Task Assigned: Clear Conveyor Belt Jam"),
      '2 hours ago': t("mock.2 hours ago")
    };
    return map[str] || str;
  };

  // Calculate summaries
  const pendingTasks = tasks?.filter(t => t.status !== 'Completed').length || 0;
  const urgentTasks = tasks?.filter(t => t.status !== 'Completed' && t.priority === 'High').length || 0;
  const openActions = correctiveActions?.filter(ca => ca.status !== 'Closed').length || 0;

  const currentShift = shifts?.find(s => s.status === 'Current') || { name: 'Morning Shift', time: '06:00 - 14:00' };
  const todayAttendance = attendance?.find(a => a.date === new Date().toISOString().split('T')[0]);
  const recentActivities = notifications?.slice(0, 3) || [];

  // Simulate a live countdown for the shift
  useEffect(() => {
    const interval = setInterval(() => { }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 pt-6 pb-28 space-y-8 lg:px-8">

      {/* GREETING & STATUS */}
      <div className="space-y-5">
        <div className="flex flex-row justify-between items-start gap-2">
          <div className="flex items-center gap-4">
            <img src="/worker_3d.jpg" alt="Worker Profile" className="w-20 h-20 object-contain drop-shadow-lg [mix-blend-mode:multiply]" />
            <div className="flex flex-col gap-1.5">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {t('dashboard.greeting', { name: profile?.name || 'Dhruv Patil' })}
              </h2>
              <div className="flex items-center gap-2">
                <span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex bg-slate-100/80 backdrop-blur-md rounded-xl p-1 shadow-inner shrink-0 overflow-x-auto">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'mr', label: 'मराठी' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                  language === lang.code 
                    ? 'bg-white text-[#136c4b] shadow-sm ring-1 ring-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* SHIFT CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#136c4b]"></div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#136c4b] flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-105">

              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {t('dashboard.currentShift')}
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentShift?.time}
                </div>
                <div className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5">

                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm font-black text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
              {timeLeft}
            </div>
            <div className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">

            </div>
          </div>
        </div>
      </div>

      {/* MY DAY OVERVIEW */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.myDay')}</h3>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <img src="/attendance.png" alt="Attendance" className="w-8 h-8 object-contain mb-2" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('navigation.attendance')}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {todayAttendance ? t('dashboard.present') : t('common.pending')}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
          
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('dashboard.shift')}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate w-full">
              {tm(currentShift?.name)}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            {urgentTasks > 0 && (
              <div className="absolute top-0 right-0 w-10 h-10 bg-red-50 rounded-bl-2xl flex items-start justify-end p-2 border-b border-l border-red-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            )}
            <img src="/my_task.png" alt="My Tasks" className="w-8 h-8 object-contain mb-2" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('navigation.myTasks')}</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {pendingTasks} {t('common.pending')}
            </div>
          </div>
        </div>
      </div>

      {/* MY PRIORITIES */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.priorities')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Training Priority Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-white border-b-slate-200 flex flex-col transition-all hover:-translate-y-1">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                <img src="/training.png" alt="Training" className="w-7 h-7 object-contain" />
              </div>
              <div className="pt-1 flex-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('navigation.training')}</div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">{tm('Safety Refresher')}</h4>
                <div className="inline-flex items-center mt-2 text-[11px] font-bold text-amber-700 bg-amber-100/50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                  {t('dashboard.dueToday')}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 mt-auto">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>{t('dashboard.moduleProgress')}</span>
                <span>80%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-amber-400 rounded-full w-4/5 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>

            <Link to="/worker/training" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all focus:ring-2 focus:ring-slate-200">
              {t('dashboard.continue')}
            </Link>
          </div>

          {/* Corrective Action Priority Card */}
          {openActions > 0 && correctiveActions?.slice(0, 1).map(ca => (
            <div key={ca.id} className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-white border-b-slate-200 flex flex-col transition-all hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#136c4b] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="pt-1 flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('navigation.myCorrectiveActions')}</div>
                  <h4 className="text-lg font-black text-slate-900 leading-snug">{tm(ca.issue)}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-2 flex items-center gap-1.5">
                    {t('dashboard.due')} {ca.due}
                  </p>
                </div>
              </div>

              <Link to="/worker/actions" className="mt-auto w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(15,76,129,0.39)] text-sm font-bold text-white bg-[#136c4b] hover:bg-[#0b3b68] hover:shadow-[0_6px_20px_rgba(15,76,129,0.23)] hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#136c4b]">
                {t('dashboard.openTask')}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t('dashboard.quickActions')}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link to="/worker/tasks" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-[#136c4b] flex items-center justify-center shadow-sm">
              <img src="/my_task.png" alt="My Tasks" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('navigation.myTasks')}</span>
          </Link>

          <Link to="/worker/attendance" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center shadow-sm">
              <img src="/attendance.png" alt="Attendance" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('navigation.attendance')}</span>
          </Link>

          <Link to="/worker/reports" className="bg-red-50/80 backdrop-blur-xl p-5 rounded-3xl border border-red-100 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.3)] transition-all">
            <div className="w-16 h-16 flex items-center justify-center drop-shadow-md">
              <img src="/safety_report_3d.jpg" alt="Report Safety" className="w-full h-full object-contain [mix-blend-mode:multiply]" />
            </div>
            <span className="text-sm font-bold text-red-700">Report Safety</span>
          </Link>

          <Link to="/worker/training" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-amber-500 flex items-center justify-center shadow-sm">
              <img src="/training.png" alt="Training" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-bold text-slate-800">{t('navigation.training')}</span>
          </Link>
        </div>
      </div>





    </div>
  );
};

export default WorkerDashboard;

