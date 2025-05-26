
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BudgetSummaryCard } from "@/components/financials/BudgetSummaryCard";
import { CostVarianceChart } from "@/components/financials/charts/CostVarianceChart"; // Corrected path
import { InvoiceStatusCard } from "@/components/financials/InvoiceStatusCard";
import { CashFlowForecastChart } from "@/components/financials/CashFlowForecastChart";
import type { BudgetCategory } from '@/lib/supabase';
import { getBudgetCategories } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';
import type { CostVarianceDataPoint } from "./charts/CostVarianceTypes";
import { Loader2, AlertTriangle } from 'lucide-react'; // For loading/error
import { Card, CardContent } from "@/components/ui/card"; // For loading/error display

export function BudgetChartGrid() {
  const { selectedProject } = useProject();
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Pass undefined if selectedProject.id is 'all' or not set
        const projectId = selectedProject?.id === 'all' ? undefined : selectedProject?.id;
        const data = await getBudgetCategories(projectId);
        setBudgetCategories(data);
      } catch (err) {
        setError("Failed to load budget categories for variance chart.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProject]);

  const costVarianceChartData = useMemo<CostVarianceDataPoint[]>(() => {
    return budgetCategories.map(category => ({
      name: category.name,
      planned: category.budgeted_amount,
      actual: category.actual_amount,
      variance: category.budgeted_amount - category.actual_amount,
    }));
  }, [budgetCategories]);

  const renderCostVarianceChart = () => {
    if (loading) {
      return (
        <Card className="lg:col-span-2 h-[458px] flex items-center justify-center bg-black border-cyan-900/30">
          <CardContent className="text-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">Loading Cost Variance Data...</p>
          </CardContent>
        </Card>
      );
    }
    if (error) {
      return (
         <Card className="lg:col-span-2 h-[458px] flex items-center justify-center bg-black border-red-900/50">
          <CardContent className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="text-red-400 mt-4">{error}</p>
          </CardContent>
        </Card>
      );
    }
    return (
      <motion.div 
        className="lg:col-span-2 hover-scale" 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <CostVarianceChart chartData={costVarianceChartData} />
      </motion.div>
    );
  };

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
        
        {renderCostVarianceChart()}
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
