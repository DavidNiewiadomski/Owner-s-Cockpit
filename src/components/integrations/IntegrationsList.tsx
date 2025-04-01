
import React from 'react';
import { Button } from '@/components/ui/button';
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
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No integrations found matching your criteria</p>
        <Button 
          variant="outline" 
          className="text-construction-400 border-construction-600"
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
        />
      ))}
    </div>
  );
}
