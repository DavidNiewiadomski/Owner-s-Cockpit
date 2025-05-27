
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavItems } from './SidebarNavItems';
import { navigationItems, utilityItems } from './sidebarConfig';

interface SidebarNavigationProps {
  className?: string;
  onCustomizeClick?: () => void;
  onAssistantClick?: () => void;
}

export function SidebarNavigation({ 
  className,
  onCustomizeClick,
  onAssistantClick
}: SidebarNavigationProps) {
  
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div 
      className={cn(
        "h-screen flex-shrink-0 border-r border-gray-800 bg-black transition-all duration-300 ease-in-out flex flex-col z-10",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={toggleCollapse} 
      />
      
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <SidebarNavItems 
            navItems={navigationItems}
            utilityItems={utilityItems}
            isActive={isActive}
            collapsed={collapsed}
            onCustomizeClick={onCustomizeClick}
            onAssistantClick={onAssistantClick}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
