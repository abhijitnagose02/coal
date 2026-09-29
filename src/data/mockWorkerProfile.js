export const initialWorkerState = {
  profile: {
    id: "WRK001",
    name: "Dhruv Patil",
    designation: "Mining Worker",
    department: "Mining Operations",
    subsidiary: "WCL",
    location: "Kamptee Colliery",
    role: "worker",
    phone: "+91 9876543210",
    email: "dhruv.patil@demo.wcl.in",
    manager: "A. K. Verma",
    joinDate: "2018-05-12"
  },
  
  attendance: [
    { id: 1, date: "2026-09-10", status: "Present", checkIn: "05:45 AM", checkOut: null, shift: "Morning", verified: true },
    { id: 2, date: "2026-09-09", status: "Present", checkIn: "05:50 AM", checkOut: "02:15 PM", shift: "Morning", verified: true },
    { id: 3, date: "2026-09-08", status: "Present", checkIn: "05:55 AM", checkOut: "02:05 PM", shift: "Morning", verified: true },
    { id: 4, date: "2026-09-07", status: "Leave", type: "Sick Leave", approvedBy: "A. K. Verma", verified: true },
    { id: 5, date: "2026-09-06", status: "Present", checkIn: "05:40 AM", checkOut: "02:10 PM", shift: "Morning", verified: true }
  ],
  
  shifts: [
    { id: 1, date: "2026-09-10", name: "Morning Shift", time: "06:00 - 14:00", location: "Pit 3, Section B", supervisor: "A. K. Verma", status: "Current" },
    { id: 2, date: "2026-09-11", name: "Morning Shift", time: "06:00 - 14:00", location: "Pit 3, Section B", supervisor: "A. K. Verma", status: "Upcoming" },
    { id: 3, date: "2026-09-12", name: "Morning Shift", time: "06:00 - 14:00", location: "Pit 3, Section A", supervisor: "R. K. Singh", status: "Upcoming" }
  ],

  tasks: [
    { id: "T-104", title: "Inspect Section B Roof Support", priority: "High", assignedBy: "A. K. Verma", due: "2026-09-10", status: "Pending", desc: "Check all hydraulic props in Section B for pressure leaks before shift start.", attachments: [] },
    { id: "T-105", title: "Clear Conveyor Belt Jam", priority: "Medium", assignedBy: "R. K. Singh", due: "2026-09-11", status: "Pending", desc: "Remove rubble causing friction on belt #4.", attachments: [] },
    { id: "T-101", title: "Monthly Equipment Calibration", priority: "Low", assignedBy: "Maintenance Team", due: "2026-09-05", status: "Completed", desc: "Calibrate personal gas monitor.", attachments: ["calib_cert.pdf"] }
  ],

  training: [
    { id: "TR-021", course: "Emergency Evacuation Drill", type: "Mandatory", status: "Due", due: "2026-09-15", duration: "2 Hours" },
    { id: "TR-022", course: "Advanced PPE Usage", type: "Mandatory", status: "In Progress", due: "2026-09-30", duration: "4 Hours", progress: 50 },
    { id: "TR-015", course: "First Aid Basics", type: "Certification", status: "Completed", completedOn: "2026-01-10", certificate: "FA_Cert_2026.pdf" }
  ],

  compliance: [
    { id: "CMP-01", item: "Medical Fitness Certificate", status: "Valid", due: "2027-01-10", requiresAction: false },
    { id: "CMP-02", item: "Helmet Safety Check", status: "Action Required", due: "2026-09-12", requiresAction: true, action: "Submit Photo" },
    { id: "CMP-03", item: "Respirator Fit Test", status: "Valid", due: "2026-12-01", requiresAction: false }
  ],

  reports: [
    { id: "R-204", type: "Safety Observation", date: "2026-09-09", location: "Pit 3 Main Road", status: "Under Review", desc: "Water pooling near electrical junction box.", latestUpdate: "Forwarded to Maintenance" },
    { id: "R-198", type: "Incident", date: "2026-08-15", location: "Workshop", status: "Resolved", desc: "Tripped over loose cable, no injury.", latestUpdate: "Cable secured to wall." }
  ],

  correctiveActions: [
    { id: "CA-308", issue: "Replace worn out safety boots", priority: "High", assigned: "2026-09-08", due: "2026-09-12", status: "Pending Evidence" },
    { id: "CA-255", issue: "Update emergency contact info", priority: "Low", assigned: "2026-07-01", due: "2026-07-15", status: "Closed" }
  ],

  grievances: [
    { id: "GRV-045", subject: "Overtime payment delay for August", date: "2026-09-05", status: "In Progress", response: "HR is reviewing the timesheets." }
  ],

  documents: [
    { id: "DOC-1", name: "Employment Contract", type: "HR", uploaded: "2018-05-12" },
    { id: "DOC-2", name: "Training Certificate - First Aid", type: "Certification", uploaded: "2026-01-11" }
  ],

  notifications: [
    { id: 1, title: "Task Assigned: Clear Conveyor Belt Jam", time: "2 hours ago", priority: "Normal", read: false, link: "/worker/tasks" },
    { id: 2, title: "Compliance Due: Helmet Safety Check", time: "5 hours ago", priority: "High", read: false, link: "/worker/compliance" },
    { id: 3, title: "Shift Update: Tomorrow's shift remains 06:00 - 14:00", time: "1 day ago", priority: "Normal", read: true, link: "/worker/shifts" }
  ],

  history: [
    { id: 1, text: "Shift started", time: "Today, 05:45 AM", type: "Shift" },
    { id: 2, text: "Task marked 'In Progress' - Inspect Section B Roof", time: "Today, 06:10 AM", type: "Task" },
    { id: 3, text: "Submitted Safety Observation R-204", time: "Yesterday, 14:30 PM", type: "Report" },
    { id: 4, text: "Shift ended", time: "Yesterday, 14:15 PM", type: "Shift" }
  ]
};
