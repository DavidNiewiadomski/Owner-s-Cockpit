
import React from 'react';
import { Zap, DropletIcon, Recycle, Sun, Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SustainabilityMetrics {
  energyEfficiency: number;
  waterConservation: number;
  wasteReduction: number;
  renewableEnergy: number;
  carbonFootprint: number;
}

interface SustainabilityMetricsCardsProps {
  metrics: SustainabilityMetrics;
}

export function SustainabilityMetricsCards({ metrics }: SustainabilityMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Energy Efficiency</div>
          <Zap className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="text-2xl font-bold">{metrics.energyEfficiency}%</div>
        <Progress value={metrics.energyEfficiency} className="h-2 mt-2" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Water Conservation</div>
          <DropletIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div className="text-2xl font-bold">{metrics.waterConservation}%</div>
        <Progress value={metrics.waterConservation} className="h-2 mt-2" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Waste Reduction</div>
          <Recycle className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold">{metrics.wasteReduction}%</div>
        <Progress value={metrics.wasteReduction} className="h-2 mt-2" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Renewable Energy</div>
          <Sun className="h-5 w-5 text-amber-500" />
        </div>
        <div className="text-2xl font-bold">{metrics.renewableEnergy}%</div>
        <Progress value={metrics.renewableEnergy} className="h-2 mt-2" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">Carbon Footprint</div>
          <Leaf className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold">{metrics.carbonFootprint}%</div>
        <Progress value={metrics.carbonFootprint} className="h-2 mt-2" />
      </Card>
    </div>
  );
}
