
import React from 'react';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  category: string;
  features: string[];
}

interface IntegrationsOverviewProps {
  integrations: Integration[];
}

export function IntegrationsOverview({ integrations }: IntegrationsOverviewProps) {
  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4 text-white">Integrated Tools</h3>
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="p-3 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-white p-1 flex items-center justify-center">
                <img 
                  src={integration.logo} 
                  alt={integration.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-medium text-white flex items-center">
                  {integration.name}
                  {integration.connected ? (
                    <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-500 ml-2" />
                  )}
                </h4>
                <p className="text-xs text-gray-400">{integration.category}</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 mb-2">{integration.description}</p>
            <div className="flex flex-wrap gap-1">
              {integration.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors">
        <span>Manage Integrations</span>
        <ExternalLink className="ml-1 h-3 w-3" />
      </button>
    </div>
  );
}
