
import React from 'react';
import { File, FileText, Image, Download, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Document } from '@/data/documents/documentData';

interface RecentDocumentsProps {
  documents: Document[];
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  // Function to determine icon based on document type
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-400" />;
      case 'image':
        return <Image className="h-4 w-4 text-blue-400" />;
      default:
        return <File className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4 text-white">Recent Documents</h3>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-gray-900 rounded-md transition-colors group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-800 rounded-md">
                {getDocumentIcon(doc.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">{doc.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Folder className="h-3 w-3 mr-1 text-cyan-400" />
                  <span className="mr-2">{doc.folder}</span> • {doc.date} • {doc.size}
                </div>
              </div>
            </div>
            <Download className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        View All Documents
      </button>
    </div>
  );
}
