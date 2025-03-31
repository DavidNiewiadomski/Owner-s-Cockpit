
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { BrainCircuit, ChevronDown, ChevronUp, LightbulbIcon } from 'lucide-react';

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
  // Add these new props
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
  
  return (
    <Card className={`border-construction-600/30 bg-gray-800/50 backdrop-blur-sm shadow-lg mb-6 ${className || ''}`}>
      <CardContent className="p-0">
        {/* Collapsed view - showing insights summary */}
        {!expanded && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-construction-400" />
                <h3 className="font-medium text-white">AI Insights for {displayProjectName}</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(true)}
                className="h-8 text-construction-400 hover:text-construction-300"
              >
                <span className="mr-1">Expand</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {displayInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-2 p-3 rounded-md bg-gray-750 border ${
                    insight.type === "warning" ? "border-amber-700/50" : 
                    insight.type === "success" ? "border-green-700/50" : 
                    "border-blue-700/50"
                  }`}
                >
                  <LightbulbIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    insight.type === "warning" ? "text-amber-400" : 
                    insight.type === "success" ? "text-green-400" : 
                    "text-blue-400"
                  }`} />
                  <div>
                    {initialInsights && <p className="text-xs font-medium mb-1">{insight.title}</p>}
                    <p className="text-sm text-gray-200">{insight.content || insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Expanded view - showing full AI assistant */}
        {expanded && (
          <div>
            <div className="border-b border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-construction-400" />
                  <h3 className="font-medium text-white">AI Assistant</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpanded(false)}
                  className="h-8 text-construction-400 hover:text-construction-300"
                >
                  <span className="mr-1">Collapse</span>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <AIAssistant />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
