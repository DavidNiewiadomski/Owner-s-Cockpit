
import React from 'react';
import { Scan } from 'lucide-react';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  category: string;
  features: string[];
}

interface FeaturedIntegrationsProps {
  integrations: Integration[];
  onToggle: (name: string) => void;
}

export function FeaturedIntegrations({ 
  integrations, 
  onToggle 
}: FeaturedIntegrationsProps) {
  if (integrations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Scan className="h-5 w-5 mr-2 text-construction-400" />
        Featured Integrations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard 
            key={integration.id} 
            {...integration} 
            onToggle={() => onToggle(integration.name)} 
            className="bg-gradient-to-br from-black to-black border-construction-700/30 shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
