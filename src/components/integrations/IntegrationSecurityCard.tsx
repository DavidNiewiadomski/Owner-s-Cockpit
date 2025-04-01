
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface IntegrationSecurityCardProps {
  activeCount: number;
  inactiveCount: number;
}

export function IntegrationSecurityCard({ 
  activeCount, 
  inactiveCount 
}: IntegrationSecurityCardProps) {
  return (
    <Card className="bg-black border-gray-700 p-4 mb-8">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-12 w-12 text-construction-500 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-white">Integration Security</h3>
              <p className="text-sm text-gray-400">All connections are secured with OAuth 2.0 and data encryption</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">{activeCount} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-300">{inactiveCount} Inactive</span>
            </div>
            <Button variant="outline" className="ml-4 text-xs h-8 border-gray-700 bg-black hover:bg-gray-900">
              View Audit Log
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
