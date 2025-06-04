
import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectSelector } from '@/components/project/ProjectSelector';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface DashboardHeaderProps {
  onSearch?: (term: string) => void;
  title?: string;
  subtitle?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  title: string;
  avatar: string;
}

export function DashboardHeader({ onSearch, title, subtitle }: DashboardHeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();
  
  const [profile] = useLocalStorage<UserProfile>('userProfile', {
    firstName: 'Matt',
    lastName: 'Grimm',
    email: 'matt.grimm@company.com',
    company: 'Real Estate Development Corp',
    role: 'coo',
    title: 'Chief Operating Officer',
    avatar: '/lovable-uploads/a60047d2-3881-445d-b3a0-2795e70da2db.png'
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Add cache busting parameter to avatar URL for Safari compatibility
  const avatarUrl = profile.avatar ? `${profile.avatar}?t=${Date.now()}` : profile.avatar;

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </Button>
          
          {title && (
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          
          <div className="ml-4 hidden md:block">
            <ProjectSelector />
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end md:justify-between gap-2">
          <div className="relative max-w-md flex-1 hidden md:block ml-8">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search properties..." 
              className="pl-8 bg-background"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center gap-2">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{profile.firstName} {profile.lastName}</span>
                    <span className="text-xs text-muted-foreground">{profile.title}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile project selector */}
      <div className="md:hidden px-4 pb-3">
        <ProjectSelector />
      </div>
    </header>
  );
}
