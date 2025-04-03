
import React, { useState } from 'react';
import { ShieldCheck, Leaf, Calendar, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { SafetyTabContent } from '@/components/safety/SafetyTabContent';
import { SustainabilityTabContent } from '@/components/sustainability/SustainabilityTabContent';
import { Button } from '@/components/ui/button';
import { 
  getSafetyMetrics, 
  getSustainabilityMetrics,
  safetyCertifications,
  safetyIncidents,
  sustainabilityCertifications
} from '@/data/safetyData';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const SafetySustainability = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  
  // Get metrics based on selected project
  const safetyMetrics = getSafetyMetrics(selectedProject?.id);
  const sustainabilityMetrics = getSustainabilityMetrics(selectedProject?.id);

  const combinedInsights = [
    {
      title: 'Safety Compliance',
      content: projectName === 'East Tower' ? 'OSHA inspection date approaching in 15 days. Schedule pre-inspection review.' :
               projectName === 'Westview Residences' ? 'Fire safety standards exceed requirements by 15%. Consider documenting as case study.' :
               projectName === 'Harbor Bridge' ? 'Worker safety orientation completion rate at 92%. 8 team members need follow-up.' :
               'Safety protocol compliance rate at 95%. 2 open issues need to be addressed.',
      type: 'warning' as const
    },
    {
      title: 'Incident Prevention',
      content: projectName === 'East Tower' ? 'Recent safety drill showed 2 minute improvement in evacuation time.' :
               projectName === 'Westview Residences' ? 'Zero incidents reported in the last 145 days - new project record!' :
               projectName === 'Harbor Bridge' ? 'Wind safety protocols activated 8 times this month. Review effectiveness.' :
               'Safety equipment inspection due in 3 days. Schedule has been sent to team leads.',
      type: 'info' as const
    },
    {
      title: 'Energy Efficiency',
      content: projectName === 'East Tower' ? 'Solar panel installation complete. Expected 22% reduction in grid usage.' :
               projectName === 'Westview Residences' ? 'Smart HVAC system showing 18% efficiency gain over projected values.' :
               projectName === 'Harbor Bridge' ? 'LED lighting upgrade complete. 35% energy reduction confirmed.' :
               'Building energy performance exceeding targets by 12%. Continue monitoring during summer months.',
      type: 'success' as const
    },
    {
      title: 'Material Sourcing',
      content: projectName === 'East Tower' ? '82% of materials sourced within 300 miles, exceeding 75% target.' :
               projectName === 'Westview Residences' ? 'Reclaimed wood installation complete, saving 125 mature trees.' :
               projectName === 'Harbor Bridge' ? 'Low-carbon concrete performance exceeding structural requirements by 15%.' :
               'Sustainable material sourcing at 85% against 80% target. Supplier documentation updated.',
      type: 'success' as const
    }
  ];

  return (
    <DashboardLayout
      projectContext="Safety & Sustainability"
      projectName={projectName}
      initialInsights={combinedInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <div className="px-6 py-6 bg-black">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Safety & Sustainability</h1>
            <p className="text-gray-400">Monitor and manage project safety and sustainability metrics</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-black border-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Inspection
            </Button>
            <Button variant="outline" size="sm" className="bg-black border-gray-700">
              <FileText className="h-4 w-4 mr-2" />
              Safety Documents
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="safety" className="w-full">
          <TabsList className="bg-black mb-6 border border-gray-800">
            <TabsTrigger value="safety" className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Safety
            </TabsTrigger>
            <TabsTrigger value="sustainability" className="data-[state=active]:bg-green-900 data-[state=active]:text-white">
              <Leaf className="w-4 h-4 mr-2" />
              Sustainability
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="safety" className="mt-0 pb-8 bg-black">
            <SafetyTabContent 
              safetyMetrics={safetyMetrics}
              safetyCerts={safetyCertifications}
              safetyIncidents={safetyIncidents}
              projectName={projectName}
            />
          </TabsContent>
          
          <TabsContent value="sustainability" className="mt-0 pb-8 bg-black">
            <SustainabilityTabContent 
              sustainabilityMetrics={sustainabilityMetrics}
              sustainabilityCerts={sustainabilityCertifications}
              projectName={projectName}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SafetySustainability;
