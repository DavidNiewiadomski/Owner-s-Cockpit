
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// Avatar components removed
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react"; // Clock removed as it's not used
import { Progress } from "@/components/ui/progress";
import { Project } from '@/lib/supabase'; // Import Supabase Project type
import { formatDate } from '@/lib/utils'; // Import formatDate

// TeamMember interface removed

interface ProjectCardProps {
  project: Project; // Pass the whole project object
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Destructure from project object
  const { id, title, description, progress, status, end_date } = project;
  const getStatusClass = (currentStatus: Project['status']) => {
    switch (currentStatus) {
      case "active": // was "on-track" -> Green
        return "bg-green-600 text-white font-bold px-3 py-1 shadow-lg border border-green-500";
      case "planning": // new -> Purple
        return "bg-purple-600 text-white font-bold px-3 py-1 shadow-lg border border-purple-500";
      case "on-hold": // was "at-risk" -> Yellow
        return "bg-yellow-500 text-black font-bold px-3 py-1 shadow-lg border border-yellow-400";
      case "completed": // Blue
        return "bg-blue-600 text-white font-bold px-3 py-1 shadow-lg border border-blue-500";
      case "cancelled": // Gray
        return "bg-gray-500 text-white font-bold px-3 py-1 shadow-lg border border-gray-400";
      // 'delayed' is not a direct status in Supabase.
      default:
        return "bg-gray-400 text-black px-3 py-1 shadow-lg border border-gray-300"; // Default for unexpected status
    }
  };

  const getStatusLabel = (currentStatus: Project['status']) => {
    switch (currentStatus) {
      case "active":
        return "Active";
      case "planning":
        return "Planning";
      case "on-hold":
        return "On Hold";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1); // Capitalize if unknown
    }
  };

  return (
    <Card className="overflow-hidden border-construction-600/10 hover:border-construction-600/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
          <Badge className={getStatusClass(status)}>{getStatusLabel(status)}</Badge>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 mt-1">{description || 'No description available.'}</p>
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
            <span className="font-medium">Due: {end_date ? formatDate(end_date) : 'N/A'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-end items-center w-full"> {/* Changed justify-between to justify-end */}
          {/* Team members avatars removed */}
          <a 
            href={`/projects/${id}`} // Assuming a route like /projects/:id for details
            className="text-sm text-construction-400 hover:text-construction-300 hover:underline font-medium"
          >
            View Details
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
