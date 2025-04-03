
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CustomContentSection } from './CustomContentSection';

interface CustomizablePageLayoutProps {
  children?: React.ReactNode;
  pageId: string;
}

export function CustomizablePageLayout({ 
  children, 
  pageId
}: CustomizablePageLayoutProps) {
  const [customContents, setCustomContents] = useLocalStorage<any[]>(`${pageId}-custom-contents`, []);

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
    </div>
  );
}
