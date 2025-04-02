
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, ResponsiveContainer } from 'recharts';
import { Bar, Line, Pie, Cell } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Edit, Trash2, Maximize2, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CustomContentSectionProps {
  contents: any[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updatedContent: any) => void;
}

export function CustomContentSection({ contents, onRemove, onUpdate }: CustomContentSectionProps) {
  const { toast } = useToast();
  const [expandedContent, setExpandedContent] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleRemove = (id: string) => {
    onRemove(id);
    toast({
      title: "Content removed",
      description: "The custom content has been removed",
    });
  };
  
  const handleExpand = (content: any) => {
    setExpandedContent(content);
    setIsDialogOpen(true);
  };

  const handleRefresh = (id: string) => {
    // Simulate refreshing data
    toast({
      title: "Content refreshed",
      description: "The data has been updated",
    });
    
    // In a real implementation, you would fetch new data here
    // For now, we'll just update the timestamp
    onUpdate(id, { lastUpdated: new Date().toISOString() });
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const renderContent = (content: any) => {
    switch (content.type) {
      case 'chart':
        if (content.chartType === 'bar') {
          return (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={content.data}>
                <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]}>
                  {content.data.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          );
        } else if (content.chartType === 'line') {
          return (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={content.data}>
                <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          );
        } else if (content.chartType === 'pie') {
          return (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={content.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {content.data.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          );
        }
        break;
        
      case 'table':
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-cyan-950/30 border-b border-cyan-900/30">
                {content.columns.map((column: string, index: number) => (
                  <TableHead key={index} className="text-cyan-300">{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.rows.map((row: any[], rowIndex: number) => (
                <TableRow key={rowIndex} className="border-b border-cyan-900/20">
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="text-gray-300">{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
        
      case 'report':
        return (
          <div className="p-4 bg-gray-900/50 border border-cyan-900/20 rounded-lg">
            <p className="text-gray-300">{content.content}</p>
          </div>
        );
        
      case 'ai':
        return (
          <div className="p-4 bg-gray-900/50 border border-cyan-900/20 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <div className="bg-cyan-950/50 p-1 rounded-md">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-sm text-amber-300">AI Generated Content</p>
            </div>
            <div className="border-l-2 border-cyan-800/50 pl-3 text-gray-300">
              <p>{content.content}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-cyan-900/20">
              <p className="text-xs text-gray-500">Based on prompt: "{content.prompt}"</p>
            </div>
          </div>
        );
        
      default:
        return <p className="text-gray-400">Unknown content type</p>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <Card key={content.id} className="bg-black border-cyan-900/30 overflow-hidden shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300">
          <CardHeader className="bg-gradient-to-b from-gray-900 to-black border-b border-cyan-900/30 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-bold text-cyan-300">{content.title}</CardTitle>
                {content.description && (
                  <CardDescription className="text-gray-400 mt-1">{content.description}</CardDescription>
                )}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleRefresh(content.id)} className="h-6 w-6 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleExpand(content)} className="h-6 w-6 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleRemove(content.id)} className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-950/30">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <div className="p-4">
              {renderContent(content)}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Expanded content dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {expandedContent && (
          <DialogContent className="max-w-3xl bg-gray-950 border-cyan-900/50 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <DialogHeader>
              <DialogTitle className="text-xl text-cyan-300">{expandedContent.title}</DialogTitle>
              {expandedContent.description && (
                <p className="text-gray-400 mt-1">{expandedContent.description}</p>
              )}
            </DialogHeader>
            
            <div className="min-h-[400px] py-4">
              {renderContent(expandedContent)}
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-cyan-900/30">
                Close
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
