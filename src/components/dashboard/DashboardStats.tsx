
import React from 'react';
import { Building, DollarSign, Landmark, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Active Properties" 
        value="8" 
        icon={Building} 
        trend="up" 
        trendValue="2 new acquisitions" 
      />
      <StatCard 
        title="Construction Value" 
        value="$86.4M" 
        description="total investment" 
        icon={DollarSign}
        trend="up" 
        trendValue="12% YOY increase" 
      />
      <StatCard 
        title="Total Square Footage" 
        value="1.2M" 
        icon={Landmark}
        trend="up" 
        trendValue="215,000 sq ft in development" 
      />
      <StatCard 
        title="Critical Issues" 
        value="3" 
        icon={AlertTriangle}
        trend="down" 
        trendValue="5 resolved this month" 
      />
    </div>
  );
}
