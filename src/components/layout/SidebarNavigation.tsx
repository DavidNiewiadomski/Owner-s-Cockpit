
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
        "h-screen sticky top-0 border-r border-gray-800 bg-black z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={toggleCollapse} 
      />
      
      <ScrollArea className="h-[calc(100vh-4rem)]">
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
