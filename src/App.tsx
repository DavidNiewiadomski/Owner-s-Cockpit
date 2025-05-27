
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/hooks/toast';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import Timeline from '@/pages/Timeline';
import Analytics from '@/pages/Analytics';
import BudgetFinancials from '@/pages/BudgetFinancials';
import Documents from '@/pages/Documents';
import Preconstruction from '@/pages/Preconstruction';
import Communications from '@/pages/Communications';
import InvestmentImpact from '@/pages/InvestmentImpact';
import ActionItems from '@/pages/ActionItems';
import SafetySustainability from '@/pages/SafetySustainability';
import ContractsInsurance from '@/pages/ContractsInsurance';
import Integrations from '@/pages/Integrations';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';
import Customize from '@/pages/Customize';
import RiskMitigationPlans from '@/pages/RiskMitigationPlans';
import MeetingDetails from '@/pages/MeetingDetails';
import NotFound from '@/pages/NotFound';
import { OwnerAgentButton } from '@/components/ai/OwnerAgentButton';
import SiteSelection from '@/pages/SiteSelection';
import Procurement from '@/pages/Procurement';
import FacilitiesManagement from '@/pages/FacilitiesManagement';
import ResourceManagement from '@/pages/ResourceManagement';
import QualityControl from '@/pages/QualityControl';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ToastProvider>
          <BrowserRouter>
            <div className="app">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/site-selection" element={
                  <ProtectedRoute>
                    <SiteSelection />
                  </ProtectedRoute>
                } />
                <Route path="/preconstruction" element={
                  <ProtectedRoute>
                    <Preconstruction />
                  </ProtectedRoute>
                } />
                <Route path="/procurement" element={
                  <ProtectedRoute>
                    <Procurement />
                  </ProtectedRoute>
                } />
                <Route path="/quality-control" element={
                  <ProtectedRoute>
                    <QualityControl />
                  </ProtectedRoute>
                } />
                <Route path="/resource-management" element={
                  <ProtectedRoute>
                    <ResourceManagement />
                  </ProtectedRoute>
                } />
                <Route path="/facilities-management" element={
                  <ProtectedRoute>
                    <FacilitiesManagement />
                  </ProtectedRoute>
                } />
                <Route path="/timeline" element={
                  <ProtectedRoute>
                    <Timeline />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/budget-financials" element={
                  <ProtectedRoute>
                    <BudgetFinancials />
                  </ProtectedRoute>
                } />
                <Route path="/documents" element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                } />
                <Route path="/communications" element={
                  <ProtectedRoute>
                    <Communications />
                  </ProtectedRoute>
                } />
                <Route path="/investment-impact" element={
                  <ProtectedRoute>
                    <InvestmentImpact />
                  </ProtectedRoute>
                } />
                <Route path="/action-items" element={
                  <ProtectedRoute>
                    <ActionItems />
                  </ProtectedRoute>
                } />
                <Route path="/safety-sustainability" element={
                  <ProtectedRoute>
                    <SafetySustainability />
                  </ProtectedRoute>
                } />
                <Route path="/contracts-insurance" element={
                  <ProtectedRoute>
                    <ContractsInsurance />
                  </ProtectedRoute>
                } />
                <Route path="/risk-mitigation-plans" element={
                  <ProtectedRoute>
                    <RiskMitigationPlans />
                  </ProtectedRoute>
                } />
                <Route path="/meeting-details" element={
                  <ProtectedRoute>
                    <MeetingDetails />
                  </ProtectedRoute>
                } />
                <Route path="/integrations" element={
                  <ProtectedRoute>
                    <Integrations />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/customize" element={
                  <ProtectedRoute>
                    <Customize />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Owner's AI Agent - only show when authenticated */}
              <ProtectedRoute>
                <OwnerAgentButton />
              </ProtectedRoute>
              
              <Toaster />
            </div>
          </BrowserRouter>
        </ToastProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
