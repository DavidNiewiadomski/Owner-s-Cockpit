
import React from "react";
import { motion } from "framer-motion";
import { BudgetSummaryCard } from "@/components/financials/BudgetSummaryCard";
import { CostVarianceChart } from "@/components/financials/CostVarianceChart";
import { InvoiceStatusCard } from "@/components/financials/InvoiceStatusCard";
import { CashFlowForecastChart } from "@/components/financials/CashFlowForecastChart";

export function BudgetChartGrid() {
  return (
    <>
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" 
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
        <motion.div 
          className="hover-scale" 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <BudgetSummaryCard />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2 hover-scale" 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CostVarianceChart />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" 
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
        <motion.div 
          className="lg:col-span-2 hover-scale" 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CashFlowForecastChart />
        </motion.div>
        
        <motion.div 
          className="hover-scale" 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <InvoiceStatusCard />
        </motion.div>
      </motion.div>
    </>
  );
}
