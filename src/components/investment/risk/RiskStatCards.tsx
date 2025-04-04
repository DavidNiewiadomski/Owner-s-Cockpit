
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Risk } from '@/data/investment/riskData';

interface RiskStatCardsProps {
  riskData: Risk[];
}

export function RiskStatCards({ riskData }: RiskStatCardsProps) {
  const activeRisks = riskData.filter(risk => risk.status === 'Active').length;
  const mitigatedRisks = riskData.filter(risk => risk.status === 'Mitigated').length;
  const monitoringRisks = riskData.filter(risk => risk.status === 'Monitoring').length;
  const highRisks = riskData.filter(risk => risk.severity === 'High').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Risks"
        value={activeRisks}
        icon={AlertTriangle}
        trend={activeRisks > 3 ? "up" : "down"}
        trendValue={activeRisks > 3 ? "Needs attention" : "Well managed"}
        className="border-amber-800/30"
      />
      <StatCard
        title="Mitigated Risks"
        value={mitigatedRisks}
        icon={CheckCircle}
        className="border-green-800/30"
      />
      <StatCard
        title="Monitoring"
        value={monitoringRisks}
        icon={Clock}
        className="border-blue-800/30"
      />
      <StatCard
        title="High Severity Risks"
        value={highRisks}
        icon={AlertCircle}
        trend={highRisks > 0 ? "up" : "neutral"}
        trendValue={highRisks > 0 ? "Critical attention" : "All clear"}
        className="border-red-800/30"
      />
    </div>
  );
}
