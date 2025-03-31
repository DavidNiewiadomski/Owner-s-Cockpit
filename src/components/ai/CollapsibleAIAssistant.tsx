
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { BrainCircuit, ChevronDown, ChevronUp, LightbulbIcon, MessageSquare, Mic } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const contentRef = useRef<HTMLDivElement>(null);
  
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
  
  // Prevent scrolling when opening/closing the chat
  const toggleExpanded = () => {
    // Save current scroll position
    const scrollPos = window.scrollY;
    setExpanded(!expanded);
    
    // Ensure scroll position is maintained
    setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 10);
  };
  
  return (
    <Card className={`border-construction-600/30 bg-gray-800/50 backdrop-blur-sm shadow-lg mb-6 transition-all duration-300 ${className || ''}`}>
      <CardContent className="p-0">
        <Collapsible open={expanded} onOpenChange={toggleExpanded}>
          {/* Header is always visible */}
          <div className="border-b border-gray-700 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-construction-400" />
                <h3 className="font-medium text-white">
                  {expanded ? "AI Assistant" : `AI Insights for ${displayProjectName}`}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {expanded && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-construction-400 hover:text-construction-300 hover:bg-gray-700/50 transition-colors"
                    title="Voice chat"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-construction-400 hover:text-construction-300 hover:bg-gray-700/50 transition-colors"
                  >
                    {expanded ? (
                      <>
                        <span className="mr-1">Collapse</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span className="mr-1">Chat</span>
                        <MessageSquare className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
          
          {/* Collapsed view - showing insights summary */}
          {!expanded && (
            <div className="p-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {displayInsights.map((insight, index) => {
                  // Handle different insight types
                  const insightText = typeof insight === 'string' ? insight : insight.content;
                  const insightType = typeof insight === 'string' ? 'info' : insight.type;
                  const insightTitle = typeof insight === 'string' ? `Insight ${index + 1}` : insight.title;
                  
                  const colorClass = 
                    insightType === "warning" ? "border-amber-700/50 hover:border-amber-600" : 
                    insightType === "success" ? "border-green-700/50 hover:border-green-600" : 
                    "border-blue-700/50 hover:border-blue-600";
                    
                  const iconColorClass = 
                    insightType === "warning" ? "text-amber-400" : 
                    insightType === "success" ? "text-green-400" : 
                    "text-blue-400";
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-start gap-2 p-3 rounded-md bg-gray-750 border hover-scale transition-all duration-200 cursor-pointer ${colorClass}`}
                      onClick={() => handleInsightClick(insight)}
                    >
                      <LightbulbIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColorClass}`} />
                      <div>
                        {/* Ensure we're only rendering strings, not React elements */}
                        {typeof insightTitle === 'string' && initialInsights && (
                          <p className="text-xs font-medium mb-1">{insightTitle}</p>
                        )}
                        {typeof insightText === 'string' && (
                          <p className="text-sm text-gray-200">{insightText}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Expanded view - showing full AI assistant */}
          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
            <div ref={contentRef} className="animate-fade-in">
              <AIAssistant />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
