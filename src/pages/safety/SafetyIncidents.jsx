import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { AlertTriangle, Plus, Search, Calendar, CheckCircle2, ArrowLeft, Image as ImageIcon, Upload, Paperclip, Trash2 } from 'lucide-react';

const SafetyIncidents = () => {
  const { incidents, addIncident, deleteIncident } = useSafety();
  const [activeScreen, setActiveScreen] = useState('list'); // list, create, success
  const [evidence, setEvidence] = useState(null);
  
  const [form, setForm] = useState({
    type: '', severity: '', location: '', description: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video')) {
        const fileUrl = URL.createObjectURL(file);
        setEvidence({ name: file.name, type: 'video', url: fileUrl });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setEvidence({
            name: file.name,
            type: 'photo',
            url: dataUrl
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const total = incidents.length;
  const open = incidents.filter(i => i.status === 'Open').length;
  const investigating = incidents.filter(i => i.status === 'Under Investigation').length;
  const resolved = incidents.filter(i => i.status === 'Resolved').length;
  const critical = incidents.filter(i => i.severity === 'Critical').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.severity || !form.location) {
      alert("Please fill all required fields.");
      return;
    }
    const newIncident = {
      id: `INC-2026-0${18 + incidents.length}`,
      type: form.type,
      location: form.location,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      severity: form.severity,
      status: 'Open',
      image: evidence?.url
    };
    addIncident(newIncident);
    
    // Send notification to Mine Manager for all incidents
    const notification = {
      id: Date.now().toString(),
      title: newIncident.severity === 'Critical' ? `EMERGENCY: ${newIncident.type}` :
             newIncident.severity === 'High' ? `High Risk Incident: ${newIncident.type}` :
             `New Incident Reported: ${newIncident.type}`,
      message: `Incident reported by Safety Officer at ${newIncident.location}. Severity: ${newIncident.severity}`,
      evidence: evidence,
      isEmergencyCall: newIncident.severity === 'Critical',
      timestamp: new Date().toISOString(),
      unread: true
    };
    const existing = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
    localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existing]));
    // Trigger a storage event manually in case ManagerDashboard is in the same window
    window.dispatchEvent(new CustomEvent('storage'));
    
    setActiveScreen('success');
  };

  if (activeScreen === 'create') {
    return (
      <div className="w-full pb-8">
        <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm mb-4">
          <button onClick={() => setActiveScreen('list')} className="w-10 h-10 flex items-center justify-center active:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Report Incident</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="px-4 space-y-6">
          <div className="space-y-4 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Incident Type *</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium" value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
                <option value="">Select type</option>
                <option value="Worker Fall">Worker Fall</option>
                <option value="PPE Violation">PPE Violation</option>
                <option value="Electrical Hazard">Electrical Hazard</option>
                <option value="Equipment Failure">Equipment Failure</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Severity *</label>
              <div className="grid grid-cols-2 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map(sev => (
                  <button type="button" key={sev} onClick={() => setForm({...form, severity: sev})} className={`py-2.5 rounded-xl font-bold text-sm border ${form.severity === sev ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-slate-200 text-slate-500'}`}>
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location *</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required>
                <option value="">Select location</option>
                <option value="WCL Coal Mine">WCL Coal Mine</option>
                <option value="Nandgaon Incline Coal Mine">Nandgaon Incline Coal Mine</option>
                <option value="Mahakali Colliery U/G Mine">Mahakali Colliery U/G Mine</option>
                <option value="Ballarpur Opencast Mine, Wcl">Ballarpur Opencast Mine, Wcl</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium h-24" placeholder="What happened?" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
            </div>
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Evidence</label>
              
              {!evidence ? (
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-bold text-slate-500">Add Photo or Video</span>
                </label>
              ) : (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{evidence.name}</span>
                    </div>
                    <button type="button" onClick={() => setEvidence(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Remove</button>
                  </div>
                  {evidence.type === 'photo' ? (
                    <img src={evidence.url} alt="Evidence preview" className="w-full h-32 object-cover rounded-xl mb-3" />
                  ) : (
                    <video src={evidence.url} className="w-full h-32 object-cover rounded-xl mb-3" controls />
                  )}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-200 active:scale-[0.98] transition-transform">
            Submit Incident Report
          </button>
        </form>
      </div>
    );
  }

  if (activeScreen === 'success') {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Incident Reported!</h1>
        <p className="text-slate-500 font-medium mb-8">Status: Open<br/>Notifications sent to management.</p>
        <button onClick={() => setActiveScreen('list')} className="bg-amber-500 text-white font-black py-4 px-8 rounded-2xl w-full active:scale-95 shadow-xl shadow-amber-200">
          Back to Incidents
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pt-4 pb-8">
      {/* Overview */}
      <div className="px-4">
        <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Incident Overview</h2>
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-4xl font-black">{total}</span>
              <p className="text-sm font-medium text-slate-300">Total Incidents</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-red-400">0{critical}</span>
              <p className="text-xs font-bold text-slate-400 uppercase">Critical</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-4">
            <div>
              <span className="block text-lg font-black text-amber-400">0{open}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Open</span>
            </div>
            <div>
              <span className="block text-lg font-black text-orange-400">0{investigating}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Investigating</span>
            </div>
            <div>
              <span className="block text-lg font-black text-emerald-400">0{resolved}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <button onClick={() => setActiveScreen('create')} className="w-full bg-amber-50 border-2 border-dashed border-amber-200 text-amber-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:bg-amber-100 transition-colors">
          <Plus className="w-5 h-5" /> Report New Incident
        </button>
      </div>

      {/* List */}
      <div className="px-4 space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Incident Records</h3>
        {incidents.map(inc => (
          <div key={inc.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-black text-slate-800">{inc.id}</span>
              <div className="flex gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${inc.severity === 'Critical' ? 'bg-red-100 text-red-700' : inc.severity === 'High' ? 'bg-orange-100 text-orange-700' : inc.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                  {inc.severity}
                </span>
                <button onClick={() => deleteIncident(inc.id)} className="p-1 rounded bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 leading-tight mb-1">{inc.type}</h3>
              <p className="text-sm font-medium text-slate-500">{inc.location}</p>
            </div>
            {inc.image && (
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 w-full h-40">
                <img src={inc.image} alt={inc.type} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Image+Expired'; }} />
              </div>
            )}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3"/> {inc.date}</span>
              <span className="text-xs font-black text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{inc.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyIncidents;
