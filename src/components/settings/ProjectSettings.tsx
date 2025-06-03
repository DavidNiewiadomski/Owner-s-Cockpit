
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export function ProjectSettings() {
  const { toast } = useToast();
  const [projectSettings, setProjectSettings] = useLocalStorage('projectSettings', {
    defaultView: 'timeline',
    scheduleFormat: 'gantt',
    autoTrack: true
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setProjectSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Project Settings Updated",
      description: `${key} has been updated`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Management Settings</CardTitle>
        <CardDescription>
          Configure default settings for all your projects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="default-view">Default Project View</Label>
          <Select
            value={projectSettings.defaultView}
            onValueChange={(value) => handleSettingChange('defaultView', value)}
          >
            <SelectTrigger id="default-view">
              <SelectValue placeholder="Select default view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="kanban">Kanban Board</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="schedule-format">Schedule Format</Label>
          <Select
            value={projectSettings.scheduleFormat}
            onValueChange={(value) => handleSettingChange('scheduleFormat', value)}
          >
            <SelectTrigger id="schedule-format">
              <SelectValue placeholder="Select schedule format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gantt">Gantt Chart</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="list">List View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-track">Automatic Progress Tracking</Label>
            <p className="text-sm text-muted-foreground">
              Automatically update progress based on completed tasks
            </p>
          </div>
          <Switch
            id="auto-track"
            checked={projectSettings.autoTrack}
            onCheckedChange={(checked) => handleSettingChange('autoTrack', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
