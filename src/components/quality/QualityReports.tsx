
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const reportsData = [
  {
    id: 'QR001',
    title: 'Monthly Quality Summary - December 2023',
    type: 'Monthly Report',
    generatedDate: '2024-01-01',
    period: 'December 2023',
    status: 'Published',
    size: '2.4 MB',
    pages: 15
  },
  {
    id: 'QR002',
    title: 'Structural Inspection Report - East Tower',
    type: 'Inspection Report',
    generatedDate: '2023-12-28',
    period: 'December 2023',
    status: 'Published',
    size: '1.8 MB',
    pages: 8
  },
  {
    id: 'QR003',
    title: 'Quality Audit Report - Q4 2023',
    type: 'Audit Report',
    generatedDate: '2024-01-03',
    period: 'Q4 2023',
    status: 'Draft',
    size: '3.2 MB',
    pages: 22
  }
];

const reportTemplates = [
  {
    name: 'Daily Quality Check',
    description: 'Standard daily quality inspection checklist',
    frequency: 'Daily',
    lastUsed: '2024-01-05'
  },
  {
    name: 'Weekly Summary',
    description: 'Weekly quality metrics and trends',
    frequency: 'Weekly',
    lastUsed: '2024-01-01'
  },
  {
    name: 'Monthly Audit',
    description: 'Comprehensive monthly quality audit',
    frequency: 'Monthly',
    lastUsed: '2024-01-01'
  }
];

export function QualityReports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Reports Generated</span>
              <span className="text-2xl font-bold text-blue-400">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">This Month</span>
              <span className="text-2xl font-bold text-green-400">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Average Score</span>
              <span className="text-2xl font-bold text-cyan-400">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Trend</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-400">+2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Report Templates</CardTitle>
            <CardDescription className="text-gray-400">
              Standardized quality report formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportTemplates.map((template, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-800">
                  <div>
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <p className="text-sm text-gray-400">{template.description}</p>
                    <p className="text-xs text-gray-500">Last used: {template.lastUsed}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quality Reports Archive</CardTitle>
          <CardDescription className="text-gray-400">
            Generated quality reports and documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Report ID</TableHead>
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Period</TableHead>
                <TableHead className="text-gray-300">Generated</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Size</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportsData.map((report) => (
                <TableRow key={report.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{report.id}</TableCell>
                  <TableCell className="text-gray-300 max-w-xs">
                    <div className="truncate" title={report.title}>
                      {report.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{report.type}</TableCell>
                  <TableCell className="text-gray-300">{report.period}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {report.generatedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={report.status === 'Published' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{report.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
