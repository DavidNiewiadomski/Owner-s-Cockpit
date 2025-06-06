
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Insight {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
}

interface CollapsibleAIAssistantProps {
  projectContext?: string;
  projectName: string;
  insights?: Insight[];
  initialInsights: Insight[];
}

export function CollapsibleAIAssistant({ 
  projectContext = "Dashboard", 
  projectName, 
  insights = [],
  initialInsights = []
}: CollapsibleAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(true);
  const allInsights = insights.length > 0 ? insights : initialInsights;

  const handleChatOpen = () => {
    console.log('Opening AI chat...');
  };

  return (
    <Card className="h-full overflow-hidden bg-black border-2 border-cyan-800/30 shadow-2xl mb-6" style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' }}>
      {/* Cockpit-style top border with lights */}
      <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 relative">
        <div className="absolute top-0 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-6 bg-black">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-black border-2 border-cyan-800/50 shadow-lg rounded-xl relative" style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}>
                <LightbulbIcon className="h-6 w-6 text-cyan-400" />
                {/* Corner lights */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-300 tracking-wider uppercase">
                  AI Command Center
                </h3>
                <p className="text-sm text-gray-400 opacity-80 font-mono">Intelligence System Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleChatOpen}
                className="bg-black border-2 border-cyan-800/50 text-cyan-400 hover:text-cyan-300 hover:bg-black hover:border-cyan-600/50 transition-all duration-300 rounded-lg px-4 py-2 uppercase tracking-wider text-xs font-bold"
                style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.2)' }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Comm</span>
              </Button>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-black border-2 border-cyan-800/50 text-cyan-400 hover:text-cyan-300 hover:bg-black hover:border-cyan-600/50 transition-all duration-300 rounded-lg px-3 py-2"
                  style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.2)' }}
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          <CollapsibleContent className="space-y-0">
            <div className="grid grid-cols-4 gap-4">
              {allInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="group relative p-4 rounded-lg bg-black border-2 border-cyan-800/30 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] hover:border-cyan-600/50 flex flex-col h-full min-h-[160px]"
                  onClick={handleChatOpen}
                  style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.15)' }}
                >
                  <div className="flex items-start gap-3 h-full">
                    <div className={`p-2 rounded-full border-2 flex-shrink-0 ${
                      insight.type === "warning" 
                        ? "bg-black text-amber-400 border-amber-600/50" 
                        : insight.type === "success" 
                        ? "bg-black text-green-400 border-green-600/50" 
                        : "bg-black text-cyan-400 border-cyan-600/50"
                    }`} style={{ 
                      boxShadow: insight.type === "warning" 
                        ? "0 0 8px rgba(245, 158, 11, 0.3)" 
                        : insight.type === "success" 
                        ? "0 0 8px rgba(34, 197, 94, 0.3)" 
                        : "0 0 8px rgba(34, 211, 238, 0.3)"
                    }}>
                      <LightbulbIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm font-bold mb-2 text-cyan-200 group-hover:text-cyan-100 transition-colors leading-tight word-wrap break-words hyphens-auto whitespace-normal uppercase tracking-wide">
                        {insight.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors word-wrap break-words whitespace-normal overflow-wrap-anywhere hyphens-auto font-mono">
                        {insight.content}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cockpit-style corner lights */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-500 rounded-full opacity-60"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-500 rounded-full opacity-60"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-500 rounded-full opacity-60"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-500 rounded-full opacity-60"></div>
                  
                  {/* Status indicator glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-40">
                    <div className={`h-full w-16 mx-auto rounded-t-full blur-sm ${
                      insight.type === "warning" 
                        ? "bg-amber-400" 
                        : insight.type === "success" 
                        ? "bg-green-400" 
                        : "bg-cyan-400"
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}
