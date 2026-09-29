import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkerProvider } from './context/WorkerContext';
import { ManagerProvider } from './context/ManagerContext';
import { SafetyProvider } from './context/SafetyContext';
import { LanguageProvider } from './context/LanguageContext';
import AppShell from './components/layout/AppShell';
import WorkerLayout from './components/layout/WorkerLayout';
import ManagerLayout from './components/manager/ManagerLayout';
import SafetyLayout from './components/layout/SafetyLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PlaceholderModule from './components/ui/PlaceholderModule';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerTasks from './pages/worker/WorkerTasks';
import WorkerReports from './pages/worker/WorkerReports';
import WorkerActions from './pages/worker/WorkerActions';
import WorkerAttendance from './pages/worker/WorkerAttendance';
import WorkerShifts from './pages/worker/WorkerShifts';
import WorkerCompliance from './pages/worker/WorkerCompliance';
import WorkerTraining from './pages/worker/WorkerTraining';
import WorkerDocuments from './pages/worker/WorkerDocuments';
import WorkerGrievances from './pages/worker/WorkerGrievances';
import WorkerNotifications from './pages/worker/WorkerNotifications';
import WorkerHistory from './pages/worker/WorkerHistory';
import WorkerProfile from './pages/worker/WorkerProfile';

// Safety Pages
import SafetyDashboard from './pages/safety/SafetyDashboard';
import SafetyInspections from './pages/safety/SafetyInspections';
import SafetyIncidents from './pages/safety/SafetyIncidents';
import SafetyContractors from './pages/safety/SafetyContractors';
import SafetyWorkers from './pages/safety/SafetyWorkers';
import SafetyOverview from './pages/safety/SafetyOverview';
import SafetyProfile from './pages/safety/SafetyProfile';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import MineOverview from './pages/manager/MineOverview';
import RiskIntelligence from './pages/manager/RiskIntelligence';
import ComplianceHealth from './pages/manager/ComplianceHealth';
import InspectionsList from './pages/manager/InspectionsList';
import IncidentManagement from './pages/manager/IncidentManagement';
import CorrectiveActionCenter from './pages/manager/CorrectiveActionCenter';
import WorkforceOverview from './pages/manager/WorkforceOverview';
import ShiftOperations from './pages/manager/ShiftOperations';
import TeamTasks from './pages/manager/TeamTasks';
import ContractorIntelligence from './pages/manager/ContractorIntelligence';
import AiGovernanceCenter from './pages/manager/AiGovernanceCenter';
import GisMineMap from './pages/manager/GisMineMap';
import ReportsAnalytics from './pages/manager/ReportsAnalytics';
import ManagerApprovals from './pages/manager/ManagerApprovals';
import StatutoryDocuments from './pages/manager/StatutoryDocuments';
import AlertsEscalations from './pages/manager/AlertsEscalations';
import AuditHistory from './pages/manager/AuditHistory';
import ManagerProfile from './pages/manager/ManagerProfile';
import ManagerSettings from './pages/manager/ManagerSettings';
import DesktopCommandCenter from './pages/manager/DesktopCommandCenter';

// Protected Route wrapper to ensure user is logged in before accessing dashboard
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Route wrapper that injects role-specific context providers
const RoleLayoutWrapper = () => {
  const { currentUser } = useAuth();

  if (currentUser?.role === 'worker') {
    return (
      <WorkerProvider>
        <WorkerLayout />
      </WorkerProvider>
    );
  }

  if (currentUser?.role === 'manager') {
    return (
      <ManagerProvider>
        <ManagerLayout />
      </ManagerProvider>
    );
  }

  if (currentUser?.role === 'safety_officer') {
    return (
      <SafetyProvider>
        <SafetyLayout />
      </SafetyProvider>
    );
  }

  return <AppShell />;
};

function AppRoutes() {
  const { currentUser } = useAuth();
  const isWorker = currentUser?.role === 'worker';
  const isManager = currentUser?.role === 'manager';
  const isSafetyOfficer = currentUser?.role === 'safety_officer';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute><RoleLayoutWrapper /></ProtectedRoute>}>
        {/* Role Home View */}
        <Route index element={
          isWorker ? <WorkerDashboard /> :
            isManager ? <ManagerDashboard /> :
              isSafetyOfficer ? <SafetyDashboard /> :
                <Dashboard />
        } />

        {/* Manager Dedicated Routes */}
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="manager/overview" element={<MineOverview />} />
        <Route path="manager/risk" element={<RiskIntelligence />} />
        <Route path="manager/compliance" element={<ComplianceHealth />} />
        <Route path="manager/inspections" element={<InspectionsList />} />
        <Route path="manager/incidents" element={<IncidentManagement />} />
        <Route path="manager/actions" element={<CorrectiveActionCenter />} />
        <Route path="manager/workforce" element={<WorkforceOverview />} />
        <Route path="manager/shifts" element={<ShiftOperations />} />
        <Route path="manager/tasks" element={<TeamTasks />} />
        <Route path="manager/contractors" element={<ContractorIntelligence />} />
        <Route path="manager/ai-insights" element={<AiGovernanceCenter />} />
        <Route path="manager/gis" element={<GisMineMap />} />
        <Route path="manager/reports" element={<ReportsAnalytics />} />
        <Route path="manager/approvals" element={<ManagerApprovals />} />
        <Route path="manager/documents" element={<StatutoryDocuments />} />
        <Route path="manager/alerts" element={<AlertsEscalations />} />
        <Route path="manager/audit" element={<AuditHistory />} />
        <Route path="manager/profile" element={<ManagerProfile />} />
        <Route path="manager/settings" element={<ManagerSettings />} />
        <Route path="manager/command-center" element={<DesktopCommandCenter />} />

        {/* Worker Modules */}
        <Route path="worker/tasks" element={<WorkerTasks />} />
        <Route path="worker/reports" element={<WorkerReports />} />
        <Route path="worker/actions" element={<WorkerActions />} />
        <Route path="worker/attendance" element={<WorkerAttendance />} />
        <Route path="worker/shifts" element={<WorkerShifts />} />
        <Route path="worker/compliance" element={<WorkerCompliance />} />
        <Route path="worker/training" element={<WorkerTraining />} />
        <Route path="worker/documents" element={<WorkerDocuments />} />
        <Route path="worker/grievances" element={<WorkerGrievances />} />
        <Route path="worker/notifications" element={<WorkerNotifications />} />
        <Route path="worker/history" element={<WorkerHistory />} />
        <Route path="worker/profile" element={<WorkerProfile />} />
        <Route path="profile" element={isManager ? <ManagerProfile /> : isSafetyOfficer ? <SafetyProfile /> : isWorker ? <WorkerProfile /> : <PlaceholderModule title="Profile" />} />

        {/* Dynamic Core Modules - map to rich manager components when role is manager */}
        <Route path="compliance" element={isManager ? <ComplianceHealth /> : <PlaceholderModule title="Compliance Module" />} />
        <Route path="inspections" element={isManager ? <InspectionsList /> : isSafetyOfficer ? <SafetyInspections /> : <PlaceholderModule title="Inspections Module" />} />
        <Route path="inspections/new" element={isSafetyOfficer ? <SafetyInspections /> : <PlaceholderModule title="New Inspection" />} />
        <Route path="violations" element={isManager ? <ComplianceHealth /> : <PlaceholderModule title="Violations Module" />} />
        <Route path="actions" element={isManager ? <CorrectiveActionCenter /> : <PlaceholderModule title="Corrective Actions Module" />} />
        <Route path="contractors" element={isManager ? <ContractorIntelligence /> : isSafetyOfficer ? <SafetyContractors /> : <PlaceholderModule title="Contractors Module" />} />
        <Route path="workers" element={isSafetyOfficer ? <SafetyWorkers /> : <PlaceholderModule title="Workers Module" />} />
        <Route path="alerts" element={isManager ? <AlertsEscalations /> : <PlaceholderModule title="Alerts & Escalations" />} />
        <Route path="grievances" element={<PlaceholderModule title="Grievance Management" />} />
        <Route path="reports" element={isManager ? <ReportsAnalytics /> : <PlaceholderModule title="Reporting Center" />} />
        <Route path="ai-insights" element={isManager ? <AiGovernanceCenter /> : <PlaceholderModule title="AI Analytics Center" />} />
        <Route path="map" element={isManager ? <GisMineMap /> : <PlaceholderModule title="GIS Map Module" />} />
        <Route path="settings" element={isManager ? <ManagerSettings /> : <PlaceholderModule title="Settings Module" />} />

        {/* Specific Role Views */}
        <Route path="observations" element={<PlaceholderModule title="Safety Observations" />} />
        <Route path="incidents" element={isManager ? <IncidentManagement /> : isSafetyOfficer ? <SafetyIncidents /> : <PlaceholderModule title="Incident Reporting" />} />
        <Route path="incidents/new" element={isSafetyOfficer ? <SafetyIncidents /> : <PlaceholderModule title="New Incident" />} />
        <Route path="safety" element={isSafetyOfficer ? <SafetyOverview /> : <PlaceholderModule title="Safety Overview" />} />
        <Route path="quick-report" element={<PlaceholderModule title="Quick Report (Mobile)" />} />
        <Route path="my-status" element={<PlaceholderModule title="My Status" />} />
        <Route path="sync-status" element={<PlaceholderModule title="Offline Sync Status" />} />

        {/* GM / Director Views */}
        <Route path="comparison" element={<PlaceholderModule title="Mine Comparison" />} />
        <Route path="heatmap" element={<PlaceholderModule title="Risk Heatmap" />} />
        <Route path="escalations" element={<PlaceholderModule title="Escalation Center" />} />
        <Route path="analytics" element={<PlaceholderModule title="Cross-Mine Analytics" />} />
        <Route path="subsidiaries" element={<PlaceholderModule title="Subsidiary Comparison" />} />
        <Route path="systemic-risks" element={<PlaceholderModule title="Systemic Risk Detection" />} />
        <Route path="trends" element={<PlaceholderModule title="Strategic Analytics & Trends" />} />

        {/* Regulator Views */}
        <Route path="mines" element={<PlaceholderModule title="Mines Directory" />} />
        <Route path="evidence" element={<PlaceholderModule title="Evidence Viewer" />} />
        <Route path="audit-trail" element={<PlaceholderModule title="Audit Trail" />} />

        {/* Contractor Views */}
        <Route path="licences" element={<PlaceholderModule title="Licence Management" />} />
        <Route path="training" element={<PlaceholderModule title="Training Records" />} />
        <Route path="tasks" element={<PlaceholderModule title="Pending Tasks" />} />
        <Route path="documents" element={isManager ? <StatutoryDocuments /> : <PlaceholderModule title="Document Uploads" />} />

        {/* Employer Views */}
        <Route path="employees" element={<PlaceholderModule title="Employee Management" />} />
        <Route path="attendance" element={<PlaceholderModule title="Worker Attendance" />} />
        <Route path="employee-compliance" element={<PlaceholderModule title="Employee Compliance Status" />} />
        <Route path="compliance-history" element={<PlaceholderModule title="Compliance History" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
