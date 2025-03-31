
import React, { useState } from 'react';
import { 
  Plus, 
  FilePen,
  Trash,
  Share2
} from 'lucide-react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { SimpleInsightsPanel } from '@/components/dashboard/SimpleInsightsPanel';
import { useProject } from '@/contexts/ProjectContext';
import { projectDocuments } from '@/data/dashboardData';

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  
  const projectId = selectedProject?.id || 'all';
  const documents = projectDocuments[projectId as keyof typeof projectDocuments] || projectDocuments['all'];
  
  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;
    
  const handleFileAction = (action: string, fileName: string) => {
    toast({
      id: crypto.randomUUID(),
      title: `${action}: ${fileName}`,
      description: `File ${action.toLowerCase()} action triggered.`,
      duration: 3000,
    });
  };

  // Define document insights as strings
  const documentInsights = [
    projectId === '1' ? 'Document Updates: East Tower Blueprint.pdf was updated 2 days ago with facade design changes' :
    projectId === '2' ? 'Document Updates: Landscaping Plan.pdf requires your approval for the irrigation system' :
    projectId === '3' ? 'Document Updates: Bridge Structural Analysis.pdf has critical reinforcement recommendations' :
    'Document Updates: Project Blueprint.pdf was updated 2 days ago with foundation design changes',
    
    projectId === '1' ? 'Approval Needed: Construction Timeline.xlsx is awaiting your review for milestone adjustments' :
    projectId === '2' ? 'Approval Needed: Environmental Impact Report.docx has outstanding comments to address' :
    projectId === '3' ? 'Approval Needed: Traffic Flow Models.xlsx needs approval before implementation' :
    'Approval Needed: Budget Forecast.xlsx is awaiting your review and approval'
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Documents" 
          subtitle="Manage your project documentation"
          onSearch={setSearchTerm} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <SimpleInsightsPanel
            title="Document Insights"
            projectName={selectedProject?.title || 'All Projects'}
            insights={documentInsights}
          />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Documents</h1>
                <p className="text-gray-400">Manage your project documents</p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-2">
                <Button className="bg-construction-600 hover:bg-construction-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
            
            <DocumentList 
              documents={filteredDocuments} 
              className="mt-6" 
              onView={(docId) => handleFileAction('Viewed', documents.find(d => d.id === docId)?.name || '')}
              onDownload={(docId) => handleFileAction('Downloaded', documents.find(d => d.id === docId)?.name || '')}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;
