import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorker } from '../../context/WorkerContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ArrowLeft, User, Briefcase, MapPin, Globe, Bell, 
  Shield, Smartphone, Lock, HelpCircle, Info, 
  ChevronRight, Edit3, X, Check, Eye, EyeOff, Loader2 
} from 'lucide-react';

// --- MAIN PROFILE COMPONENT ---

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { profile } = useWorker();
  const { language, setLanguage, t, languages } = useLanguage();
  
  const [activeModal, setActiveModal] = useState(null);

  // Helper to translate mock data
  const tm = (str) => {
    const map = {
      'Mining Worker': t('mock.miningWorker'),
      'Mining Operations': t('mock.miningOperations'),
      'Kamptee Colliery': t('mock.kampteeColliery'),
      'WCL': t('mock.wcl')
    };
    return map[str] || str;
  };

  // Synthetic demo data
  const demoProfile = {
    name: profile?.name || 'Dhruv Patil',
    id: profile?.id || 'WRK001',
    designation: tm(profile?.designation || 'Mining Worker'),
    department: tm(profile?.department || 'Mining Operations'),
    subsidiary: tm(profile?.subsidiary || 'WCL'),
    mine: tm(profile?.location || 'Kamptee Colliery'),
    avatar: profile?.avatar || "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=150&auto=format&fit=crop&q=80",
    email: 'dhruv.patil@wcl.coalindia.in',
    phone: '+91 91234 56789',
    language: languages.find(l => l.code === language)?.name || 'English',
    manager: 'Arun Patel (Shift In-Charge)'
  };

  const SettingsRow = ({ icon: Icon, title, description, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors active:bg-slate-100 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-[#136c4b] group-hover:border-[#136c4b]/20 transition-colors shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="text-[13px] font-bold text-slate-800">{title}</div>
          {description && <div className="text-[11px] font-medium text-slate-500 mt-0.5">{description}</div>}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
    </button>
  );

  const SettingsGroup = ({ title, children }) => (
    <div className="mb-6">
      {title && <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">{title}</h3>}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-24 font-sans selection:bg-amber-100 selection:text-[#0B2545]">
      
      {/* App Header */}
      <div className="sticky top-0 z-30 bg-[#F4F6FA]/90 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:text-[#136c4b] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">{t('profile.title')}</h1>
        <div className="w-10 h-10"></div> {/* Spacer for perfect centering */}
      </div>

      <div className="px-4 mt-2">
        {/* Hero Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 flex flex-col items-center mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#136c4b]"></div>
          
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#f59e0b] overflow-hidden shadow-lg mb-4 relative">
            <img src={demoProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center">{demoProfile.name}</h2>
          <p className="text-sm font-bold text-slate-500 mb-1">{demoProfile.email}</p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#136c4b] uppercase tracking-wider mb-5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Briefcase className="w-3.5 h-3.5" /> {demoProfile.designation}
            <span className="w-1 h-1 bg-emerald-200 rounded-full mx-1"></span>
            <MapPin className="w-3.5 h-3.5" /> {demoProfile.mine}
          </div>

          <button 
            onClick={() => setActiveModal('edit')}
            className="w-full sm:w-auto px-8 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]"
          >
            <Edit3 className="w-4 h-4" />
            {t('profile.editProfile')}
          </button>
        </div>

        {/* Grouped Settings */}
        
        <SettingsGroup title={t('profile.personalInfo')}>
          <SettingsRow 
            icon={User} 
            title={t('profile.personalInfo')} 
            description={`${demoProfile.id} • ${demoProfile.phone}`}
            onClick={() => setActiveModal('personal')} 
          />
          <SettingsRow 
            icon={Briefcase} 
            title={t('profile.workInfo')} 
            description={`${demoProfile.department} • ${demoProfile.subsidiary}`}
            onClick={() => setActiveModal('work')} 
          />
        </SettingsGroup>

        <SettingsGroup title={t('navigation.settings')}>
          <SettingsRow 
            icon={Globe} 
            title={t('profile.language')} 
            description={demoProfile.language}
            onClick={() => setActiveModal('language')} 
          />
          <SettingsRow 
            icon={Bell} 
            title={t('profile.notifications')} 
            onClick={() => setActiveModal('notifications')} 
          />
        </SettingsGroup>

        <SettingsGroup title={t('profile.security')}>
          <SettingsRow 
            icon={Shield} 
            title={t('profile.security')} 
            onClick={() => setActiveModal('security')} 
          />
          <SettingsRow 
            icon={Smartphone} 
            title={t('profile.devices')} 
            description={t('mock.twoActiveDevices')}
            onClick={() => setActiveModal('devices')} 
          />
          <SettingsRow 
            icon={Lock} 
            title={t('profile.changePassword')} 
            onClick={() => setActiveModal('password')} 
          />
        </SettingsGroup>

        <SettingsGroup title={t('profile.support')}>
          <SettingsRow 
            icon={HelpCircle} 
            title={t('profile.support')} 
            onClick={() => setActiveModal('support')} 
          />
          <SettingsRow 
            icon={Info} 
            title={t('profile.about')} 
            onClick={() => setActiveModal('about')} 
          />
        </SettingsGroup>

      </div>

      {activeModal && (
        <Modal 
          activeModal={activeModal} 
          close={() => setActiveModal(null)} 
          profile={demoProfile} 
          t={t}
          language={language}
          setLanguage={setLanguage}
          languages={languages}
        />
      )}
    </div>
  );
};


// --- MODALS SUB-COMPONENT ---

const Modal = ({ activeModal, close, profile, t, language, setLanguage, languages }) => {
  const getTitle = () => {
    switch(activeModal) {
      case 'edit': return t('profile.editProfile');
      case 'personal': return t('profile.personalInfo');
      case 'work': return t('profile.workInfo');
      case 'language': return t('profile.selectLanguage');
      case 'notifications': return t('profile.notifications');
      case 'security': return t('profile.security');
      case 'devices': return t('profile.devices');
      case 'password': return t('profile.changePassword');
      case 'support': return t('profile.support');
      case 'about': return t('profile.about');
      default: return t('navigation.settings');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-xl sm:rounded-3xl rounded-t-3xl h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-100 bg-white z-10">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">{getTitle()}</h2>
          <button onClick={close} className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition focus:outline-none">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {activeModal === 'edit' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                 <div className="w-20 h-20 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm relative group cursor-pointer mb-2">
                   <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover group-hover:opacity-50 transition" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                     <Edit3 className="w-6 h-6 text-slate-800" />
                   </div>
                 </div>
                 <span className="text-xs font-bold text-[#136c4b] cursor-pointer">Change Photo</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
                <input type="text" defaultValue={profile.name} className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm font-medium focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email</label>
                <input type="email" defaultValue={profile.email} className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm font-medium focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Phone Number</label>
                <input type="text" defaultValue={profile.phone} className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm font-medium focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b]" />
              </div>
              <button onClick={close} className="w-full py-3.5 mt-4 bg-[#136c4b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0e5239] transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeModal === 'personal' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Name</span>
                <span className="text-sm font-black text-slate-900">{profile.name}</span>
              </div>
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Worker ID</span>
                <span className="text-sm font-black text-slate-900">{profile.id}</span>
              </div>
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Contact</span>
                <span className="text-sm font-black text-slate-900">{profile.phone}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Email</span>
                <span className="text-sm font-black text-slate-900">{profile.email}</span>
              </div>
            </div>
          )}

          {activeModal === 'work' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Designation</span>
                <span className="text-sm font-black text-slate-900">{profile.designation}</span>
              </div>
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Department</span>
                <span className="text-sm font-black text-slate-900">{profile.department}</span>
              </div>
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Subsidiary</span>
                <span className="text-sm font-black text-slate-900">{profile.subsidiary}</span>
              </div>
              <div className="p-4 border-b border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Mine</span>
                <span className="text-sm font-black text-slate-900">{profile.mine}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-sm font-bold text-slate-500">Manager</span>
                <span className="text-sm font-black text-[#136c4b]">{profile.manager}</span>
              </div>
            </div>
          )}

          {activeModal === 'language' && (
            <div className="space-y-2">
              {languages.slice(0, 8).map(lang => (
                <button 
                  key={lang.code} 
                  onClick={() => {
                    setLanguage(lang.code);
                    close();
                  }} 
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${lang.code === language ? 'border-[#136c4b] bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <span className={`text-sm font-bold ${lang.code === language ? 'text-[#136c4b]' : 'text-slate-700'}`}>{lang.native}</span>
                  {lang.code === language && <Check className="w-5 h-5 text-[#136c4b]" />}
                </button>
              ))}
            </div>
          )}

          {activeModal === 'password' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Current Password</label>
                <div className="relative">
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm font-medium focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">New Password</label>
                <div className="relative">
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm font-medium focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b]" />
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-1 text-right">Fair</p>
              </div>
              <button onClick={close} className="w-full py-3.5 mt-4 bg-[#136c4b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0e5239] transition-colors">
                Update Password
              </button>
            </div>
          )}

          {activeModal === 'devices' && (
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-[#136c4b]/30 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-[#136c4b] p-1.5 bg-emerald-50 rounded-lg" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">Current Device</div>
                    <div className="text-xs font-medium text-slate-500">Android • KoylaSetu App</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Active Now</span>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-slate-500 p-1.5 bg-slate-100 rounded-lg" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">Chrome on Windows</div>
                    <div className="text-xs font-medium text-slate-500">Last active 2 days ago</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-red-500 hover:text-red-600 focus:outline-none">Sign Out</button>
              </div>
            </div>
          )}

          {(activeModal === 'notifications' || activeModal === 'security' || activeModal === 'support' || activeModal === 'about') && (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-800">Feature Prototype</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">This settings page is a frontend prototype. Backend integration is pending.</p>
              <button onClick={close} className="mt-6 px-6 py-2 bg-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-300">
                Acknowledge
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
