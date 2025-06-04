
import React from 'react';
import { ArrowRight, MapPin, Building2, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const projects = [
  // Site Selection
  {
    id: '1',
    title: 'South Coast Technology Center',
    description: '3100-3120 W Lake Center Dr., Santa Ana CA 92704',
    progress: 25,
    status: 'Site Analysis',
    stage: 'Site Selection',
    priority: 'High',
    icon: MapPin,
    color: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'Greater-Boston Expansion', 
    description: '1050 Winter St., Waltham MA 02451',
    progress: 45,
    status: 'Due Diligence',
    stage: 'Site Selection',
    priority: 'Medium',
    icon: MapPin,
    color: 'bg-blue-600'
  },
  // Construction
  {
    id: '3',
    title: 'Arsenal-1 Hyperscale Manufacturing',
    description: 'Advanced manufacturing complex - Pickaway County, OH',
    progress: 35,
    status: 'Foundation & Structure',
    stage: 'Construction',
    priority: 'High',
    icon: Building2,
    color: 'bg-red-600'
  },
  {
    id: '4',
    title: 'Atlanta UAV Allied Studios',
    description: '1435 Hills Pl. NW, Atlanta GA 30318',
    progress: 68,
    status: 'Interior & Systems',
    stage: 'Construction', 
    priority: 'High',
    icon: Building2,
    color: 'bg-red-600'
  },
  {
    id: '5',
    title: 'Quonset Point AUV Plant',
    description: 'Flex Tech Park Bldg 11, Quonset Business Park, North Kingstown RI 02852',
    progress: 22,
    status: 'Site Preparation',
    stage: 'Construction',
    priority: 'High',
    icon: Building2,
    color: 'bg-red-600'
  },
  // Facility Management
  {
    id: '6',
    title: 'The Press HQ Campus',
    description: '1375 Sunflower Ave., Costa Mesa CA 92626',
    progress: 95,
    status: 'Operations & Maintenance',
    stage: 'Facility Management',
    priority: 'Medium',
    icon: Wrench,
    color: 'bg-green-600'
  }
];

export function ProjectsOverview() {
  const getPriorityBadge = (priority: string) => {
    if (priority === "High") {
      return "bg-red-700 text-white border-red-600 font-bold";
    } else if (priority === "Medium") {
      return "bg-yellow-600 text-white border-yellow-500 font-bold";
    }
    return "bg-gray-700 text-white border-gray-600 font-bold";
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Site Selection':
        return 'text-blue-400';
      case 'Construction':
        return 'text-red-400';
      case 'Facility Management':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-white">Active Real Estate Projects</h3>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center font-medium">
          <span>View All</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => {
          const IconComponent = project.icon;
          return (
            <div key={project.id} className="p-4 bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-full", project.color)}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-base">{project.title}</h4>
                    <p className="text-xs text-gray-300 mt-1">{project.description}</p>
                    <p className={cn("text-xs font-medium mt-1", getStageColor(project.stage))}>
                      {project.stage} • {project.status}
                    </p>
                  </div>
                </div>
                <Badge className={cn(
                  "text-xs px-2 py-1 rounded-full border",
                  getPriorityBadge(project.priority)
                )}>
                  {project.priority}
                </Badge>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  max={100}
                  className="h-1.5 bg-gray-800"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
