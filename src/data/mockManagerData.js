/**
 * KoylaSetu - Mock Manager Data
 * Comprehensive mock data for the Manager role modules.
 */

export const mockMineDetails = {
  name: "Kamptee Colliery",
  subsidiary: "WCL - Western Coalfields Limited",
  type: "Underground",
  location: "Nagpur, Maharashtra",
  manager: { name: "Amit Sharma", designation: "Mine Manager" },
  complianceScore: 87,
  riskLevel: "Medium",
  lastInspection: "2026-09-08",
  shifts: { current: "Morning Shift (06:00–14:00)", totalWorkers: 342 }
};

export const mockExecutiveKPIs = {
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

export const mockAttentionItems = [
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

export const mockAiGovernanceInsights = [
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

export const mockRiskCategories = [
  { name: "Structural", level: "High", score: 72, trend: "worsening" },
  { name: "Gas & Ventilation", level: "High", score: 68, trend: "stable" },
  { name: "Electrical", level: "Medium", score: 82, trend: "improving" },
  { name: "Fire", level: "Low", score: 93, trend: "stable" },
  { name: "Environmental", level: "Medium", score: 79, trend: "worsening" },
  { name: "Workforce Safety", level: "Low", score: 88, trend: "improving" }
];

export const mockComplianceHealth = [
  { id: "CH-01", category: "Safety Equipment", score: 92, status: "Good", items: 45, compliant: 41, violations: 4 },
  { id: "CH-02", category: "Ventilation Standards", score: 78, status: "Needs Attention", items: 30, compliant: 23, violations: 7 },
  { id: "CH-03", category: "Fire Prevention", score: 95, status: "Excellent", items: 20, compliant: 19, violations: 1 },
  { id: "CH-04", category: "Electrical Safety", score: 84, status: "Good", items: 38, compliant: 32, violations: 6 },
  { id: "CH-05", category: "Roof Support", score: 71, status: "Critical", items: 25, compliant: 18, violations: 7 },
  { id: "CH-06", category: "Dust Suppression", score: 80, status: "Needs Attention", items: 22, compliant: 18, violations: 4 }
];

export const mockInspections = [
  {
    id: "INS-1042",
    date: "2026-09-08",
    inspector: "Anil Sharma",
    type: "Safety Audit",
    status: "Completed",
    observationsCount: 4,
    zone: "Underground Sector 2",
    findings: "Roof bolt spacing non-compliant in Panel 5. Dust suppression system delayed activation noted."
  },
  {
    id: "INS-1043",
    date: "2026-09-09",
    inspector: "Vikram Singh",
    type: "Environmental Check",
    status: "In Progress",
    observationsCount: 1,
    zone: "Surface Plant",
    findings: "Pending final review of air quality readings."
  },
  {
    id: "INS-1044",
    date: "2026-09-11",
    inspector: "Pending Assignment",
    type: "Structural Stability",
    status: "Scheduled",
    observationsCount: 0,
    zone: "Panel 5",
    findings: ""
  },
  {
    id: "INS-1045",
    date: "2026-09-13",
    inspector: "Rajesh Sonwane",
    type: "Electrical Safety",
    status: "Scheduled",
    observationsCount: 0,
    zone: "Underground Sector 3",
    findings: ""
  }
];

export const mockCorrectiveActions = [
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

export const mockIncidents = [
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

export const mockWorkforceData = {
  totalStrength: 342,
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
    { name: "Mining Operations", count: 124 },
    { name: "Safety & Compliance", count: 32 },
    { name: "Maintenance", count: 45 },
    { name: "Transport", count: 38 },
    { name: "Administration", count: 22 },
    { name: "Contractors", count: 47 }
  ]
};

export const mockContractors = [
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

export const mockGisMineZones = [
  { id: "Z-1", name: "Underground Sector 1", risk: "Low", workers: 32, status: "Normal" },
  { id: "Z-2", name: "Underground Sector 2", risk: "High", workers: 28, status: "Alert" },
  { id: "Z-3", name: "Underground Sector 3", risk: "Medium", workers: 18, status: "Normal" },
  { id: "Z-4", name: "Underground Sector 4", risk: "Critical", workers: 0, status: "Evacuated" },
  { id: "Z-5", name: "Surface Plant", risk: "Low", workers: 45, status: "Normal" },
  { id: "Z-6", name: "Overburden Dump", risk: "Medium", workers: 12, status: "Normal" }
];

export const mockApprovals = [
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
  }
];

export const mockDocuments = [
  { id: "DOC-01", name: "Mine Plan (Form-A)", status: "Valid", expiry: "2027-06-30", category: "Statutory" },
  { id: "DOC-02", name: "Safety Management Plan", status: "Valid", expiry: "2026-12-31", category: "Safety" },
  { id: "DOC-03", name: "Environmental Clearance", status: "Expiring Soon", expiry: "2026-10-15", category: "Environment" },
  { id: "DOC-04", name: "DGMS Inspection Report", status: "Valid", expiry: "2027-03-31", category: "Regulatory" }
];

export const mockAuditHistory = [
  { id: "AUD-01", action: "Inspection INS-1042 completed", user: "Anil Sharma", timestamp: "2026-09-08T16:30:00Z", type: "Inspection" },
  { id: "AUD-02", action: "Corrective Action ACT-335 status changed to In Progress", user: "Suresh Patil", timestamp: "2026-09-08T10:15:00Z", type: "Action" },
  { id: "AUD-03", action: "Incident INC-701 reported", user: "Vijay Shinde", timestamp: "2026-09-08T09:45:00Z", type: "Incident" },
  { id: "AUD-04", action: "AI Alert AI-201 acknowledged", user: "Amit Sharma", timestamp: "2026-09-07T17:00:00Z", type: "AI" }
];
