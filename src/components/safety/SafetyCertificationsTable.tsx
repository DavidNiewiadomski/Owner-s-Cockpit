
import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SafetyCertification {
  id: number;
  name: string;
  status: string;
  date: string;
  expires: string;
}

interface SafetyCertificationsTableProps {
  certifications: SafetyCertification[];
}

export function SafetyCertificationsTable({ certifications }: SafetyCertificationsTableProps) {
  return (
    <Card className="p-6 bg-black border-gray-800 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Safety Certifications & Compliance</h2>
        <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-gray-900">
          <FileText className="h-3.5 w-3.5 mr-1" />
          View All Documents
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Certification</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Issue Date</th>
              <th className="py-3 px-2 text-gray-400 font-medium text-sm">Expiration</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map(cert => (
              <tr key={cert.id} className="border-b border-gray-800">
                <td className="py-3 px-2">{cert.name}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    cert.status === 'Verified' || cert.status === 'Passed' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-amber-900 text-amber-300'
                  }`}>
                    {cert.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-400">{cert.date}</td>
                <td className="py-3 px-2 text-gray-400">{cert.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
