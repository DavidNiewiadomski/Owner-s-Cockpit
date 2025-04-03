
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProject } from "@/contexts/ProjectContext";
import { CollapsibleAIAssistant } from "@/components/ai/CollapsibleAIAssistant";
import { BudgetLayout } from "@/components/layout/BudgetLayout";
import { BudgetHeader } from "@/components/financials/BudgetHeader";
import { BudgetChartGrid } from "@/components/financials/BudgetChartGrid";
import { CostBreakdownTable } from "@/components/financials/CostBreakdownTable";

const BudgetFinancials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Budget-specific insights
  const budgetInsights = [
    {
      title: "Budget Alert",
      content: "Structural Framing costs are 4% over budget ($28,800)",
      type: "warning" as const
    },
    {
      title: "Cashflow Projection",
      content: "Positive cash flow expected through Q3, with potential shortfall in October",
      type: "info" as const
    },
    {
      title: "Cost Saving",
      content: "Interior Finishes currently under budget by $12,700 (2%)",
      type: "success" as const
    },
    {
      title: "Invoice Status",
      content: "12 overdue invoices ($315,000) require immediate attention",
      type: "warning" as const
    }
  ];

  return (
    <BudgetLayout onSearch={setSearchTerm} isLoaded={isLoaded}>
      <div className="pb-6">
        <CollapsibleAIAssistant 
          projectContext="Budget & Financials"
          projectName={projectName}
          initialInsights={budgetInsights}
        />
      </div>
      
      <BudgetHeader />
      
      <BudgetChartGrid />
      
      <motion.div 
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
        <CostBreakdownTable />
      </motion.div>
    </BudgetLayout>
  );
};

export default BudgetFinancials;
