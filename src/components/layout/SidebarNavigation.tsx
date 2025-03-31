
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
  DollarSign,
  ListChecks
} from 'lucide-react';

interface SidebarNavigationProps {
  className?: string;
}

interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  group?: string;
}

// Define menu items grouped by main items and system items
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    path: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'projects',
    path: '/projects',
    label: 'Projects',
    icon: <Building className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'timeline',
    path: '/timeline',
    label: 'Timeline',
    icon: <Calendar className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'action-items',
    path: '/action-items',
    label: 'Action Items',
    icon: <ListChecks className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'investment-impact',
    path: '/investment-impact',
    label: 'Investment Impact',
    icon: <DollarSign className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'documents',
    path: '/documents',
    label: 'Documents',
    icon: <FileText className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'messages',
    path: '/messages',
    label: 'Messages',
    icon: <MessageSquare className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    icon: <BarChart className="h-4 w-4" />,
    group: 'main'
  },
  {
    id: 'integrations',
    path: '/integrations',
    label: 'Integrations',
    icon: <Layers className="h-4 w-4" />,
    group: 'system'
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    group: 'system'
  }
];

const STORAGE_KEY = 'ownerrealm-menu-order';

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  
  // Load saved menu order from localStorage on component mount
  useEffect(() => {
    const savedOrder = localStorage.getItem(STORAGE_KEY);
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setMenuItems(parsedOrder);
      } catch (e) {
        console.error('Failed to parse saved menu order:', e);
        // Fallback to default order if parsing fails
        setMenuItems(DEFAULT_MENU_ITEMS);
      }
    }
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle the end of a drag operation
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // Return if dropped outside the list or at the same position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Get the dragged item
    const sourceGroup = source.droppableId;
    const destGroup = destination.droppableId;
    
    // Only allow reordering within the same group
    if (sourceGroup !== destGroup) {
      return;
    }
    
    // Create a copy of the current items
    const newItems = [...menuItems];
    
    // Filter items by group
    const groupItems = newItems.filter(item => item.group === sourceGroup);
    
    // Remove the dragged item from its original position
    const [movedItem] = groupItems.splice(source.index, 1);
    
    // Insert the dragged item at the new position
    groupItems.splice(destination.index, 0, movedItem);
    
    // Create a new array with the updated group items
    const updatedItems = newItems.map(item => {
      if (item.group !== sourceGroup) {
        return item;
      }
      // Find the new position of this item in the groupItems array
      const newItem = groupItems.find(gi => gi.id === item.id);
      return newItem || item;
    });
    
    // Update state
    setMenuItems(updatedItems);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  };
  
  // Filter items by group
  const mainMenuItems = menuItems.filter(item => item.group === 'main');
  const systemMenuItems = menuItems.filter(item => item.group === 'system');
  
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
              <span className="text-construction-600">Owner</span>
              <span>Realm</span>
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={cn("flex flex-col gap-1 py-2", collapsed && "items-center")}>
            <Droppable droppableId="main" isDropDisabled={collapsed}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full"
                >
                  {mainMenuItems.map((item, index) => (
                    <Draggable 
                      key={item.id} 
                      draggableId={item.id} 
                      index={index}
                      isDragDisabled={collapsed}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "w-full",
                            snapshot.isDragging && "opacity-70"
                          )}
                        >
                          <Button 
                            variant={isActive(item.path) ? "secondary" : "ghost"} 
                            className={cn(
                              "justify-start gap-3 h-10 w-full",
                              collapsed && "w-10 justify-center pl-0"
                            )}
                            asChild
                          >
                            <Link to={item.path}>
                              {item.icon}
                              {!collapsed && <span>{item.label}</span>}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            {!collapsed && <Separator className="my-2" />}
            {collapsed && <div className="h-4"></div>}
            
            <Droppable droppableId="system" isDropDisabled={collapsed}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full"
                >
                  {systemMenuItems.map((item, index) => (
                    <Draggable 
                      key={item.id} 
                      draggableId={item.id} 
                      index={index}
                      isDragDisabled={collapsed}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "w-full",
                            snapshot.isDragging && "opacity-70"
                          )}
                        >
                          <Button 
                            variant={isActive(item.path) ? "secondary" : "ghost"} 
                            className={cn(
                              "justify-start gap-3 h-10 w-full",
                              collapsed && "w-10 justify-center pl-0"
                            )}
                            asChild
                          >
                            <Link to={item.path}>
                              {item.icon}
                              {!collapsed && <span>{item.label}</span>}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
}
