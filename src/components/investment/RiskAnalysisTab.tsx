
import React from 'react';
import { FinancialRiskIndicators } from './FinancialRiskIndicators';
import { MitigationStrategiesTable } from './MitigationStrategiesTable';

interface RiskAnalysisTabProps {
  projectRisks: { name: string; level: string; impact: string; }[];
  mitigationStrategiesData: any[];
  onStrategyAction: (id: number, action: string) => void;
}

export const RiskAnalysisTab: React.FC<RiskAnalysisTabProps> = ({
  projectRisks,
  mitigationStrategiesData,
  onStrategyAction
}) => {
  return (
    <div className="space-y-6">
      <FinancialRiskIndicators risks={projectRisks} />
      <MitigationStrategiesTable 
        strategies={mitigationStrategiesData} 
        onStrategyAction={onStrategyAction} 
      />
    </div>
  );
};
