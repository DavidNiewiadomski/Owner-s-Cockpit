
import React, { useState } from 'react';
import { ShieldCheck, Leaf, Download, Calendar, FileText } from 'lucide-react';
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
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const safetyInsights = [
  {
    title: 'Incident Rate Trending Down',
    content: 'Safety incidents have decreased 15% compared to last quarter, exceeding industry benchmarks.',
    type: 'success' as const,
  },
  {
    title: 'Certification Renewal',
    content: 'OSHA workplace safety certification renewal is due in 45 days. Schedule inspection to prepare.',
    type: 'warning' as const,
  },
  {
    title: 'Sustainability Achievement',
    content: 'Downtown High-Rise project is on track to achieve LEED Platinum certification.',
    type: 'info' as const,
  },
];

const SafetySustainability = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';
  
  // Get metrics based on selected project
  const safetyMetrics = getSafetyMetrics(selectedProject?.id);
  const sustainabilityMetrics = getSustainabilityMetrics(selectedProject?.id);

  return (
    <DashboardLayout
      projectContext="Safety & Sustainability"
      projectName={projectName}
      initialInsights={safetyInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <ScrollArea className="h-[calc(100vh-11rem)] bg-black">
        <Tabs defaultValue="safety" className="w-full">
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
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" className="bg-black border-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Safety Documents
              </Button>
            </div>
          </div>
          
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
      </ScrollArea>
    </DashboardLayout>
  );
};

export default SafetySustainability;
