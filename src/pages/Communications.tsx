
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CommunicationOption } from '@/components/communications/CommunicationOption';
import { CommunicationForm } from '@/components/communications/CommunicationForm';
import { RecentCommunications } from '@/components/communications/RecentCommunications';
import { CommunicationStats } from '@/components/communications/CommunicationStats';
import { ScheduledCommunications } from '@/components/communications/ScheduledCommunications';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar, 
  Search,
  Plus,
  BrandSlack
} from 'lucide-react';

// Sample data
const recentCommunications = [
  {
    id: '1',
    type: 'email' as const,
    contact: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Downtown Project Update',
    excerpt: 'Just wanted to update you on the latest developments with the facade materials for the Downtown High-Rise project...',
    date: 'Today',
    time: '10:30 AM',
    project: 'Downtown High-Rise'
  },
  {
    id: '2',
    type: 'call' as const,
    contact: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Budget Discussion',
    date: 'Yesterday',
    time: '3:45 PM',
    project: 'Riverside Complex'
  },
  {
    id: '3',
    type: 'meeting' as const,
    contact: {
      name: 'Project Team Meeting',
    },
    subject: 'Weekly Progress Update',
    excerpt: 'Discussed timeline adjustments and resource allocation for the next phase of the East Tower project.',
    date: 'May 15',
    time: '2:00 PM',
    project: 'East Tower'
  },
  {
    id: '4',
    type: 'video' as const,
    contact: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Design Review',
    date: 'May 12',
    time: '11:15 AM',
    project: 'Corporate Office Park'
  },
  {
    id: '5',
    type: 'message' as const,
    contact: {
      name: 'Mark Johnson',
    },
    excerpt: 'The updated project timeline with the latest milestones has been approved by the board.',
    date: 'May 10',
    time: '4:20 PM',
    project: 'Waterfront Development'
  }
];

const scheduledEvents = [
  {
    id: '1',
    title: 'Weekly Project Status Meeting',
    type: 'meeting' as const,
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '1h',
    participants: ['Sarah Wilson', 'Alex Rodriguez', 'Lisa Chen', 'Mark Johnson'],
    project: 'Downtown High-Rise'
  },
  {
    id: '2',
    title: 'Budget Review Call',
    type: 'call' as const,
    date: 'May 20',
    time: '2:30 PM',
    duration: '45m',
    participants: ['Alex Rodriguez', 'Finance Team'],
    project: 'Riverside Complex'
  },
  {
    id: '3',
    title: 'Design Team Presentation',
    type: 'video' as const,
    date: 'May 22',
    time: '11:00 AM',
    duration: '1h 30m',
    participants: ['Lisa Chen', 'Design Team', 'Stakeholders'],
    project: 'East Tower'
  }
];

const communicationInsights = [
  {
    title: 'Response Needed',
    content: 'Alex Rodriguez is waiting for your approval on the revised budget for Riverside Complex.',
    type: 'warning' as const
  },
  {
    title: 'Meeting Reminder',
    content: 'Weekly project status meeting scheduled for tomorrow at 10am with the Downtown High-Rise team.',
    type: 'info' as const
  },
  {
    title: 'Communication Suggestion',
    content: 'You haven\'t updated the Waterfront Development team in 5 days. Consider scheduling a check-in.',
    type: 'info' as const
  }
];

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  // Communication type handlers
  const handleEmailClick = () => setActiveDialog('email');
  const handleMessageClick = () => setActiveDialog('message');
  const handleCallClick = () => setActiveDialog('call');
  const handleVideoClick = () => setActiveDialog('video');
  const handleMeetingClick = () => setActiveDialog('meeting');
  const handleSlackClick = () => setActiveDialog('slack');
  const handleTeamsClick = () => setActiveDialog('teams');
  
  const handleCloseDialog = () => setActiveDialog(null);
  
  const handleSubmit = (data: any) => {
    console.log('Communication submitted:', { type: activeDialog, data });
    // In a real app, we would send this data to an API
  };
  
  return (
    <div className="flex min-h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <CollapsibleAIAssistant
          projectContext="your communications"
          initialInsights={communicationInsights}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-blue-200">Communications Hub</h1>
                  <p className="text-gray-400">Manage all your project communications in one place</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      type="search" 
                      placeholder="Search communications..." 
                      className="pl-8 bg-black border-gray-700"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button className="bg-cyan-700 hover:bg-cyan-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </div>
              </div>
            </div>
            
            <CommunicationStats 
              emails={42}
              messages={24}
              calls={13}
              meetings={8}
              videoConferences={5}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              <CommunicationOption
                title="Send Email"
                description="Compose and send an email to project stakeholders"
                icon={Mail}
                iconColor="text-blue-400"
                onClick={handleEmailClick}
              />
              
              <CommunicationOption
                title="Send Message"
                description="Send a direct message to team members"
                icon={MessageSquare}
                iconColor="text-green-400"
                onClick={handleMessageClick}
              />
              
              <CommunicationOption
                title="Make a Call"
                description="Initiate a phone call with project contacts"
                icon={Phone}
                iconColor="text-yellow-400"
                onClick={handleCallClick}
              />
              
              <CommunicationOption
                title="Video Conference"
                description="Start or schedule a video meeting"
                icon={Video}
                iconColor="text-red-400"
                onClick={handleVideoClick}
              />
              
              <CommunicationOption
                title="Schedule Meeting"
                description="Set up in-person or virtual meetings"
                icon={Calendar}
                iconColor="text-purple-400"
                onClick={handleMeetingClick}
              />
              
              <CommunicationOption
                title="Slack Message"
                description="Send a message to Slack channels or users"
                icon={BrandSlack}
                iconColor="text-pink-400"
                onClick={handleSlackClick}
              />
              
              <CommunicationOption
                title="MS Teams Message"
                description="Communicate via Microsoft Teams"
                icon={MessageSquare}
                iconColor="text-blue-500"
                onClick={handleTeamsClick}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="calls">Calls</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="m-0">
                  <RecentCommunications communications={recentCommunications} />
                </TabsContent>
                
                <TabsContent value="emails" className="m-0">
                  <RecentCommunications 
                    communications={recentCommunications.filter(c => c.type === 'email')} 
                  />
                </TabsContent>
                
                <TabsContent value="messages" className="m-0">
                  <RecentCommunications 
                    communications={recentCommunications.filter(c => c.type === 'message')} 
                  />
                </TabsContent>
                
                <TabsContent value="calls" className="m-0">
                  <RecentCommunications 
                    communications={recentCommunications.filter(c => c.type === 'call' || c.type === 'video')} 
                  />
                </TabsContent>
              </Tabs>
              
              <ScheduledCommunications events={scheduledEvents} />
            </div>
          </div>
        </main>
      </div>
      
      {/* Communication Form Dialogs */}
      <Dialog open={activeDialog !== null} onOpenChange={() => activeDialog && handleCloseDialog()}>
        <DialogContent className="p-0 border-none bg-transparent max-w-none">
          {activeDialog === 'email' && (
            <CommunicationForm
              title="Send Email"
              icon={<Mail className="h-5 w-5 text-blue-400" />}
              recipientLabel="Email Address"
              showSubject={true}
              showMessage={true}
              showAttachment={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'message' && (
            <CommunicationForm
              title="Send Message"
              icon={<MessageSquare className="h-5 w-5 text-green-400" />}
              recipientLabel="Recipient"
              showSubject={false}
              showMessage={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'call' && (
            <CommunicationForm
              title="Make a Call"
              icon={<Phone className="h-5 w-5 text-yellow-400" />}
              recipientLabel="Phone Number"
              showSubject={false}
              showMessage={false}
              showSchedule={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'video' && (
            <CommunicationForm
              title="Video Conference"
              icon={<Video className="h-5 w-5 text-red-400" />}
              recipientLabel="Participants"
              showSubject={true}
              showMessage={false}
              showSchedule={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'meeting' && (
            <CommunicationForm
              title="Schedule Meeting"
              icon={<Calendar className="h-5 w-5 text-purple-400" />}
              recipientLabel="Participants"
              showSubject={true}
              showMessage={true}
              showSchedule={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'slack' && (
            <CommunicationForm
              title="Slack Message"
              icon={<BrandSlack className="h-5 w-5 text-pink-400" />}
              recipientLabel="Channel or User"
              showSubject={false}
              showMessage={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
          
          {activeDialog === 'teams' && (
            <CommunicationForm
              title="MS Teams Message"
              icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
              recipientLabel="Channel or User"
              showSubject={false}
              showMessage={true}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Communications;
