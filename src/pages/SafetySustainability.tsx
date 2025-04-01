
import React, { useState } from 'react';
import { ShieldCheck, Leaf, Download, Calendar, FileText } from 'lucide-react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { SafetyTabContent } from '@/components/safety/SafetyTabContent';
import { SustainabilityTabContent } from '@/components/sustainability/SustainabilityTabContent';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
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
        
        <ScrollArea className="flex-1">
          <Tabs defaultValue="safety" className="w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center px-6 pt-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Safety & Sustainability</h1>
                <p className="text-gray-400 mb-4">Monitor and manage project safety and sustainability metrics</p>
              </div>
              <div className="flex space-x-2 mb-4 md:mb-0">
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Safety Documents
                </Button>
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
            
            <TabsContent value="safety" className="mt-0 pb-8">
              <SafetyTabContent 
                safetyMetrics={safetyMetrics}
                safetyCerts={safetyCertifications}
                safetyIncidents={safetyIncidents}
                projectName={projectName}
              />
            </TabsContent>
            
            <TabsContent value="sustainability" className="mt-0 pb-8">
              <SustainabilityTabContent 
                sustainabilityMetrics={sustainabilityMetrics}
                sustainabilityCerts={sustainabilityCertifications}
                projectName={projectName}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SafetySustainability;
