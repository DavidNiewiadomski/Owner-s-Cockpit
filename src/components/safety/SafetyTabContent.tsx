
import React from 'react';
import { ShieldCheck, Check, AlertTriangle, FileText, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';

interface SafetyMetrics {
  incidentRate: number;
  safetyScore: number;
  inspectionsPassed: number;
  openSafetyIssues: number;
  daysWithoutIncident: number;
}

interface SafetyCertification {
  id: number;
  name: string;
  status: string;
  date: string;
  expires: string;
}

interface SafetyIncident {
  id: number;
  title: string;
  severity: string;
  date: string;
  resolved: boolean;
  area: string;
}

interface SafetyTabContentProps {
  safetyMetrics: SafetyMetrics;
  safetyCerts: SafetyCertification[];
  safetyIncidents: SafetyIncident[];
  projectName: string;
}

export function SafetyTabContent({ 
  safetyMetrics, 
  safetyCerts, 
  safetyIncidents, 
  projectName 
}: SafetyTabContentProps) {
  const safetyInsights = [
    {
      title: 'Safety Compliance',
      content: projectName === 'East Tower' ? 'OSHA inspection date approaching in 15 days. Schedule pre-inspection review.' :
               projectName === 'Westview Residences' ? 'Fire safety standards exceed requirements by 15%. Consider documenting as case study.' :
               projectName === 'Harbor Bridge' ? 'Worker safety orientation completion rate at 92%. 8 team members need follow-up.' :
               'Safety protocol compliance rate at 95%. 2 open issues need to be addressed.',
      type: 'info' as const
    },
    {
      title: 'Incident Prevention',
      content: projectName === 'East Tower' ? 'Recent safety drill showed 2 minute improvement in evacuation time.' :
               projectName === 'Westview Residences' ? 'Zero incidents reported in the last 145 days - new project record!' :
               projectName === 'Harbor Bridge' ? 'Wind safety protocols activated 8 times this month. Review effectiveness.' :
               'Safety equipment inspection due in 3 days. Schedule has been sent to team leads.',
      type: 'warning' as const
    }
  ];

  return (
    <>
      <CollapsibleAIAssistant 
        projectContext="Safety"
        projectName={projectName}
        initialInsights={safetyInsights}
      />
      
      <main className="flex-1 overflow-y-auto p-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Safety Score</div>
                <ShieldCheck className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{safetyMetrics.safetyScore}%</div>
              <Progress value={safetyMetrics.safetyScore} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Days Without Incident</div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{safetyMetrics.daysWithoutIncident}</div>
              <div className="text-sm text-gray-500 mt-2">Last incident: {safetyMetrics.daysWithoutIncident} days ago</div>
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Open Safety Issues</div>
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold">{safetyMetrics.openSafetyIssues}</div>
              <div className="text-sm text-gray-500 mt-2">{safetyMetrics.openSafetyIssues === 0 ? 'All clear!' : `${safetyMetrics.openSafetyIssues} issues need attention`}</div>
            </Card>
            
            <Card className="p-4 bg-black border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-400">Inspections Passed</div>
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{safetyMetrics.inspectionsPassed}</div>
              <div className="text-sm text-gray-500 mt-2">Year to date</div>
            </Card>
          </div>
          
          <Card className="p-6 bg-black border-gray-800 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Safety Certifications & Compliance</h2>
              <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-gray-900">
                <FileText className="h-3.5 w-3.5 mr-1" />
                View All Documents
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Certification</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Issue Date</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Expiration</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyCerts.map(cert => (
                    <tr key={cert.id} className="border-b border-gray-800">
                      <td className="py-3 px-2">{cert.name}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          cert.status === 'Verified' || cert.status === 'Passed' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-amber-900 text-amber-300'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{cert.date}</td>
                      <td className="py-3 px-2 text-gray-400">{cert.expires}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <Card className="p-6 bg-black border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Safety Incidents</h2>
              <Button variant="outline" className="text-xs h-8 bg-black border-gray-700 hover:bg-gray-900">
                <BarChart className="h-3.5 w-3.5 mr-1" />
                View Detailed Report
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Incident</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Severity</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Date</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Status</th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyIncidents.map(incident => (
                    <tr key={incident.id} className="border-b border-gray-800">
                      <td className="py-3 px-2">{incident.title}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          incident.severity === 'Low' ? 'bg-blue-900 text-blue-300' :
                          incident.severity === 'Medium' ? 'bg-amber-900 text-amber-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{incident.date}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          incident.resolved ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'
                        }`}>
                          {incident.resolved ? 'Resolved' : 'Open'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{incident.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
