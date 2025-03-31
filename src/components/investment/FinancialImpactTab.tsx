
import React from 'react';
import { BudgetOverrunChart } from './BudgetOverrunChart';
import { ScheduleVarianceChart } from './ScheduleVarianceChart';
import { ROITrendChart } from './ROITrendChart';

interface FinancialImpactTabProps {
  budgetOverrunsData: any[];
  scheduleVarianceData: any[];
  roiTrendData: any[];
  chartColors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    info: string;
    background: string;
    gridLine: string;
  };
}

export const FinancialImpactTab: React.FC<FinancialImpactTabProps> = ({
  budgetOverrunsData,
  scheduleVarianceData,
  roiTrendData,
  chartColors
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetOverrunChart data={budgetOverrunsData} />
        <ScheduleVarianceChart data={scheduleVarianceData} colors={chartColors} />
      </div>
      <ROITrendChart data={roiTrendData} colors={chartColors} />
    </div>
  );
};
