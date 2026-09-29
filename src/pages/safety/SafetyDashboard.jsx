import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert, AlertTriangle, ClipboardCheck, Users,
  MapPin, Activity, ChevronRight, ShieldCheck,
  HardHat, BookOpen, Clock3, Bell
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const SafetyDashboard = () => {
  const navigate = useNavigate();
  const { safetyMetrics, incidents } = useSafety();
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  
  const [showWorkerModal, setShowWorkerModal] = useState(false);

  const openIncidents = incidents?.filter(i => i.status === 'Open').length || 0;
  const safetyName = currentUser?.name || 'Dhairya Deulkar';

  // Mock Data
  const alerts = [
    { id: 1, title: 'High Risk Hazard', location: 'Tower B — Floor 4', status: 'Open', time: '10 mins ago' },
    { id: 2, title: 'Missing PPE', location: 'Gate 2 Entrance', status: 'Resolved', time: '2 hours ago' }
  ];

  const activities = [
    { id: 1, text: 'Inspection completed at Zone A', time: '1 hour ago', icon: <ClipboardCheck className="w-4 h-4 text-emerald-500" /> },
    { id: 2, text: 'Incident reported by John Doe', time: '3 hours ago', icon: <AlertTriangle className="w-4 h-4 text-amber-500" /> },
    { id: 3, text: 'Contractor violation detected', time: '5 hours ago', icon: <ShieldAlert className="w-4 h-4 text-red-500" /> }
  ];

  return (
    <div className="w-full space-y-6 pt-4 pb-8">
      {/* Greeting */}
      <div className="px-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {t('dashboard.greeting', { name: safetyName }) || `Welcome, ${safetyName}`}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Here is your safety briefing for today.</p>
      </div>

      {/* Dashboard Stats */}
      <div className="px-4 grid grid-cols-3 gap-3">
        <div onClick={() => navigate('/inspections')} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 active:bg-slate-50 transition-colors cursor-pointer">
          <span className="text-2xl font-black text-slate-800 mb-1">12</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 text-center">Inspections</span>
        </div>
        <div onClick={() => navigate('/incidents')} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 active:bg-slate-50 transition-colors cursor-pointer">
          <span className="text-2xl font-black mb-1 text-amber-500">{openIncidents || 2}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 text-center">Open<br />Incidents</span>
        </div>
        <div onClick={() => navigate('/safety')} className="bg-emerald-600 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-emerald-500 active:bg-emerald-700 transition-colors cursor-pointer text-white">
          <span className="text-2xl font-black mb-1">{safetyMetrics?.safetyScore || 94}%</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 text-center">Safety<br />Score</span>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Main Actions Grid */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3"> Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/workers')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform">
              <div className="w-16 h-16 flex items-center justify-center">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <span className="font-bold text-slate-700">Workers</span>
            </button>
            <button onClick={() => navigate('/inspections')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/dash_inspection.png" alt="Inspection" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-bold text-slate-700">Inspection</span>
            </button>
            <button onClick={() => navigate('/incidents')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/dash_incident.png" alt="Incident" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-bold text-slate-700">Incident</span>
            </button>
            <button onClick={() => navigate('/safety')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/dash_safety.png" alt="Safety" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-bold text-slate-700">Safety</span>
            </button>
          </div>
        </div>


        {/* Mine Maps */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Mine Maps</h2>
          <a
            href="https://www.google.com/maps/search/coal+mine+chandrapur/@19.9097713,79.2276246,11.5z?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="block bg-white rounded-3xl shadow-sm border border-slate-100 p-2 active:scale-[0.98] transition-transform overflow-hidden"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src="/mine_map_chandrapur.png"
                alt="Coal Mine Chandrapur Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg flex items-center gap-2">

                <span className="text-xs font-bold text-slate-800">Open in Maps</span>
              </div>
            </div>
          </a>
        </div>

        {/* Workforce Section */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Workforce</h2>
          <button 
            onClick={() => setShowWorkerModal(true)}
            className="w-full bg-[#136c4b] hover:bg-[#0e5239] text-white p-4 rounded-2xl shadow-sm font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Users className="w-5 h-5" /> Add Worker / View Details
          </button>
        </div>
      </div>

      {/* Add Worker / Details Modal */}
      {showWorkerModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users className="w-5 h-5" /> Worker Details</h3>
              <button onClick={() => setShowWorkerModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Example Worker List */}
              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-xl flex justify-between items-center bg-white hover:bg-slate-50 cursor-pointer transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">DP</div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Dhruv Patil</div>
                      <div className="text-xs text-slate-500">Heavy Machinery Operator • ID: W-1024</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Compliant</span>
                </div>
                
                <div className="p-3 border border-slate-200 rounded-xl flex justify-between items-center bg-white hover:bg-slate-50 cursor-pointer transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">RK</div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Rahul Kumar</div>
                      <div className="text-xs text-slate-500">Drill Operator • ID: W-1088</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-red-100 text-red-700 rounded-full">Suspended</span>
                </div>
              </div>
              
              <hr className="border-slate-100" />
              
              {/* Add New Worker Form */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Add New Worker</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Full Name" className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#136c4b]" />
                  <input type="text" placeholder="Designation" className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#136c4b]" />
                  <button className="w-full py-3 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-colors">
                    Save Worker
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyDashboard;
