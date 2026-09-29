import React, { useState, useEffect } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  Bell, AlertTriangle, ShieldAlert, ArrowRight, 
  MapPin, CheckCircle, Clock, ShieldCheck, Paperclip
} from 'lucide-react';

const AlertsEscalations = () => {
  const { attentionItems, openAiExplanation, openActionDetail, escalateAction } = useManager();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [localAlerts, setLocalAlerts] = useState([]);
  const [replyText, setReplyText] = useState({});

  const handleReply = (alertId) => {
    const text = replyText[alertId];
    if (!text) return;
    
    const notification = {
      id: Date.now().toString(),
      title: "Mine Manager Instruction",
      message: text,
      timestamp: new Date().toISOString(),
      unread: true,
      originalAlertId: alertId
    };
    
    const existing = JSON.parse(localStorage.getItem('safetyNotifications') || '[]');
    localStorage.setItem('safetyNotifications', JSON.stringify([notification, ...existing]));
    
    setReplyText({ ...replyText, [alertId]: '' });
    alert('Instruction sent to Safety Officer/Worker!');
  };

  useEffect(() => {
    const loadAlerts = () => {
      const stored = JSON.parse(localStorage.getItem('managerNotifications') || '[]');
      const formatted = stored.map(n => ({
        id: `ALT-${n.id.slice(-4)}`,
        priority: "HIGH",
        severity: "High",
        badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
        what: n.title,
        where: n.message.split(' at ')[1]?.split('.')[0] || "Colliery Zone",
        why: n.message,
        who: "Safety Officer / Worker",
        when: "Just now",
        whatNext: "Review attached evidence and deploy immediate corrective action.",
        evidence: n.evidence,
        isNew: true
      }));
      setLocalAlerts(formatted);
    };
    
    loadAlerts();
    window.addEventListener('storage', loadAlerts);
    // Poll to ensure cross-route sync without refresh
    const interval = setInterval(loadAlerts, 2000);
    return () => {
      window.removeEventListener('storage', loadAlerts);
      clearInterval(interval);
    };
  }, []);

  const mappedAttentionItems = attentionItems.map(item => ({
    id: item.id,
    priority: item.severity.toUpperCase(),
    severity: item.severity,
    badgeColor: item.severity === 'Critical' ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200",
    what: item.title || item.what,
    where: item.where || "Multiple Zones",
    why: item.description || item.why,
    who: item.who || (item.aiGenerated ? "AI Copilot" : "System Sensor"),
    when: item.when || new Date(item.timestamp).toLocaleDateString(),
    whatNext: item.whatNext || (item.actionRequired ? "Immediate Managerial Review Required" : "Monitor closely")
  }));

  const alerts = [
    ...localAlerts,
    ...mappedAttentionItems,
    {
      id: "ALT-05",
      priority: "CRITICAL",
      severity: "Critical",
      badgeColor: "bg-red-100 text-red-700 border-red-200",
      what: "Ground slope settlement rate exceeded 1.5mm/day threshold on Dump 2",
      where: "Overburden Dump 2 (East Flank)",
      why: "Geotechnical piezometer pore pressure spike combined with monsoon runoff saturation.",
      who: "Geotech Survey Team (H. Pillai)",
      when: "Detected 6 hours ago",
      whatNext: "Enforce exclusion zone and deploy laser prism monitoring station.",
      relatedAiId: "AI-SLOPE-04"
    },
    {
      id: "ALT-06",
      priority: "MEDIUM",
      severity: "Medium",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
      what: "Contractor driver safety refresher attendance below 80%",
      where: "Vocational Training Centre (VTC)",
      why: "Shift rotation overlap caused 12 contractor dump truck drivers to miss mandatory DGMS safety class.",
      who: "Sunita Rao (VTC Officer)",
      when: "Detected yesterday",
      whatNext: "Reschedule mandatory evening make-up class before night shift clearance.",
      relatedActionId: "ACT-886"
    }
  ];

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-red-600">
            <Bell className="w-4 h-4" />
            <span>Colliery Alert Stream & Statutory Escalations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Alerts & Escalation Matrix
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time critical events requiring immediate managerial intervention, containment, or subsidiary GM escalation.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {['all', 'critical', 'high', 'medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                filterSeverity === sev ? 'bg-[#0f4c81] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-2xl p-5 border shadow-xs space-y-3 ${alert.isNew ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200/90'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                {alert.isNew && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>}
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${alert.badgeColor}`}>
                  {alert.severity} Severity
                </span>
                <h3 className="text-base font-bold text-slate-900">{alert.what}</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">{alert.when}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <div className="text-slate-500"><strong>Location:</strong> {alert.where}</div>
                <div className="text-slate-600"><strong>Why:</strong> {alert.why}</div>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1">
                <div className="text-slate-700"><strong>Responsible:</strong> {alert.who}</div>
                <div className="text-amber-900 font-semibold"><strong>Required Next Action:</strong> {alert.whatNext}</div>
              </div>
            </div>

            {/* Render uploaded evidence from Safety Officer if present */}
            {alert.evidence && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <Paperclip className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-800 mb-2">Attached Field Evidence ({alert.evidence.type})</p>
                  <div className="max-w-xs rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                    {alert.evidence.type === 'photo' ? (
                      <img src={alert.evidence.url} alt="Evidence" className="w-full h-32 object-cover" />
                    ) : (
                      <video src={alert.evidence.url} controls className="w-full h-32 object-cover" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Interaction / Negotiation Reply Box */}
            {alert.isNew && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                <input 
                  type="text" 
                  value={replyText[alert.id] || ''}
                  onChange={(e) => setReplyText({ ...replyText, [alert.id]: e.target.value })}
                  placeholder="Type an instruction or reply to the Safety Officer..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <button 
                  onClick={() => handleReply(alert.id)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
                >
                  Send Reply
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-mono text-slate-400 font-bold">{alert.id}</span>
              <div className="flex items-center gap-2">
                {alert.relatedAiId && (
                  <button
                    onClick={() => openAiExplanation(alert.relatedAiId)}
                    className="px-3 py-1.5 text-xs font-bold text-[#0f4c81] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    AI Context
                  </button>
                )}
                {alert.relatedActionId && (
                  <button
                    onClick={() => openActionDetail(alert.relatedActionId)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Manage Action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AlertsEscalations;
