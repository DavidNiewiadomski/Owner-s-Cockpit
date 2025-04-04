
import React from 'react';
import {
  PortfolioAllocationBarChart,
  CurrentAllocationPieChart,
  InvestmentStatsCards,
  GrowthProjectionChart,
  ProjectAllocationsTable
} from './allocation';

export function InvestmentAllocationContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortfolioAllocationBarChart />
        <CurrentAllocationPieChart />
      </div>

      <InvestmentStatsCards />
      <GrowthProjectionChart />
      <ProjectAllocationsTable />
    </div>
  );
}
