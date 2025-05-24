
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, PanelRight, PanelLeft } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center px-4 border-b border-gray-800">
      <Link to="/" className="flex items-center gap-2">
        {!collapsed && (
          <div className="font-semibold text-xl leading-none text-white">
            Owner's Cockpit
          </div>
        )}
        {collapsed && (
          <Building className="h-6 w-6 text-white" />
        )}
      </Link>
      <div className="ml-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800/30"
        >
          {collapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
