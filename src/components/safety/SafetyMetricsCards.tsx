
import React from 'react';
import { ShieldCheck, Check, AlertTriangle, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SafetyMetrics {
  incidentRate: number;
  safetyScore: number;
  inspectionsPassed: number;
  openSafetyIssues: number;
  daysWithoutIncident: number;
}

interface SafetyMetricsCardsProps {
  safetyMetrics: SafetyMetrics;
}

export function SafetyMetricsCards({ safetyMetrics }: SafetyMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Safety Score</div>
          <ShieldCheck className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold">{safetyMetrics.safetyScore}%</div>
        <Progress value={safetyMetrics.safetyScore} className="h-2 mt-2" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Days Without Incident</div>
          <Check className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold">{safetyMetrics.daysWithoutIncident}</div>
        <div className="text-sm text-gray-500 mt-2">Last incident: {safetyMetrics.daysWithoutIncident} days ago</div>
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Open Safety Issues</div>
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="text-2xl font-bold">{safetyMetrics.openSafetyIssues}</div>
        <div className="text-sm text-gray-500 mt-2">
          {safetyMetrics.openSafetyIssues === 0 ? 'All clear!' : `${safetyMetrics.openSafetyIssues} issues need attention`}
        </div>
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Inspections Passed</div>
          <FileText className="h-5 w-5 text-blue-500" />
        </div>
        <div className="text-2xl font-bold">{safetyMetrics.inspectionsPassed}</div>
        <div className="text-sm text-gray-500 mt-2">Year to date</div>
      </Card>
    </div>
  );
}
