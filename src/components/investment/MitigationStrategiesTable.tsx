
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MitigationStrategy {
  id: number;
  issue: string;
  strategy: string;
  potentialSavings: string;
  costToImplement: string;
  netRoiImpact: string;
  status: string;
}

interface MitigationStrategiesTableProps {
  strategies: MitigationStrategy[];
  onStrategyAction: (id: number, action: string) => void;
}

export const MitigationStrategiesTable: React.FC<MitigationStrategiesTableProps> = ({ 
  strategies, 
  onStrategyAction 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Impact Mitigation Strategies</h2>
      <div className="glass-card rounded-lg shadow-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Issue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mitigation Strategy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Potential Savings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Implementation Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Net ROI Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {strategies.map((strategy) => (
                <tr key={strategy.id} className="hover:bg-black/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-300">{strategy.issue}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{strategy.strategy}</td>
                  <td className="px-4 py-3 text-sm text-green-400">{strategy.potentialSavings}</td>
                  <td className="px-4 py-3 text-sm text-red-400">{strategy.costToImplement}</td>
                  <td className="px-4 py-3 text-sm text-green-400">{strategy.netRoiImpact}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge className={
                      strategy.status === 'proposed' ? 'bg-blue-900/20 text-blue-400' :
                      strategy.status === 'in-progress' ? 'bg-amber-900/20 text-amber-400' :
                      'bg-green-900/20 text-green-400'
                    }>
                      {strategy.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs border-gray-700 hover:border-gray-600 text-gray-300 hover-scale"
                        onClick={() => onStrategyAction(strategy.id, 'Approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-gray-300 hover:text-white"
                        onClick={() => onStrategyAction(strategy.id, 'Detailed')}
                      >
                        Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
