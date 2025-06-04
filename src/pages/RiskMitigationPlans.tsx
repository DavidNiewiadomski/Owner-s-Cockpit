
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RiskMitigationPlansPage } from '@/components/investment/RiskMitigationPlansPage';
import { riskData } from '@/data/investment/riskData';
import { useProject } from '@/contexts/ProjectContext';

const RiskMitigationPlans = () => {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'Arsenal-1, Atlanta UAV, Quonset Point AUV';
  
  // Risk-specific insights for the AI assistant
  const riskInsights = [
    {
      title: "Risk Alert",
      content: "Arsenal-1 hyperscale manufacturing has three high-severity risks requiring attention",
      type: "warning" as const
    },
    {
      title: "Mitigation Success",
      content: "Atlanta UAV permit delays risk has been successfully mitigated",
      type: "success" as const
    },
    {
      title: "Risk Trend",
      content: "Quonset Point AUV marine compliance risk profile improved by 12% this quarter",
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
