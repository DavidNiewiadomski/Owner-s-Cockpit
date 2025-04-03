
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  File, 
  FileText, 
  FileImage,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Document } from '@/data/documents/documentData';

interface DocumentFoldersProps {
  documents: Document[];
  onSelectDocument: (document: Document) => void;
}

export function DocumentFolders({ documents, onSelectDocument }: DocumentFoldersProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  
  // Get unique folders
  const folders = Array.from(new Set(documents.map(doc => doc.folder)));
  
  // Toggle folder expansion
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };
  
  // Get document icon based on type
  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'image':
        return <FileImage className="w-4 h-4 text-blue-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'text':
      default:
        return <File className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="w-full bg-black border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-3 bg-gray-900 border-b border-gray-800">
        <h3 className="font-medium text-white">Project Folders</h3>
      </div>
      <div className="p-2">
        {folders.map(folder => (
          <div key={folder} className="mb-1">
            <div 
              className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer text-gray-300"
              onClick={() => toggleFolder(folder)}
            >
              {expandedFolders[folder] ? (
                <ChevronDown className="w-4 h-4 mr-2 text-cyan-400" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2 text-cyan-400" />
              )}
              <Folder className="w-4 h-4 mr-2 text-cyan-400" />
              <span>{folder}</span>
              <span className="ml-auto text-xs text-gray-500">
                {documents.filter(doc => doc.folder === folder).length} files
              </span>
            </div>
            
            {expandedFolders[folder] && (
              <div className="ml-8 mt-1 space-y-1">
                {documents
                  .filter(doc => doc.folder === folder)
                  .map(doc => (
                    <div 
                      key={doc.id}
                      className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer text-gray-300"
                      onClick={() => onSelectDocument(doc)}
                    >
                      {getDocumentIcon(doc.type)}
                      <span className="ml-2 truncate">{doc.name}</span>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
