
import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SustainabilityCertification {
  id: number;
  name: string;
  status: string;
  target: string;
}

interface SustainabilityCertificationsTableProps {
  certifications: SustainabilityCertification[];
}

export function SustainabilityCertificationsTable({ certifications }: SustainabilityCertificationsTableProps) {
  return (
    <Card className="p-6 bg-black border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sustainability Certifications</h2>
        <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-black">
          <FileText className="h-3.5 w-3.5 mr-1" />
          Download Certificates
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Certification</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Target</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map(cert => (
              <tr key={cert.id} className="border-b border-gray-800">
                <td className="py-3 px-2">{cert.name}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    cert.status === 'Achieved' || cert.status === 'Verified' 
                      ? 'bg-green-900 text-green-300' :
                    cert.status === 'In Progress'
                      ? 'bg-amber-900 text-amber-300'
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {cert.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-400">{cert.target}</td>
                <td className="py-3 px-2">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
