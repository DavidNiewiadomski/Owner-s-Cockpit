
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { BrainCircuit, ChevronDown, ChevronUp, LightbulbIcon, MessageSquare, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

type InsightType = "warning" | "success" | "info";

interface Insight {
  title: string;
  content: string;
  type: InsightType;
}

interface CollapsibleAIAssistantProps {
  projectName?: string;
  insights?: string[];
  className?: string;
  projectContext?: string;
  initialInsights?: Insight[];
  mode?: string;
}

export function CollapsibleAIAssistant({ 
  projectName = "your properties", 
  insights = [
    "Construction delays may impact your ROI by 2.3% annually",
    "Material cost increases have affected 3 of your projects",
    "Current schedule variance is within acceptable limits",
    "Equipment rental costs are 12% over budget"
  ],
  className,
  projectContext,
  initialInsights,
  mode
}: CollapsibleAIAssistantProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Use initialInsights if provided, otherwise use the default format with insights
  const displayInsights = initialInsights || insights.map((insight, index) => ({
    title: `Insight ${index + 1}`,
    content: insight,
    type: (index % 3 === 0 ? "warning" : index % 3 === 1 ? "info" : "success") as InsightType
  }));

  // Use projectContext if provided, otherwise use projectName
  const displayProjectName = projectContext || projectName;
  
  // Handle clicking on an insight
  const handleInsightClick = (insight: string | Insight) => {
    setExpanded(true);
  };
  
  return (
    <Card className={`border-construction-600/20 bg-gradient-to-b from-gray-900 to-black backdrop-blur-sm shadow-xl mb-6 transition-all duration-300 ${className || ''}`}>
      <CardContent className="p-0">
        {/* Collapsed view - showing insights summary */}
        {!expanded && (
          <div className="p-5 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-construction-950/60 p-1.5 rounded-lg border border-construction-700/30">
                  <BrainCircuit className="h-4 w-4 text-construction-400" />
                </div>
                <h3 className="font-medium text-white">AI Insights for {displayProjectName}</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(true)}
                className="h-8 text-construction-400 hover:text-construction-300 hover:bg-construction-950/40 transition-colors rounded-lg"
              >
                <span className="mr-1.5 text-xs">Chat with AI</span>
                <MessageSquare className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
              <div className="flex space-x-3 min-w-max">
                {displayInsights.map((insight, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2.5 p-3.5 rounded-lg bg-gradient-to-br from-gray-850 to-gray-900 hover-scale transition-all duration-200 cursor-pointer min-w-[250px] max-w-[300px] ${
                      insight.type === "warning" ? "border-l-2 border-amber-500/50 shadow-[0_4px_15px_rgba(251,191,36,0.1)]" : 
                      insight.type === "success" ? "border-l-2 border-green-500/50 shadow-[0_4px_15px_rgba(74,222,128,0.1)]" : 
                      "border-l-2 border-blue-500/50 shadow-[0_4px_15px_rgba(59,130,246,0.1)]"
                    }`}
                    onClick={() => handleInsightClick(insight)}
                  >
                    <div className={`p-1.5 rounded-full ${
                      insight.type === "warning" ? "bg-amber-950/50 text-amber-400" : 
                      insight.type === "success" ? "bg-green-950/50 text-green-400" : 
                      "bg-blue-950/50 text-blue-400"
                    }`}>
                      <LightbulbIcon className="h-3.5 w-3.5 flex-shrink-0" />
                    </div>
                    <div>
                      {initialInsights && <p className="text-xs font-semibold mb-1 text-white">{insight.title}</p>}
                      <p className="text-sm text-gray-300 leading-snug">{typeof insight === 'string' ? insight : insight.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Expanded view - showing full AI assistant */}
        {expanded && (
          <div className="animate-fade-in">
            <div className="border-b border-gray-800 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-construction-950/60 p-1.5 rounded-lg border border-construction-700/30">
                    <BrainCircuit className="h-4 w-4 text-construction-400" />
                  </div>
                  <h3 className="font-medium text-white">AI Assistant</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-construction-400 hover:text-construction-300 hover:bg-construction-950/40 transition-colors rounded-full"
                    title="Voice chat"
                  >
                    <Mic className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setExpanded(false)}
                    className="h-8 text-construction-400 hover:text-construction-300 hover:bg-construction-950/40 transition-colors rounded-lg"
                  >
                    <span className="mr-1.5 text-xs">Collapse</span>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            <AIAssistant />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
