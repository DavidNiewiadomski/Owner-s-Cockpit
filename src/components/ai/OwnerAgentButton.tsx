
import React, { useState, useEffect } from 'react';
import { Brain, X, Headphones, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OwnerAgent } from '@/components/ai/OwnerAgent';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function OwnerAgentButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const navigate = useNavigate();

  // Simulate agent activity with random notifications
  useEffect(() => {
    const notifications = [
      "I've analyzed the latest reports",
      "3 action items require attention",
      "New budget forecast ready",
      "Meeting scheduled for tomorrow"
    ];
    
    // Randomly show notifications
    const notificationInterval = setInterval(() => {
      if (!isOpen && Math.random() > 0.6) {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setNotificationText(randomNotification);
        setHasNotification(true);
        setIsPulsing(true);
        
        // Hide notification after a while
        setTimeout(() => {
          setHasNotification(false);
        }, 5000);
      }
    }, 12000);
    
    // Pulse animation
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000);
    
    return () => {
      clearInterval(notificationInterval);
      clearInterval(pulseInterval);
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
            isPulsing 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-blue-700 hover:bg-blue-800"
          )}
          size="icon"
          aria-label="Open Owner Agent"
        >
          <Brain className={cn(
            "h-6 w-6 transition-all",
            isPulsing && "animate-pulse"
          )} />
          
          {hasNotification && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          )}
        </Button>
        
        {hasNotification && (
          <Badge 
            variant="outline" 
            className="bg-gray-900 text-white text-sm border-blue-600/30 px-3 py-1.5 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
            <span className="font-medium">{notificationText}</span>
          </Badge>
        )}
      </div>

      <OwnerAgent isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
