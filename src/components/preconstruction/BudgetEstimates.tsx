
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Wallet, DollarSign, TrendingUp, AlertTriangle, Download, Plus } from 'lucide-react';
import { budgetEstimatesData, budgetCategoryData, budgetRisksData } from '@/data/preconstruction/preconstructionData';

export function BudgetEstimates() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BudgetSummaryCard 
          title="Total Estimated Cost" 
          value="$4,850,000" 
          change="+2.5%" 
          trend="up"
          icon={<DollarSign className="h-5 w-5 text-green-400" />}
        />
        
        <BudgetSummaryCard 
          title="Contingency Reserve" 
          value="$485,000" 
          change="10%" 
          trend="same"
          description="of total budget"
          icon={<Wallet className="h-5 w-5 text-blue-400" />}
        />
        
        <BudgetSummaryCard 
          title="Cost Variance" 
          value="$125,000" 
          change="+2.6%" 
          trend="up"
          description="vs initial estimate"
          icon={<TrendingUp className="h-5 w-5 text-amber-400" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LineItemsTable />
          <BudgetCategoryChart />
        </div>
        <div className="space-y-6">
          <BudgetRisksCard />
          <BudgetAllocationChart />
        </div>
      </div>
    </div>
  );
}

interface BudgetSummaryCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'same';
  description?: string;
  icon: React.ReactNode;
}

function BudgetSummaryCard({ 
  title, 
  value, 
  change, 
  trend,
  description = "from previous estimate",
  icon
}: BudgetSummaryCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };
  
  const getTrendColor = () => {
    if (trend === 'same') return 'text-gray-400';
    if (trend === 'up') return 'text-red-400'; // Up is bad for costs
    return 'text-green-400'; // Down is good for costs
  };
  
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardContent className="p-4 pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{value}</span>
              <div className="flex items-center text-xs mt-1">
                <span className={getTrendColor()}>
                  {getTrendIcon()} {change}
                </span>
                <span className="text-gray-500 ml-2">{description}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function LineItemsTable() {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Budget Line Items</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed cost estimates by category
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-400">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-black p-0">
        <Table className="border-collapse">
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400 text-right">Estimate</TableHead>
              <TableHead className="text-gray-400 text-right">Variance</TableHead>
              <TableHead className="text-gray-400">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetEstimatesData.map((item) => (
              <TableRow key={item.id} className="border-b border-gray-800 hover:bg-gray-900/30">
                <TableCell className="font-medium text-white">{item.description}</TableCell>
                <TableCell className="text-gray-400">{item.category}</TableCell>
                <TableCell className="text-right text-white">{item.estimate}</TableCell>
                <TableCell className="text-right">
                  <span className={
                    parseFloat(item.variance) > 0 
                      ? 'text-red-400' 
                      : parseFloat(item.variance) < 0 
                        ? 'text-green-400' 
                        : 'text-gray-400'
                  }>
                    {item.variance}
                  </span>
                </TableCell>
                <TableCell className="text-gray-400 max-w-[200px] truncate">{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-black pt-2 flex justify-center">
        <Button variant="outline" className="w-full border-gray-800 text-gray-400 hover:text-white">
          View All Line Items
        </Button>
      </CardFooter>
    </Card>
  );
}

function BudgetCategoryChart() {
  const data = budgetCategoryData;
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Cost by Category</CardTitle>
        <CardDescription className="text-gray-400">
          Distribution of estimated costs across major categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8' }}
                axisLine={{ stroke: '#475569' }}
              />
              <YAxis 
                tick={{ fill: '#94a3b8' }}
                axisLine={{ stroke: '#475569' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Estimated Cost']}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#budgetGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetRisksCard() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
          Budget Risks
        </CardTitle>
        <CardDescription className="text-gray-400">
          Potential cost increase factors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetRisksData.map((risk) => (
          <div key={risk.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between">
              <h3 className="text-white font-medium">{risk.title}</h3>
              <RiskImpactBadge impact={risk.impact} />
            </div>
            <p className="text-sm text-gray-400 mt-1">{risk.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>Probability: {risk.probability}</span>
              <span>Potential Impact: {risk.potentialImpact}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:text-white">
          View All Risks
        </Button>
      </CardFooter>
    </Card>
  );
}

function RiskImpactBadge({ impact }: { impact: string }) {
  const getImpactColor = () => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <span className={`${getImpactColor()} text-xs px-2 py-1 rounded border`}>
      {impact}
    </span>
  );
}

function BudgetAllocationChart() {
  const data = [
    { name: 'Hard Costs', value: 65 },
    { name: 'Soft Costs', value: 15 },
    { name: 'Contingency', value: 10 },
    { name: 'FF&E', value: 5 },
    { name: 'Other', value: 5 }
  ];
  
  const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#6366f1'];
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Budget Allocation</CardTitle>
        <CardDescription className="text-gray-400">
          Overall distribution by cost type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Allocation']}
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
