
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
    <Card className="bg-gradient-to-br from-gray-900/95 to-black border-gray-800/50 shadow-xl overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 shadow-lg rounded-xl">
              <LightbulbIcon className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                AI Insights for Investment Impact
              </h3>
              <p className="text-gray-400 font-medium">Real-time intelligent analysis</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onChatOpen}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-cyan-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-gray-700/80 hover:to-gray-800/90 transition-all duration-300 rounded-lg border border-gray-700/50 hover:border-gray-600/50 px-4 py-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Open AI Chat</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="group relative p-4 rounded-lg bg-gradient-to-br from-gray-900/80 to-black transition-all duration-300 cursor-pointer hover:translate-y-[-4px] border border-gray-800/50 shadow-xl"
              onClick={onChatOpen}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full border ${
                  insight.type === "warning" 
                    ? "bg-amber-500/20 text-amber-400 border-amber-700/40" 
                    : insight.type === "success" 
                    ? "bg-green-500/20 text-green-400 border-green-700/40" 
                    : "bg-cyan-500/20 text-cyan-400 border-cyan-700/40"
                }`}>
                  <LightbulbIcon className="h-4 w-4 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold mb-2 text-white group-hover:text-gray-100 transition-colors">
                    {insight.title}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {insight.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
