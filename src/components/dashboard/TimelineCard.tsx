
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  status: "completed" | "in-progress" | "upcoming";
}

interface TimelineCardProps {
  events: TimelineEvent[];
  className?: string;
}

export function TimelineCard({ events, className }: TimelineCardProps) {
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
                event.status === "upcoming" && "bg-gray-200 border-gray-400 dark:bg-gray-700 dark:border-gray-600"
              )} />
              <time className="mb-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                {event.date}
              </time>
              <h3 className={cn(
                "text-base font-semibold",
                event.status === "completed" && "text-gray-900 dark:text-white",
                event.status === "in-progress" && "text-construction-600 dark:text-construction-400",
                event.status === "upcoming" && "text-gray-600 dark:text-gray-300"
              )}>
                {event.title}
              </h3>
              {event.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {event.description}
                </p>
              )}
              
              {index < events.length - 1 && (
                <Separator className="my-4 ml-2" />
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
