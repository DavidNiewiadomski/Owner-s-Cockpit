
import React from 'react';
import { Building, DollarSign, Landmark, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
      <StatCard 
        title="Active Properties" 
        value="8" 
        icon={Building} 
        trend="up" 
        trendValue="2 new acquisitions" 
        className="shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
      />
      <StatCard 
        title="Construction Value" 
        value="$86.4M" 
        description="total investment" 
        icon={DollarSign}
        trend="up" 
        trendValue="12% YOY increase" 
        className="shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
      />
      <StatCard 
        title="Total Square Footage" 
        value="1.2M" 
        icon={Landmark}
        trend="up" 
        trendValue="215,000 sq ft in development" 
        className="shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
      />
      <StatCard 
        title="Critical Issues" 
        value="3" 
        icon={AlertTriangle}
        trend="down" 
        trendValue="5 resolved this month" 
        className="shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300"
      />
    </div>
  );
}
