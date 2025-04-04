
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, FileText, Calendar, HardHat, Calculator } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';

export function PreconstructionHeader() {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Preconstruction Management</h1>
      </div>
      
      <p className="text-gray-400">
        Track design plans, site assessments, permits and preliminary budget estimates for {projectName}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard 
          title="Design Plans" 
          value="12" 
          subtitle="3 Pending Review" 
          icon={<FileText className="h-5 w-5 text-cyan-400" />}
          trend="up"
          percentage="14"
        />
        
        <StatCard 
          title="Site Assessments" 
          value="5/7" 
          subtitle="2 In Progress" 
          icon={<Building className="h-5 w-5 text-purple-400" />}
          trend="up"
          percentage="71"
        />
        
        <StatCard 
          title="Active Permits" 
          value="8" 
          subtitle="2 Pending Approval" 
          icon={<HardHat className="h-5 w-5 text-amber-400" />}
          trend="same"
          percentage="100"
        />
        
        <StatCard 
          title="Est. Start Date" 
          value="Sep 15" 
          subtitle="45 Days Until Breaking Ground" 
          icon={<Calendar className="h-5 w-5 text-green-400" />}
          trend="down"
          percentage="5"
          isTrendGood={false}
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
