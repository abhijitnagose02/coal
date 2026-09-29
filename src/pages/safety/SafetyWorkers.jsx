import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, CheckCircle2, UserCircle, MessageSquare, Check, X, Send } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';

const SafetyWorkers = () => {
  const handleReportAction = (reportId, action) => {
    try {
      const stored = localStorage.getItem('worker_state');
      if (stored) {
        const state = JSON.parse(stored);
        let newStatus = 'Reported';
        if (action === 'accept') newStatus = 'Under Review';
        if (action === 'decline') newStatus = 'Resolved';
        if (action === 'escalate') newStatus = 'Escalated';

        const updatedReports = state.reports.map(r => 
          r.id === reportId ? { ...r, status: newStatus } : r
        );
        
        const newState = { ...state, reports: updatedReports };
        localStorage.setItem('worker_state', JSON.stringify(newState));
        setWorkerState(newState);

        if (action === 'escalate') {
          const r = state.reports.find(r => r.id === reportId);
          if (r) {
            const notification = {
              id: Date.now().toString(),
              title: `Escalated Worker Report: ${r.type}`,
              message: r.desc,
              isEmergencyCall: r.severity === 'Critical',
              timestamp: new Date().toISOString(),
              unread: true
            };
            const existing = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
            localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existing]));
            window.dispatchEvent(new CustomEvent('storage'));
          }
        }
      }
    } catch (e) {
      console.error("Error updating report action", e);
    }
  };
  const [workerState, setWorkerState] = useState(null);
  const { safetyMetrics } = useSafety();

  useEffect(() => {
    // Poll local storage to get updates from the worker app
    const fetchWorkerState = () => {
      try {
        const stored = localStorage.getItem('worker_state');
        if (stored) {
          setWorkerState(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error parsing worker state", e);
      }
    };

    fetchWorkerState();
    const interval = setInterval(fetchWorkerState, 2000);
    return () => clearInterval(interval);
  }, []);

  const reports = workerState?.reports || [];
  const compliance = workerState?.complianceStatus || 'Unknown';

  const mockWorkers = [
    { id: 'W-1024', name: 'Dhruv Patil', role: 'Heavy Machinery Operator', status: compliance },
    { id: 'W-1088', name: 'Rahul Kumar', role: 'Drill Operator', status: 'Compliant' },
    { id: 'W-1092', name: 'Amit Singh', role: 'General Duties', status: 'Suspended' },
  ];

  return (
    <div className="w-full space-y-6 pt-4 pb-8 px-4">
      <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" /> Workforce Overview
        </h2>
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-4xl font-black">248</span>
            <p className="text-sm font-medium text-slate-300">Active Workers</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400">92%</span>
            <p className="text-xs font-bold text-slate-400 uppercase">Compliant</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" /> Incoming Worker Reports
        </h3>
        
        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{r.type}</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">{r.desc}</h4>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded ${
                    r.severity === 'Critical' || r.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {r.severity || 'Medium'}
                  </span>
                </div>
                
                {r.proof && (
                  <div className="mt-2 mb-1 w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                    <img src={r.proof} alt="Report Proof" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">Dhruv Patil (W-1024)</span>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                    r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {r.status || 'Open'}
                  </span>
                </div>
                {(!r.status || r.status === 'Submitted' || r.status === 'Reported') && (
                  <div className="flex gap-2 mt-2 pt-2">
                    <button 
                      onClick={() => handleReportAction(r.id, 'accept')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Check className="w-3 h-3" /> Accept
                    </button>
                    <button 
                      onClick={() => handleReportAction(r.id, 'decline')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                    >
                      <X className="w-3 h-3" /> Decline
                    </button>
                    <button 
                      onClick={() => handleReportAction(r.id, 'escalate')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[10px] font-bold transition-colors"
                    >
                      <Send className="w-3 h-3" /> Send to Mine Manager
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm font-medium">No reports submitted by workers yet.</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Worker Directory</h3>
        <div className="space-y-3">
          {mockWorkers.map((w, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] cursor-pointer transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {w.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{w.name}</h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">{w.role} • ID: {w.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded ${
                w.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyWorkers;
