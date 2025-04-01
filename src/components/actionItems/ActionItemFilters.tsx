
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { ProjectActionItemList } from './ProjectActionItemList';

interface ActionItemFiltersProps {
  items: any[];
  searchQuery: string;
}

export function ActionItemFilters({ items, searchQuery }: ActionItemFiltersProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="bg-gray-900 border border-gray-800">
        <TabsTrigger value="all">All Items</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="urgent">Urgent</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ProjectActionItemList items={items} filter="all" searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="pending">
        <ProjectActionItemList items={items} filter="pending" searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="completed">
        <ProjectActionItemList items={items} filter="completed" searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="urgent">
        <ProjectActionItemList items={items} filter="urgent" searchQuery={searchQuery} />
      </TabsContent>
    </Tabs>
  );
}
