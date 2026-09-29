export const currentUser = {
  id: "U-1001",
  name: "Rajesh Kumar",
  role: "manager",
  avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0f4c81&color=fff"
};

export const demoUsers = [
  {
    role: "manager",
    userId: "manager@demo.local",
    password: "demo123",
    name: "Shri Asheesh Kumar",
    designation: "Mine Manager",
    subsidiary: "WCL",
    mine: "Kamptee Colliery",
    avatar: "/manager_profile.png"
  },
  {
    role: "safety_officer",
    userId: "safety_officer@demo.local",
    password: "demo123",
    name: "Dhairya Deulkar",
    designation: "Safety Officer",
    avatar: "/dhairya.jpg"
  },
  {
    role: "employee",
    userId: "employee@demo.local",
    password: "demo123",
    name: "Aryan Bhute",
    designation: "Field Inspector",
    avatar: "https://ui-avatars.com/api/?name=Aryan+Bhute&background=0ea5e9&color=fff"
  },
  {
    role: "subsidiary_gm",
    userId: "subsidiary_gm@demo.local",
    password: "demo123",
    name: "Prakash Patel",
    designation: "Subsidiary GM",
    avatar: "https://ui-avatars.com/api/?name=Prakash+Patel&background=8b5cf6&color=fff"
  },
  {
    role: "cil_hq_director",
    userId: "cil_hq_director@demo.local",
    password: "demo123",
    name: "R. K. Srivastava",
    designation: "CIL HQ Director",
    avatar: "https://ui-avatars.com/api/?name=R+K+Srivastava&background=f59e0b&color=fff"
  },
  {
    role: "ministry",
    userId: "ministry@demo.local",
    password: "demo123",
    name: "Dr. S. K. Singh",
    designation: "DGMS Regulator",
    avatar: "https://ui-avatars.com/api/?name=S+K+Singh&background=475569&color=fff"
  },
  {
    role: "contractor",
    userId: "contractor@demo.local",
    password: "demo123",
    name: "L&T Mining Services",
    designation: "Contractor",
    avatar: "https://ui-avatars.com/api/?name=LT+Mining&background=f43f5e&color=fff"
  },
  {
    role: "worker",
    userId: "worker@demo.local",
    password: "demo123",
    name: "Dhruv Patil",
    designation: "Mining Worker",
    avatar: "https://ui-avatars.com/api/?name=Dhruv+Patil&background=0f4c81&color=fff"
  }
];

export const mines = [
  { id: "M-001", name: "Gevra Open Cast Project", subsidiary: "SECL", type: "Open Cast", complianceScore: 82, riskLevel: "Medium" },
  { id: "M-002", name: "Dipka Project", subsidiary: "SECL", type: "Open Cast", complianceScore: 94, riskLevel: "Low" },
  { id: "M-003", name: "Kusmunda Area", subsidiary: "SECL", type: "Open Cast", complianceScore: 68, riskLevel: "High" },
  { id: "M-004", name: "Jhanjra Project", subsidiary: "ECL", type: "Underground", complianceScore: 75, riskLevel: "High" },
  { id: "M-005", name: "Nigahi Project", subsidiary: "NCL", type: "Open Cast", complianceScore: 89, riskLevel: "Low" }
];

export const inspections = [
  {
    id: "INS-1042",
    mineId: "M-003",
    date: "2026-09-08",
    inspector: "Anil Sharma",
    type: "Safety Audit",
    status: "Completed",
    observationsCount: 4
  },
  {
    id: "INS-1043",
    mineId: "M-001",
    date: "2026-09-09",
    inspector: "Vikram Singh",
    type: "Environmental Check",
    status: "In Progress",
    observationsCount: 1
  }
];

export const alerts = [
  {
    id: "ALT-5501",
    mineId: "M-003",
    type: "Risk Escalation",
    severity: "Critical",
    message: "Ventilation failure reported in Sector 4 underground zone.",
    timestamp: "2026-09-09T08:14:00Z",
    read: false
  },
  {
    id: "ALT-5502",
    mineId: "M-004",
    type: "Deadline Breach",
    severity: "High",
    message: "Corrective Action ACT-332 is 48 hours overdue.",
    timestamp: "2026-09-08T18:30:00Z",
    read: false
  },
  {
    id: "ALT-5503",
    mineId: "M-001",
    type: "AI Insight",
    severity: "Medium",
    message: "Recurring pattern of delayed dust suppression noted.",
    timestamp: "2026-09-07T14:20:00Z",
    read: true
  }
];

export const aiInsights = [
  {
    id: "AI-201",
    mineId: "M-003",
    riskCategory: "Safety",
    riskLevel: "High",
    finding: "Recurring compliance pattern detected: Roof support delays",
    reason: "Previous 3 inspections (INS-1021, INS-1033, INS-1042) flagged identical observations in Sector 2. Corrective action ACT-290 remains unresolved.",
    recommendedAction: "Mandatory structural audit and immediate supervisor escalation.",
    confidenceScore: 92
  },
  {
    id: "AI-202",
    mineId: "M-004",
    riskCategory: "Environmental",
    riskLevel: "Medium",
    finding: "Predictive alert: Elevated SPM (Suspended Particulate Matter)",
    reason: "Current wind velocity combined with inactive sprinklers in Zone B strongly correlates with previous DGMS emission violations.",
    recommendedAction: "Activate automated dust suppression protocols immediately.",
    confidenceScore: 85
  }
];

export const correctiveActions = [
  {
    id: "ACT-332",
    observationId: "OBS-204",
    mineId: "M-004",
    title: "Repair damaged ventilation duct in Sector 4",
    assignedTo: "Prakash Verma",
    deadline: "2026-09-06",
    status: "Overdue",
    riskLevel: "High"
  },
  {
    id: "ACT-335",
    observationId: "OBS-211",
    mineId: "M-003",
    title: "Install additional roof bolts at Panel 5",
    assignedTo: "Suresh Patil",
    deadline: "2026-09-12",
    status: "In Progress",
    riskLevel: "High"
  },
  {
    id: "ACT-338",
    observationId: "OBS-215",
    mineId: "M-001",
    title: "Calibrate fixed gas monitors in Main Haulage",
    assignedTo: "Amit Desai",
    deadline: "2026-09-10",
    status: "Pending Verification",
    riskLevel: "Medium"
  }
];

export const dashboardStats = {
  activeMines: 312,
  averageCompliance: 84,
  criticalRisks: 12,
  overdueActions: 28,
  inspectionsToday: 45
};

