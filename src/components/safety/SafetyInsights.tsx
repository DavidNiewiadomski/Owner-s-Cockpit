
import React from 'react';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';

interface SafetyInsightsProps {
  projectName: string;
}

export function SafetyInsights({ projectName }: SafetyInsightsProps) {
  const safetyInsights = [
    {
      title: 'Safety Compliance',
      content: projectName === 'East Tower' ? 'OSHA inspection date approaching in 15 days. Schedule pre-inspection review.' :
               projectName === 'Westview Residences' ? 'Fire safety standards exceed requirements by 15%. Consider documenting as case study.' :
               projectName === 'Harbor Bridge' ? 'Worker safety orientation completion rate at 92%. 8 team members need follow-up.' :
               'Safety protocol compliance rate at 95%. 2 open issues need to be addressed.',
      type: 'info' as const
    },
    {
      title: 'Incident Prevention',
      content: projectName === 'East Tower' ? 'Recent safety drill showed 2 minute improvement in evacuation time.' :
               projectName === 'Westview Residences' ? 'Zero incidents reported in the last 145 days - new project record!' :
               projectName === 'Harbor Bridge' ? 'Wind safety protocols activated 8 times this month. Review effectiveness.' :
               'Safety equipment inspection due in 3 days. Schedule has been sent to team leads.',
      type: 'warning' as const
    }
  ];

  return (
    <CollapsibleAIAssistant 
      projectContext="Safety"
      projectName={projectName}
      initialInsights={safetyInsights}
    />
  );
}
