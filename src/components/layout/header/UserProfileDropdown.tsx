
import React, { useEffect } from 'react';
import { User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  title: string;
  avatar: string;
}

export function UserProfileDropdown() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('userProfile', {
    firstName: 'Tri',
    lastName: 'Tang',
    email: 'tri.tang@company.com',
    company: 'Real Estate Development Corp',
    role: 'operations',
    title: 'Internal Operations',
    avatar: '/lovable-uploads/15d63465-4118-4f05-9426-771e61d8ca96.png'
  });

  // Force update the profile to Tri Tang if it's still showing old data
  useEffect(() => {
    if (profile.firstName !== 'Tri' || profile.lastName !== 'Tang') {
      setProfile({
        firstName: 'Tri',
        lastName: 'Tang',
        email: 'tri.tang@company.com',
        company: 'Real Estate Development Corp',
        role: 'operations',
        title: 'Internal Operations',
        avatar: '/lovable-uploads/15d63465-4118-4f05-9426-771e61d8ca96.png'
      });
    }
  }, [profile.firstName, profile.lastName, setProfile]);

  // Add cache busting parameter to avatar URL for Safari compatibility
  const avatarUrl = profile.avatar ? `${profile.avatar}?t=${Date.now()}` : profile.avatar;

  return (
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
  );
}
