
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  UserCircle2, 
  Phone
} from 'lucide-react';

interface ProjectOverviewProps {
  projectName: string;
  projectLocation: string;
  projectType: string;
  currentPhase: string;
  startDate: string;
  completionDate: string;
  ownerContact?: string;
  ownerPhone?: string;
  projectId?: string;
}

export function ProjectOverview({
  projectName, 
  projectLocation,
  projectType,
  currentPhase,
  startDate,
  completionDate,
  ownerContact = "Jennifer Smith",
  ownerPhone = "(555) 123-4567",
  projectId = "PRJ-2024-057"
}: ProjectOverviewProps) {
  return (
    <Card className="border-construction-600/30 shadow-lg mb-6 glass-card backdrop-blur-md overflow-hidden bg-black/60">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Project Image/Visual section */}
          <div className="w-full md:w-1/3 h-60 md:h-auto bg-gradient-to-br from-blue-900/60 to-black/40 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="w-24 h-24 text-blue-300/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-xl font-bold text-white">{projectName}</h2>
              <div className="flex items-center mt-1 text-gray-300">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{projectLocation}</span>
              </div>
            </div>
          </div>
          
          {/* Project Details section */}
          <div className="w-full md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-600">{projectType}</Badge>
                  <Badge className="bg-green-600">{currentPhase}</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">Project ID: {projectId}</p>
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                On Track
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Start Date</p>
                  <p className="font-medium">{startDate}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-400">Expected Completion</p>
                  <p className="font-medium">{completionDate}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">Inspections Passed</p>
                  <p className="font-medium">17 of 20</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <UserCircle2 className="w-5 h-5 mr-3 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">Owner Contact</p>
                  <p className="font-medium">{ownerContact}</p>
                </div>
              </div>
              
              <div className="flex items-center col-span-1 md:col-span-2">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Contact Phone</p>
                  <p className="font-medium">{ownerPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
