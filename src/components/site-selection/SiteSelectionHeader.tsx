
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Calendar, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export function SiteSelectionHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Site Selection & Feasibility</h1>
      </div>
      
      <p className="text-gray-400">
        Comprehensive site analysis, feasibility studies, and market research for optimal project location selection
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard 
          title="Sites Under Review" 
          value="8" 
          subtitle="3 High Priority" 
          icon={<MapPin className="h-5 w-5 text-blue-400" />}
          trend="up"
          percentage="25"
        />
        
        <StatCard 
          title="Avg. Site Score" 
          value="87/100" 
          subtitle="Above Benchmark" 
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
          trend="up"
          percentage="12"
        />
        
        <StatCard 
          title="Total Investment" 
          value="$2.8M" 
          subtitle="Site Acquisition Budget" 
          icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
          trend="same"
          percentage="0"
        />
        
        <StatCard 
          title="Decision Timeline" 
          value="45 Days" 
          subtitle="Until Selection Deadline" 
          icon={<Calendar className="h-5 w-5 text-amber-400" />}
          trend="down"
          percentage="8"
          isTrendGood={true}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'same';
  percentage: string;
  isTrendGood?: boolean;
}

function StatCard({ title, value, subtitle, icon, trend, percentage, isTrendGood = true }: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };
  
  const getTrendColor = () => {
    if (trend === 'same') return 'text-gray-400';
    if ((trend === 'up' && isTrendGood) || (trend === 'down' && !isTrendGood)) return 'text-green-400';
    return 'text-red-400';
  };
  
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs mt-1 text-gray-400">{subtitle}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-md">{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          <span className={getTrendColor()}>
            {getTrendIcon()} {percentage}%
          </span>
          <span className="text-gray-500 ml-2">vs. Last Month</span>
        </div>
      </CardContent>
    </Card>
  );
}
