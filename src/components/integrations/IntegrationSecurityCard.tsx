
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
    <Card className="bg-black border-gray-800 mb-8 overflow-hidden">
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex-shrink-0 p-2 rounded-lg bg-cyan-900/30 mr-4">
            <Shield className="h-10 w-10 text-cyan-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Integration Security</h3>
            <p className="text-sm text-gray-300">All connections are secured with OAuth 2.0 and data encryption</p>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="space-x-5 flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-200">{activeCount} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm font-medium text-gray-200">{inactiveCount} Inactive</span>
            </div>
          </div>
          <Button variant="outline" className="text-xs h-9 border-gray-700 bg-black hover:bg-gray-900 text-gray-200">
            View Audit Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
