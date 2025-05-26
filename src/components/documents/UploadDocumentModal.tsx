import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, UploadCloud } from 'lucide-react';
import type { Document, Project } from '@/lib/supabase';
import { uploadDocumentFile, createDocumentRecord } from '@/services/dataService'; // Import service functions
// Placeholder for a potential Alert component for errors
// import { Alert, AlertDescription } from "@/components/ui/alert"; 

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentUploaded: (newDocument: Document) => void;
  projects: Project[];
}

export function UploadDocumentModal({
  isOpen,
  onClose,
  onDocumentUploaded,
  projects,
}: UploadDocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setSelectedFile(null);
    setDocumentName('');
    setProjectId(undefined);
    setFolderName('');
    setDescription('');
    setError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDocumentName(file.name); // Pre-fill document name
    } else {
      setSelectedFile(null);
      setDocumentName('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    if (!documentName.trim()) {
      setError('Document name is required.');
      return;
    }
    if (!projectId) {
      setError('Project selection is required.');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload the file
      const bucketName = 'project_documents'; // Or get from config/env
      // Sanitize folderName: remove leading/trailing slashes, ensure single slashes
      const sanitizedFolderName = folderName.trim().replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/');
      const filePath = `${projectId}/${sanitizedFolderName ? sanitizedFolderName + '/' : ''}${selectedFile.name}`;
      
      console.log(`Uploading to: ${bucketName}/${filePath}`);
      const uploadResponse = await uploadDocumentFile(selectedFile, bucketName, filePath);
      console.log('Upload response:', uploadResponse);

      // 2. Prepare document record metadata
      // The Omit type for createDocumentRecord is: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'uploaded_by'>
      const documentMetaData = {
        name: documentName.trim(),
        project_id: projectId, // This is already asserted to exist
        folder: sanitizedFolderName || undefined, // Use sanitized or undefined
        description: description.trim() || undefined,
        file_url: uploadResponse.publicUrl,
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        // uploaded_by is handled by Supabase RLS or defaults
      };
      
      // 3. Create document record in the database
      const newDocument = await createDocumentRecord(documentMetaData);
      console.log('Created document record:', newDocument);

      onDocumentUploaded(newDocument);
      // TODO: Show success toast (optional)
      // toast({ title: "Document Uploaded", description: `Document "${newDocument.name}" was successfully uploaded.` });
      resetForm();
      onClose();
    } catch (err) {
      console.error('Failed to upload document:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm(); // Reset form if modal is closed by clicking outside or Esc
      }
    }}>
      <DialogContent className="sm:max-w-[525px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UploadCloud className="mr-2 h-5 w-5 text-blue-400" />
            Upload New Document
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a file and provide details for the new document.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-gray-300">
                File
              </Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white file:text-blue-400 file:bg-gray-700 file:border-gray-600 file:rounded-md file:mr-2 file:px-2 file:py-1 file:text-sm"
                required
              />
            </div>
            {selectedFile && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3 text-xs text-gray-400">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentName" className="text-right text-gray-300">
                Document Name
              </Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right text-gray-300">
                Project
              </Label>
              <Select value={projectId} onValueChange={setProjectId} required>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id} className="hover:bg-gray-700">
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right text-gray-300">
                Folder (Optional)
              </Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., Blueprints/Phase1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-gray-300">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                rows={3}
                placeholder="Briefly describe the document..."
              />
            </div>
          </div>

          {error && (
            <div className="my-2 p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-400 text-sm">
              <p>Error: {error}</p>
            </div>
          )}

          <DialogFooter className="sm:justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => { onClose(); resetForm(); }} className="border-gray-700 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading} className="bg-blue-600 hover:bg-blue-700">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload & Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
