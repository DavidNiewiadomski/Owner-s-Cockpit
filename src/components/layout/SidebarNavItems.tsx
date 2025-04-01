
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
  isActive: (path: string) => boolean;
  collapsed: boolean;
}

export function SidebarNavItems({ navItems, utilityItems, isActive, collapsed }: SidebarNavItemsProps) {
  return (
    <div className={collapsed ? "items-center" : ""}>
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
      
      {!collapsed && <Separator className="my-2 bg-cyan-900/30" />}
      {collapsed && <div className="h-4"></div>}
      
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
    </div>
  );
}
