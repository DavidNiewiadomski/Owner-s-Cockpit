
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { LightbulbIcon } from 'lucide-react';

interface AIAssistantSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIAssistantSheet({ isOpen, onOpenChange }: AIAssistantSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[350px] md:w-[400px] max-w-[80vw] p-0 overflow-hidden border-none"
      >
        <div className="backdrop-blur-lg rounded-l-xl overflow-hidden shadow-2xl border-l border-white/5">
          <SheetHeader className="p-3 bg-gradient-to-r from-gray-900/80 to-black/80 border-b border-white/10">
            <SheetTitle className="text-white flex items-center gap-2 text-sm">
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-construction-600/20">
                <LightbulbIcon className="h-3 w-3 text-construction-400" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-construction-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-construction-500"></span>
                </span>
              </div>
              AI Investment Assistant
            </SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-3.5rem)] bg-black/50 backdrop-blur-md">
            <AIAssistant />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
