
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { Separator } from '@/components/ui/separator';
import { useLocation } from 'react-router-dom';
import { ExportMenu } from './ExportMenu';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarNavItemsProps {
  navItems: NavItem[];
  utilityItems: NavItem[];
  isActive: (path: string) => boolean;
  collapsed: boolean;
  onCustomizeClick?: () => void;
  onAssistantClick?: () => void;
}

export function SidebarNavItems({ 
  navItems, 
  utilityItems,
  isActive, 
  collapsed,
  onCustomizeClick,
  onAssistantClick
}: SidebarNavItemsProps) {
  const location = useLocation();

  const handleSpecialItemClick = (path: string, e: React.MouseEvent) => {
    if (path === '/customize' && onCustomizeClick) {
      e.preventDefault();
      onCustomizeClick();
    }
    
    if (path === '/ai-assistant' && onAssistantClick) {
      e.preventDefault();
      onAssistantClick();
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
      
      {utilityItems.map((item) => {
        // Special case for Export button
        if (item.path === '/export') {
          return (
            <ExportMenu key={item.path}>
              <SidebarNavItem
                to="#"
                icon={item.icon}
                label={item.label}
                isActive={false}
                collapsed={collapsed}
              />
            </ExportMenu>
          );
        }
        
        return (
          <SidebarNavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.path)}
            collapsed={collapsed}
            onClick={(e) => handleSpecialItemClick(item.path, e)}
          />
        );
      })}
    </div>
  );
}
