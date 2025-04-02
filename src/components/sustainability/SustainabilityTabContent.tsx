
import React from 'react';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
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
  sustainabilityCerts,
  projectName
}: SustainabilityTabContentProps) {
  const sustainabilityInsights = [
    {
      title: 'Energy Efficiency',
      content: projectName === 'East Tower' ? 'Solar panel installation complete. Expected 22% reduction in grid usage.' :
               projectName === 'Westview Residences' ? 'Smart HVAC system showing 18% efficiency gain over projected values.' :
               projectName === 'Harbor Bridge' ? 'LED lighting upgrade complete. 35% energy reduction confirmed.' :
               'Building energy performance exceeding targets by 12%. Continue monitoring during summer months.',
      type: 'info' as const
    },
    {
      title: 'Material Sourcing',
      content: projectName === 'East Tower' ? '82% of materials sourced within 300 miles, exceeding 75% target.' :
               projectName === 'Westview Residences' ? 'Reclaimed wood installation complete, saving 125 mature trees.' :
               projectName === 'Harbor Bridge' ? 'Low-carbon concrete performance exceeding structural requirements by 15%.' :
               'Sustainable material sourcing at 85% against 80% target. Supplier documentation updated.',
      type: 'success' as const
    }
  ];
  
  return (
    <>
      <CollapsibleAIAssistant 
        projectContext="Sustainability"
        projectName={projectName}
        initialInsights={sustainabilityInsights}
      />
      
      <main className="flex-1 overflow-y-auto p-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <SustainabilityMetricsCards metrics={sustainabilityMetrics} />
          <SustainabilityFeatures />
          <SustainabilityCertificationsTable certifications={sustainabilityCerts} />
        </div>
      </main>
    </>
  );
}
