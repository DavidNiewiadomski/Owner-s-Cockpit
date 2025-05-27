
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserMenu from './UserMenu';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  searchTerm?: string;
  onSearch?: (value: string) => void;
  showSearch?: boolean;
}

export const DashboardHeader = ({ 
  title = "Dashboard", 
  subtitle,
  searchTerm = "",
  onSearch,
  showSearch = true
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black flex-shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {showSearch && onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        
        <UserMenu />
      </div>
    </div>
  );
};
