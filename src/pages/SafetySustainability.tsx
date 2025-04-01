import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Recycle, 
  Flower, 
  BarChart, 
  FileText,
  Check,
  AlertTriangle,
  Zap,
  DropletIcon,
  Wind,
  Sun,
  ThermometerIcon 
} from 'lucide-react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
import { Separator } from '@/components/ui/separator';

const SafetySustainability = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';
  
  const safetyMetrics = {
    incidentRate: selectedProject?.id === '1' ? 0.5 : selectedProject?.id === '2' ? 0.2 : 0.3,
    safetyScore: selectedProject?.id === '1' ? 92 : selectedProject?.id === '2' ? 97 : 95,
    inspectionsPassed: selectedProject?.id === '1' ? 42 : selectedProject?.id === '2' ? 28 : 35,
    openSafetyIssues: selectedProject?.id === '1' ? 3 : selectedProject?.id === '2' ? 1 : 2,
    daysWithoutIncident: selectedProject?.id === '1' ? 78 : selectedProject?.id === '2' ? 145 : 112,
  };
  
  const sustainabilityMetrics = {
    energyEfficiency: selectedProject?.id === '1' ? 85 : selectedProject?.id === '2' ? 92 : 88,
    waterConservation: selectedProject?.id === '1' ? 78 : selectedProject?.id === '2' ? 90 : 82,
    wasteReduction: selectedProject?.id === '1' ? 82 : selectedProject?.id === '2' ? 88 : 85,
    renewableEnergy: selectedProject?.id === '1' ? 45 : selectedProject?.id === '2' ? 65 : 55,
    carbonFootprint: selectedProject?.id === '1' ? 70 : selectedProject?.id === '2' ? 85 : 75,
  };
  
  const safetyCerts = [
    { id: 1, name: 'OSHA Compliance', status: 'Verified', date: '2023-11-15', expires: '2024-11-15' },
    { id: 2, name: 'Fire Safety Inspection', status: 'Passed', date: '2023-12-02', expires: '2024-12-02' },
    { id: 3, name: 'Structural Safety Assessment', status: 'Passed', date: '2023-10-28', expires: '2024-10-28' },
    { id: 4, name: 'Emergency Systems Check', status: 'In Progress', date: '2024-02-10', expires: 'Pending' },
  ];
  
  const safetyIncidents = [
    { id: 1, title: 'Minor slip and fall', severity: 'Low', date: '2024-01-15', resolved: true, area: 'North entrance' },
    { id: 2, title: 'Equipment malfunction', severity: 'Medium', date: '2023-12-05', resolved: true, area: 'Utility room' },
    { id: 3, title: 'Exposed electrical wiring', severity: 'High', date: '2024-02-01', resolved: false, area: 'East wing, 3rd floor' },
  ];
  
  const sustainabilityCerts = [
    { id: 1, name: 'LEED Gold Certification', status: 'In Progress', target: 'Jun 2024' },
    { id: 2, name: 'Energy Star Rating', status: 'Achieved', target: '85 points' },
    { id: 3, name: 'Net Zero Carbon Commitment', status: 'Planned', target: '2025' },
    { id: 4, name: 'Sustainable Materials Sourcing', status: 'Verified', target: '90% achieved' },
  ];
  
  const safetyInsights = [
    {
      title: 'Safety Compliance',
      content: projectName === 'East Tower' ? 'OSHA inspection date approaching in 15 days. Schedule pre-inspection review.' :
               projectName === 'Westview Residences' ? 'Fire safety standards exceed requirements by 15%. Consider documenting as case study.' :
               projectName === 'Harbor Bridge' ? 'Worker safety orientation completion rate at 92%. 8 team members need follow-up.' :
               'Safety protocol compliance rate at 95%. 2 open issues need to be addressed.',
      type: 'info' as const
    },
    {
      title: 'Incident Prevention',
      content: projectName === 'East Tower' ? 'Recent safety drill showed 2 minute improvement in evacuation time.' :
               projectName === 'Westview Residences' ? 'Zero incidents reported in the last 145 days - new project record!' :
               projectName === 'Harbor Bridge' ? 'Wind safety protocols activated 8 times this month. Review effectiveness.' :
               'Safety equipment inspection due in 3 days. Schedule has been sent to team leads.',
      type: 'warning' as const
    }
  ];
  
  const sustainabilityInsights = [
    {
      title: 'Energy Efficiency',
      content: projectName === 'East Tower' ? 'Solar panel installation complete. Expected 22% reduction in grid usage.' :
               projectName === 'Westview Residences' ? 'Smart HVAC system showing 18% efficiency gain over projected values.' :
               projectName === 'Harbor Bridge' ? 'LED lighting upgrade complete. 35% energy reduction confirmed.' :
               'Building energy performance exceeding targets by 12%. Continue monitoring during summer months.',
      type: 'info' as const
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
            <CollapsibleAIAssistant 
              projectContext="Safety"
              projectName={projectName}
              initialInsights={safetyInsights}
            />
            
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Safety Score</div>
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{safetyMetrics.safetyScore}%</div>
                    <Progress value={safetyMetrics.safetyScore} className="h-2 mt-2" />
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Days Without Incident</div>
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{safetyMetrics.daysWithoutIncident}</div>
                    <div className="text-sm text-gray-500 mt-2">Last incident: {safetyMetrics.daysWithoutIncident} days ago</div>
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Open Safety Issues</div>
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold">{safetyMetrics.openSafetyIssues}</div>
                    <div className="text-sm text-gray-500 mt-2">{safetyMetrics.openSafetyIssues === 0 ? 'All clear!' : `${safetyMetrics.openSafetyIssues} issues need attention`}</div>
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Inspections Passed</div>
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">{safetyMetrics.inspectionsPassed}</div>
                    <div className="text-sm text-gray-500 mt-2">Year to date</div>
                  </Card>
                </div>
                
                <Card className="p-6 bg-gray-900 border-gray-800 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Safety Certifications & Compliance</h2>
                    <Button variant="outline" className="text-xs h-8 bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      View All Documents
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800 text-left">
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Certification</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Issue Date</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Expiration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safetyCerts.map(cert => (
                          <tr key={cert.id} className="border-b border-gray-800">
                            <td className="py-3 px-2">{cert.name}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                cert.status === 'Verified' || cert.status === 'Passed' 
                                  ? 'bg-green-900 text-green-300' 
                                  : 'bg-amber-900 text-amber-300'
                              }`}>
                                {cert.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-400">{cert.date}</td>
                            <td className="py-3 px-2 text-gray-400">{cert.expires}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                
                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Safety Incidents</h2>
                    <Button variant="outline" className="text-xs h-8 bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <BarChart className="h-3.5 w-3.5 mr-1" />
                      View Detailed Report
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800 text-left">
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Incident</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Severity</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Date</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safetyIncidents.map(incident => (
                          <tr key={incident.id} className="border-b border-gray-800">
                            <td className="py-3 px-2">{incident.title}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                incident.severity === 'Low' ? 'bg-blue-900 text-blue-300' :
                                incident.severity === 'Medium' ? 'bg-amber-900 text-amber-300' :
                                'bg-red-900 text-red-300'
                              }`}>
                                {incident.severity}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-400">{incident.date}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                incident.resolved ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'
                              }`}>
                                {incident.resolved ? 'Resolved' : 'Open'}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-400">{incident.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </main>
          </TabsContent>
          
          <TabsContent value="sustainability" className="mt-0">
            <CollapsibleAIAssistant 
              projectContext="Sustainability"
              projectName={projectName}
              initialInsights={sustainabilityInsights}
            />
            
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Energy Efficiency</div>
                      <Zap className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold">{sustainabilityMetrics.energyEfficiency}%</div>
                    <Progress value={sustainabilityMetrics.energyEfficiency} className="h-2 mt-2" />
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Water Conservation</div>
                      <DropletIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">{sustainabilityMetrics.waterConservation}%</div>
                    <Progress value={sustainabilityMetrics.waterConservation} className="h-2 mt-2" />
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Waste Reduction</div>
                      <Recycle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{sustainabilityMetrics.wasteReduction}%</div>
                    <Progress value={sustainabilityMetrics.wasteReduction} className="h-2 mt-2" />
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Renewable Energy</div>
                      <Sun className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold">{sustainabilityMetrics.renewableEnergy}%</div>
                    <Progress value={sustainabilityMetrics.renewableEnergy} className="h-2 mt-2" />
                  </Card>
                  
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">Carbon Footprint</div>
                      <Leaf className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{sustainabilityMetrics.carbonFootprint}%</div>
                    <Progress value={sustainabilityMetrics.carbonFootprint} className="h-2 mt-2" />
                  </Card>
                </div>
                
                <Card className="p-6 bg-gray-900 border-gray-800 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Sustainability Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Sun className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Solar Energy Integration</h3>
                          <p className="text-sm text-gray-400 mt-1">Rooftop solar panels providing up to 35% of building energy needs during peak production</p>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <DropletIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Rainwater Harvesting</h3>
                          <p className="text-sm text-gray-400 mt-1">System captures and filters rainwater for landscape irrigation and non-potable uses</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Recycle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Construction Waste Diversion</h3>
                          <p className="text-sm text-gray-400 mt-1">Over 90% of construction waste diverted from landfills through recycling and reuse programs</p>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <ThermometerIcon className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">High-Efficiency HVAC</h3>
                          <p className="text-sm text-gray-400 mt-1">Variable refrigerant flow system with heat recovery provides 40% energy savings over conventional systems</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Wind className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Natural Ventilation</h3>
                          <p className="text-sm text-gray-400 mt-1">Building design optimizes airflow reducing mechanical ventilation needs by 30%</p>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Flower className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Sustainable Materials</h3>
                          <p className="text-sm text-gray-400 mt-1">85% of materials sourced from sustainable suppliers with verified environmental certifications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sustainability Certifications</h2>
                    <Button variant="outline" className="text-xs h-8 bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Download Certificates
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800 text-left">
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Certification</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Target</th>
                          <th className="py-3 px-2 text-gray-400 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sustainabilityCerts.map(cert => (
                          <tr key={cert.id} className="border-b border-gray-800">
                            <td className="py-3 px-2">{cert.name}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                cert.status === 'Achieved' || cert.status === 'Verified' 
                                  ? 'bg-green-900 text-green-300' :
                                cert.status === 'In Progress'
                                  ? 'bg-amber-900 text-amber-300'
                                  : 'bg-gray-800 text-gray-300'
                              }`}>
                                {cert.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-400">{cert.target}</td>
                            <td className="py-3 px-2">
                              <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </main>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SafetySustainability;
