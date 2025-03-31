
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProjectSelector } from '@/components/project/ProjectSelector';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ 
  title, 
  subtitle,
  actions
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
      <div className="container flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4">
          {actions}
          <ProjectSelector />
        </div>
      </div>
    </header>
  );
}
