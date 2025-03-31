
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

// Sample documents data
const documents = [
  {
    id: '1',
    name: 'Project Blueprint.pdf',
    type: 'pdf' as const,
    size: '8.5 MB',
    updatedAt: '2 days ago',
    project: 'East Tower'
  },
  {
    id: '2',
    name: 'Site Survey Images.jpg',
    type: 'image' as const,
    size: '12.3 MB',
    updatedAt: '3 days ago',
    project: 'Westside Park'
  },
  {
    id: '3',
    name: 'Budget Forecast.xlsx',
    type: 'spreadsheet' as const,
    size: '1.2 MB',
    updatedAt: '1 week ago',
    project: 'North Bridge'
  },
  {
    id: '4',
    name: 'Contractor Agreement.docx',
    type: 'text' as const,
    size: '567 KB',
    updatedAt: '2 weeks ago',
    project: 'East Tower'
  },
  {
    id: '5',
    name: 'Foundation Design.pdf',
    type: 'pdf' as const,
    size: '10.2 MB',
    updatedAt: '1 day ago',
    project: 'East Tower'
  },
  {
    id: '6',
    name: 'Electrical Plan.pdf',
    type: 'pdf' as const,
    size: '6.7 MB',
    updatedAt: '1 week ago',
    project: 'North Bridge'
  },
  {
    id: '7',
    name: 'Landscape Photos.jpg',
    type: 'image' as const,
    size: '15.5 MB',
    updatedAt: '5 days ago',
    project: 'Westside Park'
  },
  {
    id: '8',
    name: 'Project Timeline.xlsx',
    type: 'spreadsheet' as const,
    size: '980 KB',
    updatedAt: '3 days ago',
    project: 'East Tower'
  },
];

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;
    
  const handleDocumentAction = (action: string, docName: string) => {
    toast({
      title: `${action} ${docName}`,
      description: `Document ${action.toLowerCase()} action triggered`,
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Assistant Section */}
            <AIAssistant />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your project documents</p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-2">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
            
            <DocumentList 
              documents={filteredDocuments} 
              className="mt-6" 
              onView={(docId) => handleDocumentAction('Viewed', documents.find(d => d.id === docId)?.name || '')}
              onDownload={(docId) => handleDocumentAction('Downloaded', documents.find(d => d.id === docId)?.name || '')}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;
