import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, Upload, Send, Paperclip } from 'lucide-react';

const SafetyOverview = () => {
  const { safetyMetrics, hazards, updateHazardStatus } = useSafety();
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setEvidence({
        name: file.name,
        type: file.type.startsWith('video') ? 'video' : 'photo',
        url: fileUrl
      });
    }
  };

  const sendToManager = (h) => {
    if (!evidence) return;
    setIsSending(true);
    
    setTimeout(() => {
      const notification = {
        id: Date.now().toString(),
        title: `Evidence for Hazard ${h.id}: ${h.issue}`,
        message: `New evidence uploaded by Safety Officer for ${h.location}`,
        evidence: evidence,
        timestamp: new Date().toISOString(),
        unread: true
      };
      
      const existing = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
      localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existing]));
      
      setIsSending(false);
      setEvidence(null);
      alert('Evidence sent to Mine Manager Dashboard!');
    }, 800);
  };

  if (selectedHazard) {
    const h = hazards.find(h => h.id === selectedHazard);
    return (
      <div className="w-full pb-8">
        <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm mb-4">
          <h1 className="text-xl font-black text-slate-800">Hazard Details</h1>
          <button onClick={() => { setSelectedHazard(null); setEvidence(null); }} className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg active:bg-slate-200">
            Close
          </button>
        </div>
        
        <div className="px-4 space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${h.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                {h.risk} Risk
              </span>
              <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${h.status === 'Open' ? 'bg-slate-100 text-slate-700' : h.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {h.status}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">{h.issue}</h2>
            <p className="text-sm font-medium text-slate-500 mb-4">{h.location}</p>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Assigned To</span>
              <span className="font-black text-slate-700">{h.assignedTo}</span>
            </div>

            {/* Evidence Upload Section */}
            <div className="mb-6 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Attach Evidence</h3>
              
              {!evidence ? (
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-bold text-slate-500">Upload Photo or Video</span>
                </label>
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{evidence.name}</span>
                    </div>
                    <button onClick={() => setEvidence(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Remove</button>
                  </div>
                  {evidence.type === 'photo' ? (
                    <img src={evidence.url} alt="Evidence preview" className="w-full h-32 object-cover rounded-xl mb-3" />
                  ) : (
                    <video src={evidence.url} className="w-full h-32 object-cover rounded-xl mb-3" controls />
                  )}
                  <button 
                    onClick={() => sendToManager(h)} 
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-3 rounded-xl shadow-md shadow-blue-200 active:bg-blue-700 disabled:opacity-70"
                  >
                    {isSending ? 'Sending...' : <><Send className="w-4 h-4" /> Send to Mine Manager</>}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {h.status !== 'Resolved' && (
                <>
                  <button onClick={() => updateHazardStatus(h.id, 'In Progress')} className="w-full bg-slate-50 text-slate-700 font-black py-3.5 rounded-xl border border-slate-200 active:bg-slate-100">
                    Mark In Progress
                  </button>
                  <button onClick={() => { updateHazardStatus(h.id, 'Resolved'); setSelectedHazard(null); setEvidence(null); }} className="w-full bg-emerald-600 text-white font-black py-3.5 rounded-xl active:bg-emerald-700 shadow-md shadow-emerald-200">
                    Mark Resolved
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pt-4 pb-8">
      {/* Big Stats */}
      <div className="px-4">
        <div className="bg-slate-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Safety Score</h2>
              <div className="text-5xl font-black text-emerald-400">{safetyMetrics.safetyScore}%</div>
            </div>
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">PPE Compliance</span>
              <div className="text-xl font-black mt-1">{safetyMetrics.ppeCompliance}%</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Training Compliance</span>
              <div className="text-xl font-black mt-1">{safetyMetrics.trainingCompliance}%</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Hazards Open</span>
              <div className="text-xl font-black mt-1 text-red-400">0{safetyMetrics.openHazards}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Readiness</span>
              <div className="text-xl font-black mt-1">{safetyMetrics.emergencyReadiness}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Safety Categories</h3>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">
          {[
            { label: 'PPE Compliance', value: 89 },
            { label: 'Electrical Safety', value: 94 },
            { label: 'Work at Height', value: 86 },
            { label: 'Fire Safety', value: 96 },
            { label: 'Equipment Safety', value: 91 },
            { label: 'Housekeeping', value: 88 }
          ].map(cat => (
            <div key={cat.label}>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700">{cat.label}</span>
                <span className={cat.value >= 90 ? 'text-emerald-600' : 'text-amber-600'}>{cat.value}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${cat.value >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${cat.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hazards */}
      <div className="px-4 space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Open Hazards</h3>
          <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">{hazards.length} Items</span>
        </div>
        
        {hazards.filter(h => h.status !== 'Resolved').map(h => (
          <div key={h.id} onClick={() => setSelectedHazard(h.id)} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3 active:bg-slate-50 active:scale-[0.98] transition-transform cursor-pointer">
            <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.risk === 'High' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-slate-400">{h.id}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${h.status === 'Open' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-600'}`}>{h.status}</span>
              </div>
              <h4 className="font-black text-slate-800 leading-tight mb-1">{h.issue}</h4>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-2">
                {h.location}
              </p>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned: <span className="text-slate-600">{h.assignedTo}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyOverview;
