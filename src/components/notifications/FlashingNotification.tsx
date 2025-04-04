
import React, { useState, useEffect } from 'react';
import { Calendar, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FlashingNotificationProps {
  message: string;
  date: string;
  link: string;
  icon?: React.ReactNode;
  autoHideAfter?: number; // Time in milliseconds before auto-hiding
}

export function FlashingNotification({ 
  message, 
  date, 
  link, 
  icon = <Calendar className="h-4 w-4" />,
  autoHideAfter = 8000 // Default to 8 seconds
}: FlashingNotificationProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Create flashing effect
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 800);

    return () => clearInterval(flashInterval);
  }, []);

  // Auto-hide notification after specified time
  useEffect(() => {
    if (autoHideAfter > 0) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, autoHideAfter);

      return () => clearTimeout(hideTimeout);
    }
  }, [autoHideAfter]);

  const handleClick = () => {
    navigate(link);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "fixed bottom-20 right-6 z-40 bg-blue-600 text-white rounded-md px-4 py-2 shadow-lg cursor-pointer transition-all duration-300 flex items-center gap-2 max-w-xs",
        isFlashing ? "bg-blue-700" : "bg-blue-600",
        "hover:bg-blue-500 transform hover:scale-105"
      )}
    >
      <div className="bg-blue-700 rounded-full p-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{message}</p>
        <p className="text-xs text-blue-200">{date}</p>
      </div>
      <button 
        onClick={handleDismiss}
        className="p-1 rounded-full hover:bg-blue-800 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
