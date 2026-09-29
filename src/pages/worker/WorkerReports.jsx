import React, { useState } from 'react';
import { useWorker } from '../../context/WorkerContext';
import { FileText, Plus, AlertTriangle } from 'lucide-react';

const WorkerReports = () => {
  const { reports, submitReport } = useWorker();
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState('Safety Observation');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [proof, setProof] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReport({ type: reportType, location, desc, severity, proof });
    setShowModal(false);
    setLocation('');
    setDesc('');
    setSeverity('Medium');
    setProof(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Submit and track your safety observations and incident reports.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#136c4b] hover:bg-[#0e5239] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> New Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Report</th>
              <th className="px-6 py-4 border-b border-slate-200">Severity</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
              <th className="px-6 py-4 border-b border-slate-200">Assigned To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{r.type}</div>
                  <div className="text-xs text-slate-500 mt-1 truncate max-w-[250px]">{r.desc}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    r.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    r.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    r.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-600' // Default to Low or undefined
                  }`}>
                    {r.severity || 'Medium'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    r.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                    r.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-slate-100 text-slate-800' // Reported or Escalated
                  }`}>
                    {r.status || 'Reported'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {r.assignedTo || 'Safety Officer'}
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No reports submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800">Report Safety Issue</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Issue Type</label>
                  <select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none text-sm"
                  >
                    <option value="Unsafe equipment">Unsafe equipment</option>
                    <option value="Hazardous area">Hazardous area</option>
                    <option value="Fire/smoke">Fire/smoke</option>
                    <option value="Electrical issue">Electrical issue</option>
                    <option value="PPE issue">PPE issue</option>
                    <option value="Accident/near miss">Accident/near miss</option>
                    <option value="Unsafe worker behavior">Unsafe worker behavior</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Severity</label>
                  <select 
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none text-sm"
                >
                  <option value="">Select location</option>
                  <option value="WCL Coal Mine">WCL Coal Mine</option>
                  <option value="Nandgaon Incline Coal Mine">Nandgaon Incline Coal Mine</option>
                  <option value="Mahakali Colliery U/G Mine">Mahakali Colliery U/G Mine</option>
                  <option value="Ballarpur Opencast Mine, Wcl">Ballarpur Opencast Mine, Wcl</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  rows={3}
                  placeholder="Describe the issue in detail..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Photo/Video (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setProof(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#0f4c81] hover:file:bg-blue-100 transition-colors cursor-pointer" 
                />
                {proof && (
                  <div className="mt-3">
                    {proof.startsWith('data:video') ? (
                      <video src={proof} controls className="h-32 rounded-lg border border-slate-200" />
                    ) : (
                      <img src={proof} alt="Upload Preview" className="h-32 object-contain rounded-lg border border-slate-200" />
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm shadow-sm hover:bg-red-700">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerReports;
