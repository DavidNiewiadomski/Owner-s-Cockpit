
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { Button } from '@/components/ui/button';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-construction-600 hover:bg-construction-700 text-white shadow-lg z-50 flex items-center justify-center"
        size="icon"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="right" 
          className="w-[350px] md:w-[400px] max-w-[80vw] p-0 overflow-hidden border-none"
        >
          <div className="backdrop-blur-lg rounded-l-xl overflow-hidden shadow-2xl border-l border-white/5 h-full">
            <SheetHeader className="p-3 bg-gradient-to-r from-gray-900/80 to-black/80 border-b border-white/10">
              <div className="flex justify-between items-center">
                <SheetTitle className="text-white flex items-center gap-2 text-sm">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-construction-600/20">
                    <MessageSquare className="h-3 w-3 text-construction-400" />
                  </div>
                  AI Assistant
                </SheetTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 rounded-full hover:bg-gray-800/50"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </SheetHeader>
            <div className="h-[calc(100vh-3.5rem)] bg-black/50 backdrop-blur-md">
              <AIAssistant />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
