
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

interface AITabContentProps {
  aiPrompt: string;
  setAiPrompt: (value: string) => void;
  isGenerating: boolean;
  onAddAIContent: () => void;
}

export function AITabContent({ 
  aiPrompt, 
  setAiPrompt, 
  isGenerating, 
  onAddAIContent 
}: AITabContentProps) {
  return (
    <div className="space-y-4 mt-4">
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
        onClick={onAddAIContent}
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
    </div>
  );
}
