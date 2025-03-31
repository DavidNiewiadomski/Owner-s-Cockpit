
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed";
  dueDate: string;
  teamMembers: {
    name: string;
    avatar?: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  description,
  progress,
  status,
  dueDate,
  teamMembers,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-full",
              status === "on-track" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
              status === "at-risk" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
              status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            )}
          >
            {status === "on-track" && "On Track"}
            {status === "at-risk" && "At Risk"}
            {status === "delayed" && "Delayed"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          <span>Due: {dueDate}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 3).map((member, i) => (
            <Avatar key={i} className="w-7 h-7 border-2 border-white dark:border-gray-900">
              {member.avatar ? (
                <AvatarImage src={member.avatar} alt={member.name} />
              ) : (
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
          ))}
          {teamMembers.length > 3 && (
            <Avatar className="w-7 h-7 border-2 border-white dark:border-gray-900">
              <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700">
                +{teamMembers.length - 3}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        
        <Button size="sm" variant="ghost" className="text-construction-600 dark:text-construction-400">
          <span>Details</span>
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
