
import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIActivityIndicator() {
  const [isActive, setIsActive] = useState(false);
  const [statusText, setStatusText] = useState('AI monitoring projects');
  
  // Simulate AI activity
  useEffect(() => {
    const activities = [
      'Analyzing project data',
      'Monitoring schedule risks',
      'Checking resource allocations',
      'Evaluating budget variances',
      'Detecting potential issues',
      'Processing site updates',
      'AI monitoring projects'
    ];
    
    const interval = setInterval(() => {
      const shouldActivate = Math.random() > 0.5;
      setIsActive(shouldActivate);
      
      if (shouldActivate) {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        setStatusText(randomActivity);
        
        // Deactivate after a random time
        setTimeout(() => {
          setIsActive(false);
          setStatusText('AI monitoring projects');
        }, Math.random() * 3000 + 1000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isActive) return null;
  
  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="flex items-center gap-2 bg-gray-900/80 border border-construction-600/20 rounded-full px-3 py-1 text-xs backdrop-blur-sm shadow-lg">
        <div className={cn(
          "flex items-center justify-center h-5 w-5 rounded-full",
          isActive ? "bg-construction-600/20" : "bg-gray-800"
        )}>
          <Brain className={cn(
            "h-3 w-3",
            isActive ? "text-construction-400 animate-pulse" : "text-gray-400"
          )} />
        </div>
        <span className="text-gray-300">{statusText}</span>
        <span className="flex space-x-1">
          <span className="h-1.5 w-1.5 rounded-full bg-construction-500 animate-[pulse_1s_ease-in-out_infinite]"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-construction-500 animate-[pulse_1s_ease-in-out_0.2s_infinite]"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-construction-500 animate-[pulse_1s_ease-in-out_0.4s_infinite]"></span>
        </span>
      </div>
    </div>
  );
}
