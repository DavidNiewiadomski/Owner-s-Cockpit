
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectSelector } from '@/components/project/ProjectSelector';
import { SearchBar } from './header/SearchBar';
import { NotificationsDropdown } from './header/NotificationsDropdown';
import { UserProfileDropdown } from './header/UserProfileDropdown';
import { HeaderTitle } from './header/HeaderTitle';
import { MobileMenuButton } from './header/MobileMenuButton';

export interface DashboardHeaderProps {
  onSearch?: (term: string) => void;
  title?: string;
  subtitle?: string;
}

export function DashboardHeader({ onSearch, title, subtitle }: DashboardHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileMenuButton 
            showMobileMenu={showMobileMenu}
            onToggle={() => setShowMobileMenu(!showMobileMenu)}
          />
          
          <HeaderTitle title={title} subtitle={subtitle} />
          
          <div className="ml-4 hidden md:block">
            <ProjectSelector />
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end md:justify-between gap-2">
          <SearchBar onSearch={onSearch} />
          
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <UserProfileDropdown />
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
