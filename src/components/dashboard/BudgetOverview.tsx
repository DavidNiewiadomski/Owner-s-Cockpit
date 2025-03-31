
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetOverviewProps {
  detailed?: boolean;
}

export function BudgetOverview({ detailed = false }: BudgetOverviewProps) {
  const budgetData = [
    { name: 'Materials', allocated: 120000, spent: 95000, remaining: 25000 },
    { name: 'Labor', allocated: 85000, spent: 62000, remaining: 23000 },
    { name: 'Equipment', allocated: 45000, spent: 40000, remaining: 5000 },
    { name: 'Permits', allocated: 15000, spent: 12000, remaining: 3000 },
    { name: 'Misc', allocated: 20000, spent: 8000, remaining: 12000 },
  ];

  const detailedData = [
    { name: 'Concrete', allocated: 35000, spent: 32000, remaining: 3000 },
    { name: 'Lumber', allocated: 28000, spent: 25000, remaining: 3000 },
    { name: 'Steel', allocated: 22000, spent: 16000, remaining: 6000 },
    { name: 'Electrical', allocated: 18000, spent: 12000, remaining: 6000 },
    { name: 'Plumbing', allocated: 17000, spent: 10000, remaining: 7000 },
    { name: 'Roofing', allocated: 25000, spent: 20000, remaining: 5000 },
    { name: 'Finishing', allocated: 45000, spent: 30000, remaining: 15000 },
  ];

  const chartData = detailed ? detailedData : budgetData;

  const totalAllocated = chartData.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = chartData.reduce((acc, curr) => acc + curr.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;
  const percentageSpent = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <p className="text-xl font-bold">${(totalAllocated/1000).toFixed(0)}k</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Spent</p>
          <p className="text-xl font-bold">${(totalSpent/1000).toFixed(0)}k</p>
          <p className="text-xs text-muted-foreground">{percentageSpent}% of budget</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Remaining</p>
          <p className="text-xl font-bold">${(totalRemaining/1000).toFixed(0)}k</p>
        </div>
      </div>

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spent" stackId="a" fill="#3b82f6" name="Spent" />
            <Bar dataKey="remaining" stackId="a" fill="#93c5fd" name="Remaining" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {detailed && (
        <div className="space-y-2 mt-4">
          <h3 className="font-medium">Budget Details</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-right">Allocated</th>
                <th className="py-2 text-right">Spent</th>
                <th className="py-2 text-right">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-right">${item.allocated.toLocaleString()}</td>
                  <td className="py-2 text-right">${item.spent.toLocaleString()}</td>
                  <td className="py-2 text-right">${item.remaining.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
