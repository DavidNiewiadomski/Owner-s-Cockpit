
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProject } from "@/contexts/ProjectContext";

export function BudgetSummaryCard() {
  const { selectedProject } = useProject();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Project-specific data - in a real app, this would come from an API
  const budgetData = {
    originalBudget: 3850000,
    currentBudget: 3925000,
    amountSpent: 2472500,
    remainingBudget: 1452500,
    progressPercentage: 63
  };

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setAnimatedProgress(budgetData.progressPercentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [budgetData.progressPercentage]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Card className="glass-card border-cyan-900/30">
      <CardHeader>
        <CardTitle className="text-blue-300">Budget Summary</CardTitle>
        <CardDescription>
          Financial overview for {selectedProject?.title || "All Projects"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Original Budget:</span>
            <span className="text-gray-300">{formatCurrency(budgetData.originalBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current Budget:</span>
            <span className="font-medium text-blue-200">{formatCurrency(budgetData.currentBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount Spent:</span>
            <span className="font-medium text-pink-400">{formatCurrency(budgetData.amountSpent)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Remaining Budget:</span>
            <span className="font-medium text-emerald-400">{formatCurrency(budgetData.remainingBudget)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white">Budget Utilization</span>
            <span className="font-medium text-cyan-300">{budgetData.progressPercentage}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full">
            <div className="absolute inset-0 w-full h-full bg-cyan-950/50"></div>
            <Progress 
              value={animatedProgress} 
              className="h-2 relative z-10" 
              indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400 shadow-glow" 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 border-t border-cyan-900/30">
        Last updated: June 15, 2023
      </CardFooter>
    </Card>
  );
}
