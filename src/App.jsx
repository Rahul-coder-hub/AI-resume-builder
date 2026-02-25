import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AnalyzeJD from './pages/AnalyzeJD';
import History from './pages/History';
import Results from './pages/Results';
import TestChecklist from './pages/TestChecklist';
import ShipLock from './pages/ShipLock';
import StepPage from './pages/ResumeBuilder/StepPage';
import ProofPage from './pages/ResumeBuilder/ProofPage';
import ResumeAppLayout from './components/layout/ResumeAppLayout';
import Home from './pages/ResumeApp/Home';
import Builder from './pages/ResumeApp/Builder';
import Preview from './pages/ResumeApp/Preview';
import Proof from './pages/ResumeApp/Proof';

// Placeholder Pages
const Practice = () => <h1 className="text-3xl font-bold">Practice Problems</h1>;
const Assessments = () => <h1 className="text-3xl font-bold">Mock Assessments</h1>;
const Resources = () => <h1 className="text-3xl font-bold">Preparation Resources</h1>;
const Profile = () => <h1 className="text-3xl font-bold">User Profile</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AI Resume Builder App (Primary) */}
        <Route element={<ResumeAppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/proof" element={<Proof />} />
        </Route>

        {/* Build Track (Project 3) */}
        <Route path="/rb/:stepId" element={<StepPage />} />
        <Route path="/rb/proof" element={<ProofPage />} />

        {/* Legacy: Job Readiness Platform (Moved to /platform) */}
        <Route path="/platform">
          <Route index element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analyze" element={<AnalyzeJD />} />
            <Route path="history" element={<History />} />
            <Route path="results" element={<Results />} />
            <Route path="results/:id" element={<Results />} />
            <Route path="practice" element={<Practice />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
            <Route path="prp/07-test" element={<TestChecklist />} />
            <Route path="prp/08-ship" element={<ShipLock />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
