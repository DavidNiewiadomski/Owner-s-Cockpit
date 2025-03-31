
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle, 
  Construction, 
  Calendar, 
  ListChecks,
  ArrowDown,
  Tag 
} from 'lucide-react';
import { ActionItemList } from '@/components/actionItems/ActionItemList';

export default function ActionItems() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <main className="flex flex-col flex-1 overflow-y-auto bg-black">
        <DashboardHeader title="Action Items" />
        <CollapsibleAIAssistant />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Action Items</h1>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search action items..."
                    className="pl-8 bg-black border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="gap-1 bg-construction-600 hover:bg-construction-700">
                  <Plus className="h-4 w-4" />
                  New Item
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ActionItemList filter="all" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="pending">
                <ActionItemList filter="pending" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="completed">
                <ActionItemList filter="completed" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="urgent">
                <ActionItemList filter="urgent" searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
