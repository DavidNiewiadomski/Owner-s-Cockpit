
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CommunicationOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  iconColor?: string;
}

export function CommunicationOption({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  iconColor = "text-cyan-400"
}: CommunicationOptionProps) {
  return (
    <Card className="hover:border-cyan-500/50 transition-colors cursor-pointer bg-black/40 backdrop-blur-sm border-cyan-900/30 overflow-hidden group"
      onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-blue-950/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-blue-200">{title}</CardTitle>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Button className="w-full bg-cyan-900/40 text-cyan-100 hover:bg-cyan-800/50 border border-cyan-800/40">
          Launch
        </Button>
      </CardContent>
    </Card>
  );
}
