
import React from 'react';
import { Button } from '@/components/ui/button';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { PackageX } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  category: string;
  features: string[];
}

interface IntegrationsListProps {
  integrations: Integration[];
  onToggle: (name: string) => void;
  onClearFilters: () => void;
}

export function IntegrationsList({ 
  integrations, 
  onToggle, 
  onClearFilters 
}: IntegrationsListProps) {
  if (integrations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900/30 rounded-lg border border-gray-800">
        <div className="flex justify-center mb-4">
          <span className="rounded-full bg-gray-800 p-3">
            <PackageX className="h-6 w-6 text-gray-400" />
          </span>
        </div>
        <p className="text-gray-400 mb-4">No integrations found matching your criteria</p>
        <Button 
          variant="outline" 
          className="text-cyan-400 border-cyan-700/50 hover:bg-cyan-950/30"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <IntegrationCard 
          key={integration.id} 
          {...integration} 
          onToggle={() => onToggle(integration.name)} 
          className="transition-transform hover:-translate-y-1 hover:shadow-green"
        />
      ))}
    </div>
  );
}
