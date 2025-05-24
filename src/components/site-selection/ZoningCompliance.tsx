
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Scale, Building } from 'lucide-react';
import { zoningComplianceData } from '@/data/site-selection/siteSelectionData';

export function ZoningCompliance() {
  const [selectedSite, setSelectedSite] = useState(zoningComplianceData[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ComplianceStatCard 
          title="Compliant Sites" 
          value="3" 
          subtitle="Ready for Development" 
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        />
        <ComplianceStatCard 
          title="Requires Approval" 
          value="2" 
          subtitle="Permits Pending" 
          icon={<Clock className="h-5 w-5 text-amber-400" />}
        />
        <ComplianceStatCard 
          title="Non-Compliant" 
          value="1" 
          subtitle="Needs Rezoning" 
          icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
        />
        <ComplianceStatCard 
          title="Avg. Approval Time" 
          value="4.5 Months" 
          subtitle="For Variances" 
          icon={<Scale className="h-5 w-5 text-blue-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ZoningComplianceTable onSiteSelect={setSelectedSite} />
        </div>
        <div>
          <SiteComplianceDetails site={selectedSite} />
        </div>
      </div>

      <Tabs defaultValue="regulations" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="permits">Permits & Approvals</TabsTrigger>
          <TabsTrigger value="timeline">Approval Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regulations" className="mt-6">
          <RegulationsOverview />
        </TabsContent>
        
        <TabsContent value="permits" className="mt-6">
          <PermitsApprovalsView />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-6">
          <ApprovalTimelineView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ComplianceStatCard({ title, value, subtitle, icon }: { 
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

function ZoningComplianceTable({ onSiteSelect }: { onSiteSelect: (site: any) => void }) {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Zoning & Compliance Status</CardTitle>
            <CardDescription className="text-gray-400">
              Regulatory compliance and zoning requirements for each site
            </CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <FileText className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-black p-0">
        <Table>
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Site Name</TableHead>
              <TableHead className="text-gray-400">Current Zoning</TableHead>
              <TableHead className="text-gray-400">Required Zoning</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Height Compliance</TableHead>
              <TableHead className="text-gray-400">Est. Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoningComplianceData.map((site) => (
              <TableRow 
                key={site.id} 
                className="border-b border-gray-800 hover:bg-gray-900/30 cursor-pointer"
                onClick={() => onSiteSelect(site)}
              >
                <TableCell className="font-medium text-white">{site.siteName}</TableCell>
                <TableCell className="text-gray-400">{site.currentZoning}</TableCell>
                <TableCell className="text-gray-400">{site.requiredZoning}</TableCell>
                <TableCell>
                  <ComplianceStatusBadge status={site.status} />
                </TableCell>
                <TableCell>
                  <HeightComplianceBadge 
                    proposed={site.proposedHeight} 
                    limit={site.heightLimit} 
                  />
                </TableCell>
                <TableCell className="text-green-400">{site.estimatedCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ComplianceStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'requires rezoning':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'conditional use permit required':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Badge className={`${getStatusColor()} border text-xs`} variant="outline">
      {status}
    </Badge>
  );
}

function HeightComplianceBadge({ proposed, limit }: { proposed: string; limit: string }) {
  const proposedNum = parseInt(proposed);
  const limitNum = parseInt(limit);
  const isCompliant = proposedNum <= limitNum;

  return (
    <div className="flex flex-col">
      <span className="text-white text-sm">{proposed} / {limit}</span>
      <Badge 
        className={`${isCompliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} border-0 text-xs`}
        variant="outline"
      >
        {isCompliant ? 'Compliant' : 'Exceeds'}
      </Badge>
    </div>
  );
}

function SiteComplianceDetails({ site }: { site: any }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          Compliance Details
        </CardTitle>
        <CardDescription className="text-gray-400">
          {site.siteName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current Zoning:</span>
            <span className="text-white">{site.currentZoning}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Required Zoning:</span>
            <span className="text-white">{site.requiredZoning}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Height Limit:</span>
            <span className="text-white">{site.heightLimit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Proposed Height:</span>
            <span className="text-white">{site.proposedHeight}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Setbacks:</span>
            <span className="text-white">{site.setbacks}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Parking Requirement:</span>
            <span className="text-white">{site.parkingRequirement}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-white mb-2">Special Requirements</h4>
          <p className="text-sm text-gray-400">{site.specialRequirements}</p>
        </div>
        
        {site.approvalNeeded && (
          <div className="pt-4 border-t border-gray-800">
            <h4 className="text-sm font-medium text-white mb-2">Approval Process</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Time:</span>
                <span className="text-white">{site.estimatedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Cost:</span>
                <span className="text-green-400">{site.estimatedCost}</span>
              </div>
            </div>
          </div>
        )}
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          View Compliance Report
        </Button>
      </CardContent>
    </Card>
  );
}

function RegulationsOverview() {
  const regulations = [
    { category: 'Building Height', requirement: 'Varies by zone (35-150 ft)', compliance: 'Partial' },
    { category: 'Setback Requirements', requirement: 'Front: 10-50 ft, Side: 5-25 ft', compliance: 'Full' },
    { category: 'Parking Ratios', requirement: '1 space per 250-500 sq ft', compliance: 'Full' },
    { category: 'Green Space', requirement: 'Minimum 15% of site area', compliance: 'Partial' },
    { category: 'ADA Compliance', requirement: 'Full accessibility required', compliance: 'Full' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Local Regulations Overview</CardTitle>
        <CardDescription className="text-gray-400">
          Key regulatory requirements and compliance status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regulations.map((reg, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{reg.category}</h4>
                <p className="text-gray-400 text-sm">{reg.requirement}</p>
              </div>
              <Badge 
                className={`${reg.compliance === 'Full' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'} border-0`}
                variant="outline"
              >
                {reg.compliance} Compliance
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PermitsApprovalsView() {
  const permits = [
    { type: 'Site Plan Approval', status: 'Approved', date: '2025-05-15', cost: '$2,500' },
    { type: 'Building Permit', status: 'Pending', date: '2025-07-01', cost: '$15,000' },
    { type: 'Environmental Permit', status: 'In Review', date: '2025-06-30', cost: '$3,500' },
    { type: 'Traffic Impact Permit', status: 'Approved', date: '2025-05-20', cost: '$1,200' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Permits & Approvals</CardTitle>
        <CardDescription className="text-gray-400">
          Required permits and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {permits.map((permit, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="text-white font-medium">{permit.type}</h4>
                  <p className="text-gray-400 text-sm">Target Date: {permit.date} • Cost: {permit.cost}</p>
                </div>
              </div>
              <ComplianceStatusBadge status={permit.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ApprovalTimelineView() {
  const timelineEvents = [
    { phase: 'Pre-Application Meeting', duration: '2 weeks', status: 'completed' },
    { phase: 'Application Submission', duration: '1 week', status: 'completed' },
    { phase: 'Initial Review', duration: '4 weeks', status: 'in-progress' },
    { phase: 'Public Notice Period', duration: '3 weeks', status: 'pending' },
    { phase: 'Planning Commission Review', duration: '2 weeks', status: 'pending' },
    { phase: 'Final Approval', duration: '1 week', status: 'pending' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Approval Timeline</CardTitle>
        <CardDescription className="text-gray-400">
          Typical approval process timeline for development projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${
                event.status === 'completed' ? 'bg-green-400' :
                event.status === 'in-progress' ? 'bg-blue-400' : 'bg-gray-600'
              }`} />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{event.phase}</h4>
                  <p className="text-gray-400 text-sm">Duration: {event.duration}</p>
                </div>
                <Badge 
                  className={`${
                    event.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    event.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-gray-500/20 text-gray-400'
                  } border-0 capitalize`}
                  variant="outline"
                >
                  {event.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
