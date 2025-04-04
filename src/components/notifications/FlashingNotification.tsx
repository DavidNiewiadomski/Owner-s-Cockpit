
import React, { useState, useEffect } from 'react';
import { Calendar, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FlashingNotificationProps {
  message: string;
  date: string;
  link: string;
  icon?: React.ReactNode;
}

export function FlashingNotification({ 
  message, 
  date, 
  link, 
  icon = <Calendar className="h-4 w-4" /> 
}: FlashingNotificationProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const navigate = useNavigate();

  // Create flashing effect
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 800);

    return () => clearInterval(flashInterval);
  }, []);

  const handleClick = () => {
    navigate(link);
  };

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
    </div>
  );
}
