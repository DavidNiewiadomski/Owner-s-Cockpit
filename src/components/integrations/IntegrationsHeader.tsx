
import React from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

export function IntegrationsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-cyan-900/30">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Integrations</h1>
        <p className="text-gray-400 text-base">Connect your project with external tools and services</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-blue">
          <CirclePlus className="h-4 w-4 mr-2" />
          Add New Integration
        </Button>
      </div>
    </div>
  );
}
