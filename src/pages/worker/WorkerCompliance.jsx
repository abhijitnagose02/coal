import React, { useState } from 'react';
import { useWorker } from '../../context/WorkerContext';
import { ShieldCheck, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkerCompliance = () => {
  const { complianceStatus } = useWorker();
  const navigate = useNavigate();
  const [sosSent, setSosSent] = useState(false);

  const isCompliant = complianceStatus === 'Compliant';

  const handleSos = () => {
    if (sosSent) return;
    const notification = {
      id: Date.now().toString(),
      title: `EMERGENCY SOS: Dhruv Patil`,
      message: `Worker triggered SOS from the Safety Hub. Immediate assistance required.`,
      isEmergencyCall: true,
      timestamp: new Date().toISOString(),
      unread: true
    };
    
    // Send to Manager
    const existingManager = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
    localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existingManager]));
    
    // Send to Safety Officer
    const existingSafety = JSON.parse(localStorage.getItem('safetyNotifications') || '[]');
    localStorage.setItem('safetyNotifications', JSON.stringify([notification, ...existingSafety]));
    
    window.dispatchEvent(new CustomEvent('storage'));
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  const handleRequestInspection = () => {
    alert("Inspection request submitted successfully to the Safety Officer.");
  };



  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Safety Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Safety Connect, Alerts, and your Compliance Status.</p>
        </div>
      </div>

      {/* Safety Connect Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
          <div>
            <h2 className="text-lg font-bold text-[#0f4c81] flex items-center gap-2">
              Safety Connect
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct line to your Safety Officer and Mine Manager</p>
          </div>
          <button 
            onClick={handleSos}
            className={`${sosSent ? 'bg-slate-500' : 'bg-red-600 hover:bg-red-700 animate-pulse hover:animate-none'} text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center transition-colors`}
          >
            <AlertCircle className="w-4 h-4 mr-2" /> {sosSent ? 'SOS Sent' : 'Emergency SOS'}
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button onClick={() => navigate('/worker/grievances')} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Ask Question</span>
          </button>
          
          <button onClick={handleRequestInspection} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Request Inspection</span>
          </button>
          
          <button onClick={() => navigate('/worker/reports')} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Report Issue</span>
          </button>

          <button onClick={() => navigate('/worker/grievances')} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Message Officer</span>
          </button>
        </div>
      </div>

      {/* Real-time Safety Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-amber-500" /> Real-Time Safety Alerts
        </h3>
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-800">Blast Scheduled at Pit 2</h4>
              <p className="text-xs text-amber-700 mt-1">Evacuate area by 14:00 hours. Maintain 500m safe distance.</p>
              <span className="text-[10px] font-bold text-amber-600 mt-2 block">10 mins ago • Mine Manager</span>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 flex gap-3">
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-800">Restricted Area: Conveyor Belt B</h4>
              <p className="text-xs text-red-700 mt-1">Equipment under maintenance. Do not operate or approach.</p>
              <span className="text-[10px] font-bold text-red-600 mt-2 block">1 hour ago • Safety Officer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Status (Original) */}
      <div className={`rounded-xl shadow-sm border p-6 flex items-center justify-between ${
        isCompliant ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
            isCompliant ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {isCompliant ? <ShieldCheck className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <h2 className={`text-lg font-black mb-0.5 ${isCompliant ? 'text-emerald-800' : 'text-red-800'}`}>
              Compliance: {complianceStatus}
            </h2>
            <p className={`text-xs font-medium ${isCompliant ? 'text-emerald-600' : 'text-red-600'}`}>
              {isCompliant ? 'Cleared for mining operations.' : 'Suspended or incomplete.'}
            </p>
          </div>
        </div>
        <button onClick={() => navigate('/worker/profile')} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default WorkerCompliance;
