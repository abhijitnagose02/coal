import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { initialInspections } from '../../context/ManagerContext';
import { ClipboardCheck, Plus, Search, Calendar, CheckCircle2, ArrowLeft, Image as ImageIcon, Upload, Paperclip, Trash2 } from 'lucide-react';

const SafetyInspections = () => {
  const { inspections, addInspection, deleteInspection } = useSafety();
  const [activeScreen, setActiveScreen] = useState('list'); // list, create, success

  const [form, setForm] = useState({
    area: '', type: '', checklist: false, ppe: false, status: ''
  });
  
  const [evidenceList, setEvidenceList] = useState([]);

  const [reportEvidence, setReportEvidence] = useState(null);
  const [reportTitle, setReportTitle] = useState('');

  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video')) {
         setReportEvidence({ name: file.name, type: 'video', url: URL.createObjectURL(file) });
         return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setReportEvidence({ name: file.name, type: 'photo', url: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendReport = (e) => {
    e.preventDefault();
    if (!reportEvidence) {
      alert("Please upload a file for the report.");
      return;
    }
    const notification = {
      id: Date.now().toString(),
      title: reportTitle || 'New Safety Report',
      message: 'A general safety report was sent by the Safety Officer.',
      evidence: reportEvidence,
      timestamp: new Date().toISOString(),
      unread: true
    };
    const existing = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
    localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existing]));
    window.dispatchEvent(new CustomEvent('storage'));
    
    setReportEvidence(null);
    setReportTitle('');
    setActiveScreen('report_success');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && evidenceList.length < 3) {
      if (file.type.startsWith('video')) {
        const fileUrl = URL.createObjectURL(file);
        setEvidenceList(prev => [...prev, { name: file.name, type: 'video', url: fileUrl }]);
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
          setEvidenceList(prev => [...prev, {
            name: file.name,
            type: 'photo',
            url: dataUrl
          }]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const total = inspections.length;
  const completed = inspections.filter(i => i.status === 'Completed').length;
  const pending = inspections.filter(i => i.status === 'Pending').length;
  const failed = inspections.filter(i => i.status === 'Failed').length;
  const complianceRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.area || !form.type || !form.status) {
      alert("Please fill all required fields.");
      return;
    }
    const newInspection = {
      id: `INS-${1000 + Math.floor(Math.random() * 9000)}`,
      area: form.area,
      type: form.type,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      officer: 'Safety Officer',
      status: form.status === 'pass' ? 'Completed' : 'Failed',
      score: form.status === 'pass' ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 40) + 20,
      image: evidenceList.length > 0 ? evidenceList[0].url : null,
      images: evidenceList.map(e => e.url)
    };
    addInspection(newInspection);

    const notification = {
      id: Date.now().toString(),
      title: `New Inspection: ${newInspection.type}`,
      message: `Inspection by Safety Officer at ${newInspection.area}. Status: ${newInspection.status}`,
      evidence: evidenceList.length > 0 ? evidenceList[0] : null,
      timestamp: new Date().toISOString(),
      unread: true
    };
    const existing = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
    localStorage.setItem('managerNotifications', JSON.stringify([notification, ...existing]));

    let existingInspections = JSON.parse(localStorage.getItem('manager_inspections'));
    if (!existingInspections) existingInspections = initialInspections;
    
    const managerInspection = {
      id: newInspection.id,
      title: newInspection.type,
      date: newInspection.date,
      inspector: 'Dhairya Deulkar',
      type: newInspection.type,
      status: newInspection.status,
      severity: newInspection.status === 'Failed' ? 'High' : 'Low',
      location: newInspection.area,
      zone: newInspection.area,
      findings: [
        newInspection.status === 'Failed' ? 'Random worker failed safety check' : 'Random worker passed safety check'
      ],
      images: evidenceList.map(e => e.url),
      personnel: {
        safetyOfficers: ['Dhairya Deulkar'],
        workers: ['Aryan Bhute']
      }
    };
    
    const newStored = [managerInspection, ...existingInspections];
    localStorage.setItem('manager_inspections', JSON.stringify(newStored));
    // trigger storage event for same tab
    window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'manager_inspections', value: newStored } }));

    setActiveScreen('success');
  };

  if (activeScreen === 'create') {
    return (
      <div className="w-full pb-8">
        <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm mb-4">
          <button onClick={() => setActiveScreen('list')} className="w-10 h-10 flex items-center justify-center active:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">New Inspection</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-4 space-y-6">
          <div className="space-y-4 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Area / Location *</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} required>
                <option value="">Select location</option>
                <option value="WCL Coal Mine">WCL Coal Mine</option>
                <option value="Nandgaon Incline Coal Mine">Nandgaon Incline Coal Mine</option>
                <option value="Mahakali Colliery U/G Mine">Mahakali Colliery U/G Mine</option>
                <option value="Ballarpur Opencast Mine, Wcl">Ballarpur Opencast Mine, Wcl</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Inspection Type *</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required>
                <option value="">Select type</option>
                <option value="PPE & Safety Inspection">PPE & Safety</option>
                <option value="Electrical Safety">Electrical Safety</option>
                <option value="Equipment Inspection">Equipment Inspection</option>
                <option value="Maintenance Safety">Maintenance Safety</option>

                <option value="Training & Awareness">Training & Awareness</option>
                <option value="Emergency Preparedness">Emergency Preparedness</option>

                <option value="Work Permit System">Work Permit System</option>
                <option value="Confined Space Entry">Confined Space Entry</option>
                <option value="Electrical Safety">Electrical Safety</option>
                <option value="Equipment Inspection">Equipment Inspection</option>
                <option value="Maintenance Safety">Maintenance Safety</option>
                <option value="Training & Awareness">Training & Awareness</option>
                <option value="Emergency Preparedness">Emergency Preparedness</option>
                <option value="Work Permit System">Work Permit System</option>
                <option value="Confined Space Entry">Confined Space Entry</option>
                <option value="Electrical Safety">Electrical Safety</option>



              </select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Final Status *</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setForm({ ...form, status: 'pass' })} className={`flex-1 py-3 rounded-xl font-bold text-sm border ${form.status === 'pass' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-500'}`}>Pass</button>
              <button type="button" onClick={() => setForm({ ...form, status: 'fail' })} className={`flex-1 py-3 rounded-xl font-bold text-sm border ${form.status === 'fail' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-slate-200 text-slate-500'}`}>Fail</button>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photo/Evidence (Max 3)</label>
            
            {evidenceList.length < 3 && (
              <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors">
                <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-500">Add Photo or Video</span>
              </label>
            )}

            {evidenceList.length > 0 && (
              <div className="space-y-3 mt-4">
                {evidenceList.map((ev, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-5 h-5 text-slate-500" />
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{ev.name}</span>
                      </div>
                      <button type="button" onClick={() => setEvidenceList(evidenceList.filter((_, i) => i !== idx))} className="text-xs font-bold text-red-500 hover:text-red-700">Remove</button>
                    </div>
                    {ev.type === 'photo' ? (
                      <img src={ev.url} alt="Evidence preview" className="w-full h-32 object-cover rounded-xl mb-3" />
                    ) : (
                      <video src={ev.url} className="w-full h-32 object-cover rounded-xl mb-3" controls />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 active:scale-[0.98] transition-transform">
            Submit Inspection
          </button>
        </form>
      </div>
    );
  }

  if (activeScreen === 'success') {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Inspection Submitted!</h1>
        <p className="text-slate-500 font-medium mb-8">Saved successfully on {new Date().toLocaleDateString()}</p>
        <button onClick={() => setActiveScreen('list')} className="bg-emerald-600 text-white font-black py-4 px-8 rounded-2xl w-full active:scale-95 shadow-xl shadow-emerald-200">
          Back to Inspections
        </button>
      </div>
    );
  }

  if (activeScreen === 'report') {
    return (
      <div className="w-full pb-8">
        <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm mb-4">
          <button onClick={() => setActiveScreen('list')} className="w-10 h-10 flex items-center justify-center active:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Send Report</h1>
        </div>
        <form onSubmit={handleSendReport} className="px-4 space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Report Title (Optional)</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-medium" placeholder="E.g., Site Condition Update" value={reportTitle} onChange={e => setReportTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photo/Evidence *</label>
              {!reportEvidence ? (
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleReportUpload} />
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-bold text-slate-500">Add Photo or Video</span>
                </label>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-slate-500" />
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{reportEvidence.name}</span>
                    </div>
                    <button type="button" onClick={() => setReportEvidence(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Remove</button>
                  </div>
                  {reportEvidence.type === 'photo' ? (
                    <img src={reportEvidence.url} alt="Evidence preview" className="w-full h-32 object-cover rounded-xl mb-3" />
                  ) : (
                    <video src={reportEvidence.url} className="w-full h-32 object-cover rounded-xl mb-3" controls />
                  )}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform">
            Send to Manager
          </button>
        </form>
      </div>
    );
  }

  if (activeScreen === 'report_success') {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Report Sent!</h1>
        <p className="text-slate-500 font-medium mb-8">The manager has been notified.</p>
        <button onClick={() => setActiveScreen('list')} className="bg-blue-600 text-white font-black py-4 px-8 rounded-2xl w-full active:scale-95 shadow-xl shadow-blue-200">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pt-4 pb-8">
      {/* Overview */}
      <div className="px-4">
        <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Inspection Overview</h2>
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-4xl font-black">{total}</span>
              <p className="text-sm font-medium text-slate-300">Total Inspections</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">{complianceRate}%</span>
              <p className="text-xs font-bold text-slate-400 uppercase">Compliance</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${complianceRate}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-4">
            <div>
              <span className="block text-lg font-black text-emerald-400">{completed}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Completed</span>
            </div>
            <div>
              <span className="block text-lg font-black text-amber-400">0{pending}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Pending</span>
            </div>
            <div>
              <span className="block text-lg font-black text-red-400">0{failed}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Failed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 flex gap-3">
        <button onClick={() => setActiveScreen('create')} className="flex-1 bg-emerald-50 border-2 border-dashed border-emerald-200 text-emerald-600 font-black py-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 active:bg-emerald-100 transition-colors">
          <Plus className="w-6 h-6" /> 
          <span className="text-xs text-center leading-tight">Start<br/>Inspection</span>
        </button>
        <button onClick={() => setActiveScreen('report')} className="flex-1 bg-blue-50 border-2 border-dashed border-blue-200 text-blue-600 font-black py-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 active:bg-blue-100 transition-colors">
          <Upload className="w-6 h-6" /> 
          <span className="text-xs text-center leading-tight">Send<br/>Report</span>
        </button>
      </div>

      {/* List */}
      <div className="px-4 space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Inspection Records</h3>
        {inspections.map(insp => (
          <div key={insp.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-black text-slate-800">{insp.id}</span>
              <div className="flex gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${insp.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : insp.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {insp.status}
                </span>
                <button onClick={() => deleteInspection(insp.id)} className="p-1 rounded bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-slate-800">{insp.area}</p>
              {insp.address && <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{insp.address}</p>}
              <p className="text-xs font-bold text-amber-600 mt-2 uppercase tracking-wide">{insp.type}</p>
            </div>
            {(insp.images && insp.images.length > 0) ? (
              <div className="mt-1 grid grid-cols-2 gap-2">
                {insp.images.map((imgUrl, idx) => (
                   <div key={idx} className="rounded-xl overflow-hidden border border-slate-100 h-24 w-full">
                     <img src={imgUrl} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Expired'; }} />
                   </div>
                ))}
              </div>
            ) : insp.image && (
              <div className="mt-1 rounded-xl overflow-hidden border border-slate-100 h-32 w-full">
                <img src={insp.image} alt={insp.area} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Expired'; }} />
              </div>
            )}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {insp.date}</span>
              {insp.score && <span className="text-sm font-black text-slate-800">Score: {insp.score}%</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyInspections;
