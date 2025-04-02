
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MenuFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export function MenuFormFields({ 
  title, 
  setTitle, 
  description, 
  setDescription 
}: MenuFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-300">Title</Label>
        <Input 
          id="title" 
          placeholder="Enter a title" 
          className="bg-gray-900 border-cyan-900/30"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-300">Description (optional)</Label>
        <Input 
          id="description" 
          placeholder="Enter a description" 
          className="bg-gray-900 border-cyan-900/30"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
