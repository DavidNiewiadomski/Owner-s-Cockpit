
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProject } from "@/contexts/ProjectContext";

export function BudgetSummaryCard() {
  const { selectedProject } = useProject();
  
  // Project-specific data - in a real app, this would come from an API
  const budgetData = {
    originalBudget: 3850000,
    currentBudget: 3925000,
    amountSpent: 2472500,
    remainingBudget: 1452500,
    progressPercentage: 63
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Summary</CardTitle>
        <CardDescription>
          Financial overview for {selectedProject?.title || "All Projects"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Original Budget:</span>
            <span>{formatCurrency(budgetData.originalBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Budget:</span>
            <span className="font-medium">{formatCurrency(budgetData.currentBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount Spent:</span>
            <span className="font-medium">{formatCurrency(budgetData.amountSpent)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining Budget:</span>
            <span className="font-medium">{formatCurrency(budgetData.remainingBudget)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Utilization</span>
            <span className="font-medium">{budgetData.progressPercentage}%</span>
          </div>
          <Progress value={budgetData.progressPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last updated: June 15, 2023
      </CardFooter>
    </Card>
  );
}
