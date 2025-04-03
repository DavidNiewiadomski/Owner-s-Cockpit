
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, MessageSquare, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ReportsList } from '@/components/reports/ReportsList';
import { ReportCustomization } from '@/components/reports/ReportCustomization';
import { ReportAIAssistant } from '@/components/reports/ReportAIAssistant';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ExportDialog({ open, onClose }: ExportDialogProps) {
  const { toast } = useToast();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
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
    { id: 'contracts', name: 'Contracts & Insurance Report', path: '/contracts-insurance' },
  ];

  // Find the currently active report based on location
  const currentReport = reports.find(report => 
    report.path === location.pathname
  ) || reports[0];

  // Handle export action
  const handleExport = () => {
    const reportToExport = selectedReport 
      ? reports.find(r => r.id === selectedReport)?.name 
      : currentReport.name;
      
    toast({
      title: `Exporting ${reportToExport}`,
      description: "Your report will be ready in a few moments",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border border-blue-900/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-200">Export Reports</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a report to export or customize your own report
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="reports" value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="mb-4 bg-gray-900 border border-gray-800">
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-blue-950 data-[state=active]:text-blue-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              Available Reports
            </TabsTrigger>
            <TabsTrigger 
              value="customize" 
              className="data-[state=active]:bg-blue-950 data-[state=active]:text-blue-200"
            >
              <Sliders className="h-4 w-4 mr-2" />
              Customize Report
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-blue-950 data-[state=active]:text-blue-200"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="m-0">
            <ReportsList 
              reports={reports}
              currentReport={currentReport}
              selectedReport={selectedReport}
              onSelectReport={setSelectedReport}
            />
          </TabsContent>

          <TabsContent value="customize" className="m-0">
            <ReportCustomization 
              reports={reports}
              selectedReport={selectedReport || currentReport.id}
              onSelectReport={setSelectedReport}
            />
          </TabsContent>

          <TabsContent value="ai" className="m-0">
            <ReportAIAssistant 
              currentReport={currentReport}
              onSelectReport={setSelectedReport}
            />
          </TabsContent>
        </Tabs>

        <Separator className="my-4 bg-gray-800" />

        <DialogFooter className="flex flex-row justify-between">
          <div className="text-sm text-gray-400">
            {selectedReport 
              ? `Selected: ${reports.find(r => r.id === selectedReport)?.name}` 
              : `Current: ${currentReport.name}`}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              className="bg-blue-700 hover:bg-blue-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
