import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ManagerContext = createContext();

export const useManager = () => useContext(ManagerContext);

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialMineDetails = {
  name: "Kamptee Colliery",
  subsidiary: "WCL - Western Coalfields Limited",
  type: "Underground",
  location: "Nagpur, Maharashtra",
  manager: { 
    name: "Shri Asheesh Kumar", 
    designation: "Mine Manager",
    id: "EMP-204481",
    statutoryCertificate: "DGMS/FCC/2012/4482",
    experience: "14 Years (Underground Coal)",
    email: "asheesh.kumar@coalindia.in",
    phone: "+91 98765 43210",
    avatar: "/manager_profile.png"
  },
  complianceScore: 87,
  riskLevel: "Medium",
  lastInspection: "2026-09-08",
  shifts: { current: "Morning Shift (06:00–14:00)", totalWorkers: 342 }
};

const initialKpis = {
  complianceScore: 87,
  openActions: 12,
  overdueActions: 3,
  pendingInspections: 4,
  activeIncidents: 2,
  workforcePresent: 289,
  safetyScore: 91,
  riskIndex: 34,
  aiAlertsToday: 5
};

const initialAttentionItems = [
  {
    id: "ATT-1",
    type: "Risk Escalation",
    severity: "Critical",
    title: "Ventilation failure in Sector 4",
    description: "Methane levels approaching statutory threshold in underground Sector 4 due to ventilation duct damage.",
    timestamp: "2026-09-09T08:14:00Z",
    aiGenerated: true,
    actionRequired: true
  },
  {
    id: "ATT-2",
    type: "Deadline Breach",
    severity: "High",
    title: "Corrective Action ACT-332 Overdue",
    description: "Repair of damaged ventilation duct was due 2026-09-06. Assigned to Prakash Verma.",
    timestamp: "2026-09-08T18:30:00Z",
    aiGenerated: false,
    actionRequired: true
  },
  {
    id: "ATT-3",
    type: "AI Insight",
    severity: "Medium",
    title: "Recurring dust suppression delays",
    description: "Pattern detected: Dust suppression system activations delayed by avg. 22 minutes across last 7 shifts.",
    timestamp: "2026-09-07T14:20:00Z",
    aiGenerated: true,
    actionRequired: false
  }
];

const initialAiInsights = [
  {
    id: "AI-201",
    riskCategory: "Safety",
    riskLevel: "High",
    finding: "Recurring compliance pattern detected: Roof support delays",
    reason: "Previous 3 inspections (INS-1021, INS-1033, INS-1042) flagged identical observations in Sector 2. Corrective action ACT-290 remains unresolved.",
    recommendedAction: "Mandatory structural audit and immediate supervisor escalation.",
    confidenceScore: 92
  },
  {
    id: "AI-202",
    riskCategory: "Environmental",
    riskLevel: "Medium",
    finding: "Predictive alert: Elevated SPM (Suspended Particulate Matter)",
    reason: "Current wind velocity combined with inactive sprinklers in Zone B strongly correlates with previous DGMS emission violations.",
    recommendedAction: "Activate automated dust suppression protocols immediately.",
    confidenceScore: 85
  },
  {
    id: "AI-203",
    riskCategory: "Workforce",
    riskLevel: "Low",
    finding: "Fatigue risk: Extended overtime pattern for 12 workers",
    reason: "12 workers have exceeded 48-hour weekly limits in 3 of the last 4 weeks. Correlates with 18% higher incident probability.",
    recommendedAction: "Redistribute shift allocations and enforce mandatory rest periods.",
    confidenceScore: 78
  }
];

const initialCorrectiveActions = [
  {
    id: "ACT-332",
    observationId: "OBS-204",
    title: "Repair damaged ventilation duct in Sector 4",
    assignedTo: "Prakash Verma",
    deadline: "2026-09-06",
    status: "Overdue",
    riskLevel: "High",
    description: "Ventilation duct in Sector 4 underground zone has sustained physical damage causing reduced airflow."
  },
  {
    id: "ACT-335",
    observationId: "OBS-211",
    title: "Install additional roof bolts at Panel 5",
    assignedTo: "Suresh Patil",
    deadline: "2026-09-12",
    status: "In Progress",
    riskLevel: "High",
    description: "Roof bolt spacing exceeds statutory limits in Panel 5. Additional bolts required."
  },
  {
    id: "ACT-338",
    observationId: "OBS-215",
    title: "Calibrate fixed gas monitors in Main Haulage",
    assignedTo: "Amit Desai",
    deadline: "2026-09-10",
    status: "Pending Verification",
    riskLevel: "Medium",
    description: "Scheduled calibration of methane and CO sensors in main haulage roadway."
  }
];

const initialWorkforceData = {
  totalStrength: 342,
  presentToday: 289,
  attendancePct: 84,
  present: 289,
  absent: 53,
  onLeave: 18,
  contractors: 47,
  shifts: [
    { name: "Morning (06:00–14:00)", workers: 145, status: "Active" },
    { name: "Afternoon (14:00–22:00)", workers: 98, status: "Upcoming" },
    { name: "Night (22:00–06:00)", workers: 46, status: "Completed" }
  ],
  departments: [
    { name: "Mining Operations", count: 124, present: 105, complianceRate: "98%" },
    { name: "Safety & Compliance", count: 32, present: 30, complianceRate: "100%" },
    { name: "Maintenance", count: 45, present: 41, complianceRate: "95%" },
    { name: "Transport", count: 38, present: 34, complianceRate: "92%" },
    { name: "Administration", count: 22, present: 19, complianceRate: "100%" },
    { name: "Contractors", count: 47, present: 45, complianceRate: "90%" }
  ],
  skillCertifications: {
    gasTestingCertified: 18,
    firstClassManagers: 2,
    secondClassManagers: 4,
    overmenForemen: 12,
    miningSirdars: 24,
    firstAiders: 45
  },
  personnel: [
    { id: "EMP-101", name: "Sunil Verma", role: "Safety Officer", status: "Present", attendance: 98 },
    { id: "EMP-102", name: "Priya Patel", role: "Safety Officer", status: "Present", attendance: 95 },
    { id: "EMP-103", name: "Anil Sharma", role: "Inspector", status: "Present", attendance: 92 },
    { id: "EMP-104", name: "Vikram Singh", role: "Inspector", status: "On Leave", attendance: 88 },
    { id: "EMP-105", name: "Dhruv Patil", role: "Mining Worker", status: "Present", attendance: 96 },
    { id: "EMP-106", name: "Amit Desai", role: "Mining Worker", status: "Present", attendance: 94 },
    { id: "EMP-107", name: "Prakash Verma", role: "Mining Worker", status: "Absent", attendance: 85 },
    { id: "EMP-108", name: "Suresh Patil", role: "Blaster", status: "Present", attendance: 99 },
    { id: "EMP-109", name: "Vijay Shinde", role: "Equipment Operator", status: "Present", attendance: 97 },
    { id: "EMP-110", name: "Manoj Das", role: "Mining Worker", status: "Present", attendance: 91 },
    { id: "EMP-111", name: "Sanjay Kumar", role: "Mining Worker", status: "On Leave", attendance: 89 },
    { id: "EMP-112", name: "Ramesh Tiwari", role: "Maintenance", status: "Present", attendance: 93 },
    { id: "EMP-113", name: "Deepak Roy", role: "Mining Worker", status: "Present", attendance: 90 }
  ]
};

const initialIncidents = [
  {
    id: "INC-701",
    title: "Minor roof fall in Panel 3",
    severity: "High",
    status: "Under Investigation",
    reportedBy: "Vijay Shinde",
    date: "2026-09-08",
    location: "Panel 3, Underground",
    injuries: 0,
    description: "Small roof fall (~2m²) detected during shift change. Area cordoned off immediately."
  },
  {
    id: "INC-702",
    title: "Conveyor belt slippage at Surface Plant",
    severity: "Medium",
    status: "Resolved",
    reportedBy: "Ramesh Tiwari",
    date: "2026-09-07",
    location: "Surface Processing Plant",
    injuries: 0,
    description: "Belt tracking issue caused 45-min stoppage. Realigned and operational."
  }
];

export const initialInspections = [
  {
    id: "INS-1042",
    title: "Opencast Extraction Zone Audit",
    date: "2026-09-08",
    inspector: "Anil Sharma",
    type: "Safety Audit",
    status: "Completed",
    severity: "High",
    location: "Opencast Sector 2",
    zone: "Opencast Sector 2",
    findings: [
      "Dust suppression system delayed activation in hauling area.",
      "Heavy machinery operating near blast zone."
    ],
    relatedActionId: "ACT-335",
    images: ["/inspection_1.png", "/inspection_2.png"],
    personnel: {
      safetyOfficers: ["Sunil Verma (Lead SO)", "Rajesh Tiwari"],
      workers: ["Dhruv Patil (Operator)", "Amit Desai", "Prakash Verma", "Suresh Patil (Blaster)", "Vijay Shinde", "Manoj Das"]
    }
  },
  {
    id: "INS-1043",
    title: "Surface Plant Machinery Check",
    date: "2026-09-09",
    inspector: "Vikram Singh",
    type: "Environmental Check",
    status: "In Progress",
    severity: "Medium",
    location: "Surface Plant",
    zone: "Surface Plant",
    findings: [
      "Minor oil spill near crusher unit.",
    ],
    relatedActionId: "ACT-338",
    images: ["/inspection_3.png", "/inspection_4.png"],
    personnel: {
      safetyOfficers: ["Priya Patel (Env Lead)"],
      workers: ["Sanjay Kumar", "Ramesh Tiwari", "Deepak Roy"]
    }
  }
];

const initialComplianceHealth = {
  overallScore: 87,
  categories: [
    { name: "Safety Equipment", score: 92, status: "Good" },
    { name: "Ventilation Standards", score: 78, status: "Needs Attention" },
    { name: "Fire Prevention", score: 95, status: "Excellent" },
    { name: "Electrical Safety", score: 84, status: "Good" },
    { name: "Roof Support", score: 71, status: "Critical" },
    { name: "Dust Suppression", score: 80, status: "Needs Attention" }
  ],
  recentViolations: [
    { id: "VIO-101", rule: "CMR 2017, Rule 106", description: "Inadequate roof bolt spacing in Panel 5", date: "2026-09-08", severity: "High" },
    { id: "VIO-102", rule: "CMR 2017, Rule 183", description: "Dust suppression system delayed activation", date: "2026-09-07", severity: "Medium" }
  ]
};

const initialRiskCategories = [
  { name: "Structural", level: "High", score: 72, trend: "worsening" },
  { name: "Gas & Ventilation", level: "High", score: 68, trend: "stable" },
  { name: "Electrical", level: "Medium", score: 82, trend: "improving" },
  { name: "Fire", level: "Low", score: 93, trend: "stable" },
  { name: "Environmental", level: "Medium", score: 79, trend: "worsening" },
  { name: "Workforce Safety", level: "Low", score: 88, trend: "improving" }
];

const initialContractors = [
  {
    id: "CON-01",
    name: "L&T Mining Services",
    workers: 28,
    complianceScore: 76,
    activeProjects: 3,
    status: "Active",
    licenceExpiry: "2027-03-15"
  },
  {
    id: "CON-02",
    name: "Thriveni Earthmovers",
    workers: 19,
    complianceScore: 91,
    activeProjects: 2,
    status: "Active",
    licenceExpiry: "2026-12-01"
  }
];

const initialApprovals = [
  {
    id: "APR-501",
    type: "Leave Request",
    requestedBy: "Suresh Patil",
    date: "2026-09-10",
    status: "Pending",
    details: "Medical leave for 3 days (Sep 11-13)"
  },
  {
    id: "APR-502",
    type: "Equipment Request",
    requestedBy: "Ramesh Tiwari",
    date: "2026-09-09",
    status: "Pending",
    details: "Replacement of 4 methane sensors in District 2"
  },
  {
    id: "APR-503",
    type: "Overtime Authorization",
    requestedBy: "Vijay Shinde",
    date: "2026-09-09",
    status: "Approved",
    details: "Extended shift for Panel 3 roof fall cleanup"
  },
  {
    id: "APR-504",
    type: "STATUTORY APPROVAL",
    requestedBy: "Zone 4B Supervisor",
    date: "2026-09-12",
    status: "Pending",
    details: "Overburden Blasting Clearance (Pre-blast sign-off)"
  }
];

const initialDocuments = [
  { id: "DOC-01", name: "Mine Plan (Form-A)", status: "Valid", expiry: "2027-06-30", category: "Statutory" },
  { id: "DOC-02", name: "Safety Management Plan", status: "Valid", expiry: "2026-12-31", category: "Safety" },
  { id: "DOC-03", name: "Environmental Clearance", status: "Expiring Soon", expiry: "2026-10-15", category: "Environment" },
  { id: "DOC-04", name: "DGMS Inspection Report", status: "Valid", expiry: "2027-03-31", category: "Regulatory" }
];

const initialAuditHistory = [
  { id: "AUD-01", action: "Inspection INS-1042 completed", user: "Anil Sharma", timestamp: "2026-09-08T16:30:00Z", type: "Inspection" },
  { id: "AUD-02", action: "Corrective Action ACT-335 status changed to In Progress", user: "Suresh Patil", timestamp: "2026-09-08T10:15:00Z", type: "Action" },
  { id: "AUD-03", action: "Incident INC-701 reported", user: "Vijay Shinde", timestamp: "2026-09-08T09:45:00Z", type: "Incident" },
  { id: "AUD-04", action: "AI Alert AI-201 acknowledged", user: "Amit Sharma", timestamp: "2026-09-07T17:00:00Z", type: "AI" }
];

const initialGisZones = [
  { id: "Z-1", name: "Opencast Coal Mine", riskLevel: "Low", riskScore: 12, workers: 120, status: "Normal", coordinates: { x: 8, y: 17 }, sensors: { methaneCH4: "0.1%", airVelocity: "N/A" } },
  { id: "Z-2", name: "Shah Coal Pvt. Ltd.", riskLevel: "Medium", riskScore: 45, workers: 85, status: "Alert", coordinates: { x: 37, y: 29 }, sensors: { methaneCH4: "0.3%", airVelocity: "N/A" } },
  { id: "Z-3", name: "Agarwal Coal", riskLevel: "Low", riskScore: 22, workers: 45, status: "Normal", coordinates: { x: 57, y: 8 }, sensors: { methaneCH4: "0.1%", airVelocity: "N/A" } },
  { id: "Z-4", name: "Mahakali Colliery U/G", riskLevel: "High", riskScore: 88, workers: 0, status: "Evacuated", coordinates: { x: 73, y: 29 }, sensors: { methaneCH4: "1.5%", airVelocity: "Low" } },
  { id: "Z-5", name: "Manna Underground", riskLevel: "Low", riskScore: 18, workers: 60, status: "Normal", coordinates: { x: 70, y: 43 }, sensors: { methaneCH4: "0.2%", airVelocity: "Good" } },
  { id: "Z-6", name: "WCL-Open Mine (Ballarpur)", riskLevel: "Medium", riskScore: 55, workers: 210, status: "Normal", coordinates: { x: 83, y: 77 }, sensors: { methaneCH4: "0.1%", airVelocity: "N/A" } }
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ManagerProvider = ({ children }) => {
  const [mineDetails, setMineDetails] = useLocalStorage('manager_mineDetails', initialMineDetails);
  const [kpis] = useLocalStorage('manager_kpis', initialKpis);
  const [attentionItems, setAttentionItems] = useLocalStorage('manager_attentionItems', initialAttentionItems);
  const [aiInsights] = useLocalStorage('manager_aiInsights', initialAiInsights);
  const [correctiveActions, setCorrectiveActions] = useLocalStorage('manager_correctiveActions', initialCorrectiveActions);
  const [workforceData] = useLocalStorage('manager_workforceData', initialWorkforceData);
  const [incidents] = useLocalStorage('manager_incidents', initialIncidents);
  const [inspections, setInspections] = useLocalStorage('manager_inspections', initialInspections);
  const [complianceHealth] = useLocalStorage('manager_complianceHealth', initialComplianceHealth);
  const [riskCategories] = useLocalStorage('manager_riskCategories', initialRiskCategories);
  const [contractors] = useLocalStorage('manager_contractors', initialContractors);
  const [approvals, setApprovals] = useLocalStorage('manager_approvals', initialApprovals);
  const [documents] = useLocalStorage('manager_documents', initialDocuments);
  const [auditHistory] = useLocalStorage('manager_auditHistory', initialAuditHistory);
  const [gisZones] = useLocalStorage('manager_gisZones', initialGisZones);

  // Helper functions used by manager pages
  const updateManagerProfile = (updatedManager) => {
    setMineDetails(prev => ({
      ...prev,
      manager: { ...prev.manager, ...updatedManager }
    }));
  };

  const openAiExplanation = (insightId) => {
    console.log('[ManagerContext] Open AI Explanation for:', insightId);
    // In a real app this would open a modal/drawer with detailed AI reasoning
  };

  const openActionDetail = (actionId) => {
    console.log('[ManagerContext] Open Action Detail for:', actionId);
    // In a real app this would open a detail panel/drawer
  };

  const openSiteDrawer = (zoneId) => {
    console.log('[ManagerContext] Open Site Drawer for zone:', zoneId);
    // In a real app this would open a site/zone detail drawer
  };

  const approveRequest = (approvalId) => {
    setApprovals(prev =>
      prev.map(a =>
        a.id === approvalId ? { ...a, status: 'Approved' } : a
      )
    );
  };

  const escalateAction = (itemId) => {
    setAttentionItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, escalated: true } : item
      )
    );
    console.log('[ManagerContext] Escalated action:', itemId);
  };

  const value = {
    mineDetails,
    kpis,
    attentionItems,
    aiInsights,
    correctiveActions,
    workforceData,
    incidents,
    inspections,
    complianceHealth,
    riskCategories,
    contractors,
    approvals,
    documents,
    auditHistory,
    gisZones,
    // Actions
    openAiExplanation,
    openActionDetail,
    openSiteDrawer,
    approveRequest,
    escalateAction,
    updateManagerProfile
  };

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  );
};
