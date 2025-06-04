
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  showMobileMenu: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ showMobileMenu, onToggle }: MobileMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onToggle}
    >
      {showMobileMenu ? <X /> : <Menu />}
    </Button>
  );
}
