
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, PlusCircle, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

interface SpendingItem {
  category: string;
  amount: number;
  color: string;
  status: 'normal' | 'under' | 'over';
  variance?: number;
}

interface ChangeOrder {
  id: string;
  description: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

interface FinancialTrackingProps {
  projectName: string;
  totalBudget: number;
  spending: SpendingItem[];
  changeOrders: ChangeOrder[];
}

export function FinancialTracking({ 
  projectName, 
  totalBudget, 
  spending, 
  changeOrders 
}: FinancialTrackingProps) {
  // Calculate total spent
  const totalSpent = spending.reduce((sum, item) => sum + item.amount, 0);
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  // Calculate change order totals
  const approvedChangeOrders = changeOrders.filter(co => co.status === 'approved');
  const approvedChangeOrderTotal = approvedChangeOrders.reduce((sum, co) => sum + co.amount, 0);
  
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-construction-400" />
            Financial Overview: {projectName}
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-xs">View Details</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Total Budget</p>
              <h3 className="text-2xl font-bold text-white">${(totalBudget / 1000000).toFixed(1)}M</h3>
              {approvedChangeOrderTotal !== 0 && (
                <p className="text-xs mt-1 text-construction-400">
                  {approvedChangeOrderTotal > 0 ? '+' : ''} 
                  ${Math.abs(approvedChangeOrderTotal).toLocaleString()} in approved changes
                </p>
              )}
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Spent to Date</p>
              <h3 className="text-2xl font-bold text-white">${(totalSpent / 1000000).toFixed(1)}M</h3>
              <p className="text-xs mt-1 text-gray-400">
                {percentSpent}% of total budget
              </p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Remaining</p>
              <h3 className="text-2xl font-bold text-white">${((totalBudget - totalSpent) / 1000000).toFixed(1)}M</h3>
              <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
                <div 
                  className="bg-construction-500 h-full rounded-full" 
                  style={{ width: `${percentSpent}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 text-gray-300">Spending by Category</h4>
            <div className="space-y-2">
              {spending.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-2 h-6 rounded-sm mr-3" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${(item.amount / totalBudget) * 100}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                  {item.status !== 'normal' && (
                    <Badge 
                      className={`ml-2 ${
                        item.status === 'under' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {item.status === 'under' ? 'Under' : 'Over'} 
                      {item.variance && <> ${Math.abs(item.variance).toLocaleString()}</>}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-300">Recent Change Orders</h4>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <PlusCircle className="h-3 w-3 mr-1" />
                <span>New</span>
              </Button>
            </div>
            
            <div className="space-y-2">
              {changeOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center p-2 rounded-md bg-gray-750 hover:bg-gray-700">
                  <div 
                    className={`w-1.5 h-6 rounded-sm mr-3 ${
                      order.status === 'approved' 
                        ? 'bg-green-500' 
                        : order.status === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                    }`}
                  ></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{order.id}: {order.description}</span>
                      <span className={`text-sm font-medium ${order.amount >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {order.amount >= 0 ? '+' : ''}{order.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400">{order.date}</span>
                      <Badge 
                        className={`${
                          order.status === 'approved' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : order.status === 'rejected'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0 ml-2">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {changeOrders.length > 3 && (
                <Button variant="ghost" size="sm" className="text-xs w-full mt-2">
                  View All Change Orders ({changeOrders.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
