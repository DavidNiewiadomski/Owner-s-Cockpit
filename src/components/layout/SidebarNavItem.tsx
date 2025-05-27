
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
    <>
      <Icon className="h-4 w-4 flex-shrink-0" />
      {!collapsed && <span className="ml-2">{label}</span>}
    </>
  );

  return (
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className={cn(
        "w-full justify-start gap-3 h-10 text-gray-200 hover:text-white hover:bg-gray-800/50",
        isActive && "bg-gray-800/60 text-white",
        collapsed ? "justify-center px-0" : "px-3"
      )}
      onClick={onClick}
      asChild={!onClick}
    >
      {onClick ? (
        <div className="flex items-center cursor-pointer">
          {content}
        </div>
      ) : (
        <Link to={to} className="flex items-center">
          {content}
        </Link>
      )}
    </Button>
  );
}
