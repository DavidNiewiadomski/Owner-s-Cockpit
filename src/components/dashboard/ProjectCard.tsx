
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TeamMember {
  name: string;
  avatar?: string;
}

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed";
  dueDate: string;
  teamMembers: TeamMember[];
  priority?: "High" | "Medium" | "Low";
}

export function ProjectCard({
  id,
  title,
  description,
  progress,
  status,
  dueDate,
  teamMembers,
  priority,
}: ProjectCardProps) {
  const getStatusClass = () => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "on-track":
        return "On Track";
      case "at-risk":
        return "At Risk";
      case "delayed":
        return "Delayed";
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden border-construction-600/10 hover:border-construction-600/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={getStatusClass()}>{getStatusLabel()}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>Due: {dueDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="border-2 border-background h-8 w-8">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}
            {teamMembers.length > 3 && (
              <Avatar className="border-2 border-background h-8 w-8">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  +{teamMembers.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <a href="#" className="text-sm text-construction-600 dark:text-construction-400 hover:underline">View Details</a>
        </div>
      </CardFooter>
    </Card>
  );
}
