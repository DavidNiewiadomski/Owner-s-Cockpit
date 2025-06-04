
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
            src="/lovable-uploads/513e2afe-e072-4286-b450-ecc506716d3c.png" 
            alt="Company Logo" 
            className="h-8 w-auto"
          />
        )}
        {collapsed && (
          <img 
            src="/lovable-uploads/513e2afe-e072-4286-b450-ecc506716d3c.png" 
            alt="Company Logo" 
            className="h-6 w-auto"
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
