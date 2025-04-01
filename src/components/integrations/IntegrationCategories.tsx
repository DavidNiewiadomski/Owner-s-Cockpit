
import React from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="flex items-center flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`flex items-center justify-center px-4 py-2 h-10 ${
              selectedCategory === category.id 
                ? "bg-cyan-700 text-white border-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.5)]" 
                : "bg-black text-gray-300 hover:bg-gray-900 border-gray-700"
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            <span>{category.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
