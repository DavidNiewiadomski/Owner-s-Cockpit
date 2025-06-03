
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export function AppearanceSettings() {
  const { toast } = useToast();
  const [theme, setTheme] = useLocalStorage('theme', 'system');
  const [layout, setLayout] = useLocalStorage('dashboardLayout', 'standard');

  const handleThemeChange = (value: string) => {
    setTheme(value);
    
    // Apply theme to document
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (value === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${value}`,
    });
  };

  const handleLayoutChange = (value: string) => {
    setLayout(value);
    toast({
      title: "Layout Updated",
      description: `Dashboard layout changed to ${value}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the dashboard looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleThemeChange('light')}
            >
              <span className="h-4 w-4 rounded-full bg-background border mr-2"></span>
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleThemeChange('dark')}
            >
              <span className="h-4 w-4 rounded-full bg-gray-900 mr-2"></span>
              Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleThemeChange('system')}
            >
              <span className="h-4 w-4 rounded-full bg-background border mr-2 relative">
                <span className="absolute inset-0 transform rotate-90 overflow-hidden rounded-full">
                  <span className="absolute inset-0 bg-gray-900 w-1/2 right-0"></span>
                </span>
              </span>
              System
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Dashboard Layout</Label>
          <Select value={layout} onValueChange={handleLayoutChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="expanded">Expanded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
