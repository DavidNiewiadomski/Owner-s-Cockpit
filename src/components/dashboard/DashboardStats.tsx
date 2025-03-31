
import React from 'react';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

interface DashboardStatsProps {
  completionPercentage: number;
  daysRemaining: number;
  budgetUtilization: number;
  teamSize: number;
}

export function DashboardStats({
  completionPercentage,
  daysRemaining,
  budgetUtilization,
  teamSize
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      <StatCard
        title="Completion"
        value={completionPercentage}
        format="percent"
        icon={TrendingUp}
        description="Overall project completion"
        trend="up"
        trendValue="from last month"
      />
      
      <StatCard
        title="Timeline"
        value={daysRemaining}
        format="days"
        icon={Calendar}
        description="Days remaining"
        trend="down"
        trendValue="fewer than expected"
      />
      
      <StatCard
        title="Budget"
        value={budgetUtilization}
        format="percent"
        icon={DollarSign}
        description="Budget utilization"
        trend="down"
        trendValue="under budget"
      />
      
      <StatCard
        title="Team"
        value={teamSize}
        format="number"
        icon={Users}
        description="Team members"
        trend="up"
        trendValue="new this month"
      />
    </div>
  );
}
