
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
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {events.map((event, index) => (
            <li key={event.id} className="mb-6 ml-4 last:mb-0">
              <div className={cn(
                "absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border",
                event.status === "completed" && "bg-green-500 border-green-500",
                event.status === "in-progress" && "bg-construction-500 border-construction-500",
                event.status === "delayed" && "bg-red-500 border-red-500",
                event.status === "upcoming" && "bg-gray-200 border-gray-400 dark:bg-gray-700 dark:border-gray-600"
              )} />
              
              <div className="flex items-start justify-between">
                <div>
                  <time className="mb-1 text-sm font-normal text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {event.date}
                  </time>
                  <h3 className={cn(
                    "text-base font-semibold flex items-center",
                    event.status === "completed" && "text-gray-900 dark:text-white",
                    event.status === "in-progress" && "text-construction-600 dark:text-construction-400",
                    event.status === "delayed" && "text-red-600 dark:text-red-400",
                    event.status === "upcoming" && "text-gray-600 dark:text-gray-300"
                  )}>
                    {event.title}
                    {event.impact === "high" && (
                      <AlertTriangle className="h-4 w-4 ml-1.5 text-amber-500" />
                    )}
                    {event.realityCapture?.available && (
                      <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        <span>Reality Capture</span>
                      </Badge>
                    )}
                  </h3>
                </div>
                
                <Badge
                  className={cn(
                    "ml-2",
                    event.status === "completed" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                    event.status === "in-progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                    event.status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
                    event.status === "upcoming" && "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300"
                  )}
                >
                  {event.status === "completed" && "Completed"}
                  {event.status === "in-progress" && "In Progress"}
                  {event.status === "delayed" && "Delayed"}
                  {event.status === "upcoming" && "Upcoming"}
                </Badge>
              </div>
              
              {event.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {event.description}
                </p>
              )}
              
              {showFinancialImpact && event.financial && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Financial Impact: </span>
                  <span className={cn(
                    event.financial.type === "over" && "text-red-600 dark:text-red-400",
                    event.financial.type === "under" && "text-green-600 dark:text-green-400"
                  )}>
                    {event.financial.type === "over" && "+"}
                    {event.financial.type === "under" && "-"}
                    ${event.financial.amount.toLocaleString()}
                  </span>
                </div>
              )}
              
              {event.realityCapture?.available && onViewRealityCapture && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 flex items-center gap-1"
                  onClick={() => onViewRealityCapture(event)}
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>View Reality Capture</span>
                </Button>
              )}
              
              {index < events.length - 1 && (
                <Separator className="my-4 ml-2" />
              )}
            </li>
          ))}
        </ol>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="text-xs gap-1 w-full">
            <Info className="h-3.5 w-3.5" />
            <span>View Full Timeline</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
