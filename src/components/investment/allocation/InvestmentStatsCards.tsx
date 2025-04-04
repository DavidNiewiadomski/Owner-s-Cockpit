
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  DollarSign,
  Building2,
  TrendingUp
} from 'lucide-react';

export function InvestmentStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-400">Total Investment</div>
          <div className="text-xl font-bold mt-1">$43.9M</div>
        </div>
        <DollarSign className="h-8 w-8 text-blue-500 opacity-80" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-400">Active Projects</div>
          <div className="text-xl font-bold mt-1">12</div>
        </div>
        <Building2 className="h-8 w-8 text-purple-500 opacity-80" />
      </Card>
      
      <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-400">5-Year Projection</div>
          <div className="text-xl font-bold mt-1">+80%</div>
        </div>
        <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
      </Card>
    </div>
  );
}
