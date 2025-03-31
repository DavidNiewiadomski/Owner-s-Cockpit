
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, DollarSign, AlertTriangle } from 'lucide-react';

interface FinancialTrackingProps {
  projectName: string;
  totalBudget: number;
  spending: {
    category: string;
    amount: number;
    color: string;
    status?: 'over' | 'under' | 'normal';
    variance?: number;
  }[];
  changeOrders: {
    id: string;
    description: string;
    amount: number;
    status: 'approved' | 'pending' | 'rejected';
    date: string;
  }[];
  className?: string;
}

export function FinancialTracking({ 
  projectName, 
  totalBudget, 
  spending, 
  changeOrders,
  className 
}: FinancialTrackingProps) {
  // Calculate total spending
  const totalSpent = spending.reduce((sum, item) => sum + item.amount, 0);
  
  // Format as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Calculate budget utilization percentage
  const utilizationPercentage = Math.round((totalSpent / totalBudget) * 100);
  
  // Get variance status
  const getVarianceStatus = (status?: 'over' | 'under' | 'normal') => {
    switch (status) {
      case 'over':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'under':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Financial Tracking</CardTitle>
        <CardDescription>Budget and expense tracking for {projectName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Overview */}
          <div>
            <h3 className="text-lg font-medium mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Total Budget</span>
                  <span className="text-sm font-bold">{formatCurrency(totalBudget)}</span>
                </div>
                <Separator />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Spent to Date</span>
                  <span className="text-sm font-bold">{formatCurrency(totalSpent)}</span>
                </div>
                <Separator />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Remaining Budget</span>
                  <span className="text-sm font-bold">{formatCurrency(totalBudget - totalSpent)}</span>
                </div>
                <Separator />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Budget Utilization</span>
                  <span className="text-sm font-bold">{utilizationPercentage}%</span>
                </div>
                <Progress value={utilizationPercentage} className="h-2" />
              </div>
            </div>
            
            {/* Budget Distribution Chart */}
            <div className="mt-6 h-64">
              <h3 className="text-sm font-medium mb-2">Budget Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spending}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {spending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Spending Breakdown & Change Orders */}
          <div>
            <h3 className="text-lg font-medium mb-4">Spending Breakdown</h3>
            <div className="space-y-3">
              {spending.map((item, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                      <span className="font-medium">{item.category}</span>
                      {item.status && item.status !== 'normal' && (
                        <span className="ml-2">{getVarianceStatus(item.status)}</span>
                      )}
                    </div>
                    <span>{formatCurrency(item.amount)}</span>
                  </div>
                  
                  {item.variance && (
                    <div className="text-xs mt-1 flex justify-between">
                      <span className="text-muted-foreground">
                        {item.status === 'over' ? 'Overbudget:' : 'Underbudget:'}
                      </span>
                      <span className={item.status === 'over' ? 'text-red-500' : 'text-green-500'}>
                        {item.status === 'over' ? '+' : '-'}{formatCurrency(item.variance)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Recent Change Orders</h3>
              <div className="space-y-3">
                {changeOrders.map((order) => (
                  <div key={order.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{order.description}</span>
                      <Badge
                        className={
                          order.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">{order.date}</span>
                      <span className={order.amount > 0 ? 'text-red-500' : 'text-green-500'}>
                        {order.amount > 0 ? '+' : ''}{formatCurrency(order.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Indicators */}
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Financial Risk Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md flex flex-col">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-medium">Cash Flow</span>
              </div>
              <span className="text-sm text-muted-foreground">Next payment due in 15 days</span>
              <Badge className="mt-2 self-start bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                Moderate Risk
              </Badge>
            </div>
            
            <div className="p-3 border rounded-md flex flex-col">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Budget Variance</span>
              </div>
              <span className="text-sm text-muted-foreground">Currently 3% under budget</span>
              <Badge className="mt-2 self-start bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                Low Risk
              </Badge>
            </div>
            
            <div className="p-3 border rounded-md flex flex-col">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium">Cost Escalation</span>
              </div>
              <span className="text-sm text-muted-foreground">Material costs increased by 8%</span>
              <Badge className="mt-2 self-start bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                High Risk
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
