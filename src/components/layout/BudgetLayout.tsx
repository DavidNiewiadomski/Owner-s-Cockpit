
import React, { ReactNode } from "react";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { motion } from "framer-motion";

interface BudgetLayoutProps {
  children: ReactNode;
  onSearch: (term: string) => void;
  isLoaded: boolean;
}

export function BudgetLayout({ children, onSearch, isLoaded }: BudgetLayoutProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        <DashboardHeader onSearch={onSearch} />
        
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="p-6">
            <motion.div 
              className="max-w-7xl mx-auto"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
