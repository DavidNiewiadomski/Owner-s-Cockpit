
import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface DashboardHeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export function DashboardHeader({ onSearch }: DashboardHeaderProps) {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
    
    toast({
      title: `Switched to ${!isDarkMode ? 'dark' : 'light'} mode`,
      duration: 2000,
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
      duration: 3000,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-md">
          <Search className="w-4 h-4 absolute ml-3 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search projects, documents..." 
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <Bell size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
