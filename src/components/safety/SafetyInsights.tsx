
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, MessageSquare } from 'lucide-react';

interface SafetyInsightsProps {
  projectName: string;
}

export function SafetyInsights({ projectName }: SafetyInsightsProps) {
  const safetyInsights = [
    {
      title: 'Safety Compliance',
      content: projectName === 'East Tower' ? 'OSHA inspection date approaching in 15 days. Schedule pre-inspection review.' :
               projectName === 'Westview Residences' ? 'Fire safety standards exceed requirements by 15%. Consider documenting as case study.' :
               projectName === 'Harbor Bridge' ? 'Worker safety orientation completion rate at 92%. 8 team members need follow-up.' :
               'Safety protocol compliance rate at 95%. 2 open issues need to be addressed.',
      type: 'info' as const
    },
    {
      title: 'Incident Prevention',
      content: projectName === 'East Tower' ? 'Recent safety drill showed 2 minute improvement in evacuation time.' :
               projectName === 'Westview Residences' ? 'Zero incidents reported in the last 145 days - new project record!' :
               projectName === 'Harbor Bridge' ? 'Wind safety protocols activated 8 times this month. Review effectiveness.' :
               'Safety equipment inspection due in 3 days. Schedule has been sent to team leads.',
      type: 'warning' as const
    },
    {
      title: 'Training Progress',
      content: 'Monthly safety training completion rate at 98%. Outstanding performance across all teams.',
      type: 'success' as const
    }
  ];

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-br from-gray-900/95 to-black border-gray-800/50 shadow-xl animate-fade-in transition-all duration-300 hover:translate-y-[-4px] mb-6">
      {/* Color gradient top border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-blue-400"></div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 shadow-lg rounded-xl">
              <LightbulbIcon className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                AI Insights for Safety
              </h3>
              <p className="text-sm text-gray-400 opacity-80">Real-time intelligent analysis</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-cyan-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-gray-700/80 hover:to-gray-800/90 transition-all duration-300 rounded-lg border border-gray-700/50 hover:border-gray-600/50 px-4 py-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Chat with AI</span>
          </Button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto">
          {safetyInsights.map((insight, index) => (
            <div 
              key={index} 
              className="group relative p-5 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/80 transition-all duration-300 cursor-pointer hover:translate-y-[-4px] border border-gray-700/50 shadow-lg hover:border-gray-600/50 min-w-[280px] flex-shrink-0"
            >
              <div className="flex items-start gap-3 h-full">
                <div className={`p-3 rounded-full border flex-shrink-0 ${
                  insight.type === "warning" 
                    ? "bg-amber-500/20 text-amber-400 border-amber-700/40" 
                    : insight.type === "success" 
                    ? "bg-green-500/20 text-green-400 border-green-700/40" 
                    : "bg-cyan-500/20 text-cyan-400 border-cyan-700/40"
                }`}>
                  <LightbulbIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-2 text-white group-hover:text-gray-100 transition-colors break-words hyphens-auto">
                    {insight.title}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors break-words hyphens-auto whitespace-normal overflow-wrap-anywhere">
                    {insight.content}
                  </p>
                </div>
              </div>
              
              {/* Add a subtle glow effect at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30">
                <div className={`h-full w-16 mx-auto rounded-t-full blur-md ${
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
      </CardContent>
    </Card>
  );
}
