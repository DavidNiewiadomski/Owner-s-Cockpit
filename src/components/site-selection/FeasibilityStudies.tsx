
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, AlertTriangle, Download, Upload, Calendar, DollarSign } from 'lucide-react';
import { feasibilityStudiesData } from '@/data/site-selection/siteSelectionData';

export function FeasibilityStudies() {
  const [selectedStudy, setSelectedStudy] = useState(feasibilityStudiesData[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <StudyStatCard 
          title="Active Studies" 
          value="12" 
          subtitle="3 Pending Review" 
          icon={<FileText className="h-5 w-5 text-blue-400" />}
        />
        <StudyStatCard 
          title="Completed" 
          value="8" 
          subtitle="This Quarter" 
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        />
        <StudyStatCard 
          title="Total Investment" 
          value="$325K" 
          subtitle="Study Costs YTD" 
          icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
        />
        <StudyStatCard 
          title="Avg. Duration" 
          value="28 Days" 
          subtitle="From Start to Completion" 
          icon={<Clock className="h-5 w-5 text-amber-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudiesListCard onStudySelect={setSelectedStudy} />
        </div>
        <div>
          <StudyDetailsCard study={selectedStudy} />
        </div>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="schedule">Study Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports & Documents</TabsTrigger>
          <TabsTrigger value="consultants">Consultant Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-6">
          <StudyScheduleView />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <ReportsDocumentsView />
        </TabsContent>
        
        <TabsContent value="consultants" className="mt-6">
          <ConsultantNetworkView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StudyStatCard({ title, value, subtitle, icon }: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode; 
}) {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs mt-1 text-gray-400">{subtitle}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function StudiesListCard({ onStudySelect }: { onStudySelect: (study: any) => void }) {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Feasibility Studies</CardTitle>
            <CardDescription className="text-gray-400">
              Environmental, traffic, and technical assessments
            </CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Upload className="h-4 w-4 mr-2" />
            New Study
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-black p-0">
        <Table>
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Study Type</TableHead>
              <TableHead className="text-gray-400">Site</TableHead>
              <TableHead className="text-gray-400">Consultant</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Completion</TableHead>
              <TableHead className="text-gray-400">Cost</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feasibilityStudiesData.map((study) => (
              <TableRow 
                key={study.id} 
                className="border-b border-gray-800 hover:bg-gray-900/30 cursor-pointer"
                onClick={() => onStudySelect(study)}
              >
                <TableCell className="font-medium text-white">{study.studyType}</TableCell>
                <TableCell className="text-gray-400">{study.siteName}</TableCell>
                <TableCell className="text-gray-400">{study.consultant}</TableCell>
                <TableCell>
                  <StudyStatusBadge status={study.status} />
                </TableCell>
                <TableCell className="text-gray-400">{study.expectedCompletion}</TableCell>
                <TableCell className="text-green-400">{study.cost}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StudyStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Badge className={`${getStatusColor()} border`} variant="outline">
      {status}
    </Badge>
  );
}

function StudyDetailsCard({ study }: { study: any }) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-400" />
          Study Details
        </CardTitle>
        <CardDescription className="text-gray-400">
          {study.studyType} - {study.siteName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Consultant:</span>
            <span className="text-white">{study.consultant}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Start Date:</span>
            <span className="text-white">{study.startDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Expected Completion:</span>
            <span className="text-white">{study.expectedCompletion}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Cost:</span>
            <span className="text-green-400">{study.cost}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Risk Level:</span>
            <span className={getRiskColor(study.riskLevel)}>{study.riskLevel}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-white mb-2">Key Findings</h4>
          <p className="text-sm text-gray-400">{study.findings}</p>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          View Full Report
        </Button>
      </CardContent>
    </Card>
  );
}

function StudyScheduleView() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Study Schedule Timeline</CardTitle>
        <CardDescription className="text-gray-400">
          Upcoming milestones and deadlines for all active studies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feasibilityStudiesData.filter(study => study.status !== 'Completed').map((study) => (
            <div key={study.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="text-white font-medium">{study.studyType}</h4>
                  <p className="text-gray-400 text-sm">{study.siteName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{study.expectedCompletion}</div>
                <StudyStatusBadge status={study.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReportsDocumentsView() {
  const documents = [
    { name: 'Environmental Impact Assessment - Downtown Metro', type: 'PDF', size: '2.4 MB', date: '2025-06-20' },
    { name: 'Traffic Study Report - Industrial District', type: 'PDF', size: '1.8 MB', date: '2025-06-18' },
    { name: 'Soil Analysis Results - Waterfront Site', type: 'PDF', size: '3.2 MB', date: '2025-06-15' },
    { name: 'Geotechnical Study - Suburban North', type: 'PDF', size: '2.1 MB', date: '2025-06-12' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Reports & Documents</CardTitle>
        <CardDescription className="text-gray-400">
          Study reports, assessments, and supporting documentation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="text-white font-medium">{doc.name}</h4>
                  <p className="text-gray-400 text-sm">{doc.type} • {doc.size} • {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ConsultantNetworkView() {
  const consultants = [
    { name: 'Environmental Solutions Inc', specialty: 'Environmental Assessments', rating: 4.8, projects: 23 },
    { name: 'Metro Traffic Consultants', specialty: 'Traffic Impact Studies', rating: 4.9, projects: 31 },
    { name: 'GeoTech Environmental', specialty: 'Soil & Contamination', rating: 4.7, projects: 18 },
    { name: 'Hydro Engineering Group', specialty: 'Flood Zone Analysis', rating: 4.6, projects: 14 }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Consultant Network</CardTitle>
        <CardDescription className="text-gray-400">
          Preferred consultants and their specialties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consultants.map((consultant, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-white font-medium mb-2">{consultant.name}</h4>
              <p className="text-gray-400 text-sm mb-3">{consultant.specialty}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white">{consultant.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{consultant.projects} projects</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
