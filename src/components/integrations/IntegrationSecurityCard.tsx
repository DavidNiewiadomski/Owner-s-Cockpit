
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface IntegrationSecurityCardProps {
  activeCount: number;
  inactiveCount: number;
}

export function IntegrationSecurityCard({ activeCount, inactiveCount }: IntegrationSecurityCardProps) {
  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-950 border-gray-800 mb-8 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start lg:items-center flex-col lg:flex-row">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Integration Security</h3>
              <p className="text-sm text-gray-400">Monitor and manage your integrated services</p>
            </div>
          </div>
          
          <Separator className="my-4 lg:hidden bg-gray-800" />
          
          <div className="flex items-center gap-6 lg:ml-auto">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Active Integrations</p>
                <p className="text-xl font-semibold text-white">{activeCount}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Inactive Integrations</p>
                <p className="text-xl font-semibold text-white">{inactiveCount}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
