
import React, { useState, useEffect } from "react";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BudgetSummaryCard } from "@/components/financials/BudgetSummaryCard";
import { CostVarianceChart } from "@/components/financials/CostVarianceChart";
import { InvoiceStatusCard } from "@/components/financials/InvoiceStatusCard";
import { CashFlowForecastChart } from "@/components/financials/CashFlowForecastChart";
import { useProject } from "@/contexts/ProjectContext";
import { CollapsibleAIAssistant } from "@/components/ai/CollapsibleAIAssistant";
import { motion } from "framer-motion";

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="p-6 pt-6 pb-0">
            <CollapsibleAIAssistant 
              projectContext="Budget & Financials"
              projectName={projectName}
              initialInsights={budgetInsights}
            />
          </div>
          
          <div className="p-6">
            <motion.div 
              className="max-w-7xl mx-auto"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div 
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
                variants={itemVariants}
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
              
              <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" variants={itemVariants}>
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
              
              <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" variants={itemVariants}>
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
              
              <motion.div variants={itemVariants}>
                <Card className="mb-6 bg-black border-cyan-900/30 hover-scale">
                  <CardHeader className="bg-black">
                    <CardTitle className="text-blue-300">Detailed Cost Breakdown</CardTitle>
                    <CardDescription>Itemized costs by category for {projectName}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-black">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-cyan-900/30">
                            <TableHead className="text-gray-300">Category</TableHead>
                            <TableHead className="text-gray-300">Budget</TableHead>
                            <TableHead className="text-gray-300">Actual</TableHead>
                            <TableHead className="text-gray-300">Variance</TableHead>
                            <TableHead className="text-gray-300">Variance %</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Site Work & Foundation</TableCell>
                            <TableCell className="text-gray-300">$425,000</TableCell>
                            <TableCell className="text-gray-300">$412,750</TableCell>
                            <TableCell className="text-emerald-400">$12,250</TableCell>
                            <TableCell className="text-emerald-400">2.9%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                                Under Budget
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Structural Framing</TableCell>
                            <TableCell className="text-gray-300">$720,000</TableCell>
                            <TableCell className="text-gray-300">$748,800</TableCell>
                            <TableCell className="text-rose-400">-$28,800</TableCell>
                            <TableCell className="text-rose-400">-4.0%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                                Over Budget
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Electrical Systems</TableCell>
                            <TableCell className="text-gray-300">$345,000</TableCell>
                            <TableCell className="text-gray-300">$341,550</TableCell>
                            <TableCell className="text-emerald-400">$3,450</TableCell>
                            <TableCell className="text-emerald-400">1.0%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                                Under Budget
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Plumbing & HVAC</TableCell>
                            <TableCell className="text-gray-300">$520,000</TableCell>
                            <TableCell className="text-gray-300">$546,000</TableCell>
                            <TableCell className="text-rose-400">-$26,000</TableCell>
                            <TableCell className="text-rose-400">-5.0%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                                Over Budget
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Interior Finishes</TableCell>
                            <TableCell className="text-gray-300">$635,000</TableCell>
                            <TableCell className="text-gray-300">$622,300</TableCell>
                            <TableCell className="text-emerald-400">$12,700</TableCell>
                            <TableCell className="text-emerald-400">2.0%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                                Under Budget
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-cyan-900/10 transition-colors">
                            <TableCell className="font-medium text-white">Exterior Facades</TableCell>
                            <TableCell className="text-gray-300">$390,000</TableCell>
                            <TableCell className="text-gray-300">$409,500</TableCell>
                            <TableCell className="text-rose-400">-$19,500</TableCell>
                            <TableCell className="text-rose-400">-5.0%</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                                Over Budget
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-black text-sm text-gray-500 border-t border-cyan-900/30">
                    Last updated: June 15, 2023
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetFinancials;
