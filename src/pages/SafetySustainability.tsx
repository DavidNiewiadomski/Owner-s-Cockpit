
import React, { useState } from 'react';
import { ShieldCheck, Leaf } from 'lucide-react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { SafetyTabContent } from '@/components/safety/SafetyTabContent';
import { SustainabilityTabContent } from '@/components/sustainability/SustainabilityTabContent';
import { 
  getSafetyMetrics, 
  getSustainabilityMetrics,
  safetyCertifications,
  safetyIncidents,
  sustainabilityCertifications
} from '@/data/safetyData';

const SafetySustainability = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';
  
  // Get metrics based on selected project
  const safetyMetrics = getSafetyMetrics(selectedProject?.id);
  const sustainabilityMetrics = getSustainabilityMetrics(selectedProject?.id);

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <Tabs defaultValue="safety" className="w-full">
          <div className="flex justify-between items-center px-6 pt-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Safety & Sustainability</h1>
              <p className="text-gray-400 mb-4">Monitor and manage project safety and sustainability metrics</p>
            </div>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="safety" className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Safety
              </TabsTrigger>
              <TabsTrigger value="sustainability" className="data-[state=active]:bg-green-900 data-[state=active]:text-white">
                <Leaf className="w-4 h-4 mr-2" />
                Sustainability
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="safety" className="mt-0">
            <SafetyTabContent 
              safetyMetrics={safetyMetrics}
              safetyCerts={safetyCertifications}
              safetyIncidents={safetyIncidents}
              projectName={projectName}
            />
          </TabsContent>
          
          <TabsContent value="sustainability" className="mt-0">
            <SustainabilityTabContent 
              sustainabilityMetrics={sustainabilityMetrics}
              sustainabilityCerts={sustainabilityCertifications}
              projectName={projectName}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SafetySustainability;
