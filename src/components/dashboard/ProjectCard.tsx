
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
        return "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100 font-semibold";
      case "at-risk":
        return "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100 font-semibold";
      case "delayed":
        return "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-100 font-semibold";
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
          <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
          <Badge className={getStatusClass()}>{getStatusLabel()}</Badge>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 mt-1">{description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-white">Progress</span>
              <span className="font-medium text-white">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center text-sm text-gray-300">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span className="font-medium">Due: {dueDate}</span>
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
                  <AvatarFallback className="bg-construction-600 text-white">
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
                <AvatarFallback className="bg-construction-600 text-white">
                  +{teamMembers.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <a href="#" className="text-sm text-construction-400 hover:text-construction-300 hover:underline font-medium">View Details</a>
        </div>
      </CardFooter>
    </Card>
  );
}
