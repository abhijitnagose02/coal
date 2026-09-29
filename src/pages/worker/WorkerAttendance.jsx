import React, { useState, useEffect, useRef } from 'react';
import { useWorker } from '../../context/WorkerContext';
import { Calendar, Check, X, Clock, MapPin, LogOut, Camera, ScanLine } from 'lucide-react';

const WorkerAttendance = () => {
  const { attendance, shifts } = useWorker();
  const today = new Date().toISOString().split('T')[0];
  const currentShift = shifts.find(s => s.status === 'Current');
  
  const [isCheckedIn, setIsCheckedIn] = useState(!!attendance.find(a => a.date === today));
  const [checkTime, setCheckTime] = useState(isCheckedIn ? '05:45 AM' : null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    setIsScanning(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Auto scan after 3.5 seconds
      setTimeout(() => {
        if (streamRef.current) {
          stopCamera();
          handleCheckIn();
        }
      }, 3500);
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Camera access denied or unavailable.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckTime(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">View your attendance records and check-in status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Today's Status</h2>
              <div className="text-3xl font-black text-slate-800">{today}</div>
            </div>
            {isCheckedIn ? (
              <div className="text-right flex flex-col items-end">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                  <Check className="w-4 h-4 mr-1" /> Checked In at {checkTime}
                </div>
                <div className="text-sm font-medium text-slate-500 mt-2">Shift: {currentShift?.time}</div>
                <div className="text-sm font-bold text-slate-700 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> Area A - Level 3
                </div>
                <button onClick={handleCheckOut} className="mt-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg flex items-center transition-colors">
                  <LogOut className="w-3 h-3 mr-1" /> Check Out
                </button>
              </div>
            ) : (
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600">
                  Not Checked In
                </div>
              </div>
            )}
          </div>
          {!isCheckedIn && !isScanning && (
             <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                 <span className="text-sm font-bold text-blue-800 block mb-1">Ready to start your shift?</span>
                 <span className="text-xs text-blue-600 flex items-center gap-1"><MapPin className="w-3 h-3"/> Assigned: Area A - Level 3</span>
               </div>
               <button onClick={startScanning} className="bg-[#136c4b] hover:bg-[#0e5239] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
                 <Camera className="w-5 h-5" /> Scan ID Card
               </button>
             </div>
          )}

          {isScanning && (
            <div className="mt-6 p-4 bg-slate-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden h-64 shadow-inner border-4 border-slate-800">
              {cameraError ? (
                <div className="text-center z-10 p-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3">
                    <X className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold mb-1">Camera Error</h3>
                  <p className="text-slate-400 text-sm mb-4">{cameraError}</p>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  
                  <div className="relative z-10 w-56 h-36 border-2 border-dashed border-[#136c4b] rounded-xl overflow-hidden flex items-center justify-center bg-transparent backdrop-blur-sm shadow-[0_0_0_9999px_rgba(15,23,42,0.5)]">
                     <div className="absolute left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] animate-bounce" style={{ animationDuration: '2s' }}></div>
                     <ScanLine className="w-12 h-12 text-[#136c4b] opacity-60" />
                  </div>

                  <div className="relative z-10 mt-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700">
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Scanning ID Card...
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center flex flex-col justify-center">
          <Calendar className="w-8 h-8 text-[#0f4c81] mx-auto mb-3" />
          <div className="text-3xl font-black text-slate-800 mb-1">92%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Rate</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">Recent Records</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Date</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendance.map((record, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800 font-medium">{record.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                    record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {record.status === 'Present' && <Check className="w-3 h-3 mr-1" />}
                    {record.status === 'Absent' && <X className="w-3 h-3 mr-1" />}
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerAttendance;
