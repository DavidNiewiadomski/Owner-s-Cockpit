
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LightbulbIcon, Brain, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/lib/supabase'; // Changed import

interface AIProjectRecommendationsProps {
  projects: Project[];
}

export function AIProjectRecommendations({ projects }: AIProjectRecommendationsProps) {
  const { toast } = useToast();
  
  // Generate AI recommendations based on project data
  const recommendations = React.useMemo(() => {
    const now = new Date();

    // Supabase statuses: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
    const onHoldProjects = projects.filter(p => p.status === 'on-hold');
    
    const delayedProjects = projects.filter(p => 
      p.end_date && new Date(p.end_date) < now && p.status !== 'completed' && p.status !== 'cancelled'
    );
    
    const activeProjects = projects.filter(p => p.status === 'active');
    const completedProjects = projects.filter(p => p.status === 'completed');
    
    const result = [];
    
    if (onHoldProjects.length > 0) {
      result.push({
        type: 'warning', // Keep warning for on-hold
        title: 'On-Hold Projects Require Review',
        content: `${onHoldProjects.length} project${onHoldProjects.length > 1 ? 's are' : ' is'} currently on-hold. Review reasons and plan next steps.`,
        action: () => {
          toast({
            title: "AI Project Review",
            description: "Analyzing on-hold projects for potential actions."
          });
        },
        icon: AlertTriangle // Keep AlertTriangle for on-hold/warning
      });
    }
    
    if (delayedProjects.length > 0) {
      result.push({
        type: 'danger', // Keep danger for delayed
        title: 'Delayed Projects Need Urgent Action',
        content: `${delayedProjects.length} project${delayedProjects.length > 1 ? 's are' : ' is'} past its end date and not completed. AI can help create recovery plans.`,
        action: () => {
          toast({
            title: "AI Schedule Recovery",
            description: "Generating schedule recovery options for delayed projects."
          });
        },
        icon: AlertTriangle // Keep AlertTriangle for delayed/danger
      });
    }
    
    if (activeProjects.length > 0) {
      result.push({
        type: 'success', // Keep success for active/on-track
        title: 'Active Projects Progressing',
        content: `${activeProjects.length} project${activeProjects.length > 1 ? 's are' : ' is'} currently active. Monitor progress and address risks proactively.`,
        action: () => {
          toast({
            title: "AI Progress Monitoring",
            description: "Setting up enhanced progress monitoring for active projects."
          });
        },
        icon: CheckCircle2 // Keep CheckCircle2 for active/success
      });
    }

    if (completedProjects.length > 0) {
      result.push({
        type: 'info', // Use info for completed projects, can also be success
        title: 'Review Completed Projects',
        content: `${completedProjects.length} project${completedProjects.length > 1 ? 's have' : ' has'} been completed. Consider a post-project review for lessons learned.`,
        action: () => {
          toast({
            title: "AI Post-Project Analysis",
            description: "Analyzing completed projects for insights and documentation."
          });
        },
        icon: LightbulbIcon // Lightbulb for insights/lessons learned
      });
    }
    
    // Add a general optimization recommendation if no other specific recommendations
    if (result.length === 0) {
      result.push({
        type: 'info',
        title: 'General Project Health',
        content: 'All projects appear to be within expected parameters. AI continues to monitor for optimization opportunities.',
        action: () => {
          toast({
            title: "AI System Check",
            description: "Performing routine check for new optimization insights."
          });
        },
        icon: TrendingUp
      });
    }
    
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
