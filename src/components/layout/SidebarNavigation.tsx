
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavItems } from './SidebarNavItems';
import { navigationItems, utilityItems } from './sidebarConfig';

interface SidebarNavigationProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
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
        "h-screen sticky top-0 border-r border-cyan-900/30 bg-background/80 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={toggleCollapse} 
      />
      
      <ScrollArea className="h-[calc(100vh-4rem)] px-3">
        <div className={cn("flex flex-col gap-1 py-2", collapsed && "items-center")}>
          <SidebarNavItems 
            navItems={navigationItems}
            utilityItems={utilityItems}
            isActive={isActive}
            collapsed={collapsed}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
