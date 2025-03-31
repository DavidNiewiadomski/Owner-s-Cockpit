
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function ProjectRisks() {
  const risks = [
    {
      title: 'Material Price Increases',
      impact: 'high',
      likelihood: 'medium',
      mitigation: 'Secure pricing contracts with suppliers early',
      owner: 'Alex Johnson'
    },
    {
      title: 'Weather Delays',
      impact: 'medium',
      likelihood: 'high',
      mitigation: 'Build buffer time into schedule, prepare contingency plans',
      owner: 'Sarah Williams'
    },
    {
      title: 'Permit Approval Delays',
      impact: 'high',
      likelihood: 'medium',
      mitigation: 'Submit applications early, maintain relationships with officials',
      owner: 'Michael Brown'
    },
    {
      title: 'Labor Shortages',
      impact: 'high',
      likelihood: 'medium',
      mitigation: 'Pre-book contractors, offer competitive rates',
      owner: 'Lisa Chen'
    },
    {
      title: 'Design Changes',
      impact: 'medium',
      likelihood: 'low',
      mitigation: 'Establish clear change order process with client',
      owner: 'David Rodriguez'
    },
  ];

  return (
    <div className="space-y-4">
      {risks.map((risk, index) => (
        <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{risk.title}</h4>
            <div className="flex gap-2">
              <Badge variant={
                risk.impact === 'high' ? 'destructive' : 
                risk.impact === 'medium' ? 'warning' : 'default'
              }>
                Impact: {risk.impact}
              </Badge>
              <Badge variant={
                risk.likelihood === 'high' ? 'destructive' : 
                risk.likelihood === 'medium' ? 'warning' : 'default'
              }>
                Likelihood: {risk.likelihood}
              </Badge>
            </div>
          </div>
          <p className="text-sm mb-1"><span className="font-medium">Mitigation:</span> {risk.mitigation}</p>
          <p className="text-sm text-muted-foreground"><span className="font-medium">Owner:</span> {risk.owner}</p>
        </div>
      ))}
    </div>
  );
}
