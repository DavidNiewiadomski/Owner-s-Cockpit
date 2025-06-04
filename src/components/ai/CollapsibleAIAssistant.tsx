
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
    <Card className="h-full overflow-hidden bg-gradient-to-br from-gray-900/95 to-black border-gray-800/50 shadow-xl animate-fade-in transition-all duration-300 hover:translate-y-[-4px] mb-6">
      {/* Color gradient top border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-blue-400"></div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 shadow-lg rounded-xl">
                <LightbulbIcon className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  AI Insights for {projectContext}
                </h3>
                <p className="text-sm text-gray-400 opacity-80">Real-time intelligent analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleChatOpen}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-cyan-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-gray-700/80 hover:to-gray-800/90 transition-all duration-300 rounded-lg border border-gray-700/50 hover:border-gray-600/50 px-4 py-2"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Chat with AI</span>
              </Button>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-cyan-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-gray-700/80 hover:to-gray-800/90 transition-all duration-300 rounded-lg border border-gray-700/50 hover:border-gray-600/50 px-3 py-2"
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          <CollapsibleContent className="space-y-0">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {allInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="group relative p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/80 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] border border-gray-700/50 shadow-lg hover:border-gray-600/50 flex flex-col h-full min-h-[160px]"
                  onClick={handleChatOpen}
                >
                  <div className="flex items-start gap-3 h-full">
                    <div className={`p-2 rounded-full border flex-shrink-0 ${
                      insight.type === "warning" 
                        ? "bg-amber-500/20 text-amber-400 border-amber-700/40" 
                        : insight.type === "success" 
                        ? "bg-green-500/20 text-green-400 border-green-700/40" 
                        : "bg-cyan-500/20 text-cyan-400 border-cyan-700/40"
                    }`}>
                      <LightbulbIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm font-bold mb-2 text-white group-hover:text-gray-100 transition-colors leading-tight word-wrap break-words hyphens-auto whitespace-normal">
                        {insight.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors word-wrap break-words whitespace-normal overflow-wrap-anywhere hyphens-auto">
                        {insight.content}
                      </p>
                    </div>
                  </div>
                  
                  {/* Add a subtle glow effect at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30">
                    <div className={`h-full w-12 mx-auto rounded-t-full blur-sm ${
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
