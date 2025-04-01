
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Users, 
  MapPin, 
  BarChart, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface ProjectSummaryProps {
  projectName?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  completion?: number;
  lastUpdated?: string;
}

export function ProjectSummary({ 
  projectName = "Project", 
  startDate = "Jan 1, 2023", 
  endDate = "Dec 31, 2023",
  budget = "$10M",
  completion = 50,
  lastUpdated = "1 hour ago"
}: ProjectSummaryProps) {
  
  const teamMembers = [
    { name: "Sarah Johnson", role: "Project Manager" },
    { name: "Michael Chen", role: "Lead Engineer" },
    { name: "David Wilson", role: "Site Supervisor" },
  ];
  
  const milestonesSummary = [
    { name: "Planning Phase", status: "completed" as const },
    { name: "Foundation Work", status: "completed" as const },
    { name: "Structural Framework", status: "in-progress" as const },
    { name: "MEP Installation", status: "upcoming" as const },
    { name: "Interior Finishing", status: "upcoming" as const },
  ];
  
  type RiskLevel = "high" | "medium" | "low";
  
  const risks = [
    { name: "Material Delay", level: "medium" as RiskLevel },
    { name: "Weather Impact", level: "low" as RiskLevel },
  ];

  return (
    <Card className="bg-black border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{projectName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-400">Project Timeline</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span>Start Date:</span>
              </div>
              <span className="font-medium">{startDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span>End Date:</span>
              </div>
              <span className="font-medium">{endDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <DollarSign className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span>Budget:</span>
              </div>
              <span className="font-medium">{budget}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span>Last Updated:</span>
              </div>
              <span className="font-medium">{lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-medium text-gray-400">Completion</h4>
            <span className="text-sm font-medium">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-400">Key Team Members</h4>
          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{member.name}</span>
                <span className="text-gray-500">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-400">Milestones</h4>
          <div className="space-y-2">
            {milestonesSummary.map((milestone, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{milestone.name}</span>
                <Badge
                  className={`text-xs px-1.5 py-0.5 ${
                    milestone.status === "completed" ? "bg-green-900/20 text-green-400" :
                    milestone.status === "in-progress" ? "bg-blue-900/20 text-blue-400" :
                    "bg-gray-800 text-gray-400"
                  }`}
                >
                  {milestone.status === "completed" ? (
                    <Check className="h-3 w-3 mr-0.5" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock className="h-3 w-3 mr-0.5" />
                  ) : (
                    <Calendar className="h-3 w-3 mr-0.5" />
                  )}
                  <span>
                    {milestone.status === "completed" ? "Completed" :
                     milestone.status === "in-progress" ? "In Progress" :
                     "Upcoming"}
                  </span>
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-400">Risks</h4>
          <div className="space-y-2">
            {risks.map((risk, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{risk.name}</span>
                <Badge
                  className={`text-xs px-1.5 py-0.5 ${
                    risk.level === "high" ? "bg-red-900/20 text-red-400" :
                    risk.level === "medium" ? "bg-amber-900/20 text-amber-400" :
                    "bg-blue-900/20 text-blue-400"
                  }`}
                >
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  <span>{risk.level}</span>
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
