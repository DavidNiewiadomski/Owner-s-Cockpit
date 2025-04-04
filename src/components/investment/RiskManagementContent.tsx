
import React from 'react';
import { RiskStatCards } from './risk/RiskStatCards';
import { RiskTable } from './risk/RiskTable';
import { RiskDistributionChart } from './risk/RiskDistributionChart';
import { RiskMitigationPlansTable } from './risk/RiskMitigationPlansTable';
import { Risk, CategoryData } from '@/data/investment/riskData';

interface RiskManagementContentProps {
  riskData: Risk[];
  riskByCategory: CategoryData[];
}

export function RiskManagementContent({ riskData, riskByCategory }: RiskManagementContentProps) {
  return (
    <div className="space-y-6">
      <RiskStatCards riskData={riskData} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskTable riskData={riskData} />
        <RiskDistributionChart riskByCategory={riskByCategory} />
      </div>

      <RiskMitigationPlansTable risks={riskData} />
    </div>
  );
}
