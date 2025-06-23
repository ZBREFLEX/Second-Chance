// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import KeralaMap from './components/pages/KeralaMap';
import AwarenessHub from './components/pages/AwarenessHub';
import AnonymousReport from './components/pages/AnonymousReport';
import RiskAssessment from './components/pages/RiskAssessment';
import CounselorCommunication from './components/pages/CounselorCommunication';
import RecoveryTracking from './components/pages/RecoveryTracking';
//admin
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLayout from './components/Admin/AdminLayout';
import AdminSettings from './components/Admin/AdminSettings';
import AdminUsers from './components/Admin/AdminUsers';
import AdminReports from './components/Admin/AdminReports';
import AdminContent from './components/Admin/AdminContent';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister'

import './App.css';
import CounselorDashboard from './components/counselor/CounselorDashboard';
import Communication from './components/counselor/Communication';
import PatientDetails from './components/counselor/PatientDetails';
import SessionScheduling from './components/counselor/SessionScheduling';
import NotesManagement from './components/counselor/NotesManagement';
//ngo
import NgoDashboard from './components/ngo/NgoDashboard';

//victim
import VictimDashboard from './components/victim/pages/VictimDashboard'
import ProfileSettings from './components/victim/pages/ProfileSettings';
import VictimRiskAssessment from './components/victim/pages/VictimRiskAssessment';
import VictimRecoveryTracking from './components/victim/pages/VictimRecoveryTracking';
import VictimCounselorChat from './components/victim/pages/VictimCounselorChat';
import VictimAwarenessHub from './components/victim/pages/VictimAwarenessHub';
import ProtectedChatRoute from './components/victim/components/ProtectedChatRoute';
import CounselorSelection from './components/victim/pages/CounselorSelection';
import CounselorApply from './components/counselor/CounselorApply';
import ApplicationStatus from './components/counselor/ApplicationStatus';

import ProtectedRoute from './components/counselor/components/ProtectedRoute';
import AdminCounselors from './components/Admin/AdminCounselors';

// This component uses useLocation, so it must be rendered inside <Router>
function AppContent() {
  const location = useLocation();
  const isAdminOrVictimRoute = location.pathname.startsWith('/admin') ||  location.pathname.startsWith('/counselor') || location.pathname.startsWith('/ngo') || location.pathname.startsWith('/victim');


  return (
    <>
      {!isAdminOrVictimRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/KeralaMap" element={<KeralaMap />} />
        <Route path="/awareness-hub" element={<AwarenessHub />} />
        <Route path="/anonymous-report" element={<AnonymousReport />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/counselor-chat" element={<CounselorCommunication />} />
        <Route path="/recovery-tracking" element={<RecoveryTracking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/register' element={<AdminRegister/>} />
        <Route path="/admin-layout" element={<AdminLayout />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/content" element={<AdminContent />} />
        <Route path='/admin/counselor' element={<AdminCounselors/>} />
        //victim
        <Route path='/victim' element={<VictimDashboard/>} />
        <Route path='/victim/profile-settings' element={<ProfileSettings/>} />
        <Route path='/victim/risk-assessment' element={<VictimRiskAssessment/>} />
        <Route path='/victim/recovery-tracking' element={<VictimRecoveryTracking/>} />
        <Route path='/victim/counselor-chat' element={
         <ProtectedChatRoute>
         <VictimCounselorChat/>
         </ProtectedChatRoute>
         } />
         <Route path='/victim/counselor-selection' element={<CounselorSelection/>} />
        <Route path='/victim/awareness-hub' element={<VictimAwarenessHub/>} />
        
        //counselor
        <Route path='/counselor' element={
         <ProtectedRoute>
          <CounselorDashboard />
        </ProtectedRoute>
          } />
        <Route path='/counselor/communication' element={<Communication/>} />
        <Route path='/counselor/patientdetails' element={<PatientDetails/>} />
        <Route path='/counselor/session' element={<SessionScheduling/>} />
        <Route path='/counselor/notes' element={<NotesManagement/>} />
        <Route path='/counselor/counselorapply' element={<CounselorApply/>} />
        <Route path='/counselor/application-status' element={<ApplicationStatus/>} />
        //ngo
        <Route path='/ngo' element={<NgoDashboard/>} />
      </Routes>
      {!isAdminOrVictimRoute && <Footer />}
    </>
  );
}

// Top-level component that includes <Router>
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
