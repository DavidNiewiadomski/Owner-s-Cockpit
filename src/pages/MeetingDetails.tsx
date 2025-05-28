
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, FileText, MapPin, Video, Phone } from 'lucide-react';

const MeetingDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const meetingInsights = [
    {
      title: 'Meeting Efficiency',
      content: 'Weekly project meetings are 15% shorter on average with new agenda format and time management protocols',
      type: 'success' as const
    },
    {
      title: 'Action Items',
      content: '8 action items from last meeting still pending completion - follow-up required with responsible parties',
      type: 'warning' as const
    },
    {
      title: 'Attendance Rate',
      content: 'Stakeholder meeting attendance improved to 94% with calendar integration and reminder notifications',
      type: 'success' as const
    },
    {
      title: 'Meeting Costs',
      content: 'Average meeting cost reduced by $2,400 per month through virtual meeting adoption and streamlined agendas',
      type: 'info' as const
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Weekly Project Review - Riverfront Tower",
      date: "Tomorrow",
      time: "2:00 PM - 3:30 PM",
      attendees: 8,
      location: "Conference Room A / Zoom",
      type: "Project Review",
      priority: "High"
    },
    {
      id: 2,
      title: "Safety Committee Meeting",
      date: "Thursday, Dec 7",
      time: "10:00 AM - 11:00 AM",
      attendees: 12,
      location: "Site Office",
      type: "Safety",
      priority: "Critical"
    },
    {
      id: 3,
      title: "Harbor Bridge Design Review",
      date: "Friday, Dec 8",
      time: "9:00 AM - 12:00 PM",
      attendees: 15,
      location: "Design Studio",
      type: "Design Review",
      priority: "High"
    },
    {
      id: 4,
      title: "Budget Planning Q1 2025",
      date: "Monday, Dec 11",
      time: "1:00 PM - 2:30 PM",
      attendees: 6,
      location: "Virtual Meeting",
      type: "Financial",
      priority: "Medium"
    },
    {
      id: 5,
      title: "Contractor Coordination Meeting",
      date: "Tuesday, Dec 12",
      time: "8:00 AM - 9:30 AM",
      attendees: 18,
      location: "Site Trailer",
      type: "Coordination",
      priority: "High"
    }
  ];

  const recentMeetings = [
    {
      id: 1,
      title: "Safety Committee Meeting",
      date: "Last Tuesday, Dec 3",
      time: "10:00 AM",
      attendees: 12,
      summary: "Discussed new safety protocols for crane operations, updated equipment inspection schedules, and reviewed incident reports from November.",
      actionItems: 5,
      notesAttached: true
    },
    {
      id: 2,
      title: "Westview Residences Progress Update",
      date: "Monday, Dec 2",
      time: "3:00 PM",
      attendees: 9,
      summary: "Reviewed Phase 1 completion status, discussed material delivery delays, and planned Phase 2 timeline adjustments.",
      actionItems: 3,
      notesAttached: true
    },
    {
      id: 3,
      title: "Electrical Systems Coordination",
      date: "Friday, Nov 29",
      time: "11:00 AM",
      attendees: 7,
      summary: "Coordinated electrical rough-in schedule with plumbing installation, resolved conduit routing conflicts in mechanical rooms.",
      actionItems: 4,
      notesAttached: true
    },
    {
      id: 4,
      title: "Client Presentation - Harbor Bridge",
      date: "Wednesday, Nov 27",
      time: "2:00 PM",
      attendees: 8,
      summary: "Presented structural design updates to client, received approval for material specifications, discussed timeline for Phase 2.",
      actionItems: 2,
      notesAttached: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Safety': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Design Review': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Financial': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Coordination': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

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
            <p className="text-gray-400">Manage and track meeting information across all projects</p>
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
            <Button variant="outline" className="border-gray-600">
              <Video className="h-4 w-4 mr-2" />
              Start Video Call
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Upcoming Meetings
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50 ml-auto">
                  {upcomingMeetings.length} scheduled
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium text-sm leading-tight">{meeting.title}</h3>
                      <Badge variant="outline" className={`${getPriorityColor(meeting.priority)} text-xs`}>
                        {meeting.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{meeting.attendees} attendees</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{meeting.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getTypeColor(meeting.type)} text-xs`}>
                          {meeting.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="border-gray-600 text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Agenda
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-400" />
                Recent Meeting Notes
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50 ml-auto">
                  {recentMeetings.length} completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium text-sm leading-tight">{meeting.title}</h3>
                      {meeting.notesAttached && (
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                          Notes
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {meeting.date}, {meeting.time} • {meeting.attendees} attendees
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{meeting.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{meeting.actionItems} action items</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          View Notes
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-xs">
                          Actions
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meeting Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">This Week</p>
                  <p className="text-xl font-bold text-white">12</p>
                  <p className="text-xs text-gray-500">meetings scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg Duration</p>
                  <p className="text-xl font-bold text-white">1.2h</p>
                  <p className="text-xs text-gray-500">15% improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Attendance</p>
                  <p className="text-xl font-bold text-white">94%</p>
                  <p className="text-xs text-gray-500">across all meetings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-sm text-gray-400">Action Items</p>
                  <p className="text-xl font-bold text-white">23</p>
                  <p className="text-xs text-gray-500">pending completion</p>
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
