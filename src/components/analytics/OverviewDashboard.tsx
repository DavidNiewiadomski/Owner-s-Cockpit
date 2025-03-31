
import React from 'react';
import { CostOverviewChart } from './CostOverviewChart';
import { ProgressOverviewChart } from './ProgressOverviewChart';
import { RiskDistributionChart } from './RiskDistributionChart';
import { ResourceOverviewChart } from './ResourceOverviewChart';
import { QualityOverviewChart } from './QualityOverviewChart';

interface OverviewDashboardProps {
  costData: any[];
  progressData: any[];
  resourceUtilizationData: any[];
  qualityIssuesData: any[];
  riskDistributionData: any[];
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  costData,
  progressData,
  resourceUtilizationData,
  qualityIssuesData,
  riskDistributionData
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CostOverviewChart data={costData} />
        <ProgressOverviewChart data={progressData} />
        <RiskDistributionChart data={riskDistributionData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResourceOverviewChart data={resourceUtilizationData} />
        <QualityOverviewChart data={qualityIssuesData} />
      </div>
    </div>
  );
};
