
import React from 'react';
import { Leaf, Recycle, Flower, FileText, Zap, DropletIcon, Wind, Sun, ThermometerIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';

interface SustainabilityMetrics {
  energyEfficiency: number;
  waterConservation: number;
  wasteReduction: number;
  renewableEnergy: number;
  carbonFootprint: number;
}

interface SustainabilityCertification {
  id: number;
  name: string;
  status: string;
  target: string;
}

interface SustainabilityTabContentProps {
  sustainabilityMetrics: SustainabilityMetrics;
  sustainabilityCerts: SustainabilityCertification[];
  projectName: string;
}

export function SustainabilityTabContent({
  sustainabilityMetrics,
  sustainabilityCerts,
  projectName
}: SustainabilityTabContentProps) {
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
    <>
      <CollapsibleAIAssistant 
        projectContext="Sustainability"
        projectName={projectName}
        initialInsights={sustainabilityInsights}
      />
      
      <main className="flex-1 overflow-y-auto p-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Energy Efficiency</div>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold">{sustainabilityMetrics.energyEfficiency}%</div>
              <Progress value={sustainabilityMetrics.energyEfficiency} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Water Conservation</div>
                <DropletIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{sustainabilityMetrics.waterConservation}%</div>
              <Progress value={sustainabilityMetrics.waterConservation} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Waste Reduction</div>
                <Recycle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{sustainabilityMetrics.wasteReduction}%</div>
              <Progress value={sustainabilityMetrics.wasteReduction} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Renewable Energy</div>
                <Sun className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold">{sustainabilityMetrics.renewableEnergy}%</div>
              <Progress value={sustainabilityMetrics.renewableEnergy} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Carbon Footprint</div>
                <Leaf className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{sustainabilityMetrics.carbonFootprint}%</div>
              <Progress value={sustainabilityMetrics.carbonFootprint} className="h-2 mt-2" />
            </Card>
          </div>
          
          <Card className="p-6 bg-black border-gray-800 mb-6">
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
          
          <Card className="p-6 bg-black border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sustainability Certifications</h2>
              <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-black">
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
    </>
  );
}
