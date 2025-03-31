import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { 
  Search, PaperclipIcon, Send, Phone, Video, Info, MoreVertical, 
  ChevronLeft, Users, Star, ArrowUpRight, MessageSquare, 
  Clock, Calendar, User, CheckCircle, PlusCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Sample conversation data
interface Contact {
  id: string;
  name: string;
  avatar?: string;
  online?: boolean;
  lastSeen?: string;
  role?: string;
  members?: { id: string; name: string }[];
}

interface Conversation {
  id: string;
  contact: Contact;
  lastMessage: string;
  time: string;
  unread: number;
  pinned: boolean;
}

interface Message {
  id: string;
  sender: string;
  time: string;
  content: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    name: string;
    size: string;
  };
}

const conversations: Conversation[] = [
  {
    id: '1',
    contact: {
      id: 'c1',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true,
    },
    lastMessage: 'Approved the facade materials for Downtown High-Rise.',
    time: '10:30 AM',
    unread: 2,
    pinned: true,
  },
  {
    id: '2',
    contact: {
      id: 'c2',
      name: 'East Tower Project Team',
      members: [
        { id: 'm1', name: 'Sarah Wilson' },
        { id: 'm2', name: 'Alex Rodriguez' },
        { id: 'm3', name: 'Mark Johnson' },
      ],
      role: 'Project Team',
    },
    lastMessage: 'Meeting scheduled for Thursday at 2pm to discuss progress.',
    time: 'Yesterday',
    unread: 0,
    pinned: false,
  },
  {
    id: '3',
    contact: {
      id: 'c3',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: 'Last seen 2 hours ago',
    },
    lastMessage: 'Need approval for the revised budget for Riverside Complex.',
    time: 'Dec 24',
    unread: 1,
    pinned: false,
  },
  {
    id: '4',
    contact: {
      id: 'c4',
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: false,
      lastSeen: 'Last seen Dec 20',
    },
    lastMessage: 'Updated the project timeline with the latest milestones.',
    time: 'Dec 20',
    unread: 0,
    pinned: false,
  },
];

const messages: Message[] = [
  {
    id: 'm1',
    sender: 'Sarah Wilson',
    time: '10:30 AM',
    content: 'Hey, just wanted to let you know that I approved the facade materials for the Downtown High-Rise project. Let me know if you need anything else!',
  },
  {
    id: 'm2',
    sender: 'You',
    time: '10:35 AM',
    content: 'Great, thanks for the quick turnaround! We\'ll proceed with the order right away.',
    status: 'read',
  },
  {
    id: 'm3',
    sender: 'Sarah Wilson',
    time: '10:40 AM',
    content: 'Also, can you send over the revised budget for the Riverside Complex? Alex needs approval before the end of the week.',
  },
  {
    id: 'm4',
    sender: 'You',
    time: '10:45 AM',
    content: 'Will do. I\'ll forward it to you now.',
    status: 'sent',
  },
  {
    id: 'm5',
    sender: 'You',
    time: '10:46 AM',
    content: 'Budget.pdf',
    status: 'sent',
    attachment: {
      name: 'Budget.pdf',
      size: '2.5 MB',
    },
  },
];

const messageInsights = [
  {
    title: 'Communication Alert',
    content: 'Sarah Wilson has requested approval for Downtown High-Rise facade materials by tomorrow.',
    type: 'warning' as const
  },
  {
    title: 'Meeting Reminder',
    content: 'Project status meeting with the Downtown High-Rise team scheduled for Thursday at 2pm.',
    type: 'info' as const
  },
  {
    title: 'Decision Impact',
    content: 'Approving the material change for Corporate Office Park would save $85,000 on overall budget.',
    type: 'success' as const
  }
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = searchTerm
    ? conversations.filter(convo => 
        convo.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real application, we would send the message to an API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 flex">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-border">
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Messages</h2>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search messages..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="p-4">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-2">
                {filteredConversations.map(convo => (
                  <button
                    key={convo.id}
                    className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-colors ${
                      activeConversation.id === convo.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setActiveConversation(convo)}
                  >
                    <div className="flex items-start gap-3">
                      {convo.contact.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={convo.contact.avatar} alt={convo.contact.name} />
                          <AvatarFallback>{convo.contact.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">{convo.contact.name}</div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">{convo.time}</div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground truncate">{convo.lastMessage}</div>
                        
                        <div className="flex items-center mt-1">
                          {convo.contact.online ? (
                            <span className="flex items-center text-xs text-green-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                              Online
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {convo.contact.lastSeen}
                            </span>
                          )}
                          
                          <div className="ml-auto flex items-center gap-1">
                            {convo.pinned && (
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            )}
                            
                            {convo.unread > 0 && (
                              <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                {convo.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </TabsContent>
              
              <TabsContent value="unread">
                {filteredConversations.filter(c => c.unread > 0).map(convo => (
                  // Similar structure as above
                  <div key={convo.id} className="p-3 border-b border-border">
                    <div className="font-medium">{convo.contact.name}</div>
                    <div className="text-sm text-muted-foreground">{convo.lastMessage}</div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="pinned">
                {filteredConversations.filter(c => c.pinned).map(convo => (
                  // Similar structure as above
                  <div key={convo.id} className="p-3 border-b border-border">
                    <div className="font-medium">{convo.contact.name}</div>
                    <div className="text-sm text-muted-foreground">{convo.lastMessage}</div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat Window */}
          <div className="hidden md:flex flex-1 flex-col">
            {activeConversation && (
              <>
                {/* Chat Header */}
                <div className="px-6 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    {activeConversation.contact.avatar ? (
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src={activeConversation.contact.avatar} alt={activeConversation.contact.name} />
                        <AvatarFallback>{activeConversation.contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium flex items-center">
                        {activeConversation.contact.name}
                        {activeConversation.contact.online && (
                          <span className="h-2 w-2 rounded-full bg-green-500 ml-2"></span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activeConversation.contact.role || 
                          (activeConversation.contact.members && 
                            `${activeConversation.contact.members.length} members`)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender !== 'You' && (
                        <Avatar className="h-8 w-8 mr-3 mt-1">
                          <AvatarImage src={activeConversation.contact.avatar} alt={activeConversation.contact.name} />
                          <AvatarFallback>{activeConversation.contact.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                        <div className="mb-1 flex justify-between items-center gap-4">
                          <span className="text-xs font-medium">
                            {message.sender}
                          </span>
                          <span className="text-xs opacity-70">
                            {message.time}
                          </span>
                        </div>
                        
                        <p className="text-sm">{message.content}</p>
                        
                        {message.attachment && (
                          <div className="mt-2 p-2 bg-background/50 rounded flex items-center gap-2 text-sm">
                            <PaperclipIcon className="h-4 w-4" />
                            <span>{message.attachment.name}</span>
                            <span className="text-xs text-muted-foreground">({message.attachment.size})</span>
                            <Button variant="ghost" size="sm" className="ml-auto h-7 px-2">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {message.sender === 'You' && message.status && (
                        <div className="ml-2 flex flex-col justify-end">
                          <CheckCircle className={`h-3.5 w-3.5 ${message.status === 'read' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 bg-muted rounded-lg p-2">
                      <Input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="h-10 w-10 rounded-full flex-shrink-0" 
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Empty State for Mobile */}
          <div className="flex-1 flex items-center justify-center p-6 md:hidden">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your Messages</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a conversation to view messages
              </p>
            </div>
          </div>
        </main>
        
        {/* Add the AI Assistant component */}
        <CollapsibleAIAssistant
          projectContext="your messages"
          initialInsights={messageInsights}
        />
      </div>
    </div>
  );
};

export default Messages;
