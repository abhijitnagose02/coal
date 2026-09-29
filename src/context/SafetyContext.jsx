import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SafetyContext = createContext();

export const useSafety = () => {
  return useContext(SafetyContext);
};

export const SafetyProvider = ({ children }) => {
  // Mock Data for Safety Officer Profile
  const [profile] = useLocalStorage('safety_profile', {
    name: 'Dhairya Deulkar',
    designation: 'Safety Officer',
    location: 'Kamptee Colliery',
  });

  // --- INSPECTIONS STATE ---
  const [inspections, setInspections] = useLocalStorage('safety_inspections', [
    {
      id: 'INS-1051',
      area: 'WCL Coal Mine',
      address: 'W846+52P, Nandgaon Pode, Chandrapur, Maharashtra – 442507',
      type: 'PPE & Safety Inspection',
      date: '12 Sep 2026',
      officer: 'Safety Officer',
      status: 'Completed',
      score: 94,
      image: '/wcl_mine.png'
    },
    {
      id: 'INS-1052',
      area: 'Nandgaon Incline Coal Mine',
      address: 'W846+9F3, Nandgaon Pode, Chandrapur, Maharashtra – 442507',
      type: 'Electrical Safety',
      date: '12 Sep 2026',
      officer: 'Safety Officer',
      status: 'Pending',
      score: null,
      image: '/nandgaon_incline.png'
    },
    {
      id: 'INS-1053',
      area: 'Mahakali Colliery U/G Mine',
      address: 'W8W6+PF7, Babupeth, Chandrapur, Maharashtra – 442403',
      type: 'Equipment Inspection',
      date: '11 Sep 2026',
      officer: 'Safety Officer',
      status: 'Failed',
      issues: 3,
      score: 45,
      image: '/mahakali_colliery.png'
    },
    {
      id: 'INS-1054',
      area: 'Ballarpur Opencast Mine, Wcl',
      address: 'R8MW+6JR, WCL Colony, Tilak Ward, Ballarpur, Maharashtra – 442701',
      type: 'Routine Inspection',
      date: '10 Sep 2026',
      officer: 'Safety Officer',
      status: 'Completed',
      score: 88,
      image: '/ballarpur_opencast.png'
    }
  ]);

  const [incidents, setIncidents] = useLocalStorage('safety_incidents', [
    {
      id: 'INC-2026-017',
      type: 'Worker Fall',
      location: 'Tower B – Floor 4',
      date: '12 Sep 2026',
      severity: 'Critical',
      status: 'Under Investigation',
      image: '/worker_fall.png'
    },
    {
      id: 'INC-2026-016',
      type: 'PPE Violation',
      location: 'Tower A – Floor 2',
      date: '11 Sep 2026',
      severity: 'Medium',
      status: 'Open'
    },
    {
      id: 'INC-2026-015',
      type: 'Electrical Hazard',
      location: 'Basement',
      date: '10 Sep 2026',
      severity: 'High',
      status: 'Resolved',
      image: '/electrical_hazard.png'
    }
  ]);




  const addInspection = (newInspection) => {
    setInspections([newInspection, ...inspections]);
  };

  const updateInspectionStatus = (id, newStatus) => {
    setInspections(inspections.map(insp => insp.id === id ? { ...insp, status: newStatus } : insp));
  };

  const deleteInspection = (id) => {
    setInspections(inspections.filter(i => i.id !== id));
  };




  const addIncident = (newIncident) => {
    setIncidents([newIncident, ...incidents]);
  };

  const updateIncidentStatus = (id, newStatus) => {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
  };

  const deleteIncident = (id) => {
    setIncidents(incidents.filter(i => i.id !== id));
  };

  // --- CONTRACTORS STATE ---
  const [contractors, setContractors] = useLocalStorage('safety_contractors', [
    {
      id: 'C-001',
      name: 'Super Construction Co Nagpur',
      workers: 72,
      safetyScore: 94,
      ppeCompliance: 96,
      openViolations: 1,
      status: 'Compliant',
      logo: '/abc_logo.png'
    },
    {
      id: 'C-002',
      name: 'Renobuild Projects LLP',
      workers: 54,
      safetyScore: 82,
      ppeCompliance: 79,
      openViolations: 3,
      status: 'Attention Required',
      logo: '/buildtech_logo.png'
    },
    {
      id: 'C-003',
      name: 'Aakar Constructions Group',
      workers: 61,
      safetyScore: 91,
      ppeCompliance: 93,
      openViolations: 0,
      status: 'Compliant'
    }
  ]);

  // --- HAZARDS STATE (Safety Overview) ---
  const [hazards, setHazards] = useLocalStorage('safety_hazards', [
    {
      id: 'H-104',
      issue: 'Missing Safety Guard',
      location: 'Tower A – Floor 6',
      risk: 'High',
      assignedTo: 'Super Construction Co Nagpur',
      status: 'Open'
    },
    {
      id: 'H-105',
      issue: 'Wet Floor',
      location: 'Tower B – Floor 2',
      risk: 'Medium',
      assignedTo: 'Cleaning Crew',
      status: 'In Progress'
    }
  ]);

  const updateHazardStatus = (id, newStatus) => {
    setHazards(hazards.map(h => h.id === id ? { ...h, status: newStatus } : h));
  };

  const addHazard = (newHazard) => {
    setHazards([newHazard, ...hazards]);
  };

  // --- DERIVED METRICS ---
  // Using the actual state data to drive the dashboard numbers
  const safetyMetrics = {
    safetyScore: 92, // Fixed mock
    ppeCompliance: 89,
    trainingCompliance: 94,
    emergencyReadiness: 96,
    openHazards: hazards.filter(h => h.status !== 'Resolved').length,
    pendingActions: 11
  };

  const value = {
    profile,
    // Inspections
    inspections,
    addInspection,
    updateInspectionStatus,
    deleteInspection,
    // Incidents
    incidents,
    addIncident,
    updateIncidentStatus,
    deleteIncident,
    // Contractors
    contractors,
    // Hazards & Metrics
    hazards,
    updateHazardStatus,
    addHazard,
    safetyMetrics
  };

  return (
    <SafetyContext.Provider value={value}>
      {children}
    </SafetyContext.Provider>
  );
};
