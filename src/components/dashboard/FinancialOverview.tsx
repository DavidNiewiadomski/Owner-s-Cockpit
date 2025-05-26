
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface FinancialData {
  projectName: string;
  totalBudget: number;
  spending: Array<{
    category: string;
    amount: number;
    color: string;
    status: string;
  }>;
  changeOrders: Array<{
    id: string;
    description: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

interface FinancialOverviewProps {
  financialData: FinancialData;
}

export function FinancialOverview({ financialData }: FinancialOverviewProps) {
  // Calculate total spent
  const totalSpent = financialData.spending.reduce((sum, item) => sum + item.amount, 0);
  const percentageSpent = (totalSpent / financialData.totalBudget) * 100;
  
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
        Financial Overview
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Budget</p>
            <p className="text-xl font-semibold text-white">{formatCurrency(financialData.totalBudget)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Spent to Date</p>
            <p className="text-xl font-semibold text-white">{formatCurrency(totalSpent)}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Budget Usage</span>
            <span className="text-gray-300">{percentageSpent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${percentageSpent > 85 ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${percentageSpent}%` }}
            ></div>
          </div>
        </div>
        
        {/* Recent change orders */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Recent Change Orders</p>
          <div className="space-y-2">
            {financialData.changeOrders.slice(0, 2).map(order => (
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
        </div>
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        View Financial Details
      </button>
    </div>
  );
}
