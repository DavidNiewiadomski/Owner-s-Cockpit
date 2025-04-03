
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  name: string;
  path: string;
}

interface ReportsListProps {
  reports: Report[];
  currentReport: Report;
  selectedReport: string | null;
  onSelectReport: (reportId: string) => void;
}

export function ReportsList({ 
  reports, 
  currentReport, 
  selectedReport, 
  onSelectReport 
}: ReportsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reports.map((report) => (
        <Card 
          key={report.id}
          className={`cursor-pointer transition-all hover:shadow-glow overflow-hidden group
            ${selectedReport === report.id ? 'border-blue-500 bg-blue-950/20' : 'border-blue-900/30 bg-black/40 hover:border-blue-700/50'}`}
          onClick={() => onSelectReport(report.id)}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-md flex items-center justify-center 
                ${selectedReport === report.id ? 'bg-blue-700' : 'bg-blue-900/30 group-hover:bg-blue-800/40'}`}>
                <Download className={`h-5 w-5 ${selectedReport === report.id ? 'text-white' : 'text-blue-300'}`} />
              </div>
              <div>
                <div className={`font-medium ${selectedReport === report.id ? 'text-blue-200' : 'text-gray-300'}`}>
                  {report.name}
                </div>
                <div className="text-xs text-gray-500">
                  {report.path === currentReport.path ? 'Current page' : ''}
                </div>
              </div>
            </div>
            
            {selectedReport === report.id && (
              <Button size="sm" variant="secondary" className="h-8 px-3 bg-blue-700 text-white hover:bg-blue-600">
                Selected
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
