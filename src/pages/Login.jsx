import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Building, Eye, EyeOff, Loader2, ShieldAlert, Users, Globe, HardHat, Factory, Lock, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { ComboBox, Label, Input, Button as AriaButton, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState('manager');
  const [userId, setUserId] = useState('manager@demo.local');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 'en' is default language code
  const { language, setLanguage, t, languages } = useLanguage();
  const [subsidiary, setSubsidiary] = useState('SECL - South Eastern Coalfields Limited');

  // We map the roles dynamically so their names translate
  const getRoles = () => [
    { id: 'manager', name: t('manager'), icon: Briefcase },
    { id: 'worker', name: t('worker') || 'Worker', icon: HardHat },
    { id: 'safety_officer', name: t('safetyOfficer') || 'Safety Officer', icon: ShieldAlert },
    { id: 'employee', name: t('employee'), icon: User },
    { id: 'subsidiary_gm', name: t('subsidiaryGM') || 'Subsidiary GM', icon: Users },
    { id: 'cil_hq_director', name: t('cilHqDirector') || 'HQ Director', icon: Globe },
    { id: 'ministry', name: t('ministry'), icon: Building },
    { id: 'contractor', name: t('contractor') || 'Contractor', icon: HardHat }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId.trim()) {
      setError(t('errorUserId'));
      return;
    }
    if (!password.trim()) {
      setError(t('errorPassword'));
      return;
    }

    setIsLoading(true);
    
    // Attempt login with language & subsidiary context
    const result = await login(userId, password, { language, subsidiary });
    
    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setError(result.message); // This currently comes from context, would need translation for prod
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setError('');
    setUserId(`${roleId}@demo.local`);
    setPassword('demo123');
  };

  const currentRoles = getRoles(language);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      


      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 mt-12 sm:mt-0">
        


        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl py-10 px-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sm:rounded-3xl sm:px-12 border border-white border-b-slate-200">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8 border-b border-slate-100 pb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 bg-white rounded-full shadow-md border-[6px] border-slate-50 flex items-center justify-center overflow-hidden transition-transform hover:scale-[1.02]">
              <img 
                src="/koylasetu-logo.jpg" 
                alt="KoylaSetu Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="mt-5 text-[13px] font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-slate-200"></span>
              Unified Intelligence Layer
              <span className="w-8 h-px bg-slate-200"></span>
            </p>
          </div>

          <div className="flex flex-col gap-y-6">
            
            {/* 1. Language Dropdown (Searchable using React Aria ComboBox) */}
            <div className="relative">
              <ComboBox 
                selectedKey={language}
                onSelectionChange={(key) => key && setLanguage(key.toString())}
                className="w-full"
                menuTrigger="focus"
              >
                <Label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('selectLanguage')}
                </Label>
                <div className="relative w-full">
                  <Input 
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-3 pr-10 text-slate-800 font-medium focus:bg-white focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b] transition-all sm:text-sm cursor-text hover:border-slate-300 outline-none"
                  />
                  <AriaButton className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 focus:outline-none hover:text-[#136c4b] transition-colors">
                    <ChevronDown className="w-4 h-4" />
                  </AriaButton>
                </div>
                <Popover className="w-[var(--trigger-width)] bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden mt-2 z-50">
                  <ListBox 
                    className="max-h-48 overflow-y-auto outline-none" 
                    items={languages.map(l => ({ ...l, id: l.code }))}
                  >
                    {(lang) => (
                      <ListBoxItem 
                        id={lang.code}
                        textValue={`${lang.name} ${lang.native}`}
                        className={({ isFocused, isSelected }) => `
                          block w-full text-left px-4 py-3 text-sm font-medium transition-colors cursor-pointer outline-none
                          ${isSelected ? 'bg-[#136c4b]/5 text-[#136c4b]' : ''}
                          ${isFocused && !isSelected ? 'bg-slate-50 text-[#136c4b]' : ''}
                          ${!isSelected && !isFocused ? 'text-slate-700' : ''}
                        `}
                      >
                        {lang.name} — {lang.native}
                      </ListBoxItem>
                    )}
                  </ListBox>
                </Popover>
              </ComboBox>
            </div>

            {/* 2. Role Selection Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t('selectRole')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentRoles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role.id)}
                      className={`group relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-200 ease-in-out bg-white ${
                        isSelected 
                          ? 'border-[#136c4b] border-2 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 transition-colors ${isSelected ? 'text-[#136c4b]' : 'text-slate-400 group-hover:text-slate-500'}`} />
                      <span className={`text-[11px] leading-tight text-center font-bold tracking-wide ${isSelected ? 'text-[#136c4b]' : 'text-slate-500 group-hover:text-slate-600'}`}>
                        {role.name}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[#136c4b] rounded-full flex items-center justify-center shadow-sm border border-white">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Conditional Subsidiary Dropdown */}
            {selectedRole !== 'ministry' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('selectSubsidiary')}</label>
                <select 
                  value={subsidiary}
                  onChange={(e) => setSubsidiary(e.target.value)}
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 px-3 text-slate-800 font-medium focus:bg-white focus:border-[#136c4b] focus:ring-1 focus:ring-[#136c4b] transition-all sm:text-sm cursor-pointer hover:border-slate-300"
                >
                  <option>SECL - South Eastern Coalfields Limited</option>
                  <option>MCL - Mahanadi Coalfields Limited</option>
                  <option>NCL - Northern Coalfields Limited</option>
                  <option>ECL - Eastern Coalfields Limited</option>
                  <option>WCL - Western Coalfields Limited</option>
                  <option>CCL - Central Coalfields Limited</option>
                  <option>BCCL - Bharat Coking Coal Limited</option>
                  <option>CMPDI - Central Mine Planning & Design Institute</option>
                  <option>CIL HQ - Coal India Limited Headquarters</option>
                </select>
              </div>
            )}

            {/* 4. Login Form */}
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="userId" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('userId')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#136c4b] transition-colors" />
                  </div>
                  <input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-slate-900 font-medium focus:bg-white focus:border-[#136c4b] focus:ring-2 focus:ring-[#136c4b]/20 transition-all sm:text-sm"
                    placeholder={`e.g. ${selectedRole}@demo.local`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('password')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#136c4b] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-slate-900 font-medium focus:bg-white focus:border-[#136c4b] focus:ring-2 focus:ring-[#136c4b]/20 transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#136c4b] transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {selectedRole !== 'manager' && selectedRole !== 'worker' && selectedRole !== 'safety_officer' && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r text-sm text-amber-700 font-medium flex items-start shadow-sm">
                  <AlertTriangle className="w-5 h-5 mr-2.5 flex-shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <strong>Under Maintenance</strong>
                    <p className="mt-0.5 text-xs">This role portal is currently undergoing scheduled maintenance. Please try again later.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r text-sm text-red-700 font-medium flex items-center shadow-sm">
                  <ShieldAlert className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading || (selectedRole !== 'manager' && selectedRole !== 'worker' && selectedRole !== 'safety_officer')}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#136c4b] hover:bg-[#0e5239] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#136c4b] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t('signingIn')}
                    </>
                  ) : (
                    t('signIn')
                  )}
                </button>
              </div>
              
              <div className="text-center mt-6 border-t border-slate-100 pt-5">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#f1f5f9] text-[#64748b]">
                  {t('prototypeMsg')}
                </span>
              </div>
            </form>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Login;
