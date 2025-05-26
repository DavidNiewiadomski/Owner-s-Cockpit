
import React from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { SustainabilityMetricsCards } from './SustainabilityMetricsCards';
import { SustainabilityFeatures } from './SustainabilityFeatures';
import { SustainabilityCertificationsTable } from './SustainabilityCertificationsTable';
import { SustainabilityMetrics, SustainabilityCertification } from './sustainability-types';

interface SustainabilityTabContentProps {
  sustainabilityMetrics: SustainabilityMetrics;
  sustainabilityCerts: SustainabilityCertification[];
  projectName: string;
}

export function SustainabilityTabContent({
  sustainabilityMetrics,
  sustainabilityCerts
}: SustainabilityTabContentProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <SustainabilityMetricsCards metrics={sustainabilityMetrics} />
      <SustainabilityFeatures />
      <SustainabilityCertificationsTable certifications={sustainabilityCerts} />
    </div>
  );
}
