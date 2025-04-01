
import { 
  FileText, 
  FileImage, 
  File, 
  FileSpreadsheet, 
  Download,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "text";
  size: string;
  updatedAt: string;
  project: string;
}

interface DocumentListProps {
  documents: Document[];
  className?: string;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function DocumentList({ documents, className, onView, onDownload }: DocumentListProps) {
  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return <File className="w-5 h-5 text-red-500" />;
      case "image":
        return <FileImage className="w-5 h-5 text-blue-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case "text":
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleView = (id: string) => {
    if (onView) onView(id);
  };

  const handleDownload = (id: string) => {
    if (onDownload) onDownload(id);
  };

  return (
    <Card className={cn("overflow-hidden border-cyan-800/40 shadow-[0_0_15px_rgba(56,189,248,0.15)]", className)}>
      <CardHeader className="bg-gradient-to-b from-gray-900 to-black border-b border-cyan-900/30">
        <CardTitle className="text-lg font-bold text-cyan-300">Recent Documents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-cyan-900/30">
              <TableHead className="text-left text-cyan-100 font-bold">Name</TableHead>
              <TableHead className="text-cyan-100 font-bold">Project</TableHead>
              <TableHead className="text-cyan-100 font-bold">Updated</TableHead>
              <TableHead className="text-cyan-100 font-bold">Size</TableHead>
              <TableHead className="text-right text-cyan-100 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="border-b border-cyan-900/20 hover:bg-cyan-950/20">
                <TableCell>
                  <div className="flex items-center">
                    {getDocumentIcon(doc.type)}
                    <span className="ml-2 font-medium text-white">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-cyan-100">{doc.project}</TableCell>
                <TableCell className="text-cyan-100">{doc.updatedAt}</TableCell>
                <TableCell className="text-cyan-100">{doc.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(doc.id)}
                      className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-950/50">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.id)}
                      className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-950/50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
