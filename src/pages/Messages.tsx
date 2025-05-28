
import React, { useState } from 'react';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Phone, Video, Send, Clock, CheckCheck } from 'lucide-react';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const messageInsights = [
    {
      title: 'Urgent Messages',
      content: '3 high-priority messages from contractors require immediate response within 2 hours',
      type: 'warning' as const
    },
    {
      title: 'Team Communication',
      content: 'Weekly team sync scheduled for tomorrow at 2 PM - all 12 members confirmed attendance',
      type: 'info' as const
    },
    {
      title: 'Response Rate',
      content: 'Average response time improved by 40% this week with new notification system implementation',
      type: 'success' as const
    },
    {
      title: 'Project Updates',
      content: '15 project status updates shared today across Riverfront Tower and Harbor Bridge teams',
      type: 'info' as const
    }
  ];

  const conversations = [
    {
      id: 1,
      name: "John Martinez",
      role: "Project Manager",
      avatar: "JM",
      lastMessage: "Foundation inspection completed successfully",
      time: "2 min ago",
      unread: 2,
      isOnline: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Site Engineer",
      avatar: "SC",
      lastMessage: "Steel delivery scheduled for Monday morning",
      time: "15 min ago",
      unread: 0,
      isOnline: true
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      role: "Safety Officer",
      avatar: "MR",
      lastMessage: "Safety training session rescheduled",
      time: "1 hour ago",
      unread: 1,
      isOnline: false
    },
    {
      id: 4,
      name: "Emily Foster",
      role: "Architect",
      avatar: "EF",
      lastMessage: "Updated blueprints are ready for review",
      time: "2 hours ago",
      unread: 0,
      isOnline: true
    },
    {
      id: 5,
      name: "David Thompson",
      role: "Electrical Contractor",
      avatar: "DT",
      lastMessage: "Electrical rough-in phase completion confirmed",
      time: "3 hours ago",
      unread: 3,
      isOnline: false
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Quality Inspector",
      avatar: "LW",
      lastMessage: "Quality checklist for Phase 2 attached",
      time: "4 hours ago",
      unread: 0,
      isOnline: true
    }
  ];

  const sampleMessages = [
    {
      id: 1,
      sender: "John Martinez",
      content: "Foundation inspection completed successfully. All structural elements meet specifications. Ready to proceed with next phase.",
      time: "10:32 AM",
      isOwnMessage: false
    },
    {
      id: 2,
      sender: "You",
      content: "Excellent news! What's the timeline for steel structure installation?",
      time: "10:35 AM",
      isOwnMessage: true
    },
    {
      id: 3,
      sender: "John Martinez",
      content: "Steel delivery is confirmed for Monday 8 AM. Installation crew will start immediately after delivery inspection.",
      time: "10:38 AM",
      isOwnMessage: false
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
                      <CardTitle className="text-white flex items-center justify-between">
                        Recent Conversations
                        <span className="text-sm text-gray-400 font-normal">6 active</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {conversations.map((conversation) => (
                          <div key={conversation.id} className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">{conversation.avatar}</span>
                                </div>
                                {conversation.isOnline && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-white font-medium truncate">{conversation.name}</p>
                                  {conversation.unread > 0 && (
                                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                      {conversation.unread}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm truncate">{conversation.role}</p>
                                <p className="text-gray-300 text-sm truncate">{conversation.lastMessage}</p>
                                <p className="text-gray-500 text-xs flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {conversation.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800 h-[600px] flex flex-col">
                    <CardHeader className="border-b border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">JM</span>
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">John Martinez</CardTitle>
                            <p className="text-gray-400 text-sm">Project Manager - Online</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-4">
                      <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                        {sampleMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwnMessage 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-800 text-gray-200'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs opacity-70">{message.time}</p>
                                {message.isOwnMessage && (
                                  <CheckCheck className="h-3 w-3 ml-2 opacity-70" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 border-t border-gray-800 pt-4">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
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
