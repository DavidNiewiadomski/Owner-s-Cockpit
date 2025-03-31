
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
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
import { projectDocuments } from '@/data/dashboardData';

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  
  // Get project-specific documents
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

  // Generate project-specific document insights
  const documentInsights = [
    {
      title: 'Document Updates',
      content: projectId === '1' ? 'East Tower Blueprint.pdf was updated 2 days ago with facade design changes' :
               projectId === '2' ? 'Landscaping Plan.pdf requires your approval for the irrigation system' :
               projectId === '3' ? 'Bridge Structural Analysis.pdf has critical reinforcement recommendations' :
               'Project Blueprint.pdf was updated 2 days ago with foundation design changes',
      type: 'info' as const
    },
    {
      title: 'Approval Needed',
      content: projectId === '1' ? 'Construction Timeline.xlsx is awaiting your review for milestone adjustments' :
               projectId === '2' ? 'Environmental Impact Report.docx has outstanding comments to address' :
               projectId === '3' ? 'Traffic Flow Models.xlsx needs approval before implementation' :
               'Budget Forecast.xlsx is awaiting your review and approval',
      type: 'warning' as const
    }
  ];

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <CollapsibleAIAssistant 
          projectContext="Documents"
          projectName={selectedProject?.title || 'All Projects'}
          initialInsights={documentInsights}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
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
