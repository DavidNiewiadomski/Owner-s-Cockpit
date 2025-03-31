
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { BrainCircuit, ChevronDown, ChevronUp, LightbulbIcon, MessageSquare, Mic } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleAIAssistantProps {
  projectName?: string;
  insights?: string[];
  className?: string;
}

export function CollapsibleAIAssistant({ 
  projectName = "your properties", 
  insights = [
    "Construction delays may impact your ROI by 2.3% annually",
    "Material cost increases have affected 3 of your projects",
    "Current schedule variance is within acceptable limits",
    "Equipment rental costs are 12% over budget"
  ],
  className
}: CollapsibleAIAssistantProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Parse insights into title and content
  const parsedInsights = insights.map(insight => {
    const parts = insight.split(":");
    return {
      title: parts.length > 1 ? parts[0].trim() : `Insight ${Math.floor(Math.random() * 100)}`,
      content: parts.length > 1 ? parts.slice(1).join(":").trim() : insight,
      // Determine insight type based on content
      type: insight.toLowerCase().includes("alert") || insight.toLowerCase().includes("risk") 
        ? "warning" 
        : insight.toLowerCase().includes("update") || insight.toLowerCase().includes("ahead")
          ? "success"
          : "info"
    };
  });
  
  // Handle clicking on an insight
  const handleInsightClick = () => {
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
                  {expanded ? "AI Assistant" : `AI Insights for ${projectName}`}
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
                {parsedInsights.map((insight, index) => {
                  const colorClass = 
                    insight.type === "warning" ? "border-amber-700/50 hover:border-amber-600" : 
                    insight.type === "success" ? "border-green-700/50 hover:border-green-600" : 
                    "border-blue-700/50 hover:border-blue-600";
                    
                  const iconColorClass = 
                    insight.type === "warning" ? "text-amber-400" : 
                    insight.type === "success" ? "text-green-400" : 
                    "text-blue-400";
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-start gap-2 p-3 rounded-md bg-gray-750 border hover-scale transition-all duration-200 cursor-pointer ${colorClass}`}
                      onClick={handleInsightClick}
                    >
                      <LightbulbIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColorClass}`} />
                      <div>
                        <p className="text-xs font-medium mb-1">{insight.title}</p>
                        <p className="text-sm text-gray-200">{insight.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Expanded view - showing full AI assistant */}
          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
            <AIAssistant />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
