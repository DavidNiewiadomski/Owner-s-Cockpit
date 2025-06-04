
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="outline" className="font-normal">3 critical</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 w-full">
            <span className="font-medium">Critical RFP Deadline</span>
            <Badge variant="destructive" className="ml-auto">Critical</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Arsenal-1 manufacturing RFP responses due in 24 hours.
          </p>
          <span className="text-xs text-muted-foreground mt-1">1 hour ago</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 w-full">
            <span className="font-medium">Contract Approval Needed</span>
            <Badge variant="outline" className="ml-auto">High</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Quonset Point construction contract pending approval.
          </p>
          <span className="text-xs text-muted-foreground mt-1">3 hours ago</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 w-full">
            <span className="font-medium">Site Assessment Complete</span>
            <Badge variant="outline" className="ml-auto">Info</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Greater-Boston expansion site ready for approval.
          </p>
          <span className="text-xs text-muted-foreground mt-1">1 day ago</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 cursor-pointer flex justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
