
import React from 'react';
import { BarChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SafetyIncident {
  id: number;
  title: string;
  severity: string;
  date: string;
  resolved: boolean;
  area: string;
}

interface SafetyIncidentsTableProps {
  incidents: SafetyIncident[];
}

export function SafetyIncidentsTable({ incidents }: SafetyIncidentsTableProps) {
  return (
    <Card className="p-6 bg-black border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Safety Incidents</h2>
        <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-gray-900">
          <BarChart className="h-3.5 w-3.5 mr-1" />
          View Detailed Report
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Incident</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Severity</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Date</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Location</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id} className="border-b border-gray-800">
                <td className="py-3 px-2">{incident.title}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    incident.severity === 'Low' ? 'bg-blue-900 text-blue-300' :
                    incident.severity === 'Medium' ? 'bg-amber-900 text-amber-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-400">{incident.date}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    incident.resolved ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'
                  }`}>
                    {incident.resolved ? 'Resolved' : 'Open'}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-400">{incident.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
