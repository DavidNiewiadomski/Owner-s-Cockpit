
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function SidebarNavItem({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  collapsed,
  onClick
}: SidebarNavItemProps) {
  const content = (
    <div className={cn(
      "flex items-center w-full h-10",
      collapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
    )}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );

  const buttonClasses = cn(
    "w-full justify-start text-gray-200 hover:text-white hover:bg-gray-800/50 transition-colors",
    isActive && "bg-gray-800/60 text-white",
    collapsed ? "justify-center px-0" : "px-0"
  );

  return (
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className={buttonClasses}
      onClick={onClick}
      asChild={!onClick}
    >
      {onClick ? (
        <div className="cursor-pointer">
          {content}
        </div>
      ) : (
        <Link to={to}>
          {content}
        </Link>
      )}
    </Button>
  );
}
