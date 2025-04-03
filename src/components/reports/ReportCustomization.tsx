
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Report {
  id: string;
  name: string;
  path: string;
}

interface ReportCustomizationProps {
  reports: Report[];
  selectedReport: string;
  onSelectReport: (reportId: string) => void;
}

export function ReportCustomization({ 
  reports, 
  selectedReport, 
  onSelectReport 
}: ReportCustomizationProps) {
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [fileFormat, setFileFormat] = useState("pdf");
  
  return (
    <div className="space-y-4">
      <Card className="border-blue-900/30 bg-black/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-200">Report Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue={selectedReport} onValueChange={onSelectReport}>
            <SelectTrigger className="bg-gray-900 border-gray-700">
              <SelectValue placeholder="Select a report" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {reports.map((report) => (
                <SelectItem key={report.id} value={report.id} className="text-gray-300 focus:text-white focus:bg-blue-900">
                  {report.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-blue-900/30 bg-black/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-200">Content Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="charts" checked={includeCharts} onCheckedChange={checked => setIncludeCharts(!!checked)} />
              <Label htmlFor="charts" className="text-gray-300">Include charts and visualizations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rawData" checked={includeRawData} onCheckedChange={checked => setIncludeRawData(!!checked)} />
              <Label htmlFor="rawData" className="text-gray-300">Include raw data tables</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="summary" />
              <Label htmlFor="summary" className="text-gray-300">Include executive summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="recommendations" />
              <Label htmlFor="recommendations" className="text-gray-300">Include recommendations</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-900/30 bg-black/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-200">Export Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="format" className="text-gray-300">File Format</Label>
              <Select defaultValue={fileFormat} onValueChange={setFileFormat}>
                <SelectTrigger id="format" className="bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="pdf" className="text-gray-300 focus:text-white focus:bg-blue-900">PDF Document</SelectItem>
                  <SelectItem value="xlsx" className="text-gray-300 focus:text-white focus:bg-blue-900">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv" className="text-gray-300 focus:text-white focus:bg-blue-900">CSV Format</SelectItem>
                  <SelectItem value="pptx" className="text-gray-300 focus:text-white focus:bg-blue-900">PowerPoint Presentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="branded" className="text-gray-300">Include branding</Label>
              <Switch id="branded" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="compress" className="text-gray-300">Compress output file</Label>
              <Switch id="compress" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
