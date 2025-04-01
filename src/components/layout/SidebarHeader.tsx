
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
    <div className="flex h-16 items-center px-4 border-b border-cyan-900/30">
      <Link to="/" className="flex items-center gap-2">
        {!collapsed && (
          <div className="font-semibold text-xl leading-none">
            <span className="text-cyan-400">Owners</span>
            <span className="text-blue-300">Realm</span>
          </div>
        )}
        {collapsed && (
          <Building className="h-6 w-6 text-cyan-400" />
        )}
      </Link>
      <div className="ml-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="h-8 w-8 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/30"
        >
          {collapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
