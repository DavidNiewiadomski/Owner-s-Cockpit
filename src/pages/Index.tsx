
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';
import { FinancialTracking } from '@/components/dashboard/FinancialTracking';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { OwnerActionItems } from '@/components/dashboard/OwnerActionItems';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
import { 
  projects, 
  projectTimelineEvents,
  projectDocuments,
  projectPerformanceData,
  projectPropertyData,
  notifications, 
  financialData 
} from '@/data/dashboardData';

const Index = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  
  // Get project-specific data based on selected project
  const projectId = selectedProject?.id || 'all';
  const timelineEvents = projectTimelineEvents[projectId as keyof typeof projectTimelineEvents] || projectTimelineEvents['all'];
  const documents = projectDocuments[projectId as keyof typeof projectDocuments] || projectDocuments['all'];
  const performanceData = projectPerformanceData[projectId as keyof typeof projectPerformanceData] || projectPerformanceData['all'];
  const propertyData = projectPropertyData[projectId as keyof typeof projectPropertyData] || projectPropertyData['all'];

  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;

  const handleDocumentAction = (action: string, docId: string) => {
    const docName = documents.find(d => d.id === docId)?.name || '';
    toast({
      title: `${action} ${docName}`,
      description: `Document ${action.toLowerCase()} action triggered`,
      duration: 3000,
    });
  };

  // Generate project-specific insights
  const projectInsights = [
    `Budget variance is currently ${projectId === '1' ? '2.7% under budget' : projectId === '2' ? '1.5% over budget' : projectId === '3' ? '0.8% under budget' : '3.2% under budget'} for ${selectedProject?.title || 'this project'}`,
    `Labor productivity is ${projectId === '1' ? '15%' : projectId === '2' ? '8%' : projectId === '3' ? '10%' : '12%'} above industry benchmark in ${selectedProject?.title || 'this project'}`,
    `Quality inspection pass rate is at ${projectId === '1' ? '98.2%' : projectId === '2' ? '96.5%' : projectId === '3' ? '97.9%' : '97.8%'} for ${selectedProject?.title || 'this project'}`,
    `Schedule compliance is currently at ${projectId === '1' ? '95%' : projectId === '2' ? '89%' : projectId === '3' ? '92%' : '94%'} for ${selectedProject?.title || 'this project'}`
  ];

  // Fix for the Type 'string | number' is not assignable to type 'number' error
  // Ensure completionPercentage is always a number
  const completionPercentage = typeof propertyData.completionPercentage === 'string' 
    ? parseFloat(propertyData.completionPercentage) 
    : propertyData.completionPercentage || 0;

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <CollapsibleAIAssistant 
              projectName={selectedProject?.title || 'your properties'} 
              insights={projectInsights}
              initialInsights={[
                {
                  title: "Budget Analysis",
                  content: `${selectedProject?.title || 'This project'} is currently ${projectId === '1' ? '2.7% under budget with potential savings in foundation costs.' : projectId === '2' ? '1.5% over budget due to increased material costs.' : projectId === '3' ? '0.8% under budget with slightly higher labor expenses.' : '3.2% under budget with potential savings in material costs.'}`,
                  type: "success"
                },
                {
                  title: "Schedule Risk",
                  content: `${projectId === '1' ? 'Material delivery delays may impact facade installation.' : projectId === '2' ? 'Weather forecast shows potential flooding concerns for drainage work.' : projectId === '3' ? 'Traffic diversion plan needs review before next phase.' : 'Weather forecast shows potential delays next week for your project.'}`,
                  type: "warning"
                },
                {
                  title: "Quality Metrics",
                  content: `Latest inspections show ${projectId === '1' ? '98.2%' : projectId === '2' ? '96.5%' : projectId === '3' ? '97.9%' : '97.8%'} pass rate, above industry average.`,
                  type: "info"
                },
                {
                  title: "Resource Optimization",
                  content: `${projectId === '1' ? 'Concrete usage optimization could yield 5% savings.' : projectId === '2' ? 'Equipment scheduling adjustment recommended to reduce idle time.' : projectId === '3' ? 'Traffic management resource allocation needs review.' : 'AI analysis suggests optimizing crew scheduling could save 8.5% on labor costs.'}`,
                  type: "info"
                }
              ]}
            />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Owner Dashboard</h1>
                <p className="text-gray-400">Real-time overview of your properties and projects</p>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                  All projects active
                </span>
              </div>
            </div>
            
            <DashboardStats />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Featured Property Details</h2>
              <PropertyDetails 
                propertyName={propertyData.propertyName}
                propertyType={propertyData.propertyType}
                location={propertyData.location}
                squareFootage={propertyData.squareFootage}
                floors={propertyData.floors}
                constructionStartDate={propertyData.constructionStartDate}
                estimatedCompletionDate={propertyData.estimatedCompletionDate}
                currentPhase={propertyData.currentPhase}
                completionPercentage={completionPercentage}
                keyContacts={propertyData.keyContacts}
                permits={propertyData.permits}
                inspections={propertyData.inspections}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 space-y-6">
                <FinancialTracking 
                  projectName={selectedProject?.title || 'All Projects'}
                  totalBudget={financialData.totalBudget}
                  spending={financialData.spending}
                  changeOrders={financialData.changeOrders}
                />
                
                <ProgressChart data={performanceData} />

                <ProjectsSection projects={projects} />
                
                <DocumentList 
                  documents={filteredDocuments} 
                  className="mt-6" 
                  onView={(id) => handleDocumentAction('Viewed', id)}
                  onDownload={(id) => handleDocumentAction('Downloaded', id)}
                />
              </div>
              
              <div className="space-y-6">
                <NotificationsCard notifications={notifications} />

                <h2 className="text-xl font-semibold text-gray-100">Project Timeline</h2>
                <TimelineCard events={timelineEvents} />
                
                <OwnerActionItems />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
