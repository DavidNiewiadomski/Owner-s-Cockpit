
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, FileText } from 'lucide-react';

const MeetingDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const meetingInsights = [
    {
      title: 'Meeting Efficiency',
      content: 'Weekly project meetings are 15% shorter on average with new agenda format',
      type: 'success' as const
    },
    {
      title: 'Action Items',
      content: '8 action items from last meeting still pending - follow-up required',
      type: 'warning' as const
    },
    {
      title: 'Attendance Rate',
      content: 'Stakeholder meeting attendance improved to 94% with calendar integration',
      type: 'info' as const
    }
  ];

  return (
    <DashboardLayout
      projectContext="Meeting Details"
      projectName="All Projects"
      initialInsights={meetingInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Meeting Details</h1>
            <p className="text-gray-400">Manage and track meeting information</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="border-gray-600">
              <FileText className="h-4 w-4 mr-2" />
              Meeting Notes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-white font-medium">Weekly Project Review</h3>
                  <p className="text-gray-400 text-sm">Tomorrow, 2:00 PM - 3:30 PM</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">8 attendees</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Meeting Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-white font-medium">Safety Committee Meeting</h3>
                  <p className="text-gray-400 text-sm">Last Tuesday, 10:00 AM</p>
                  <p className="text-gray-300 text-sm mt-2">Discussed new safety protocols and equipment updates...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MeetingDetails;
