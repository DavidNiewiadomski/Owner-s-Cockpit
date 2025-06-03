
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { Separator } from '@/components/ui/separator';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExportMenu } from './ExportMenu';
import { usePermissions } from '@/contexts/PermissionsContext';
import { navigationItems, utilityItems } from './sidebarConfig';

interface SidebarNavItemsProps {
  isActive: (path: string) => boolean;
  collapsed: boolean;
  onCustomizeClick?: () => void;
  onAssistantClick?: () => void;
}

export function SidebarNavItems({ 
  isActive, 
  collapsed,
  onCustomizeClick,
  onAssistantClick
}: SidebarNavItemsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  // Filter navigation items based on permissions
  const visibleNavItems = navigationItems.filter(item => hasPermission(item.permission));
  const visibleUtilityItems = utilityItems.filter(item => hasPermission(item.permission));

  const handleSpecialItemClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Handle special cases
    if (path === '/customize' && onCustomizeClick) {
      onCustomizeClick();
      return;
    }
    
    if (path === '/ai-assistant' && onAssistantClick) {
      onAssistantClick();
      return;
    }
    
    // For regular navigation paths, use navigate
    navigate(path);
  };

  return (
    <div className="flex flex-col w-full gap-1">
      {visibleNavItems.map((item) => (
        <SidebarNavItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.path)}
          collapsed={collapsed}
        />
      ))}
      
      {visibleUtilityItems.length > 0 && <Separator className="my-2 bg-gray-800" />}
      
      {visibleUtilityItems.map((item) => {
        // Special case for Export button
        if (item.path === '/export') {
          return (
            <ExportMenu key={item.path}>
              <div className="w-full">
                <SidebarNavItem
                  to="#"
                  icon={item.icon}
                  label={item.label}
                  isActive={false}
                  collapsed={collapsed}
                />
              </div>
            </ExportMenu>
          );
        }
        
        // For special utility items (customize, ai-assistant)
        if ((item.path === '/customize' && onCustomizeClick) || 
            (item.path === '/ai-assistant' && onAssistantClick)) {
          return (
            <SidebarNavItem
              key={item.path}
              to="#"
              icon={item.icon}
              label={item.label}
              isActive={false}
              collapsed={collapsed}
              onClick={(e) => handleSpecialItemClick(item.path, e)}
            />
          );
        }
        
        // For other utility items
        return (
          <SidebarNavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.path)}
            collapsed={collapsed}
          />
        );
      })}
    </div>
  );
}
