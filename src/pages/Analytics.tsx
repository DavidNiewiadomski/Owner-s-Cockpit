
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpleInsightsPanel } from '@/components/dashboard/SimpleInsightsPanel';
import { useProject } from '@/contexts/ProjectContext';

// Component imports
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { OverviewDashboard } from '@/components/analytics/OverviewDashboard';
import { CostAnalysisChart } from '@/components/analytics/CostAnalysisChart';
import { ProgressTrackingChart } from '@/components/analytics/ProgressTrackingChart';
import { ResourceUtilizationChart } from '@/components/analytics/ResourceUtilizationChart';
import { QualityMetricsChart } from '@/components/analytics/QualityMetricsChart';
import { SafetyIncidentsChart } from '@/components/analytics/SafetyIncidentsChart';

// Analytics page demo data
const costData = [
  { name: 'Jan', labor: 4000, materials: 2400, equipment: 1800 },
  { name: 'Feb', labor: 4500, materials: 2800, equipment: 1600 },
  { name: 'Mar', labor: 5000, materials: 3200, equipment: 2000 },
  { name: 'Apr', labor: 4800, materials: 3100, equipment: 2200 },
  { name: 'May', labor: 5200, materials: 3400, equipment: 2400 },
  { name: 'Jun', labor: 5500, materials: 3700, equipment: 2600 },
];

const progressData = [
  { name: 'Jan', planned: 20, actual: 18 },
  { name: 'Feb', planned: 40, actual: 35 },
  { name: 'Mar', planned: 60, actual: 52 },
  { name: 'Apr', planned: 75, actual: 68 },
  { name: 'May', planned: 90, actual: 85 },
  { name: 'Jun', planned: 100, actual: 95 },
];

const resourceUtilizationData = [
  { name: 'Excavators', utilization: 85, target: 90 },
  { name: 'Cranes', utilization: 72, target: 80 },
  { name: 'Loaders', utilization: 92, target: 85 },
  { name: 'Trucks', utilization: 65, target: 75 },
  { name: 'Bulldozers', utilization: 78, target: 85 },
];

const qualityIssuesData = [
  { name: 'Foundation', issues: 12, resolved: 10 },
  { name: 'Structural', issues: 8, resolved: 5 },
  { name: 'Electrical', issues: 15, resolved: 12 },
  { name: 'Plumbing', issues: 10, resolved: 8 },
  { name: 'Finishing', issues: 14, resolved: 9 },
];

const safetyIncidentsData = [
  { name: 'Jan', count: 3, severity: 2 },
  { name: 'Feb', count: 2, severity: 1 },
  { name: 'Mar', count: 4, severity: 3 },
  { name: 'Apr', count: 1, severity: 1 },
  { name: 'May', count: 2, severity: 2 },
  { name: 'Jun', count: 0, severity: 0 },
];

const riskDistributionData = [
  { name: 'High', value: 15, color: '#ef4444' },
  { name: 'Medium', value: 25, color: '#f97316' },
  { name: 'Low', value: 60, color: '#22c55e' },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPeriod, setCurrentPeriod] = useState('6M'); // 1M, 3M, 6M, 1Y, ALL
  const [activeAnimation, setActiveAnimation] = useState(false);
  const { selectedProject } = useProject();
  
  const projectName = selectedProject?.title || 'All Projects';
  
  // Create analytics insights as simple strings
  const analyticsInsights = [
    'Cost Trend Alert: Material costs have increased by 12% this month, exceeding your budget allocation.',
    `Schedule Variance: ${projectName} is currently 7% behind planned progress. Action recommended.`,
    'Resource Optimization: Crane utilization is below target (72% vs 80%). Consider reallocation.',
    'Quality Issues: Structural quality issues have a lower resolution rate (62%) than other categories.'
  ];
  
  // Animate charts when tab changes
  useEffect(() => {
    setActiveAnimation(true);
    const timer = setTimeout(() => {
      setActiveAnimation(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Analytics" 
          subtitle="Project performance metrics and insights"
        />
        
        <SimpleInsightsPanel
          title="Analytics Insights"
          projectName={projectName}
          insights={analyticsInsights}
        />
        
        <main className="flex-1 p-6">
          <AnalyticsHeader 
            projectName={projectName}
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
          />
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <OverviewDashboard 
                costData={costData}
                progressData={progressData}
                resourceUtilizationData={resourceUtilizationData}
                qualityIssuesData={qualityIssuesData}
                riskDistributionData={riskDistributionData}
              />
            </TabsContent>
            
            <TabsContent value="costs" className="space-y-6">
              <CostAnalysisChart data={costData} />
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <ProgressTrackingChart data={progressData} />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <ResourceUtilizationChart data={resourceUtilizationData} />
            </TabsContent>
            
            <TabsContent value="quality" className="space-y-6">
              <QualityMetricsChart data={qualityIssuesData} />
            </TabsContent>
            
            <TabsContent value="safety" className="space-y-6">
              <SafetyIncidentsChart data={safetyIncidentsData} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
