
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, Download, Eye, MessageSquare, Pencil, FilePlus } from 'lucide-react';
import { designPlansData } from '@/data/preconstruction/preconstructionData';

export function DesignPlans() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
          <CardHeader className="bg-black">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-cyan-300">Design Plans</CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage architectural and engineering designs
                </CardDescription>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <FilePlus className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="bg-black p-0">
            <Table className="border-collapse">
              <TableHeader className="bg-gray-900/50">
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-gray-400">Plan Name</TableHead>
                  <TableHead className="text-gray-400">Version</TableHead>
                  <TableHead className="text-gray-400">Designer</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Last Updated</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designPlansData.map((plan) => (
                  <TableRow key={plan.id} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <TableCell className="font-medium text-white">{plan.name}</TableCell>
                    <TableCell>{plan.version}</TableCell>
                    <TableCell>{plan.designer}</TableCell>
                    <TableCell>
                      <StatusBadge status={plan.status} />
                    </TableCell>
                    <TableCell className="text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        <span>{plan.lastUpdated}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <RecentActivity />
        <DesignStatusSummary />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in review':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'draft':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'pending':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
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

function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'approved',
      item: 'Floor Plan v2.3',
      time: '2 hours ago',
      icon: <div className="bg-green-500/20 p-2 rounded-full"><Pencil className="h-3 w-3 text-green-500" /></div>
    },
    {
      id: 2,
      user: 'Michael Johnson',
      action: 'commented on',
      item: 'Electrical Layout',
      time: '4 hours ago',
      icon: <div className="bg-blue-500/20 p-2 rounded-full"><MessageSquare className="h-3 w-3 text-blue-500" /></div>
    },
    {
      id: 3,
      user: 'David Wilson',
      action: 'uploaded',
      item: 'HVAC System Plan',
      time: 'Yesterday',
      icon: <div className="bg-purple-500/20 p-2 rounded-full"><FilePlus className="h-3 w-3 text-purple-500" /></div>
    },
    {
      id: 4,
      user: 'Emily Taylor',
      action: 'requested changes to',
      item: 'Plumbing Layout',
      time: '2 days ago',
      icon: <div className="bg-amber-500/20 p-2 rounded-full"><Pencil className="h-3 w-3 text-amber-500" /></div>
    }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            {activity.icon}
            <div className="space-y-1">
              <p className="text-sm text-white">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-gray-400">{activity.action}</span>{' '}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DesignStatusSummary() {
  const statuses = [
    { status: 'Approved', count: 5, color: 'bg-green-500', percentage: 42 },
    { status: 'In Review', count: 3, color: 'bg-amber-500', percentage: 25 },
    { status: 'Draft', count: 2, color: 'bg-blue-500', percentage: 17 },
    { status: 'Pending', count: 1, color: 'bg-purple-500', percentage: 8 },
    { status: 'Rejected', count: 1, color: 'bg-red-500', percentage: 8 }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg text-white">Design Status</CardTitle>
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
      </CardContent>
    </Card>
  );
}
