import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSafety } from '../../context/SafetyContext';
import { ArrowLeft, Edit3, ShieldCheck, GraduationCap, Award, Star, Activity, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SafetyProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="w-full pb-8">
      {/* Header */}
      <div className="bg-slate-900 px-4 pt-6 pb-20 relative">
        <div className="flex items-center justify-between text-white mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-black tracking-wide">Safety Officer Profile</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-slate-800 transition">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-16 bg-white mb-4">
            <img
              src="/dhairya_deulkar.jpg"
              alt="Dhairya Deulkar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            Dhairya Deulkar
          </h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1 mb-4">
            Safety Officer
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 mt-6 space-y-4">

        {/* Education & Qualifications */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
            Academic Profile
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-black text-slate-800 text-sm">B.Tech Information Technology</h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-start gap-1">
                  Yeshwantrao Chavan College of Engineering, Nagpur
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-black text-slate-800 text-sm">GATE Exam Rank</h4>
                <p className="text-xs font-bold text-purple-600 mt-0.5 bg-purple-100 inline-block px-2 py-0.5 rounded-md">
                  AIR 417
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
            Safety Credentials
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800"> International General Certificate</h4>
                <p className="text-[10px] font-medium text-slate-500 uppercase">All India Rank GATE 417</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Managing Safely</h4>
                <p className="text-[10px] font-medium text-slate-500 uppercase">Certified IIT BOMBAY</p>
                
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-emerald-600 p-5 rounded-3xl shadow-md text-white">
          <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-4">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-700/50 p-4 rounded-2xl">
              <span className="block text-3xl font-black">1,452</span>
              <span className="text-[10px] uppercase font-bold text-emerald-200 mt-1 block">Inspections Completed</span>
            </div>
            <div className="bg-emerald-700/50 p-4 rounded-2xl">
              <span className="block text-3xl font-black">99.8</span>
              <span className="text-[10px] uppercase font-bold text-emerald-200 mt-1 block">Compliance Rating</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl border border-red-100 active:bg-red-100 transition mt-4"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SafetyProfile;
