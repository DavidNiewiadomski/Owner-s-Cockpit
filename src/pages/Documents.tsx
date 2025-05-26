
import React, { useState, useEffect, useMemo } from 'react'; // Added useEffect, useMemo
import { 
  Plus, 
  Orbit,
  FolderTree, 
  ListFilter,
  FileIcon,
  Loader2 // For loading state
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { DocumentFolders } from '@/components/dashboard/DocumentFolders';
import { useProject } from '@/contexts/ProjectContext';
// projectDocuments and local Document type removed
import { getDocuments, getProjects } from '@/services/dataService'; // Import data service functions
import type { Document, Project } from '@/lib/supabase'; // Import Supabase types
import { BIMViewer } from '@/components/dashboard/BIMViewer';
import { UploadDocumentModal } from '@/components/documents/UploadDocumentModal'; // Import the modal
// Tabs imports are not used in the provided snippet, but kept if needed elsewhere

// Helper function to format file size
const formatFileSize = (bytes?: number) => {
  if (bytes === undefined || bytes === null) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'folders' | 'list'>('folders');
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [projectsMap, setProjectsMap] = useState<Map<string, Project>>(new Map());
  const [allProjects, setAllProjects] = useState<Project[]>([]); // State for all projects for the modal
  const [enrichedDocuments, setEnrichedDocuments] = useState<(Document & { projectTitle: string })[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<(Document & { projectTitle: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal visibility
  
  const loadData = async () => { // Made loadData a standalone function
    setLoading(true);
    try {
      // Use selectedProject?.id directly, getDocuments handles undefined for 'all' projects
      const projectIdForFilter = selectedProject?.id === 'all' ? undefined : selectedProject?.id;
      const [docsData, projsData] = await Promise.all([
        getDocuments(projectIdForFilter),
        getProjects() // This fetches all projects
      ]);
      setDocuments(docsData);
      setAllProjects(projsData); // Store all projects for the modal
      
      const newProjectsMap = new Map<string, Project>();
      projsData.forEach(project => newProjectsMap.set(project.id, project));
      setProjectsMap(newProjectsMap);
    } catch (error) {
      console.error("Error loading documents or projects:", error);
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, [selectedProject, toast]); // loadData is stable, dependencies are correct

  useEffect(() => {
    if (documents.length > 0 && projectsMap.size > 0) {
      const currentEnrichedDocs = documents.map(doc => ({
        ...doc,
        projectTitle: doc.project_id ? (projectsMap.get(doc.project_id)?.title || 'Unknown Project') : 'N/A'
      }));
      setEnrichedDocuments(currentEnrichedDocs);
    } else if (documents.length > 0 && projectsMap.size === 0 && !loading) {
        const currentEnrichedDocs = documents.map(doc => ({
        ...doc,
        projectTitle: 'Project Info N/A'
      }));
      setEnrichedDocuments(currentEnrichedDocs);
    } else {
      setEnrichedDocuments([]);
    }
  }, [documents, projectsMap, loading]);

  const filteredDocuments = useMemo(() => {
    if (!searchTerm) return enrichedDocuments;
    const searchTermLower = searchTerm.toLowerCase();
    return enrichedDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchTermLower) ||
      doc.projectTitle.toLowerCase().includes(searchTermLower) ||
      (doc.folder && doc.folder.toLowerCase().includes(searchTermLower))
    );
  }, [enrichedDocuments, searchTerm]);
    
  const handleFileAction = (action: string, fileName?: string) => { // fileName can be undefined
    toast({
      id: crypto.randomUUID(),
      title: `${action}: ${fileName || 'Unknown File'}`,
      description: `File ${action.toLowerCase()} action triggered.`,
      duration: 3000,
    });
  };

  const handleSelectDocument = (doc: (Document & { projectTitle: string })) => { // Use enriched type
    setSelectedDocument(doc);
    handleFileAction('Viewed', doc.name);
  };

  // Generate project-specific document insights (kept as is, but ideally dynamic)
   const documentInsights = [
    {
      title: 'Document Updates',
      content: selectedProject?.id === '1' ? 'East Tower Blueprint.pdf was updated 2 days ago with facade design changes' :
               selectedProject?.id === '2' ? 'Landscaping Plan.pdf requires your approval for the irrigation system' :
               selectedProject?.id === '3' ? 'Bridge Structural Analysis.pdf has critical reinforcement recommendations' :
               'Project Blueprint.pdf was updated 2 days ago with foundation design changes',
      type: 'info' as const
    },
    {
      title: 'Approval Needed',
      content: selectedProject?.id === '1' ? 'Construction Timeline.xlsx is awaiting your review for milestone adjustments' :
               selectedProject?.id === '2' ? 'Environmental Impact Report.docx has outstanding comments to address' :
               selectedProject?.id === '3' ? 'Traffic Flow Models.xlsx needs approval before implementation' :
               'Budget Forecast.xlsx is awaiting your review and approval',
      type: 'warning' as const
    }
  ];
  
  const openBIMViewer = () => {
    setIsBIMViewerOpen(true);
  };

  const handleDocumentUploaded = (newDocument: Document) => {
    // Re-fetch data to refresh the document list
    // This will also re-run the enrichment useEffect
    loadData(); 
    // Optionally, you could add the newDocument to the local 'documents' state 
    // for a more immediate UI update before loadData completes.
    // Example: setDocuments(prev => [newDocument, ...prev]);
    // However, re-fetching ensures data consistency.
    toast({
      title: "Document Uploaded",
      description: `"${newDocument.name}" has been successfully uploaded.`,
      variant: "default"
    });
  };

  return (
    <DashboardLayout
      projectContext="Documents"
      projectName={selectedProject?.title || 'All Projects'}
      initialInsights={documentInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        </div>
      ) : (
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
                className={`gap-1 ${viewMode === 'folders' ? 'bg-cyan-900/40 text-cyan-400 border-b-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : ''}`}
              >
                <FolderTree className="w-4 h-4" />
                <span className="hidden sm:inline">Folders</span>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className={`gap-1 ${viewMode === 'list' ? 'bg-cyan-900/40 text-cyan-400 border-b-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : ''}`}
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
            <Button 
              className="bg-construction-600 hover:bg-construction-700 text-white"
              onClick={() => setIsUploadModalOpen(true)} // Open modal
            >
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
                        <p className="text-gray-400">
                          {selectedDocument.projectTitle} • {selectedDocument.folder || 'Root'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="text-white">{selectedDocument.file_type.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p className="text-white">{formatFileSize(selectedDocument.file_size)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Uploaded By</p>
                        <p className="text-white">{selectedDocument.uploaded_by || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-white">{new Date(selectedDocument.updated_at).toLocaleDateString()}</p>
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
                  const doc = enrichedDocuments.find(d => d.id === docId); // Find from enriched documents
                  if (doc) {
                    setSelectedDocument(doc); // Set enriched document
                    handleFileAction('Viewed', doc.name);
                  }
                }}
                onDownload={(docId) => handleFileAction('Downloaded', enrichedDocuments.find(d => d.id === docId)?.name)}
              />
            </div>
          )}
        </div>
      </div>
      )}

      {isBIMViewerOpen && (
        <BIMViewer 
          projectName={selectedProject?.title} 
          isOpen={isBIMViewerOpen} 
          onClose={() => setIsBIMViewerOpen(false)}
        />
      )}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onDocumentUploaded={handleDocumentUploaded}
        projects={allProjects} // Pass all fetched projects
      />
    </DashboardLayout>
  );
};

export default Documents;
