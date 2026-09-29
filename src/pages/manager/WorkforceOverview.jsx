import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  Users, UserCheck, Clock, ShieldCheck, 
  Award, Briefcase, ChevronRight 
} from 'lucide-react';

const WorkforceOverview = () => {
  const { workforceData, mineDetails } = useManager();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-600">
            <Users className="w-4 h-4" />
            <span>Operational Workforce & Shift Manning Strength</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Workforce Strength & Deployment
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Muster roll tracking, statutory qualification distribution, and shift deployment for {mineDetails.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Present Today</span>
            <span className="text-xl font-bold text-emerald-800">{workforceData.presentToday} ({workforceData.attendancePct}%)</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Roll</span>
            <span className="text-xl font-bold text-slate-800">{workforceData.totalStrength}</span>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0f4c81]" />
            Departmental Manning & Operational Availability
          </h2>
          <span className="text-xs font-semibold text-slate-400">5 Operational Units</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workforceData.departments.map((dept, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="font-bold text-xs text-slate-900 leading-snug">{dept.name}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{dept.present} / {dept.count} Present</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {dept.complianceRate}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-[#0f4c81] rounded-full" 
                  style={{ width: `${(dept.present / dept.count) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Skill Certifications */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-600" />
            Statutory Competency & Certification Registry (CMR 2017)
          </h2>
          <span className="text-xs font-semibold text-emerald-700">100% DGMS Qualified Manning</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gas Testing</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{workforceData.skillCertifications.gasTestingCertified}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Certified Sirdars</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Class</div>
            <div className="text-xl font-bold text-[#0f4c81] mt-1">{workforceData.skillCertifications.firstClassManagers}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Managers</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Second Class</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{workforceData.skillCertifications.secondClassManagers}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Assistant Managers</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overmen</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{workforceData.skillCertifications.overmenForemen}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Foremen</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mining Sirdars</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{workforceData.skillCertifications.miningSirdars}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Section In-Charge</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Aiders</div>
            <div className="text-xl font-bold text-emerald-700 mt-1">{workforceData.skillCertifications.firstAiders}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Trained Personnel</div>
          </div>
        </div>
      </div>

      {/* Individual Personnel Attendance Tracking */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Individual Personnel Tracking
          </h2>
          <span className="text-xs font-semibold text-slate-500">Live Roster</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="p-3 rounded-tl-xl font-bold">Employee Name</th>
                <th className="p-3 font-bold">Role</th>
                <th className="p-3 font-bold">Today's Status</th>
                <th className="p-3 rounded-tr-xl font-bold">Attendance (YTD)</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {workforceData.personnel?.map((person, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0f4c81] text-white flex items-center justify-center text-[9px] shrink-0">
                      {person.name.charAt(0)}
                    </div>
                    {person.name}
                  </td>
                  <td className="p-3 font-medium text-slate-600">{person.role}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      person.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                      person.status === 'Absent' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {person.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{person.attendance}%</span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${person.attendance >= 90 ? 'bg-emerald-500' : person.attendance >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{ width: `${person.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default WorkforceOverview;
