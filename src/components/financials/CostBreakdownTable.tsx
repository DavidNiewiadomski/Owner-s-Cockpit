
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BudgetCategory } from '@/lib/supabase';
import { getBudgetCategories } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';
import { Loader2, AlertTriangle } from 'lucide-react'; // For loading and error states

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function CostBreakdownTable() {
  const { selectedProject } = useProject();
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBudgetCategories(selectedProject?.id);
        setCategories(data);
      } catch (err) {
        setError("Failed to load budget categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProject]);

  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-10">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
            <p className="text-gray-400 mt-2">Loading cost breakdown...</p>
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-10">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="text-red-400 mt-2">{error}</p>
          </TableCell>
        </TableRow>
      );
    }

    if (categories.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-10">
            <p className="text-gray-400">No budget categories found for this project.</p>
          </TableCell>
        </TableRow>
      );
    }

    return categories.map((category) => {
      const variance = category.budgeted_amount - category.actual_amount;
      const variancePercentage = category.budgeted_amount !== 0 
        ? (variance / category.budgeted_amount) * 100 
        : 0;
      
      let status: "Under Budget" | "Over Budget" | "On Budget" = "On Budget";
      let statusColor = "text-gray-400 bg-gray-900/20 border-gray-700/40"; // Default for On Budget
      let varianceColor = "text-gray-300";

      if (variance > 0) {
        status = "Under Budget";
        statusColor = "text-emerald-400 bg-emerald-900/20 border-emerald-700/40";
        varianceColor = "text-emerald-400";
      } else if (variance < 0) {
        status = "Over Budget";
        statusColor = "text-rose-400 bg-rose-900/20 border-rose-700/40";
        varianceColor = "text-rose-400";
      }

      return (
        <TableRow key={category.id} className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
          <TableCell className="font-medium text-white">{category.name}</TableCell>
          <TableCell className="text-gray-300">{formatCurrency(category.budgeted_amount)}</TableCell>
          <TableCell className="text-gray-300">{formatCurrency(category.actual_amount)}</TableCell>
          <TableCell className={varianceColor}>{formatCurrency(variance)}</TableCell>
          <TableCell className={varianceColor}>{variancePercentage.toFixed(1)}%</TableCell>
          <TableCell>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
              {status}
            </span>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Card className="mb-6 bg-black border-cyan-900/30 hover-scale">
      <CardHeader className="bg-black">
        <CardTitle className="text-blue-300">Detailed Cost Breakdown</CardTitle>
        <CardDescription>Itemized costs by category</CardDescription>
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
              {renderTableContent()}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="bg-black text-sm text-gray-500 border-t border-cyan-900/30">
        Last updated: June 15, 2023 {/* This remains static as per requirements */}
      </CardFooter>
    </Card>
  );
}
