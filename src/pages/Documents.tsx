
import React, { useState } from 'react';
import { 
  Plus, 
  Orbit,
  FolderTree, 
  ListFilter,
  FileIcon
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { DocumentFolders } from '@/components/dashboard/DocumentFolders';
import { useProject } from '@/contexts/ProjectContext';
import { projectDocuments, Document } from '@/data/documents/documentData';
import { BIMViewer } from '@/components/dashboard/BIMViewer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'folders' | 'list'>('folders');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  // Get project-specific documents
  const projectId = selectedProject?.id || 'all';
  const documents = projectDocuments;
  
  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.folder.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc);
    handleFileAction('Viewed', doc.name);
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
            <div className="bg-gray-900 border border-gray-800 rounded-md p-1 flex">
              <Button 
                variant={viewMode === 'folders' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('folders')}
                className="gap-1"
              >
                <FolderTree className="w-4 h-4" />
                <span className="hidden sm:inline">Folders</span>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-1"
              >
                <ListFilter className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {viewMode === 'folders' && (
            <>
              <div className="lg:col-span-1">
                <DocumentFolders 
                  documents={filteredDocuments} 
                  onSelectDocument={handleSelectDocument} 
                />
              </div>
              <div className="lg:col-span-2">
                {selectedDocument ? (
                  <div className="bg-black border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      <FileIcon className="w-8 h-8 text-cyan-400 mr-3" />
                      <div>
                        <h2 className="text-xl font-bold text-white">{selectedDocument.name}</h2>
                        <p className="text-gray-400">{selectedDocument.project} • {selectedDocument.folder}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="text-white">{selectedDocument.type.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p className="text-white">{selectedDocument.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Author</p>
                        <p className="text-white">{selectedDocument.author}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-white">{selectedDocument.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button>View Document</Button>
                      <Button variant="outline">Download</Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black border border-gray-800 rounded-lg flex flex-col items-center justify-center p-12">
                    <FileIcon className="w-16 h-16 text-gray-700 mb-4" />
                    <h3 className="text-xl font-medium text-white">Select a document to view</h3>
                    <p className="text-gray-400 mt-2 text-center">Choose a document from the folder structure on the left</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {viewMode === 'list' && (
            <div className="lg:col-span-3">
              <DocumentList 
                documents={filteredDocuments} 
                className="mt-0" 
                onView={(docId) => {
                  const doc = documents.find(d => d.id === docId);
                  if (doc) {
                    setSelectedDocument(doc);
                    handleFileAction('Viewed', doc.name);
                  }
                }}
                onDownload={(docId) => handleFileAction('Downloaded', documents.find(d => d.id === docId)?.name || '')}
              />
            </div>
          )}
        </div>
      </div>

      {isBIMViewerOpen && (
        <BIMViewer 
          projectName={selectedProject?.title} 
          isOpen={isBIMViewerOpen} 
          onClose={() => setIsBIMViewerOpen(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default Documents;
