import React, { createContext, useContext, useState } from 'react';

const SafetyContext = createContext();

export const useSafety = () => {
  return useContext(SafetyContext);
};

export const SafetyProvider = ({ children }) => {
  // Mock Data for Safety Officer
  const [profile] = useState({
    name: 'Priya Singh',
    designation: 'Chief Safety Officer',
    location: 'Kamptee Colliery',
  });

  const [safetyMetrics] = useState({
    safetyScore: 92,
    daysWithoutLTI: 145, // Lost Time Injury
    inspectionsCompletedToday: 3,
    activeViolations: 2,
  });

  const [incidents] = useState([
    {
      id: 'INC-2024-001',
      type: 'Near Miss',
      description: 'Conveyor belt guard displaced near loading zone B',
      priority: 'High',
      status: 'Open',
      time: '1 hour ago',
    },
    {
      id: 'INC-2024-002',
      type: 'Equipment Damage',
      description: 'Excavator EX-12 hydraulic leak',
      priority: 'Medium',
      status: 'Investigating',
      time: '3 hours ago',
    }
  ]);

  const [inspections] = useState([
    {
      id: 'INSP-401',
      area: 'Ventilation Shaft 3',
      type: 'Routine Air Quality',
      time: '14:00',
      status: 'Pending',
    },
    {
      id: 'INSP-402',
      area: 'Underground Support Zone C',
      type: 'Structural Integrity',
      time: '16:30',
      status: 'Pending',
    }
  ]);

  const [contractors] = useState([
    {
      id: 'C-101',
      name: 'Alpha Mining Solutions',
      complianceScore: 95,
      status: 'Compliant'
    },
    {
      id: 'C-102',
      name: 'Delta Drilling Corp',
      complianceScore: 78,
      status: 'Warning - Expired Training'
    }
  ]);

  const value = {
    profile,
    safetyMetrics,
    incidents,
    inspections,
    contractors
  };

  return (
    <SafetyContext.Provider value={value}>
      {children}
    </SafetyContext.Provider>
  );
};
