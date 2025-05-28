
import React, { useState } from 'react';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Phone, Video, Send } from 'lucide-react';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const messageInsights = [
    {
      title: 'Urgent Messages',
      content: '3 high-priority messages from contractors require immediate response',
      type: 'warning' as const
    },
    {
      title: 'Team Communication',
      content: 'Weekly team sync scheduled for tomorrow at 2 PM - all members confirmed',
      type: 'info' as const
    },
    {
      title: 'Response Rate',
      content: 'Average response time improved by 40% this week with new notification system',
      type: 'success' as const
    }
  ];

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <ScrollArea className="flex-1">
          <main className="container mx-auto py-6 px-4 md:px-6">
            <CollapsibleAIAssistant 
              projectContext="Messages"
              projectName="All Projects"
              initialInsights={messageInsights}
            />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">Messages</h1>
                  <p className="text-gray-400">Communicate with your team and stakeholders</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Start Call
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Conversations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">JD</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">John Doe</p>
                              <p className="text-gray-400 text-sm">Project Manager</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800 h-[600px] flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-white">Message Thread</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1 bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-gray-400 text-center">Select a conversation to start messaging</p>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Messages;
