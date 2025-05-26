
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LightbulbIcon, Brain, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/data/projects/projectData';

interface AIProjectRecommendationsProps {
  projects: Project[];
}

export function AIProjectRecommendations({ projects }: AIProjectRecommendationsProps) {
  const { toast } = useToast();
  
  // Generate AI recommendations based on project data
  const recommendations = React.useMemo(() => {
    const atRiskProjects = projects.filter(p => p.status === 'at-risk');
    const delayedProjects = projects.filter(p => p.status === 'delayed');
    const onTrackProjects = projects.filter(p => p.status === 'on-track');
    
    const result = [];
    
    if (atRiskProjects.length > 0) {
      result.push({
        type: 'warning',
        title: 'At-Risk Projects Need Attention',
        content: `${atRiskProjects.length} project${atRiskProjects.length > 1 ? 's' : ''} ${atRiskProjects.length > 1 ? 'are' : 'is'} at risk. Consider reviewing resource allocation.`,
        action: () => {
          toast({
            title: "AI Resource Analysis",
            description: "Analyzing resource allocation for at-risk projects"
          });
        },
        icon: AlertTriangle
      });
    }
    
    if (delayedProjects.length > 0) {
      result.push({
        type: 'danger',
        title: 'Schedule Optimization Needed',
        content: `${delayedProjects.length} project${delayedProjects.length > 1 ? 's' : ''} ${delayedProjects.length > 1 ? 'are' : 'is'} delayed. AI can help create recovery plans.`,
        action: () => {
          toast({
            title: "AI Schedule Recovery",
            description: "Generating schedule recovery options for delayed projects"
          });
        },
        icon: AlertTriangle
      });
    }
    
    if (onTrackProjects.length > 0) {
      result.push({
        type: 'success',
        title: 'Performance Excellence',
        content: `${onTrackProjects.length} project${onTrackProjects.length > 1 ? 's' : ''} on track. AI suggests documenting best practices.`,
        action: () => {
          toast({
            title: "AI Best Practice Documentation",
            description: "Creating best practice templates from successful projects"
          });
        },
        icon: CheckCircle2
      });
    }
    
    // Add a general optimization recommendation
    result.push({
      type: 'info',
      title: 'Optimization Opportunities',
      content: 'AI detected potential for 12% efficiency improvement across workflows.',
      action: () => {
        toast({
          title: "AI Efficiency Analysis",
          description: "Analyzing workflows for optimization opportunities"
        });
      },
      icon: TrendingUp
    });
    
    return result;
  }, [projects, toast]);

  return (
    <Card className="border-construction-600/20 bg-gradient-to-b from-gray-900 to-black backdrop-blur-sm shadow-xl mb-5">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-construction-950/60 p-1.5 rounded-lg border border-construction-700/30">
            <Brain className="h-4 w-4 text-construction-400" />
          </div>
          <h3 className="text-sm font-medium text-white">AI-Generated Recommendations</h3>
          <Badge variant="outline" className="ml-auto text-xs bg-construction-900/40 border-construction-700/30 text-construction-400">
            <span className="text-[10px] font-medium">Powered by AI</span>
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-2.5 p-3.5 rounded-lg hover-scale transition-all cursor-pointer ${
                recommendation.type === 'warning' ? 
                  "bg-gradient-to-br from-amber-950/20 to-amber-900/10 border-l-2 border-amber-500/50 shadow-[0_4px_15px_rgba(251,191,36,0.1)]" : 
                recommendation.type === 'danger' ? 
                  "bg-gradient-to-br from-red-950/20 to-red-900/10 border-l-2 border-red-500/50 shadow-[0_4px_15px_rgba(239,68,68,0.1)]" : 
                recommendation.type === 'success' ? 
                  "bg-gradient-to-br from-green-950/20 to-green-900/10 border-l-2 border-green-500/50 shadow-[0_4px_15px_rgba(74,222,128,0.1)]" :
                  "bg-gradient-to-br from-blue-950/20 to-blue-900/10 border-l-2 border-blue-500/50 shadow-[0_4px_15px_rgba(59,130,246,0.1)]"
              }`}
              onClick={recommendation.action}
            >
              <div className={`p-1.5 rounded-full ${
                recommendation.type === 'warning' ? "bg-amber-950/50 text-amber-400" : 
                recommendation.type === 'danger' ? "bg-red-950/50 text-red-400" : 
                recommendation.type === 'success' ? "bg-green-950/50 text-green-400" :
                "bg-blue-950/50 text-blue-400"
              }`}>
                <recommendation.icon className="h-3.5 w-3.5 flex-shrink-0" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white mb-1">{recommendation.title}</p>
                <p className="text-xs text-gray-300 leading-snug">{recommendation.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
