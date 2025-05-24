import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/hooks/toast';
import { ProjectProvider } from '@/contexts/ProjectContext';
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
import './App.css';

function App() {
  return (
    <ProjectProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/site-selection" element={<SiteSelection />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget-financials" element={<BudgetFinancials />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/preconstruction" element={<Preconstruction />} />
              <Route path="/communications" element={<Communications />} />
              <Route path="/investment-impact" element={<InvestmentImpact />} />
              <Route path="/action-items" element={<ActionItems />} />
              <Route path="/safety-sustainability" element={<SafetySustainability />} />
              <Route path="/contracts-insurance" element={<ContractsInsurance />} />
              <Route path="/risk-mitigation-plans" element={<RiskMitigationPlans />} />
              <Route path="/meeting-details" element={<MeetingDetails />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Owner's AI Agent */}
            <OwnerAgentButton />
            
            <Toaster />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ProjectProvider>
  );
}

export default App;
