
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarNavItemsProps {
  navItems: NavItem[];
  utilityItems: NavItem[];
  customizationItems: NavItem[];
  isActive: (path: string) => boolean;
  collapsed: boolean;
  onCustomizeClick?: () => void;
  onAssistantClick?: () => void;
}

export function SidebarNavItems({ 
  navItems, 
  utilityItems,
  customizationItems,
  isActive, 
  collapsed,
  onCustomizeClick,
  onAssistantClick
}: SidebarNavItemsProps) {
  const handleSpecialItemClick = (path: string, e: React.MouseEvent) => {
    if (path === '/customize' && onCustomizeClick) {
      e.preventDefault();
      onCustomizeClick();
      return;
    }
    
    if (path === '/assistant' && onAssistantClick) {
      e.preventDefault();
      onAssistantClick();
      return;
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.path)}
          collapsed={collapsed}
        />
      ))}
      
      <Separator className="my-2 bg-gray-800" />
      
      {utilityItems.map((item) => (
        <SidebarNavItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.path)}
          collapsed={collapsed}
        />
      ))}

      <Separator className="my-2 bg-gray-800" />
      
      <div className="mt-2">
        {customizationItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.path)}
            collapsed={collapsed}
            onClick={(e) => handleSpecialItemClick(item.path, e)}
          />
        ))}
      </div>
    </div>
  );
}
