
import React from 'react';
// Lucide icons will be passed as props, so specific imports here are not needed unless for default/fallback.
// For this refactor, we assume icons are passed correctly.
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Define the Feature interface
interface Feature {
  id: string; // Or number
  name: string;
  description: string;
  icon: React.ElementType; // To accept Lucide icons
  iconColor?: string; // Optional: if you want to control color via data
}

// Define props for SustainabilityFeatures
interface SustainabilityFeaturesProps {
  features: Feature[];
}

export function SustainabilityFeatures({ features }: SustainabilityFeaturesProps) {
  // Helper to group features into columns for rendering
  const featuresInColumns: Feature[][] = [];
  const itemsPerColumn = Math.ceil(features.length / 3); // Aim for 3 columns
  for (let i = 0; i < features.length; i += itemsPerColumn) {
    featuresInColumns.push(features.slice(i, i + itemsPerColumn));
  }

  return (
    <Card className="p-6 bg-black border-gray-800 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Sustainability Features</h2>
      {features.length === 0 ? (
        <p className="text-gray-400">No sustainability features listed for this project.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
          {featuresInColumns.map((columnFeatures, columnIndex) => (
            <div key={columnIndex} className="flex flex-col space-y-3">
              {columnFeatures.map((feature, featureIndex) => (
                <React.Fragment key={feature.id}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <feature.icon className={`h-5 w-5 ${feature.iconColor || 'text-green-500'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-100">{feature.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  {/* Add Separator if not the last item in the column */}
                  {featureIndex < columnFeatures.length - 1 && (
                    <Separator className="bg-gray-800" />
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
