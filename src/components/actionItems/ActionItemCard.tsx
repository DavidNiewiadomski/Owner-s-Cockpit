
import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  Construction,
  ArrowDown
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ActionItem } from './ActionItemList';

interface ActionItemCardProps {
  item: ActionItem;
  onToggleStatus: (id: string) => void;
}

export function ActionItemCard({ item, onToggleStatus }: ActionItemCardProps) {
  // Get icon based on item type
  const getTypeIcon = (type: ActionItem['type']) => {
    switch (type) {
      case 'approval':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'review':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'task':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'decision':
        return <Construction className="h-5 w-5 text-construction-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get relative date string
  const getRelativeDateString = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due Today';
    } else if (diffDays === 1) {
      return 'Due Tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <Card key={item.id} className={`bg-black border-gray-700 ${item.status === 'completed' ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox 
              checked={item.status === 'completed'}
              onCheckedChange={() => onToggleStatus(item.id)}
              className="data-[state=checked]:bg-construction-500 data-[state=checked]:text-white"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {getTypeIcon(item.type)}
              <h4 className={`font-medium text-gray-100 ${item.status === 'completed' ? 'line-through' : ''}`}>
                {item.title}
              </h4>
            </div>
            
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="text-xs bg-black text-gray-300 border-gray-600 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {getRelativeDateString(item.dueDate)}
              </Badge>
              
              <Badge 
                className={`text-xs ${
                  item.priority === 'high' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                  item.priority === 'medium' ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 
                  'bg-green-900/30 text-green-400 border-green-800'
                }`}
                variant="outline"
              >
                {item.priority === 'high' ? 'High Priority' : 
                 item.priority === 'medium' ? 'Medium Priority' : 
                 'Low Priority'}
              </Badge>
              
              <Badge variant="outline" className="text-xs bg-construction-900/30 text-construction-400 border-construction-800">
                {item.project}
              </Badge>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
