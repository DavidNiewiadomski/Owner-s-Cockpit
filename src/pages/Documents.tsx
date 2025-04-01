
import React, { useState } from 'react';
import { 
  Plus, 
  Orbit
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { useProject } from '@/contexts/ProjectContext';
import { projectDocuments } from '@/data/dashboardData';
import { BIMViewer } from '@/components/dashboard/BIMViewer';

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  
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

  const openBIMViewer = () => {
    setIsBIMViewerOpen(true);
  };

  return (
    <DashboardLayout
      projectContext="Documents"
      projectName={selectedProject?.title || 'All Projects'}
      initialInsights={documentInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Documents</h1>
            <p className="text-gray-400">Manage your project documents</p>
          </div>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Button 
              variant="outline" 
              className="bg-gray-900 hover:bg-gray-800 text-white border-gray-700"
              onClick={openBIMViewer}
            >
              <Orbit className="w-4 h-4 mr-2 text-blue-400" />
              View BIM
            </Button>
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

      <BIMViewer 
        projectName={selectedProject?.title} 
        isOpen={isBIMViewerOpen} 
        onClose={() => setIsBIMViewerOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Documents;
