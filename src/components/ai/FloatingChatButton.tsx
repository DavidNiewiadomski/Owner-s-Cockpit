
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Sparkles, Brain } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  // Simulate AI thinking periodically to show it's active
  useEffect(() => {
    const interval = setInterval(() => {
      setIsThinking(true);
      
      setTimeout(() => {
        setIsThinking(false);
      }, 2000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200",
            isThinking 
              ? "bg-construction-500 hover:bg-construction-600" 
              : "bg-construction-600 hover:bg-construction-700"
          )}
          size="icon"
          aria-label="Open AI Assistant"
        >
          {isThinking ? (
            <Brain className="h-5 w-5 animate-pulse" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
          
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-construction-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-construction-500"></span>
          </span>
        </Button>
        
        <Badge 
          variant="outline" 
          className={cn(
            "bg-black/80 text-xs border-construction-600/30 px-2 py-1 transition-all duration-300 backdrop-blur-sm",
            isOpen ? "opacity-0 translate-x-12" : "opacity-100"
          )}
        >
          <Sparkles className="h-3 w-3 mr-1 text-construction-400" />
          <span>AI Ready</span>
        </Badge>
      </div>

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
                    <Sparkles className="h-3 w-3 text-construction-400" />
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
