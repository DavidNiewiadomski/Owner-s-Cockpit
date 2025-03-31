
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  BarChart3, 
  Layers, 
  Settings, 
  Plug, 
  MessageSquare, 
  Menu,
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/', active: true },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Layers, label: 'Projects', href: '/projects' },
  { icon: Calendar, label: 'Timeline', href: '/timeline' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Plug, label: 'Integrations', href: '/integrations' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function SidebarNavigation() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50 bg-white shadow-md dark:bg-gray-800"
          onClick={toggleSidebar}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-60",
          isMobile ? "fixed z-40" : "relative",
          isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && (
            <h1 className="text-xl font-bold text-construction-600 dark:text-construction-400">
              OwnerAgent
            </h1>
          )}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Menu size={20} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.active 
                      ? "bg-construction-100 text-construction-700 dark:bg-construction-900/20 dark:text-construction-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <item.icon size={20} className={collapsed ? "mx-auto" : "mr-3"} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-construction-600 flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User Name</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Project Manager</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-construction-600 flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
