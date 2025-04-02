
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
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Table, 
  FileText, 
  Sparkles
} from 'lucide-react';

// Import the refactored components
import { MenuFormFields } from './menu/MenuFormFields';
import { ChartTabContent } from './menu/ChartTabContent';
import { TableTabContent } from './menu/TableTabContent';
import { ReportTabContent } from './menu/ReportTabContent';
import { AITabContent } from './menu/AITabContent';

export interface CustomizationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContent?: (content: any) => void;
  pageId?: string;
}

export function CustomizationMenu({ 
  isOpen, 
  onClose, 
  onAddContent, 
  pageId = 'dashboard' 
}: CustomizationMenuProps) {
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
            
            <MenuFormFields 
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            
            <TabsContent value="chart" className="mt-0">
              <ChartTabContent 
                chartType={chartType}
                setChartType={setChartType}
                onAddChart={handleAddChart}
              />
            </TabsContent>
            
            <TabsContent value="table" className="mt-0">
              <TableTabContent onAddTable={handleAddTable} />
            </TabsContent>
            
            <TabsContent value="report" className="mt-0">
              <ReportTabContent onAddReport={handleAddReport} />
            </TabsContent>
            
            <TabsContent value="ai" className="mt-0">
              <AITabContent 
                aiPrompt={aiPrompt}
                setAiPrompt={setAiPrompt}
                isGenerating={isGenerating}
                onAddAIContent={handleAddAIContent}
              />
            </TabsContent>
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
