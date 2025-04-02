
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomizationMenu } from './CustomizationMenu';
import { CustomContentSection } from './CustomContentSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CustomizablePageLayoutProps {
  children: React.ReactNode;
  pageId: string;
}

export function CustomizablePageLayout({ children, pageId }: CustomizablePageLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customContents, setCustomContents] = useLocalStorage<any[]>(`${pageId}-custom-contents`, []);

  const addCustomContent = (content: any) => {
    setCustomContents([...customContents, { ...content, id: Date.now().toString() }]);
    setIsMenuOpen(false);
  };

  const removeCustomContent = (id: string) => {
    setCustomContents(customContents.filter(content => content.id !== id));
  };

  const updateCustomContent = (id: string, updatedContent: any) => {
    setCustomContents(customContents.map(content => 
      content.id === id ? { ...content, ...updatedContent } : content
    ));
  };

  return (
    <div className="w-full">
      {children}
      
      {customContents.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-cyan-800/40 pb-2">
            <h2 className="text-xl font-bold text-cyan-300">Custom Reports</h2>
          </div>
          <CustomContentSection 
            contents={customContents} 
            onRemove={removeCustomContent}
            onUpdate={updateCustomContent}
          />
        </div>
      )}
      
      <div className="fixed bottom-24 right-6 z-40">
        <Button
          onClick={() => setIsMenuOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-[0_0_15px_rgba(8,145,178,0.5)]"
          size="icon"
          aria-label="Add Custom Content"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>
      
      <CustomizationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onAddContent={addCustomContent}
      />
    </div>
  );
}
