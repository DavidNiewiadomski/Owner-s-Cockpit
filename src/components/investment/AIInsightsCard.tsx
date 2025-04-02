
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
    <Card className="border-construction-600/20 bg-gradient-to-b from-gray-900 to-black backdrop-blur-sm shadow-xl mb-6">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-construction-950/60 p-1.5 rounded-lg border border-construction-700/30">
              <LightbulbIcon className="h-4 w-4 text-construction-400" />
            </div>
            <h3 className="font-medium text-white">AI Insights for Investment Impact</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onChatOpen}
            className="h-8 text-construction-400 hover:text-construction-300 hover:bg-construction-950/40 transition-colors rounded-lg"
          >
            <span className="mr-1.5 text-xs">Open AI Chat</span>
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-2.5 p-3.5 rounded-lg bg-gradient-to-br from-gray-850 to-gray-900 hover-scale transition-all duration-200 cursor-pointer ${
                insight.type === "warning" ? "border-l-2 border-amber-500/50 shadow-[0_4px_15px_rgba(251,191,36,0.1)]" : 
                insight.type === "success" ? "border-l-2 border-green-500/50 shadow-[0_4px_15px_rgba(74,222,128,0.1)]" : 
                "border-l-2 border-blue-500/50 shadow-[0_4px_15px_rgba(59,130,246,0.1)]"
              }`}
              onClick={onChatOpen}
            >
              <div className={`p-1.5 rounded-full ${
                insight.type === "warning" ? "bg-amber-950/50 text-amber-400" : 
                insight.type === "success" ? "bg-green-950/50 text-green-400" : 
                "bg-blue-950/50 text-blue-400"
              }`}>
                <LightbulbIcon className="h-3.5 w-3.5 flex-shrink-0" />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1 text-white">{insight.title}</p>
                <p className="text-sm text-gray-300 leading-snug">{insight.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
