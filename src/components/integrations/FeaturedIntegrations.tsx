
import React from 'react';
import { Sparkles } from 'lucide-react';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { Separator } from '@/components/ui/separator';

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
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
        <h2 className="text-xl font-semibold text-white">Featured Integrations</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard 
            key={integration.id} 
            {...integration} 
            onToggle={() => onToggle(integration.name)} 
            className="bg-gradient-to-br from-gray-900 to-black border-cyan-900/20 shadow-blue"
          />
        ))}
      </div>
      <Separator className="mt-8 mb-6 bg-gray-800" />
    </div>
  );
}
