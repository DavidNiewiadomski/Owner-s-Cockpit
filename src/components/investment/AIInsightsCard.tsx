
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
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.2)] overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
              <LightbulbIcon className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                AI Insights for Investment Impact
              </h3>
              <p className="text-gray-300 font-medium">Real-time intelligent analysis</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onChatOpen}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 hover:text-cyan-200 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 px-4 py-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Open AI Chat</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className={`group relative p-4 rounded-lg bg-gradient-to-br from-gray-900/80 to-black transition-all duration-300 cursor-pointer hover:scale-105 border ${
                insight.type === "warning" 
                  ? "border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]" 
                  : insight.type === "success" 
                  ? "border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                  : "border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              }`}
              onClick={onChatOpen}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  insight.type === "warning" 
                    ? "bg-amber-500/20 text-amber-400" 
                    : insight.type === "success" 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-cyan-500/20 text-cyan-400"
                }`}>
                  <LightbulbIcon className="h-4 w-4 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold mb-2 text-white group-hover:text-cyan-100 transition-colors">
                    {insight.title}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {insight.content}
                  </p>
                </div>
              </div>
              
              {/* Animated background effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
