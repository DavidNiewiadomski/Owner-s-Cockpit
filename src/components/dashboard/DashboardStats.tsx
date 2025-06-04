
import React from 'react';
import { Building2, DollarSign, LayoutGrid, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
      <StatCard 
        title="Active Manufacturing Projects" 
        value="3" 
        icon={Building2} 
        trend="up" 
        trendValue="Arsenal-1, Atlanta UAV, Quonset Point" 
        className="shadow-[0_10px_25px_-5px_rgba(56,189,248,0.2)]"
      />
      <StatCard 
        title="Total Investment Value" 
        value="$93.0M" 
        description="across all facilities" 
        icon={DollarSign}
        trend="up" 
        trendValue="12% YOY increase" 
        className="shadow-[0_10px_25px_-5px_rgba(34,197,94,0.2)]"
      />
      <StatCard 
        title="Combined Square Footage" 
        value="425K" 
        icon={LayoutGrid}
        trend="up" 
        trendValue="Arsenal-1: 125K, Atlanta: 85K, Quonset: 215K" 
        className="shadow-[0_10px_25px_-5px_rgba(168,85,247,0.2)]"
      />
      <StatCard 
        title="Critical Issues" 
        value="3" 
        icon={AlertTriangle}
        trend="down" 
        trendValue="5 resolved across all facilities" 
        className="shadow-[0_10px_25px_-5px_rgba(245,158,11,0.2)]"
      />
    </div>
  );
}
