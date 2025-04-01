
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
  Calendar, 
  Building, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  PanelRight,
  PanelLeft,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  ListChecks,
  Wallet,
  Phone,
  Mail,
  Video,
  Share2,
  MessageSquare,
  ShieldCheck
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
        "h-screen sticky top-0 border-r border-cyan-900/30 bg-background/80 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
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
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/30"
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
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
            variant={isActive("/action-items") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/action-items">
              <ListChecks className="h-4 w-4" />
              {!collapsed && <span>Action Items</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/projects") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
            variant={isActive("/analytics") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/analytics">
              <BarChart className="h-4 w-4" />
              {!collapsed && <span>Analytics</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/budget-financials") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/budget-financials">
              <Wallet className="h-4 w-4" />
              {!collapsed && <span>Budget & Financials</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/investment-impact") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
            variant={isActive("/timeline") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
            variant={isActive("/safety-sustainability") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/safety-sustainability">
              <ShieldCheck className="h-4 w-4" />
              {!collapsed && <span>Safety & Sustainability</span>}
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/documents") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
            variant={isActive("/communications") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
              collapsed && "w-10 justify-center pl-0"
            )}
            asChild
          >
            <Link to="/communications">
              <MessageSquare className="h-4 w-4" />
              {!collapsed && <span>Communications</span>}
            </Link>
          </Button>
          
          {!collapsed && <Separator className="my-2 bg-cyan-900/30" />}
          {collapsed && <div className="h-4"></div>}
          
          <Button 
            variant={isActive("/integrations") ? "secondary" : "ghost"} 
            className={cn(
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
              "justify-start gap-3 h-10 text-blue-200 hover:text-blue-100 hover:bg-blue-950/30",
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
