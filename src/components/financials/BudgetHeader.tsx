
import React from "react";
import { motion } from "framer-motion";
import { useProject } from "@/contexts/ProjectContext";

export function BudgetHeader() {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";

  return (
    <motion.div 
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }
      }}
    >
      <div>
        <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Budget & Financials</h1>
        <p className="text-gray-400">Financial overview and tracking for {projectName}</p>
      </div>
      <div className="mt-3 md:mt-0">
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/40 shadow-glow">
          <span className="w-2 h-2 mr-1 rounded-full bg-cyan-500 animate-pulse"></span>
          Financial data updated daily
        </span>
      </div>
    </motion.div>
  );
}
