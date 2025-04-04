
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Video, 
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';

const MeetingDetails = () => {
  const navigate = useNavigate();
  
  // Sample meeting data
  const meetingData = {
    id: 'meet-2023-04-07',
    title: 'Compliance Review Meeting',
    date: '2023-04-07',
    time: '10:00 AM',
    duration: '1 hour',
    location: 'Conference Room A / Virtual',
    organizer: 'Sarah Johnson',
    attendees: [
      'Alex Morgan (Project Manager)', 
      'Chris Davis (Safety Officer)',
      'Jordan Smith (Legal Counsel)',
      'Taylor Reynolds (Compliance Manager)'
    ],
    description: 'Quarterly compliance review meeting to discuss regulatory requirements, recent inspections, and action items for upcoming compliance deadlines.',
    agenda: [
      'Review of recent compliance inspection results',
      'Discussion of upcoming regulatory changes',
      'Action items from previous meeting',
      'Assignment of new compliance tasks',
      'Schedule for next quarterly review'
    ],
    documents: [
      'Q1 Compliance Report.pdf',
      'Regulatory Changes Summary.docx',
      'Previous Meeting Minutes.pdf'
    ],
    status: 'Scheduled'
  };

  return (
    <DashboardLayout projectContext="Meeting Details">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">{meetingData.title}</h1>
          <Badge 
            className="ml-4 bg-blue-600 text-white"
            variant="secondary"
          >
            {meetingData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Meeting Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white">{meetingData.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Time</p>
                        <p className="text-white">{meetingData.time} ({meetingData.duration})</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white">{meetingData.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Organizer</p>
                        <p className="text-white">{meetingData.organizer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Video className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400">Meeting Link</p>
                        <Button variant="link" className="p-0 h-auto text-blue-400 justify-start">
                          Join Video Conference
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400">Documents</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {meetingData.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-950/30 text-blue-300">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Description</p>
                  <p className="text-white">{meetingData.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {meetingData.agenda.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-xs text-blue-300">{index + 1}</span>
                      </div>
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Attendees</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {meetingData.attendees.map((attendee, index) => (
                    <li key={index} className="flex items-center py-2 border-b border-gray-800 last:border-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center mr-3">
                        <span className="text-white font-medium">{attendee.charAt(0)}</span>
                      </div>
                      <span className="text-white">{attendee}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Others
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Attendance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MeetingDetails;
