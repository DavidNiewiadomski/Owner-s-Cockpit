
import React from 'react';
import { SafetyMetricsCards } from './SafetyMetricsCards';
import { SafetyCertificationsTable } from './SafetyCertificationsTable';
import { SafetyIncidentsTable } from './SafetyIncidentsTable';
import { SafetyInsights } from './SafetyInsights';

interface SafetyMetrics {
  incidentRate: number;
  safetyScore: number;
  inspectionsPassed: number;
  openSafetyIssues: number;
  daysWithoutIncident: number;
}

interface SafetyCertification {
  id: number;
  name: string;
  status: string;
  date: string;
  expires: string;
}

interface SafetyIncident {
  id: number;
  title: string;
  severity: string;
  date: string;
  resolved: boolean;
  area: string;
}

interface SafetyTabContentProps {
  safetyMetrics: SafetyMetrics;
  safetyCerts: SafetyCertification[];
  safetyIncidents: SafetyIncident[];
  projectName: string;
}

export function SafetyTabContent({ 
  safetyMetrics, 
  safetyCerts, 
  safetyIncidents, 
  projectName 
}: SafetyTabContentProps) {
  return (
    <>
      <SafetyInsights projectName={projectName} />
      
      <main className="flex-1 overflow-y-auto p-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <SafetyMetricsCards safetyMetrics={safetyMetrics} />
          <SafetyCertificationsTable certifications={safetyCerts} />
          <SafetyIncidentsTable incidents={safetyIncidents} />
        </div>
      </main>
    </>
  );
}
