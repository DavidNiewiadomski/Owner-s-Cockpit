
import React from 'react';
import { InvestmentMetricsCard } from './InvestmentMetricsCard';

interface InvestmentMetricsSectionProps {
  roiMetrics: {
    label: string;
    original: string;
    current: string;
    impact: "negative" | "positive";
    variance: string;
  };
  irrMetrics: {
    label: string;
    original: string;
    current: string;
    impact: "negative" | "positive";
    variance: string;
  };
  paybackMetrics: {
    label: string;
    original: string;
    current: string;
    impact: "negative" | "positive";
    variance: string;
  };
}

export const InvestmentMetricsSection: React.FC<InvestmentMetricsSectionProps> = ({
  roiMetrics,
  irrMetrics,
  paybackMetrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <InvestmentMetricsCard 
        metrics={[roiMetrics]} 
        activeAnimation={true}
      />
      <InvestmentMetricsCard 
        metrics={[irrMetrics]} 
        activeAnimation={true}
      />
      <InvestmentMetricsCard 
        metrics={[paybackMetrics]} 
        activeAnimation={true}
      />
    </div>
  );
};
