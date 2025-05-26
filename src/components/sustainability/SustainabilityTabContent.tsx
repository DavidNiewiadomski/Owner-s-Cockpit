
import React from 'react';
// useProject import removed as projectName prop is already available
import { SustainabilityMetricsCards } from './SustainabilityMetricsCards';
import { SustainabilityFeatures } from './SustainabilityFeatures';
import { SustainabilityCertificationsTable } from './SustainabilityCertificationsTable';
import { SustainabilityMetrics, SustainabilityCertification } from './sustainability-types';
import { Sun, DropletIcon, Recycle, ThermometerIcon, Wind, Flower } from 'lucide-react'; // Import Lucide icons

// Define the Feature interface (copied from SustainabilityFeatures.tsx for clarity, can be shared)
interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconColor?: string;
}

interface SustainabilityTabContentProps {
  sustainabilityMetrics: SustainabilityMetrics;
  sustainabilityCerts: SustainabilityCertification[];
  projectName: string; // projectName is already a prop, use it if needed for conditional data
}

const featuresData: Feature[] = [
  {
    id: 'solar',
    name: 'Solar Energy Integration',
    description: 'Rooftop solar panels providing up to 35% of building energy needs during peak production.',
    icon: Sun,
    iconColor: 'text-yellow-500'
  },
  {
    id: 'rainwater',
    name: 'Rainwater Harvesting',
    description: 'System captures and filters rainwater for landscape irrigation and non-potable uses.',
    icon: DropletIcon,
    iconColor: 'text-blue-500'
  },
  {
    id: 'waste',
    name: 'Construction Waste Diversion',
    description: 'Over 90% of construction waste diverted from landfills through recycling and reuse programs.',
    icon: Recycle,
    iconColor: 'text-green-500'
  },
  {
    id: 'hvac',
    name: 'High-Efficiency HVAC',
    description: 'Variable refrigerant flow system with heat recovery provides 40% energy savings over conventional systems.',
    icon: ThermometerIcon,
    iconColor: 'text-red-500'
  },
  {
    id: 'ventilation',
    name: 'Natural Ventilation',
    description: 'Building design optimizes airflow reducing mechanical ventilation needs by 30%.',
    icon: Wind,
    iconColor: 'text-cyan-500'
  },
  {
    id: 'materials',
    name: 'Sustainable Materials',
    description: '85% of materials sourced from sustainable suppliers with verified environmental certifications.',
    icon: Flower,
    iconColor: 'text-green-500' // Same color as Recycle for consistency or choose another
  }
];

export function SustainabilityTabContent({
  sustainabilityMetrics,
  sustainabilityCerts
  // projectName prop is available if featuresData needs to be dynamic per project in future
}: SustainabilityTabContentProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <SustainabilityMetricsCards metrics={sustainabilityMetrics} />
      <SustainabilityFeatures features={featuresData} /> {/* Pass featuresData as prop */}
      <SustainabilityCertificationsTable certifications={sustainabilityCerts} />
    </div>
  );
}
