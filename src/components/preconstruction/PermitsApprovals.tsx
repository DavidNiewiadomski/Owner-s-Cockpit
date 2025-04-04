
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileCheck, Clock, AlertCircle, FileText, Calendar, CheckCircle, HelpCircle } from 'lucide-react';
import { permitsData, approvalsTimeline } from '@/data/preconstruction/preconstructionData';

export function PermitsApprovals() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PermitsTable />
        <PermitDueDates />
      </div>
      <div className="space-y-6">
        <ApprovalsTimeline />
        <PermitStatusChart />
      </div>
    </div>
  );
}

function PermitsTable() {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Permits & Licenses</CardTitle>
            <CardDescription className="text-gray-400">
              Status of required permits and licenses
            </CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <FileText className="h-4 w-4 mr-2" />
            New Permit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-black p-0">
        <Table className="border-collapse">
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Permit Name</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Application Date</TableHead>
              <TableHead className="text-gray-400">Expected Approval</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permitsData.map((permit) => (
              <TableRow key={permit.id} className="border-b border-gray-800 hover:bg-gray-900/30">
                <TableCell className="font-medium text-white">{permit.name}</TableCell>
                <TableCell className="text-gray-400">{permit.type}</TableCell>
                <TableCell>
                  <PermitStatusBadge status={permit.status} />
                </TableCell>
                <TableCell className="text-gray-400">{permit.applicationDate}</TableCell>
                <TableCell className="text-gray-400">{permit.expectedApproval}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PermitStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'delayed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'not started':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'in progress':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'pending':
        return <HelpCircle className="h-3 w-3 mr-1" />;
      case 'delayed':
        return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'not started':
        return <Clock className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge className={`${getStatusColor()} border flex items-center w-fit`} variant="outline">
      {getStatusIcon()}
      {status}
    </Badge>
  );
}

function PermitDueDates() {
  const upcomingDates = [
    {
      id: 1,
      title: 'Building Permit Final Review',
      date: 'Jul 10, 2025',
      daysLeft: 7,
      agency: 'City Building Department'
    },
    {
      id: 2,
      title: 'Environmental Clearance Deadline',
      date: 'Jul 15, 2025',
      daysLeft: 12,
      agency: 'Environmental Protection Agency'
    },
    {
      id: 3,
      title: 'Zoning Approval Hearing',
      date: 'Jul 22, 2025',
      daysLeft: 19,
      agency: 'City Planning Commission'
    },
    {
      id: 4,
      title: 'Utility Connection Application Due',
      date: 'Aug 5, 2025',
      daysLeft: 33,
      agency: 'Metropolitan Utility District'
    }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-400" />
          Upcoming Due Dates
        </CardTitle>
        <CardDescription className="text-gray-400">
          Important deadlines for permits and approvals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingDates.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div>
              <h3 className="text-white font-medium">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.agency}</p>
            </div>
            <div className="text-right">
              <p className="text-white">{item.date}</p>
              <p className={`text-sm ${item.daysLeft < 10 ? 'text-amber-400' : 'text-gray-400'}`}>
                {item.daysLeft} days left
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ApprovalsTimeline() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileCheck className="h-5 w-5 mr-2 text-green-400" />
          Approvals Timeline
        </CardTitle>
        <CardDescription className="text-gray-400">
          Recent and upcoming approvals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-px before:h-full before:bg-gray-800">
          {approvalsTimeline.map((approval, index) => (
            <div key={approval.id} className="flex gap-3 relative">
              <div 
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  approval.status === 'completed'
                    ? 'bg-green-500'
                    : approval.status === 'current'
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                }`}
              />
              <div>
                <p className={`text-sm font-medium ${
                  approval.status === 'completed'
                    ? 'text-green-400'
                    : approval.status === 'current'
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}>
                  {approval.date}
                </p>
                <h3 className="text-white mt-1">{approval.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{approval.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:text-white">
          View Full Timeline
        </Button>
      </CardFooter>
    </Card>
  );
}

function PermitStatusChart() {
  const statuses = [
    { status: 'Approved', count: 4, color: 'bg-green-500', percentage: 34 },
    { status: 'In Progress', count: 5, color: 'bg-blue-500', percentage: 42 },
    { status: 'Pending', count: 2, color: 'bg-amber-500', percentage: 16 },
    { status: 'Delayed', count: 1, color: 'bg-red-500', percentage: 8 }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Permit Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statuses.map((status) => (
          <div key={status.status} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{status.status}</span>
              <span className="text-white font-medium">{status.count}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`${status.color} h-2 rounded-full`} 
                style={{ width: `${status.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h3 className="text-white text-sm font-medium mb-2">Total Permits: 12</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs">Expected Completion</p>
              <p className="text-white font-medium">Aug 25, 2025</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs">Completion Rate</p>
              <p className="text-green-400 font-medium">On Schedule</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
