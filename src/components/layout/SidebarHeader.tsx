
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
    <div className="flex h-48 items-center px-4 border-b border-gray-800">
      <Link to="/" className="flex items-center gap-2 flex-1">
        {!collapsed && (
          <img 
            src="/lovable-uploads/168756a8-6a5d-4df1-b8ae-a4a12398be23.png" 
            alt="Logo" 
            className="h-40 w-auto max-w-full object-contain"
          />
        )}
        {collapsed && (
          <img 
            src="/lovable-uploads/168756a8-6a5d-4df1-b8ae-a4a12398be23.png" 
            alt="Logo" 
            className="h-32 w-auto max-w-full object-contain"
          />
        )}
      </Link>
      <div className="ml-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          {collapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
