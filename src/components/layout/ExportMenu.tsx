
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface ExportMenuProps {
  children: React.ReactNode;
}

export function ExportMenu({ children }: ExportMenuProps) {
  const { toast } = useToast();
  const location = useLocation();
  
  // Define all available reports with their paths
  const reports = [
    { id: 'dashboard', name: 'Dashboard Overview', path: '/' },
    { id: 'analytics', name: 'Analytics Report', path: '/analytics' },
    { id: 'financial', name: 'Financial Report', path: '/budget-financials' },
    { id: 'investment', name: 'Investment Impact Report', path: '/investment-impact' },
    { id: 'timeline', name: 'Timeline Report', path: '/timeline' },
    { id: 'safety', name: 'Safety & Sustainability Report', path: '/safety-sustainability' },
    { id: 'documents', name: 'Documents List', path: '/documents' },
    { id: 'communications', name: 'Communications Report', path: '/communications' },
    { id: 'actions', name: 'Action Items Report', path: '/action-items' },
  ];

  // Handle export action
  const handleExport = (reportName: string) => {
    toast({
      title: `Exporting ${reportName}`,
      description: "Your report will be ready in a few moments",
    });
  };

  // Find the currently active report based on location
  const currentReport = reports.find(report => 
    report.path === location.pathname
  ) || reports[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full focus:outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-gray-900 border border-gray-700 text-gray-200 z-50"
      >
        {reports.map((report) => (
          <DropdownMenuItem 
            key={report.id}
            className={`flex items-center px-3 py-2 cursor-pointer ${
              report.id === currentReport.id ? 'bg-gray-800 text-construction-300' : 'hover:bg-gray-800'
            }`}
            onClick={() => handleExport(report.name)}
          >
            <Download className="h-4 w-4 mr-2" />
            {report.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
