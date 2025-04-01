
import React, { useState } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Brain, Sparkles, LightbulbIcon, Search, CalendarCheck, ClipboardList, BarChart3, Clock, AlertTriangle } from 'lucide-react';

interface CommandAction {
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  keywords: string[];
}

export function AICommandBar() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // List of AI-powered commands
  const commands: CommandAction[] = [
    {
      title: "Generate Project Report",
      description: "AI will compile a summary report of all project statuses",
      icon: BarChart3,
      action: () => {
        toast({
          title: "AI is generating your report",
          description: "Your comprehensive project report will be ready in a moment."
        });
        setOpen(false);
      },
      keywords: ["report", "summary", "status", "generate"]
    },
    {
      title: "Analyze Schedule Risks",
      description: "AI will identify potential schedule risks across projects",
      icon: AlertTriangle,
      action: () => {
        toast({
          title: "AI Risk Analysis Started",
          description: "Analyzing schedule risks across all active projects"
        });
        setOpen(false);
      },
      keywords: ["risk", "schedule", "delay", "analyze"]
    },
    {
      title: "Optimize Resource Allocation",
      description: "AI will suggest optimal resource distribution",
      icon: ClipboardList,
      action: () => {
        toast({
          title: "AI Optimization Started",
          description: "Calculating optimal resource distribution across projects"
        });
        setOpen(false);
      },
      keywords: ["optimize", "resource", "allocation", "distribution"]
    },
    {
      title: "Schedule AI Planning Session",
      description: "Set up a planning session with AI recommendations",
      icon: CalendarCheck,
      action: () => {
        toast({
          title: "AI Planning Session",
          description: "Your AI planning session has been scheduled"
        });
        setOpen(false);
      },
      keywords: ["schedule", "plan", "meeting", "session"]
    },
    {
      title: "Forecast Project Completion",
      description: "AI will predict completion dates based on current progress",
      icon: Clock,
      action: () => {
        toast({
          title: "AI Forecast Running",
          description: "Predicting completion dates based on current data"
        });
        setOpen(false);
      },
      keywords: ["forecast", "completion", "predict", "timeline"]
    }
  ];

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 h-9 rounded-lg border border-gray-800 bg-gray-950/50 px-3 text-xs text-gray-400 hover:bg-gray-900/50 hover:text-gray-300 cursor-pointer transition-colors backdrop-blur-sm"
      >
        <Search className="h-3.5 w-3.5 mr-1" />
        <span>Ask AI...</span>
        <div className="flex items-center gap-1 ml-2 border-l border-gray-800 pl-2">
          <Badge 
            variant="outline" 
            className="h-5 bg-construction-900/30 border-construction-700/30 px-1 text-[10px] text-construction-400 font-mono"
          >
            <Brain className="h-2.5 w-2.5 mr-0.5" />
            AI
          </Badge>
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-gray-800 bg-gray-900/30 px-1.5 font-mono text-[10px] text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="border border-gray-800 bg-gray-950/90 backdrop-blur-md rounded-lg shadow-xl">
          <div className="flex items-center border-b border-gray-800 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
            <CommandInput 
              placeholder="Ask AI to help with your projects..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Sparkles className="h-4 w-4 text-construction-400 opacity-70" />
          </div>
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center py-6">
                <LightbulbIcon className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">No AI commands found. Try a different search.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="AI-Powered Actions">
              {commands.map((command) => (
                <CommandItem
                  key={command.title}
                  onSelect={() => command.action()}
                  className="flex items-start py-2 px-2"
                >
                  <div className="mr-2 mt-0.5">
                    <command.icon className="h-4 w-4 text-construction-400" />
                  </div>
                  <div className="flex flex-col">
                    <span>{command.title}</span>
                    <span className="text-xs text-gray-500">{command.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
