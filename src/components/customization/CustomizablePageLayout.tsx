
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CustomizationMenu } from './CustomizationMenu';
import { CustomContentSection } from './CustomContentSection';

interface CustomizablePageLayoutProps {
  children: React.ReactNode;
  pageId: string;
  isCustomizationMenuOpen?: boolean;
  setIsCustomizationMenuOpen?: (isOpen: boolean) => void;
}

export function CustomizablePageLayout({ 
  children, 
  pageId, 
  isCustomizationMenuOpen = false, 
  setIsCustomizationMenuOpen 
}: CustomizablePageLayoutProps) {
  const [customContents, setCustomContents] = useLocalStorage<any[]>(`${pageId}-custom-contents`, []);

  const addCustomContent = (content: any) => {
    setCustomContents([...customContents, { ...content, id: Date.now().toString() }]);
    setIsCustomizationMenuOpen?.(false);
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
      
      <CustomizationMenu 
        isOpen={isCustomizationMenuOpen} 
        onClose={() => setIsCustomizationMenuOpen?.(false)}
        onAddContent={addCustomContent}
      />
    </div>
  );
}
