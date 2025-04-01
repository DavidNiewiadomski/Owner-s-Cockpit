
import React, { useState } from "react";
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

const BudgetFinancials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Budget & Financials</h1>
                <p className="text-gray-400">Financial overview and tracking for {projectName}</p>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <span className="w-2 h-2 mr-1 rounded-full bg-blue-500"></span>
                  Financial data updated daily
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <BudgetSummaryCard />
              
              <div className="lg:col-span-2">
                <CostVarianceChart />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <CashFlowForecastChart />
              </div>
              
              <InvoiceStatusCard />
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Detailed Cost Breakdown</CardTitle>
                <CardDescription>Itemized costs by category for {projectName}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Variance %</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Site Work & Foundation</TableCell>
                      <TableCell>$425,000</TableCell>
                      <TableCell>$412,750</TableCell>
                      <TableCell className="text-green-500">$12,250</TableCell>
                      <TableCell className="text-green-500">2.9%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Under Budget
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Structural Framing</TableCell>
                      <TableCell>$720,000</TableCell>
                      <TableCell>$748,800</TableCell>
                      <TableCell className="text-red-500">-$28,800</TableCell>
                      <TableCell className="text-red-500">-4.0%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                          Over Budget
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Electrical Systems</TableCell>
                      <TableCell>$345,000</TableCell>
                      <TableCell>$341,550</TableCell>
                      <TableCell className="text-green-500">$3,450</TableCell>
                      <TableCell className="text-green-500">1.0%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Under Budget
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Plumbing & HVAC</TableCell>
                      <TableCell>$520,000</TableCell>
                      <TableCell>$546,000</TableCell>
                      <TableCell className="text-red-500">-$26,000</TableCell>
                      <TableCell className="text-red-500">-5.0%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                          Over Budget
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Interior Finishes</TableCell>
                      <TableCell>$635,000</TableCell>
                      <TableCell>$622,300</TableCell>
                      <TableCell className="text-green-500">$12,700</TableCell>
                      <TableCell className="text-green-500">2.0%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Under Budget
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Exterior Facades</TableCell>
                      <TableCell>$390,000</TableCell>
                      <TableCell>$409,500</TableCell>
                      <TableCell className="text-red-500">-$19,500</TableCell>
                      <TableCell className="text-red-500">-5.0%</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                          Over Budget
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Last updated: June 15, 2023
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetFinancials;
