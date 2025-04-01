
import React from 'react';
import { ActionItem } from './ActionItemList';
import { ActionItemCard } from './ActionItemCard';
import { EmptyActionItemList } from './EmptyActionItemList';
import { useToast } from '@/hooks/use-toast';

interface ProjectActionItemListProps {
  items: ActionItem[];
  filter: 'all' | 'pending' | 'completed' | 'urgent';
  searchQuery: string;
}

export function ProjectActionItemList({ items, filter, searchQuery }: ProjectActionItemListProps) {
  const { toast } = useToast();
  const [localItems, setLocalItems] = React.useState<ActionItem[]>(items);
  
  // Update local items when props change
  React.useEffect(() => {
    setLocalItems(items);
  }, [items]);
  
  // Toggle item status
  const toggleItemStatus = (id: string) => {
    setLocalItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newStatus = item.status === 'completed' ? 'pending' : 'completed';
          
          // Show toast notification
          toast({
            title: newStatus === 'completed' ? 'Item Completed' : 'Item Marked as Pending',
            description: item.title,
            variant: newStatus === 'completed' ? 'default' : 'destructive',
          });
          
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };
  
  // Filter items based on filter type and search query
  const filteredItems = localItems.filter(item => {
    // Apply status filter
    if (filter === 'pending' && item.status !== 'pending') return false;
    if (filter === 'completed' && item.status !== 'completed') return false;
    if (filter === 'urgent' && item.priority !== 'high') return false;
    
    // Apply search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.project.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <EmptyActionItemList searchQuery={searchQuery} />
      ) : (
        filteredItems.map(item => (
          <ActionItemCard 
            key={item.id} 
            item={item} 
            onToggleStatus={toggleItemStatus} 
          />
        ))
      )}
    </div>
  );
}
