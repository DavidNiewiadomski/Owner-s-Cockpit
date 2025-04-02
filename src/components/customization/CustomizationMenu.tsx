import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  ListChecks, 
  Table, 
  FileText, 
  Sparkles,
  Loader2
} from 'lucide-react';

interface CustomizationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContent?: (content: any) => void;
  pageId?: string;
}

export function CustomizationMenu({ isOpen, onClose, onAddContent, pageId = 'dashboard' }: CustomizationMenuProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chart');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddChart = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your chart",
        variant: "destructive",
      });
      return;
    }

    if (onAddContent) {
      onAddContent({
        type: 'chart',
        title,
        description,
        chartType,
        pageId,
        // Sample data for chart visualization
        data: [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 }
        ]
      });
    }

    resetForm();
  };

  const handleAddTable = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your table",
        variant: "destructive",
      });
      return;
    }

    if (onAddContent) {
      onAddContent({
        type: 'table',
        title,
        description,
        pageId,
        columns: ['Name', 'Status', 'Progress', 'Due Date'],
        // Sample data for table visualization
        rows: [
          ['Project Alpha', 'Active', '75%', '2023-10-15'],
          ['Project Beta', 'Pending', '30%', '2023-11-20'],
          ['Project Gamma', 'Completed', '100%', '2023-09-05']
        ]
      });
    }

    resetForm();
  };

  const handleAddReport = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your report",
        variant: "destructive",
      });
      return;
    }

    if (onAddContent) {
      onAddContent({
        type: 'report',
        title,
        description,
        pageId,
        content: 'This is a sample report content. In a real implementation, this would be actual report data.'
      });
    }

    resetForm();
  };

  const handleAddAIContent = async () => {
    if (!aiPrompt) {
      toast({
        title: "Prompt required",
        description: "Please provide a prompt for the AI",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI content generation - in a real implementation, this would call an AI service
    setTimeout(() => {
      setIsGenerating(false);
      
      if (onAddContent) {
        onAddContent({
          type: 'ai',
          title: title || 'AI Generated Content',
          description: description || 'Content generated based on your prompt',
          prompt: aiPrompt,
          pageId,
          content: `This is a sample AI-generated content based on: "${aiPrompt}". In a real implementation, this would come from an AI service.`
        });
      }

      toast({
        title: "Content generated",
        description: "AI has created content based on your prompt",
      });

      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setChartType('bar');
    setAiPrompt('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:max-w-[540px] bg-gray-950 border-cyan-900/50 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
        <SheetHeader className="pb-4 border-b border-cyan-900/30">
          <SheetTitle className="text-xl text-cyan-300">Add Custom Content</SheetTitle>
          <SheetDescription className="text-gray-300">
            Create and add custom content to your dashboard
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Tabs defaultValue="chart" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 mb-6 bg-gray-900 border border-cyan-900/30">
              <TabsTrigger value="chart" className="data-[state=active]:bg-cyan-950 data-[state=active]:text-cyan-300">
                <BarChart3 className="h-4 w-4 mr-2" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="table" className="data-[state=active]:bg-cyan-950 data-[state=active]:text-cyan-300">
                <Table className="h-4 w-4 mr-2" />
                Table
              </TabsTrigger>
              <TabsTrigger value="report" className="data-[state=active]:bg-cyan-950 data-[state=active]:text-cyan-300">
                <FileText className="h-4 w-4 mr-2" />
                Report
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-cyan-950 data-[state=active]:text-cyan-300">
                <Sparkles className="h-4 w-4 mr-2" />
                AI
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a title" 
                  className="bg-gray-900 border-cyan-900/30"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description (optional)</Label>
                <Input 
                  id="description" 
                  placeholder="Enter a description" 
                  className="bg-gray-900 border-cyan-900/30"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <TabsContent value="chart" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="chart-type" className="text-gray-300">Chart Type</Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger id="chart-type" className="bg-gray-900 border-cyan-900/30">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-cyan-900/30">
                      <SelectItem value="bar">
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2 text-cyan-400" />
                          Bar Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="line">
                        <div className="flex items-center">
                          <LineChart className="h-4 w-4 mr-2 text-green-400" />
                          Line Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="pie">
                        <div className="flex items-center">
                          <PieChart className="h-4 w-4 mr-2 text-purple-400" />
                          Pie Chart
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  onClick={handleAddChart}
                >
                  Add Chart
                </Button>
              </TabsContent>
              
              <TabsContent value="table" className="space-y-4 mt-4">
                <div className="p-4 border border-cyan-900/30 rounded-md bg-gray-900/50">
                  <p className="text-sm text-gray-400">
                    Create a custom table with sample data. In a full implementation, 
                    you would define columns and connect to data sources.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  onClick={handleAddTable}
                >
                  <Table className="h-4 w-4 mr-2" />
                  Add Table
                </Button>
              </TabsContent>
              
              <TabsContent value="report" className="space-y-4 mt-4">
                <div className="p-4 border border-cyan-900/30 rounded-md bg-gray-900/50">
                  <p className="text-sm text-gray-400">
                    Create a custom report with formatted text and data. In a full implementation,
                    you would be able to format text and add data visualizations.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  onClick={handleAddReport}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add Report
                </Button>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt" className="text-gray-300">
                    What would you like to see?
                  </Label>
                  <Textarea 
                    id="ai-prompt" 
                    placeholder="E.g., Show me a chart of construction costs over time, Create a summary of pending tasks, Generate a risk assessment report..."
                    className="min-h-[120px] bg-gray-900 border-cyan-900/30"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  onClick={handleAddAIContent}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={onClose} className="border-cyan-900/30">
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
