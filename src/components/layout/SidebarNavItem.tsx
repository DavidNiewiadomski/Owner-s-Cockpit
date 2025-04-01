
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
}

export function SidebarNavItem({ to, icon: Icon, label, isActive, collapsed }: SidebarNavItemProps) {
  return (
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className={cn(
        "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
        collapsed && "w-10 justify-center pl-0"
      )}
      asChild
    >
      <Link to={to}>
        <Icon className="h-4 w-4" />
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  );
}
