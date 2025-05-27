
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
          <img 
            src="/lovable-uploads/249d967c-7ff4-46d6-952b-92274a485085.png" 
            alt="Company Logo" 
            className="h-8 w-auto object-contain max-w-[120px]"
          />
        )}
        {collapsed && (
          <Building className="h-6 w-6 text-orange-500" />
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
