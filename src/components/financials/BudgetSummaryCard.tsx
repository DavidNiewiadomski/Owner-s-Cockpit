
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProject } from "@/contexts/ProjectContext";
import type { Project, BudgetCategory } from '@/lib/supabase'; // Import Supabase types
import { getProject, getBudgetCategories } from '@/services/dataService'; // Import data service functions
import { Loader2, AlertTriangle } from 'lucide-react'; // For loading/error states

export function BudgetSummaryCard() {
  const { selectedProject } = useProject();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const [projectData, setProjectData] = useState<Project | null>(null);
  // BudgetCategory[] state is not directly used for display in this card,
  // but fetching it is part of the requirement, so we'll include it.
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProject || selectedProject.id === 'all') {
        setProjectData(null);
        setCategories([]);
        setLoading(false);
        setError(null); // Clear error if no project or 'all' is selected
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const [projectDetails, budgetCategoriesData] = await Promise.all([
          getProject(selectedProject.id),
          getBudgetCategories(selectedProject.id)
        ]);
        setProjectData(projectDetails);
        setCategories(budgetCategoriesData);
      } catch (err) {
        console.error("Error fetching budget summary data:", err);
        setError("Failed to load project budget data.");
        setProjectData(null); // Clear data on error
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProject]);

  const summaryValues = useMemo(() => {
    const originalBudget = projectData?.budget ?? 0;
    const amountSpent = projectData?.actual_cost ?? 0;
    const currentBudget = originalBudget; // As per requirement, currentBudget = originalBudget
    const remainingBudget = currentBudget - amountSpent;
    const progressPercentage = currentBudget > 0 ? (amountSpent / currentBudget) * 100 : 0;
    return { originalBudget, currentBudget, amountSpent, remainingBudget, progressPercentage };
  }, [projectData]);

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setAnimatedProgress(summaryValues.progressPercentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [summaryValues.progressPercentage]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="bg-black border-cyan-900/30 h-[300px] flex items-center justify-center">
        <CardContent className="text-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-gray-400 mt-2">Loading budget summary...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-black border-red-900/50 h-[300px] flex items-center justify-center">
        <CardContent className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
          <p className="text-red-400 mt-2">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!selectedProject || selectedProject.id === 'all' || !projectData) {
     return (
      <Card className="bg-black border-cyan-900/30 h-[300px] flex items-center justify-center">
        <CardContent className="text-center">
          <p className="text-gray-400">
            {selectedProject && selectedProject.id === 'all' 
              ? "Select a specific project to view its budget summary." 
              : "Project data not available or no project selected."
            }
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-black border-cyan-900/30">
      <CardHeader className="bg-black">
        <CardTitle className="text-blue-300">Budget Summary</CardTitle>
        <CardDescription>
          Financial overview for {selectedProject?.title || "Selected Project"}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-black space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Original Budget:</span>
            <span className="text-gray-300">{formatCurrency(summaryValues.originalBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current Budget:</span>
            <span className="font-medium text-blue-200">{formatCurrency(summaryValues.currentBudget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount Spent:</span>
            <span className="font-medium text-pink-400">{formatCurrency(summaryValues.amountSpent)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Remaining Budget:</span>
            <span className="font-medium text-emerald-400">{formatCurrency(summaryValues.remainingBudget)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white">Budget Utilization</span>
            <span className="font-medium text-cyan-300">{summaryValues.progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full">
            <div className="absolute inset-0 w-full h-full bg-cyan-950/50"></div>
            <Progress 
              value={animatedProgress} 
              className="h-2 relative z-10 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-glow" 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-black text-xs text-gray-500 border-t border-cyan-900/30">
        Last updated: June 15, 2023 {/* This remains static as per requirements */}
      </CardFooter>
    </Card>
  );
}
