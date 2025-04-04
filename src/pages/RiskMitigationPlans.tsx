
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RiskMitigationPlansPage } from '@/components/investment/RiskMitigationPlansPage';
import { riskData } from '@/data/investment/riskData';
import { useProject } from '@/contexts/ProjectContext';

const RiskMitigationPlans = () => {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';
  
  // Risk-specific insights for the AI assistant
  const riskInsights = [
    {
      title: "Risk Alert",
      content: "Three high-severity risks currently require attention",
      type: "warning" as const
    },
    {
      title: "Mitigation Success",
      content: "The 'Permit Delays' risk has been successfully mitigated",
      type: "success" as const
    },
    {
      title: "Risk Trend",
      content: "Overall risk profile has improved by 12% this quarter",
      type: "info" as const
    }
  ];

  return (
    <DashboardLayout
      projectContext="Risk Management"
      projectName={projectName}
      initialInsights={riskInsights}
    >
      <RiskMitigationPlansPage riskData={riskData} />
    </DashboardLayout>
  );
};

export default RiskMitigationPlans;
