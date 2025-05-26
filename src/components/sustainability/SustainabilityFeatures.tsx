
import React from 'react';
import { Sun, DropletIcon, Recycle, ThermometerIcon, Wind, Flower } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function SustainabilityFeatures() {
  return (
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
  );
}
