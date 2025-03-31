
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
}

export function DocumentList({ documents, className }: DocumentListProps) {
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

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center">
                    {getDocumentIcon(doc.type)}
                    <span className="ml-2 font-medium">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doc.project}</TableCell>
                <TableCell>{doc.updatedAt}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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
