
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface IntegrationCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export function IntegrationCategories({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: IntegrationCategoriesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
      <ScrollArea className="pb-2 w-full">
        <div className="flex items-center gap-2 pb-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex items-center justify-center px-4 py-2 h-10 transition-all whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? "bg-cyan-700 text-white border-cyan-600 shadow-blue" 
                    : "bg-gray-900/60 text-gray-300 hover:bg-gray-800 border-gray-700 hover:shadow-blue"
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      <Separator className="mt-4 bg-gray-800" />
    </div>
  );
}
