
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  FileText, 
  BarChart, 
  Settings, 
  MessageSquare, 
  Calendar, 
  Building, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  PanelRight,
  PanelLeft,
  LayoutDashboard,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface SidebarNavigationProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div 
      className={cn(
        "h-screen sticky top-0 border-r bg-background/80 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center px-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          {!collapsed && (
            <div className="font-semibold text-xl leading-none">
              <span className="text-construction-600">Build</span>
              <span>Master</span>
            </div>
          )}
          {collapsed && (
            <Building className="h-6 w-6 text-construction-600" />
          )}
        </Link>
        <div className="ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-4rem)] px-3">
        <div className={cn("flex flex-col gap-1 py-2", collapsed && "items-center")}>
          <Button 
            variant={isActive("/") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/">
              <LayoutDashboard className="h-4 w-4" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/projects") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/projects">
              <Building className="h-4 w-4" />
              {!collapsed && <span>Projects</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/timeline") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/timeline">
              <Calendar className="h-4 w-4" />
              {!collapsed && <span>Timeline</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/investment-impact") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/investment-impact">
              <DollarSign className="h-4 w-4" />
              {!collapsed && <span>Investment Impact</span>}
            </Link>
          </Button>

          <Button 
            variant={isActive("/documents") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/documents">
              <FileText className="h-4 w-4" />
              {!collapsed && <span>Documents</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/messages") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/messages">
              <MessageSquare className="h-4 w-4" />
              {!collapsed && <span>Messages</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/analytics") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/analytics">
              <BarChart className="h-4 w-4" />
              {!collapsed && <span>Analytics</span>}
            </Link>
          </Button>
          
          {!collapsed && <Separator className="my-2" />}
          {collapsed && <div className="h-4"></div>}
          
          <Button 
            variant={isActive("/integrations") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/integrations">
              <Layers className="h-4 w-4" />
              {!collapsed && <span>Integrations</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/settings") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/settings">
              <Settings className="h-4 w-4" />
              {!collapsed && <span>Settings</span>}
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
