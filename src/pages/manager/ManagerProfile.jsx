import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { 
  User, Building2, MapPin, Award, Phone, 
  Mail, ShieldCheck, Globe, LogOut, KeyRound, Edit2, Save, X 
} from 'lucide-react';

const ManagerProfile = () => {
  const { logout } = useAuth();
  const { mineDetails, updateManagerProfile } = useManager();
  const manager = mineDetails.manager;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: manager.email || '',
    phone: manager.phone || '',
    name: manager.name || ''
  });

  const handleSave = () => {
    updateManagerProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a3560] to-[#0f4c81] rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-yellow-400/80 overflow-hidden shadow-lg shrink-0">
          <img 
            src={manager.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"} 
            alt={manager.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center sm:text-left space-y-1 relative w-full pr-8">
          {/* Edit Button */}
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              title="Edit Profile"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          )}

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {isEditing ? (
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="text-2xl font-bold tracking-tight text-slate-900 bg-white px-2 py-1 rounded w-full max-w-[200px]"
              />
            ) : (
              <h1 className="text-2xl font-bold tracking-tight text-white">{manager.name}</h1>
            )}
            {!isEditing && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-yellow-400 text-slate-900">
                Mine Manager
              </span>
            )}
          </div>
          <p className="text-sm text-slate-300 font-medium">{manager.designation}</p>
          <div className="text-xs text-slate-300 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <span>ID: <strong>{manager.id}</strong></span>
            <span>•</span>
            <span>{mineDetails.name}</span>
            <span>•</span>
            <span>{mineDetails.subsidiary.split(' - ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Statutory Credentials & Mine Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Statutory Certificates */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Award className="w-4 h-4 text-yellow-600" />
            <h2 className="text-sm font-bold text-slate-900">DGMS Statutory Qualifications</h2>
          </div>
          
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Certificate Title</span>
              <span className="font-bold text-slate-800">First Class Mine Manager's Certificate of Competency (Coal)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Certificate Number</span>
              <span className="font-bold text-[#0f4c81] font-mono">{manager.statutoryCertificate}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Operational Experience</span>
              <span className="font-semibold text-slate-800">{manager.experience}</span>
            </div>
          </div>
        </div>

        {/* Official Contact & Colliery Station */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Building2 className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">Official Jurisdiction & Contact</h2>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Stationed Colliery</span>
              <span className="font-bold text-slate-800">{mineDetails.name} ({mineDetails.area})</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Email Address</span>
              {isEditing ? (
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <span className="font-semibold text-slate-800">{manager.email}</span>
              )}
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Contact Phone</span>
              {isEditing ? (
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <span className="font-semibold text-slate-800">{manager.phone}</span>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-2 pt-2 border-t border-slate-100 mt-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-[#0f4c81] text-white font-bold py-2 rounded-lg text-xs hover:bg-[#0a3560] transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
              <button 
                onClick={() => {
                  setFormData({ email: manager.email, phone: manager.phone, name: manager.name });
                  setIsEditing(false);
                }}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-2 rounded-lg text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Security & Logout Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="text-xs text-slate-500 font-medium">
          Logged into secure enterprise prototype session (WCL Cluster)
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>

    </div>
  );
};

export default ManagerProfile;
