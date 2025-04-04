
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin, AlertTriangle, CheckCircle, Clock, Activity, BarChart } from 'lucide-react';
import { siteAssessmentsData } from '@/data/preconstruction/preconstructionData';

export function SiteAssessments() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AssessmentSummaryCard 
          title="Environmental" 
          status="In Progress" 
          completionPercentage={75}
          icon={<Activity className="h-5 w-5 text-green-400" />}
          dueDate="Jul 15, 2025"
          issuesCount={2}
        />
        
        <AssessmentSummaryCard 
          title="Geotechnical" 
          status="Completed" 
          completionPercentage={100}
          icon={<BarChart className="h-5 w-5 text-blue-400" />}
          dueDate="Jun 3, 2025"
          issuesCount={3}
        />
        
        <AssessmentSummaryCard 
          title="Topographical" 
          status="Completed" 
          completionPercentage={100}
          icon={<MapPin className="h-5 w-5 text-purple-400" />}
          dueDate="May 22, 2025"
          issuesCount={0}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssessmentsList />
        </div>
        <div>
          <SiteIssuesCard />
        </div>
      </div>
    </div>
  );
}

interface AssessmentSummaryCardProps {
  title: string;
  status: 'In Progress' | 'Completed' | 'Pending' | 'Delayed';
  completionPercentage: number;
  icon: React.ReactNode;
  dueDate: string;
  issuesCount: number;
}

function AssessmentSummaryCard({ 
  title, 
  status, 
  completionPercentage, 
  icon,
  dueDate,
  issuesCount
}: AssessmentSummaryCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Delayed': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            <CardDescription className="text-gray-400">Assessment</CardDescription>
          </div>
          <div className="bg-gray-800 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completion</span>
            <span className="text-white font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className={status === 'Completed' ? 'bg-green-500 h-2 rounded-full' : 'bg-blue-500 h-2 rounded-full'} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-400">Due: {dueDate}</span>
          </div>
          <Badge className={`${getStatusColor()} border`} variant="outline">
            {status}
          </Badge>
        </div>
        
        {issuesCount > 0 && (
          <div className="flex items-center text-sm text-amber-400">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>{issuesCount} issues identified</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AssessmentsList() {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Site Assessment Reports</CardTitle>
            <CardDescription className="text-gray-400">
              Comprehensive analysis of site conditions
            </CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            New Assessment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-black">
        <div className="space-y-4">
          {siteAssessmentsData.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-all">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{assessment.title}</h3>
                  <p className="text-sm text-gray-400">{assessment.consultant} • {assessment.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AssessmentStatusBadge status={assessment.status} />
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-black pt-2 flex justify-center">
        <Button variant="outline" className="w-full border-gray-800 text-gray-400 hover:text-white">
          View All Assessments
        </Button>
      </CardFooter>
    </Card>
  );
}

function AssessmentStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'delayed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Badge className={`${getStatusColor()} border`} variant="outline">
      {status}
    </Badge>
  );
}

function SiteIssuesCard() {
  const issues = [
    {
      id: 1,
      title: 'Soil Contamination',
      description: 'Levels of lead detected above acceptable range in northeast quadrant',
      severity: 'high',
      date: 'Jun 12, 2025'
    },
    {
      id: 2,
      title: 'Drainage Issues',
      description: 'Poor water drainage in southern section may require additional systems',
      severity: 'medium',
      date: 'Jun 5, 2025'
    },
    {
      id: 3,
      title: 'Unstable Soil',
      description: 'Geotechnical report indicates potential instability in northwest corner',
      severity: 'medium',
      date: 'May 28, 2025'
    },
    {
      id: 4,
      title: 'Access Road Limitations',
      description: 'Current road width may be insufficient for construction equipment',
      severity: 'low',
      date: 'May 22, 2025'
    }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
          Identified Issues
        </CardTitle>
        <CardDescription className="text-gray-400">
          Issues requiring attention before construction
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {issues.map((issue) => (
          <div key={issue.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between">
              <h3 className="text-white font-medium">{issue.title}</h3>
              <IssueSeverityBadge severity={issue.severity} />
            </div>
            <p className="text-sm text-gray-400 mt-1">{issue.description}</p>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Clock className="h-3 w-3 mr-1" />
              <span>Reported: {issue.date}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:text-white">
          View All Issues
        </Button>
      </CardFooter>
    </Card>
  );
}

function IssueSeverityBadge({ severity }: { severity: string }) {
  const getSeverityColor = () => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Badge className={`${getSeverityColor()} border text-xs`} variant="outline">
      {severity}
    </Badge>
  );
}
