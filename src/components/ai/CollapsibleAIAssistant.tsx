
import React, { useState, useEffect } from 'react';
import { Bot, Send, Minimize2, Maximize2, ChevronDown, ChevronUp, X, Info, BarChart, ArrowUpRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Legend } from 'recharts';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
}

interface InsightData {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  action?: {
    text: string;
    handler: () => void;
  };
}

interface CollapsibleAIAssistantProps {
  projectContext?: string;
  initialInsights?: InsightData[];
  mode?: 'construction' | 'property' | 'investment';
}

export function CollapsibleAIAssistant({
  projectContext = 'all projects',
  initialInsights = [],
  mode = 'construction'
}: CollapsibleAIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello, I'm your ${mode} project assistant. How can I help you with ${projectContext} today?`
    }
  ]);
  const [activeTab, setActiveTab] = useState('insights');
  const [insights, setInsights] = useState<InsightData[]>(initialInsights || [
    {
      title: 'Schedule Impact',
      content: 'Downtown High-Rise exterior walls are 5 days ahead of schedule. This could reduce overall costs by approximately 3%.',
      type: 'success'
    },
    {
      title: 'Budget Alert',
      content: 'Riverside Complex has exceeded material budget by 7%. Recommend reviewing purchasing contracts.',
      type: 'warning',
      action: {
        text: 'View Budget',
        handler: () => console.log('Navigate to budget view')
      }
    },
    {
      title: 'Investment Impact',
      content: 'Current construction pace puts ROI at 6.8%, 0.3% higher than projected.',
      type: 'info'
    }
  ]);

  // Fake performance data for visualization
  const performanceData = [
    { name: 'Budget', planned: 100, actual: 107 },
    { name: 'Timeline', planned: 100, actual: 95 },
    { name: 'Quality', planned: 100, actual: 98 },
    { name: 'ROI', planned: 100, actual: 104 },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage: Message = { role: 'user', content: message };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setMessage('');
    
    // Simulate AI response based on query content
    setTimeout(() => {
      let response = '';
      
      if (message.toLowerCase().includes('progress')) {
        response = 'The East Tower project is currently at 75% completion, on track for the September deadline. This keeps your projected ROI at 7.2% by Q4 2024.';
      } else if (message.toLowerCase().includes('budget')) {
        response = 'The current budget utilization is at 62%, with $4.2M spent of the total $6.8M allocation. Material costs have increased by 5%, which impacts your overall investment return by approximately 0.3%.';
      } else if (message.toLowerCase().includes('issue') || message.toLowerCase().includes('problem')) {
        response = 'There are currently 12 open issues across all projects. The most critical one is related to material delivery delays for Riverside Complex, which could push the completion date by 2 weeks. This would delay rental income by approximately $85,000.';
      } else if (message.toLowerCase().includes('investment') || message.toLowerCase().includes('return') || message.toLowerCase().includes('roi')) {
        response = 'Based on current progress and market conditions, your projected ROI is 7.2% for the Downtown High-Rise, 8.1% for Riverside Complex, and 6.5% for Corporate Office Park. These projections account for current construction timelines and budget status.';
      } else if (message.toLowerCase().includes('recommendation') || message.toLowerCase().includes('suggest')) {
        response = 'Based on current performance, I recommend: 1) Reviewing material contracts for Riverside Complex to address the 7% budget overrun, 2) Accelerating tenant negotiations for Downtown High-Rise as construction is ahead of schedule, and 3) Preparing for early financing restructuring to capitalize on improved completion timelines.';
      } else {
        response = 'I\'m here to help you manage your construction projects with a focus on investment impact. You can ask about project progress, budget status, potential issues, ROI projections, or request strategic recommendations.';
      }
      
      const assistantMessage: Message = { role: 'assistant', content: response };
      setConversation([...newConversation, assistantMessage]);
    }, 1000);
  };

  // Toggle full assistant expansion
  const toggleExpansion = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Minimize the assistant to just show the button
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Function to get badge color based on insight type
  const getInsightBadgeClass = (type: string) => {
    switch (type) {
      case 'success':
        return "bg-green-500/10 text-green-500 dark:bg-green-900/20 dark:text-green-400";
      case 'warning':
        return "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-400";
      case 'info':
        return "bg-blue-500/10 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 rounded-full p-3 z-50 bg-construction-600 hover:bg-construction-700 shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card 
      className={cn(
        "fixed bottom-6 right-6 w-80 transition-all duration-300 shadow-lg z-50 border-construction-600/20",
        isExpanded ? "md:w-[32rem] h-[500px]" : "h-96"
      )}
    >
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between bg-construction-600/10 border-b border-construction-600/20">
        <CardTitle className="text-md flex items-center">
          <Bot className="w-5 h-5 mr-2 text-construction-500" />
          Construction AI Insights
        </CardTitle>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpansion}
            className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:bg-construction-600/10"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMinimize}
            className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:bg-construction-600/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center px-4 border-b">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="insights" 
              className={cn(
                "pt-2 pb-1.5 px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                activeTab === "insights" && "border-b-2 border-construction-500 rounded-none"
              )}
            >
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className={cn(
                "pt-2 pb-1.5 px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                activeTab === "chat" && "border-b-2 border-construction-500 rounded-none"
              )}
            >
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className={cn(
                "pt-2 pb-1.5 px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                activeTab === "analysis" && "border-b-2 border-construction-500 rounded-none"
              )}
            >
              Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="insights" className="m-0">
          <div className={cn(
            "overflow-y-auto px-4 space-y-3",
            isExpanded ? "h-[370px]" : "h-[230px]"
          )}>
            {insights.map((insight, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader className="py-2 px-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge className={getInsightBadgeClass(insight.type)}>
                        {insight.type === 'info' && <Info className="h-3 w-3" />}
                        {insight.type === 'warning' && <Info className="h-3 w-3" />}
                        {insight.type === 'success' && <Info className="h-3 w-3" />}
                        <span className="ml-1 capitalize">{insight.type}</span>
                      </Badge>
                      {insight.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <p className="text-sm">{insight.content}</p>
                  {insight.action && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto mt-2 text-construction-500" 
                      onClick={insight.action.handler}
                    >
                      {insight.action.text} <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <CardFooter className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm justify-start text-muted-foreground">
              <Info className="mr-2 h-4 w-4" />
              View all insights and recommendations
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="chat" className="m-0 flex flex-col">
          <div className={cn(
            "overflow-y-auto flex-1 px-4 pt-2 pb-0 space-y-3",
            isExpanded ? "h-[370px]" : "h-[230px]"
          )}>
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-lg max-w-[85%]",
                  msg.role === 'assistant' 
                    ? "bg-muted text-foreground mr-auto" 
                    : "bg-construction-600/20 ml-auto text-foreground"
                )}
              >
                {msg.content}
                {msg.role === 'assistant' && index > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-2 border-t mt-auto">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input 
                placeholder="Ask about your projects..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-muted/50"
              />
              <Button type="submit" size="icon" className="bg-construction-600 hover:bg-construction-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="m-0">
          <div className={cn(
            "overflow-y-auto px-4",
            isExpanded ? "h-[370px]" : "h-[230px]"
          )}>
            <div className="pt-4 pb-2">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <BarChart className="h-4 w-4 mr-1 text-construction-500" />
                Performance Analysis
              </h4>
              
              <div className="h-[180px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 120]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Planned" dataKey="planned" fill="#9CA3AF" />
                    <Bar name="Actual" dataKey="actual" fill="#059669" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="h-5 w-5 mr-2 rounded-full bg-construction-600 text-white flex items-center justify-center text-xs">1</span>
                    <span>Budget overrun of 7% primarily due to material cost increases for steel and concrete</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 mr-2 rounded-full bg-construction-600 text-white flex items-center justify-center text-xs">2</span>
                    <span>Timeline is ahead of schedule by 5% due to efficient workforce management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 mr-2 rounded-full bg-construction-600 text-white flex items-center justify-center text-xs">3</span>
                    <span>Overall ROI improved by 4% despite budget overruns due to faster completion timeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <CardFooter className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm justify-start text-muted-foreground">
              <BarChart className="mr-2 h-4 w-4" />
              View detailed investment analysis
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
