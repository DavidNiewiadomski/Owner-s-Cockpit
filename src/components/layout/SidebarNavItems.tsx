
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

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
  const { toast } = useToast();
  const location = useLocation();

  const handleSpecialItemClick = (path: string, e: React.MouseEvent) => {
    if (path === '/customize' && onCustomizeClick) {
      e.preventDefault();
      onCustomizeClick();
    }
    
    if (path === '/export') {
      e.preventDefault();
      
      // Get current route
      const currentRoute = location.pathname;
      let exportMessage = "Exporting data";
      
      // Customize export message based on current page
      if (currentRoute === '/') {
        exportMessage = "Exporting dashboard overview report";
      } else if (currentRoute === '/analytics') {
        exportMessage = "Exporting analytics report";
      } else if (currentRoute === '/budget-financials') {
        exportMessage = "Exporting financial report";
      } else if (currentRoute === '/investment-impact') {
        exportMessage = "Exporting investment impact report";
      } else if (currentRoute === '/timeline') {
        exportMessage = "Exporting timeline report";
      } else if (currentRoute === '/safety-sustainability') {
        exportMessage = "Exporting safety & sustainability report";
      } else if (currentRoute === '/documents') {
        exportMessage = "Exporting documents list";
      } else if (currentRoute === '/communications') {
        exportMessage = "Exporting communications report";
      } else if (currentRoute === '/action-items') {
        exportMessage = "Exporting action items report";
      }
      
      // Show toast notification
      toast({
        title: exportMessage,
        description: "Your report will be ready in a few moments",
      });
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
          onClick={(e) => handleSpecialItemClick(item.path, e)}
        />
      ))}
    </div>
  );
}
