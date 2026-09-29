import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { Users, Search, ArrowLeft, ShieldCheck, AlertTriangle, FileText, Send, CheckCircle2, UserCircle } from 'lucide-react';

const SafetyContractors = () => {
  const { contractors, addHazard, incidents } = useSafety();
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // 'workers', 'incidents', 'documents', 'action', 'action_success'
  
  const [actionDesc, setActionDesc] = useState('');
  const [actionDeadline, setActionDeadline] = useState('');

  const handleBack = () => {
    if (activeTab) {
      if (activeTab === 'action_success') {
        setActionDesc('');
        setActionDeadline('');
      }
      setActiveTab(null);
    } else {
      setSelectedContractor(null);
    }
  };

  const handleAssignAction = () => {
    if (!actionDesc) return;
    const newHazard = {
      id: `H-${100 + Math.floor(Math.random() * 900)}`,
      issue: actionDesc,
      location: 'Contractor Worksite',
      risk: 'Medium',
      assignedTo: contractors.find(c => c.id === selectedContractor)?.name,
      status: 'Open'
    };
    addHazard(newHazard);
    setActiveTab('action_success');
  };

  const activeContractors = contractors.length;
  const totalWorkers = contractors.reduce((sum, c) => sum + c.workers, 0);
  const avgScore = Math.round(contractors.reduce((sum, c) => sum + c.safetyScore, 0) / activeContractors);
  const withViolations = contractors.filter(c => c.openViolations > 0).length;

  if (selectedContractor) {
    const c = contractors.find(c => c.id === selectedContractor);
    return (
      <div className="w-full pb-8">
        <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm mb-4">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center active:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Contractor Profile</h1>
        </div>

        <div className="px-4 space-y-4">
          <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl backdrop-blur-md overflow-hidden shrink-0">
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1 bg-white/50" />
              ) : (
                c.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <h2 className="text-2xl font-black">{c.name}</h2>
              <p className="text-slate-300 font-medium">ID: {c.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Safety Score</span>
              <div className={`text-3xl font-black mt-1 ${c.safetyScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{c.safetyScore}%</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Workers</span>
              <div className="text-3xl font-black text-slate-800 mt-1">{c.workers}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Compliance Status</h3>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-600 text-sm">PPE Compliance</span>
              <span className="font-black text-emerald-500 text-sm">{c.ppeCompliance}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-600 text-sm">Open Violations</span>
              <span className={`font-black text-sm ${c.openViolations > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{c.openViolations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-600 text-sm">Overall Status</span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${c.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
            </div>
          </div>

          {/* View Workers Tab */}
          {activeTab === 'workers' && (
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0f4c81]" /> Active Workers
              </h3>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Worker {i} - {c.name.split(' ')[0]}</p>
                      <p className="text-xs text-slate-500 font-medium">EMP-{i}4{i}0 • General Duties</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded">Compliant</span>
                </div>
              ))}
            </div>
          )}

          {/* View Incidents Tab */}
          {activeTab === 'incidents' && (
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Reported Incidents
              </h3>
              {incidents.length > 0 ? incidents.slice(0, 3).map(inc => (
                <div key={inc.id} className="p-4 border border-amber-200 bg-amber-50 rounded-2xl mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-slate-800 text-sm">{inc.type}</p>
                    <span className="px-2 py-1 bg-amber-200 text-amber-800 text-[10px] font-black uppercase rounded">{inc.status}</span>
                  </div>
                  <p className="text-xs text-slate-600">Location: {inc.location}. Severity: {inc.severity}.</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">{inc.date}</p>
                </div>
              )) : (
                <p className="text-sm text-slate-500 font-medium">No incidents reported for this contractor.</p>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0f4c81]" /> Compliance Documents
              </h3>
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Safety Clearance Certificate</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Valid until Dec 2026</p>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Workforce Insurance Policy</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Expires in 15 days</p>
                </div>
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          )}

          {/* Assign Action Tab */}
          {activeTab === 'action' && (
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-500" /> Assign Corrective Action
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Action Description</label>
                  <textarea value={actionDesc} onChange={e => setActionDesc(e.target.value)} rows="4" className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-amber-400" placeholder="Describe the required corrective action..."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deadline</label>
                  <input type="date" value={actionDeadline} onChange={e => setActionDeadline(e.target.value)} className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-amber-400" />
                </div>
                <button onClick={handleAssignAction} disabled={!actionDesc} className="w-full bg-amber-500 text-white font-black py-4 rounded-xl shadow-lg shadow-amber-200 active:scale-[0.98] transition-transform disabled:opacity-50">
                  Submit Action
                </button>
              </div>
            </div>
          )}
          
          {/* Action Success */}
          {activeTab === 'action_success' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Action Assigned</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">The corrective action has been successfully assigned to {c.name}.</p>
              <button onClick={() => setActiveTab(null)} className="bg-slate-100 text-slate-800 font-black py-3 px-6 rounded-xl active:bg-slate-200">
                Back to Profile
              </button>
            </div>
          )}

          {!activeTab && (
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button onClick={() => setActiveTab('workers')} className="bg-white border border-slate-200 text-slate-800 font-black py-3 rounded-xl shadow-sm active:bg-slate-50">View Workers</button>
              <button onClick={() => setActiveTab('incidents')} className="bg-white border border-slate-200 text-slate-800 font-black py-3 rounded-xl shadow-sm active:bg-slate-50">View Incidents</button>
              <button onClick={() => setActiveTab('documents')} className="bg-white border border-slate-200 text-slate-800 font-black py-3 rounded-xl shadow-sm active:bg-slate-50">Documents</button>
              <button onClick={() => setActiveTab('action')} className="bg-amber-50 border border-amber-200 text-amber-700 font-black py-3 rounded-xl shadow-sm active:bg-amber-100">Assign Action</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pt-4 pb-8">
      {/* Overview */}
      <div className="px-4">
        <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Contractor Overview</h2>
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-4xl font-black">{activeContractors}</span>
              <p className="text-sm font-medium text-slate-300">Active Contractors</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">{avgScore}%</span>
              <p className="text-xs font-bold text-slate-400 uppercase">Avg Score</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-slate-700 pt-4">
            <div>
              <span className="block text-lg font-black text-slate-200">{totalWorkers}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Workers</span>
            </div>
            <div>
              <span className="block text-lg font-black text-amber-400">0{withViolations}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">With Violations</span>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="px-4 space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Contractor Directory</h3>
        {contractors.map(c => (
          <div key={c.id} onClick={() => setSelectedContractor(c.id)} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-black overflow-hidden shrink-0">
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1" />
              ) : (
                c.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-800 leading-tight">{c.name}</h3>
              <p className="text-xs font-bold text-slate-500 mt-1">{c.workers} Workers Active</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded ${c.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {c.status}
                </span>
                {c.openViolations > 0 && <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-red-100 text-red-700">{c.openViolations} Violations</span>}
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-black ${c.safetyScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{c.safetyScore}%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyContractors;
