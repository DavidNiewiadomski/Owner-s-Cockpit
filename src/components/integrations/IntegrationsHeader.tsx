
import React from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

export function IntegrationsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
        <p className="text-gray-400">Connect your project with external tools and services</p>
      </div>
      <div className="mt-3 md:mt-0">
        <Button className="bg-construction-600 hover:bg-construction-700 text-white">
          <CirclePlus className="h-4 w-4 mr-2" />
          Add New Integration
        </Button>
      </div>
    </div>
  );
}
