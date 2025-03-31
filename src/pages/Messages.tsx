import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "I'll send over the updated site plans by tomorrow morning.",
    timestamp: "2 min ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Mark Johnson",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "The client approved the new design concept.",
    timestamp: "1 hour ago",
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Can we schedule a call to discuss the foundation issues?",
    timestamp: "3 hours ago",
    unread: 0,
    online: false
  },
  {
    id: 4,
    name: "BuildTech Team",
    avatar: "",
    lastMessage: "Weekly progress meeting tomorrow at 10 AM",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    isGroup: true
  },
  {
    id: 5,
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "The permits are approved. We can begin excavation next week.",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: 6,
    name: "Robert Smith",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "I've updated the cost estimates based on the new materials.",
    timestamp: "2 days ago",
    unread: 0,
    online: false
  },
  {
    id: 7,
    name: "Site Supervisors",
    avatar: "",
    lastMessage: "Safety inspection scheduled for Friday",
    timestamp: "3 days ago",
    unread: 0,
    online: false,
    isGroup: true
  }
];

const messageHistory = [
  {
    id: 1,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Hi John, I've been reviewing the latest site plans for the Downtown project.",
    timestamp: "10:32 AM",
    isUser: false
  },
  {
    id: 2,
    sender: "John Dawson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Hey Sarah, great. What do you think about them?",
    timestamp: "10:33 AM",
    isUser: true
  },
  {
    id: 3,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "There are a few issues with the foundation design that I think we need to address before proceeding.",
    timestamp: "10:34 AM",
    isUser: false
  },
  {
    id: 4,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "The soil analysis indicates that we might need deeper pilings for proper support.",
    timestamp: "10:34 AM",
    isUser: false
  },
  {
    id: 5,
    sender: "John Dawson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "I see. That could impact our timeline and budget. Do you have an estimate of how much deeper we'd need to go?",
    timestamp: "10:36 AM",
    isUser: true
  },
  {
    id: 6,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Based on the analysis, at least an additional 2 meters. I'm working on a detailed report with cost implications.",
    timestamp: "10:38 AM",
    isUser: false
  },
  {
    id: 7,
    sender: "John Dawson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "We'll need to discuss this with the client. Can you have the report ready by tomorrow?",
    timestamp: "10:40 AM",
    isUser: true
  },
  {
    id: 8,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Yes, I'll have it ready first thing tomorrow morning.",
    timestamp: "10:41 AM",
    isUser: false
  },
  {
    id: 9,
    sender: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "I'll send over the updated site plans by tomorrow morning.",
    timestamp: "10:42 AM",
    isUser: false
  }
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={setSearchTerm} title="Messages" subtitle="Communicate with your team and clients" />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="grid h-[calc(100vh-180px)] grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search messages..." 
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all" className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="teams" className="flex-1">Teams</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setActiveConversation(conversation)}
                      className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-accent ${
                        activeConversation.id === conversation.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          {conversation.avatar ? (
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          ) : (
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {conversation.isGroup ? 'G' : conversation.name.substring(0, 2)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="ml-auto" variant="default">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
            
            <Card className="md:col-span-2 overflow-hidden flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    {activeConversation.avatar ? (
                      <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {activeConversation.isGroup ? 'G' : activeConversation.name.substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messageHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                        {!msg.isUser && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src={msg.avatar} alt={msg.sender} />
                            <AvatarFallback>
                              {msg.sender.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              msg.isUser
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p>{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
