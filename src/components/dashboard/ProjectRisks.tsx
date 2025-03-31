
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUpRight, Shield } from 'lucide-react';

export function ProjectRisks() {
  const risks = [
    {
      id: 1,
      title: 'Material Price Increase',
      description: 'Steel prices have increased by 15% over the last quarter',
      impact: 'high',
      category: 'Financial',
      status: 'active',
      mitigationPlan: 'Secure price lock agreements with suppliers'
    },
    {
      id: 2,
      title: 'Permit Delays',
      description: 'Environmental permits taking longer than expected',
      impact: 'medium',
      category: 'Regulatory',
      status: 'active',
      mitigationPlan: 'Pre-submit documentation to expedite review'
    },
    {
      id: 3,
      title: 'Labor Shortage',
      description: 'Skilled labor availability continues to decrease',
      impact: 'medium',
      category: 'Resources',
      status: 'monitoring',
      mitigationPlan: 'Partner with local trade schools for apprenticeship program'
    },
    {
      id: 4,
      title: 'Weather Delays',
      description: 'Potential for severe weather in Q3',
      impact: 'low',
      category: 'External',
      status: 'monitoring',
      mitigationPlan: 'Build weather contingency into schedule'
    }
  ];

  return (
    <div className="space-y-4">
      {risks.map((risk) => (
        <div key={risk.id} className="bg-black border border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">{risk.title}</h3>
            </div>
            <Badge variant={
              risk.impact === 'high' ? 'destructive' : 
              risk.impact === 'medium' ? 'secondary' : 'outline'
            }>
              {risk.impact}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <Badge variant={
                risk.status === 'active' ? 'secondary' : 'outline'
              } className="text-xs">
                {risk.status}
              </Badge>
              <span className="text-muted-foreground">{risk.category}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
              <a className="flex items-center gap-1" href="#">
                <Shield className="h-3 w-3" />
                <span>Mitigation Plan</span>
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
