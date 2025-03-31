
import React from 'react';
import { PropertyValuationChart } from './PropertyValuationChart';
import { ImpactEventsTable } from './ImpactEventsTable';

interface ValuationImpactTabProps {
  propertyValuationData: any[];
  impactEventsData: any[];
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

export const ValuationImpactTab: React.FC<ValuationImpactTabProps> = ({
  propertyValuationData,
  impactEventsData,
  chartColors
}) => {
  return (
    <div className="space-y-6">
      <PropertyValuationChart data={propertyValuationData} colors={chartColors} />
      <ImpactEventsTable events={impactEventsData} />
    </div>
  );
};
