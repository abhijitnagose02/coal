import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  ClipboardList, CheckCircle, Clock, AlertTriangle, 
  MapPin, User, ArrowRight, Eye, UserPlus, ShieldAlert, Users 
} from 'lucide-react';

const InspectionsList = () => {
  const { inspections, openActionDetail } = useManager();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredInspections = inspections.filter(ins => {
    if (selectedFilter === 'all') return true;
    return ins.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <ClipboardList className="w-4 h-4" />
            <span>Statutory Audits & DGMS Inspections</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inspections Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tracking underground and surface safety audits, findings, observations, and manager reviews.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {['all', 'completed', 'in progress', 'scheduled', 'overdue'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                selectedFilter === st 
                  ? 'bg-white text-[#0f4c81] shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inspections List */}
      <div className="space-y-4">
        {filteredInspections.map((ins) => (
          <div key={ins.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#0f4c81] bg-blue-50 px-2.5 py-1 rounded-md">
                  {ins.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{ins.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  ins.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {ins.severity} Severity
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  ins.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  ins.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {ins.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Inspector</strong>
                <span className="font-bold text-slate-800">{ins.inspector}</span>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Audit Date</strong>
                <span className="font-semibold text-slate-800">{ins.date}</span>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Location</strong>
                <span className="font-semibold text-slate-800">{ins.location}</span>
              </div>
            </div>

            {/* Findings */}
            {ins.findings?.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                  Recorded Observations ({ins.findings.length})
                </span>
                {ins.findings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Inspection Media / Images */}
            {ins.images && ins.images.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                  Inspection Media Evidence
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ins.images.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm h-48">
                      <img src={img} alt={`Evidence ${idx+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Image+Expired'; }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mine Personnel Attached */}
            {ins.personnel && (
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 space-y-3 mt-2">
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#0f4c81] flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" /> Mine Personnel Appointed
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Safety Officers */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-3 h-3" /> Safety Officers
                    </h4>
                    <ul className="space-y-1.5">
                      {ins.personnel.safetyOfficers.map((so, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#0f4c81] text-white flex items-center justify-center text-[9px]">{so.charAt(0)}</div>
                          {so}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Workers */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Assigned Workers
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {ins.personnel.workers.map((worker, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-medium text-slate-600 shadow-xs">
                          {worker}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-[11px] text-slate-400 font-medium">
                Related Action: <strong>{ins.relatedActionId || 'None required'}</strong>
              </span>
              <div className="flex items-center gap-2">
                {ins.relatedActionId && (
                  <button
                    onClick={() => openActionDetail(ins.relatedActionId)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Corrective Action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default InspectionsList;
