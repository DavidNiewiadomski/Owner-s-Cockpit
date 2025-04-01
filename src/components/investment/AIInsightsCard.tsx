
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, MessageSquare } from 'lucide-react';
import { Insight } from '@/data/investment/investmentData';

interface AIInsightsCardProps {
  insights: Insight[];
  onChatOpen: () => void;
}

export function AIInsightsCard({ insights, onChatOpen }: AIInsightsCardProps) {
  return (
    <Card className="border-construction-600/30 bg-gray-800/50 backdrop-blur-sm shadow-lg mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-construction-400" />
            <h3 className="font-medium text-white">AI Insights for Investment Impact</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onChatOpen}
            className="h-8 text-construction-400 hover:text-construction-300 hover:bg-gray-700/50 transition-colors"
          >
            <span className="mr-1">Open AI Chat</span>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-2 p-3 rounded-md bg-gray-750 border hover-scale transition-all duration-200 cursor-pointer ${
                insight.type === "warning" ? "border-amber-700/50 hover:border-amber-600" : 
                insight.type === "success" ? "border-green-700/50 hover:border-green-600" : 
                "border-blue-700/50 hover:border-blue-600"
              }`}
              onClick={onChatOpen}
            >
              <LightbulbIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                insight.type === "warning" ? "text-amber-400" : 
                insight.type === "success" ? "text-green-400" : 
                "text-blue-400"
              }`} />
              <div>
                <p className="text-xs font-medium mb-1">{insight.title}</p>
                <p className="text-sm text-gray-200">{insight.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
