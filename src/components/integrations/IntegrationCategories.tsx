
import React from 'react';
import { Button } from '@/components/ui/button';
import { Workflow, Box, Cloud, Database, Zap, Link2, Camera, Code2 } from 'lucide-react';

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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`flex items-center justify-center p-2 h-auto ${
            selectedCategory === category.id 
              ? "bg-construction-600 text-white border-construction-700" 
              : "bg-black text-gray-300 hover:bg-gray-900"
          }`}
          onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
        >
          <category.icon className="h-4 w-4 mr-2" />
          <span className="text-xs">{category.name}</span>
        </Button>
      ))}
    </div>
  );
}
