
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, Clock, Calendar, Camera } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  status: "completed" | "in-progress" | "upcoming" | "delayed";
  impact?: "high" | "medium" | "low";
  financial?: {
    amount: number;
    type: "over" | "under" | "neutral";
  };
  realityCapture?: {
    available: boolean;
    date?: string;
    url?: string;
  };
}

interface TimelineCardProps {
  events: TimelineEvent[];
  className?: string;
  showFinancialImpact?: boolean;
  onViewRealityCapture?: (event: TimelineEvent) => void;
}

export function TimelineCard({ 
  events, 
  className, 
  showFinancialImpact = true,
  onViewRealityCapture 
}: TimelineCardProps) {
  return (
    <Card className={cn("overflow-hidden border-cyan-900/30 bg-gradient-to-br from-black to-zinc-900 shadow-[0_4px_30px_rgba(56,189,248,0.15)]", className)}>
      <CardHeader className="bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20">
        <CardTitle className="text-gradient text-lg">Project Timeline</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ol className="relative border-l border-gradient-to-b from-cyan-500/50 via-purple-500/50 to-blue-500/50 ml-2">
          {events.map((event, index) => (
            <li key={event.id} className="mb-6 ml-6 last:mb-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={cn(
                "absolute w-4 h-4 rounded-full mt-1.5 -left-2 border-2 animate-pulse-glow",
                event.status === "completed" && "bg-green-500/90 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]",
                event.status === "in-progress" && "bg-blue-500/90 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
                event.status === "delayed" && "bg-red-500/90 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
                event.status === "upcoming" && "bg-gray-500/90 border-gray-400 shadow-[0_0_15px_rgba(107,114,128,0.5)]"
              )} />
              
              <div className="flex items-start justify-between">
                <div>
                  <time className="mb-1 text-sm font-normal text-cyan-300 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                    {event.date}
                  </time>
                  <h3 className={cn(
                    "text-lg font-semibold flex items-center",
                    event.status === "completed" && "text-green-400",
                    event.status === "in-progress" && "text-blue-400",
                    event.status === "delayed" && "text-red-400",
                    event.status === "upcoming" && "text-gray-300"
                  )}>
                    {event.title}
                    {event.impact === "high" && (
                      <AlertTriangle className="h-4 w-4 ml-1.5 text-amber-400" />
                    )}
                    {event.realityCapture && event.realityCapture.available && (
                      <Badge variant="outline" className="ml-2 bg-blue-900/30 text-blue-300 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center gap-1 hover:bg-blue-800/40 transition-all duration-300">
                        <Camera className="h-3 w-3" />
                        <span>Reality Capture</span>
                      </Badge>
                    )}
                  </h3>
                </div>
                
                <Badge
                  className={cn(
                    "ml-2",
                    event.status === "completed" && "bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
                    event.status === "in-progress" && "bg-blue-900/30 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
                    event.status === "delayed" && "bg-red-900/30 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
                    event.status === "upcoming" && "bg-gray-900/30 text-gray-300 border border-gray-500/50 shadow-[0_0_10px_rgba(107,114,128,0.3)]"
                  )}
                >
                  {event.status === "completed" && "Completed"}
                  {event.status === "in-progress" && "In Progress"}
                  {event.status === "delayed" && "Delayed"}
                  {event.status === "upcoming" && "Upcoming"}
                </Badge>
              </div>
              
              {event.description && (
                <p className="text-sm bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mt-1">
                  {event.description}
                </p>
              )}
              
              {showFinancialImpact && event.financial && (
                <div className="mt-2 text-sm">
                  <span className="font-medium text-gray-400">Financial Impact: </span>
                  <span className={cn(
                    "font-semibold",
                    event.financial.type === "over" && "text-red-400",
                    event.financial.type === "under" && "text-green-400",
                    event.financial.type === "neutral" && "text-blue-400"
                  )}>
                    {event.financial.type === "over" && "+"}
                    {event.financial.type === "under" && "-"}
                    ${event.financial.amount.toLocaleString()}
                  </span>
                </div>
              )}
              
              {event.realityCapture && event.realityCapture.available && onViewRealityCapture && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0 flex items-center gap-1 border border-transparent hover:border-blue-500/40 transition-all duration-300"
                  onClick={() => onViewRealityCapture(event)}
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>View Reality Capture</span>
                </Button>
              )}
              
              {index < events.length - 1 && (
                <Separator className="my-4 ml-2 bg-gradient-to-r from-cyan-500/30 to-transparent" />
              )}
            </li>
          ))}
        </ol>
        
        <div className="mt-4 pt-4 border-t border-cyan-900/30">
          <Button variant="outline" size="sm" className="text-xs gap-1 w-full bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border-cyan-800/40 text-cyan-300 hover:text-cyan-100 hover:bg-gradient-to-r hover:from-cyan-900/50 hover:to-blue-900/50 transition-all duration-300">
            <Info className="h-3.5 w-3.5" />
            <span>View Full Timeline</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
