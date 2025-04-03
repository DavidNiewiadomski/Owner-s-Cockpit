
import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  Construction,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ActionItem } from './ActionItemList';
import { useTaskResponseModal } from '@/hooks/useTaskResponseModal';

interface ActionItemCardProps {
  item: ActionItem;
  onToggleStatus: (id: string) => void;
}

export function ActionItemCard({ item, onToggleStatus }: ActionItemCardProps) {
  const { openModal } = useTaskResponseModal();
  
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

  const handleAIAssist = () => {
    openModal(item);
  };

  return (
    <Card key={item.id} className={`bg-black border-gray-700 ${item.status === 'completed' ? 'opacity-80' : ''}`}>
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
              <h4 className={`font-medium text-white ${item.status === 'completed' ? 'line-through opacity-70' : ''}`}>
                {item.title}
              </h4>
            </div>
            
            <p className="text-sm text-gray-300 mt-1">{item.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="text-xs bg-gray-900 text-gray-200 border-gray-600 flex items-center gap-1 font-medium">
                <Calendar className="h-3 w-3" />
                {getRelativeDateString(item.dueDate)}
              </Badge>
              
              <Badge 
                className={`text-xs font-medium ${
                  item.priority === 'high' ? 'bg-red-900/50 text-red-200 border-red-700' : 
                  item.priority === 'medium' ? 'bg-amber-900/50 text-amber-200 border-amber-700' : 
                  'bg-green-900/50 text-green-200 border-green-700'
                }`}
                variant="outline"
              >
                {item.priority === 'high' ? 'High Priority' : 
                 item.priority === 'medium' ? 'Medium Priority' : 
                 'Low Priority'}
              </Badge>
              
              <Badge variant="outline" className="text-xs bg-construction-900/50 text-construction-200 border-construction-700 font-medium">
                {item.project}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 text-cyan-400 hover:text-white hover:bg-cyan-950/50 rounded-full"
              onClick={handleAIAssist}
              title="AI Assistance"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-300 hover:text-white">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
