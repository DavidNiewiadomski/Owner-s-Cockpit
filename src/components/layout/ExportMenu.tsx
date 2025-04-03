
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { ExportDialog } from '@/components/reports/ExportDialog';

interface ExportMenuProps {
  children: React.ReactNode;
}

export function ExportMenu({ children }: ExportMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full focus:outline-none">
          {children}
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          className="w-72 p-4 bg-gray-900 border border-gray-700 text-gray-200 z-50"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-950/80 flex items-center justify-center">
                <Download className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-100">Export Reports</h3>
                <p className="text-xs text-gray-400">Generate and download reports</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-600 text-white"
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Open Report Builder
            </Button>
            
            <p className="text-xs text-gray-500">
              Use our advanced report builder to create custom reports with charts, tables, and insights.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <ExportDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
    </>
  );
}
