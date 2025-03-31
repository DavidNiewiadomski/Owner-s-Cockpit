
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ImpactEvent {
  id: number;
  project: string;
  event: string;
  financialImpact: string;
  schedulingImpact: string;
  roiImpact: string;
  date: string;
  status: string;
}

interface ImpactEventsTableProps {
  events: ImpactEvent[];
}

export const ImpactEventsTable: React.FC<ImpactEventsTableProps> = ({ events }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Construction Impact Events</h2>
      <div className="glass-card rounded-lg shadow-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Financial Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Schedule Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ROI Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-black/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-300">{event.project}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.event}</td>
                  <td className={`px-4 py-3 text-sm ${event.financialImpact.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                    {event.financialImpact}
                  </td>
                  <td className={`px-4 py-3 text-sm ${event.schedulingImpact.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                    {event.schedulingImpact}
                  </td>
                  <td className={`px-4 py-3 text-sm ${event.roiImpact.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                    {event.roiImpact}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge className={
                      event.status === 'high' ? 'bg-red-900/20 text-red-400' :
                      event.status === 'medium' ? 'bg-amber-900/20 text-amber-400' :
                      event.status === 'low' ? 'bg-yellow-900/20 text-yellow-400' :
                      'bg-green-900/20 text-green-400'
                    }>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
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
