
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'; // AlertCircle removed as not used
import { useProject } from '@/contexts/ProjectContext'; // Import useProject

// FinancialData interface removed

// Define the type for individual change orders directly in props
interface ChangeOrder {
  id: string;
  description: string;
  amount: number;
  status: string; // Kept for potential future use, though not directly displayed in current JSX
  date: string;
}

interface FinancialOverviewProps {
  changeOrders: ChangeOrder[]; // Updated props
}

export function FinancialOverview({ changeOrders }: FinancialOverviewProps) {
  const { selectedProject } = useProject();

  // Determine if a specific project is selected (not 'all' and not null)
  const isProjectSelected = selectedProject && selectedProject.id !== 'all';

  // Calculate financial values based on selectedProject
  const totalBudget = isProjectSelected ? (selectedProject.budget ?? 0) : 0;
  const totalSpent = isProjectSelected ? (selectedProject.actual_cost ?? 0) : 0;
  
  // Ensure percentageSpent is 0 if totalBudget is 0 to avoid NaN
  const percentageSpent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
        <DollarSign className="h-5 w-5 mr-2 text-green-400" />
        Financial Overview {isProjectSelected ? `(${selectedProject.title})` : ''}
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Budget</p>
            <p className="text-xl font-semibold text-white">
              {isProjectSelected ? formatCurrency(totalBudget) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Spent to Date</p>
            <p className="text-xl font-semibold text-white">
              {isProjectSelected ? formatCurrency(totalSpent) : 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Budget Usage</span>
            <span className="text-gray-300">
              {isProjectSelected ? `${percentageSpent.toFixed(1)}%` : 'N/A'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${percentageSpent > 85 ? 'bg-red-500' : percentageSpent > 0 ? 'bg-green-500' : 'bg-gray-500'}`} 
              style={{ width: `${isProjectSelected ? percentageSpent : 0}%` }}
            ></div>
          </div>
        </div>
        
        {/* Recent change orders - use the changeOrders prop */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Recent Change Orders</p>
          {changeOrders.length > 0 ? (
            <div className="space-y-2">
              {changeOrders.slice(0, 2).map(order => (
                <div key={order.id} className="flex justify-between items-center p-2 bg-gray-900 rounded">
                  <div>
                    <p className="text-xs font-medium text-gray-200">{order.description}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center">
                    {order.amount > 0 ? (
                      <TrendingUp className="h-3 w-3 text-red-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-green-400 mr-1" />
                    )}
                    <span className={order.amount > 0 ? "text-xs text-red-400" : "text-xs text-green-400"}>
                      {formatCurrency(order.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No recent change orders.</p>
          )}
        </div>
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        View Financial Details
      </button>
    </div>
  );
}
