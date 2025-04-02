
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ReferenceLine
} from 'recharts';
import { TrendingUp, DollarSign, Clock, ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { roiData } from '@/data/investment/investmentData';

const roiBreakdownData = [
  { name: 'Site A', initial: 400000, current: 520000, roi: 30 },
  { name: 'Site B', initial: 300000, current: 370000, roi: 23.3 },
  { name: 'Site C', initial: 200000, current: 260000, roi: 30 },
  { name: 'Site D', initial: 270000, current: 310000, roi: 14.8 },
  { name: 'Site E', initial: 180000, current: 230000, roi: 27.8 },
];

const monthlyReturnsData = [
  { month: 'Jan', return: 5.2, benchmark: 4.8 },
  { month: 'Feb', return: 5.7, benchmark: 4.9 },
  { month: 'Mar', return: 5.1, benchmark: 5.0 },
  { month: 'Apr', return: 4.8, benchmark: 5.1 },
  { month: 'May', return: 5.5, benchmark: 5.2 },
  { month: 'Jun', return: 6.2, benchmark: 5.3 },
  { month: 'Jul', return: 6.8, benchmark: 5.4 },
  { month: 'Aug', return: 7.1, benchmark: 5.5 },
  { month: 'Sep', return: 7.4, benchmark: 5.6 },
];

interface InvestmentStats {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ElementType;
}

const investmentStats: InvestmentStats[] = [
  {
    title: "Current ROI",
    value: "7.3%",
    trend: "up",
    trendValue: "+0.2% from last quarter",
    icon: TrendingUp
  },
  {
    title: "Annualized Return",
    value: "9.2%",
    trend: "up",
    trendValue: "+1.5% year-over-year",
    icon: DollarSign
  },
  {
    title: "Payback Period",
    value: "5.2 years",
    trend: "down",
    trendValue: "-0.3 years from projection",
    icon: Clock
  }
];

export function ROIAnalysisContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {investmentStats.map((stat, index) => (
          <Card key={index} className="bg-black border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-md font-medium text-gray-200">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-construction-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center mt-4">
                <div className={`flex items-center text-sm ${
                  stat.trend === "up" 
                    ? "text-green-500" 
                    : stat.trend === "down" 
                      ? "text-amber-500"
                      : "text-gray-400"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  ) : null}
                  {stat.trendValue}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">ROI Projection vs. Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  domain={[6, 9]} 
                  stroke="#666"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} 
                  labelStyle={{ color: '#ccc' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#10B981" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="Projected ROI"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#EF4444" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="Actual ROI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Monthly Returns vs. Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturnsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`} 
                    stroke="#666"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} 
                    labelStyle={{ color: '#ccc' }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar dataKey="return" name="Your Returns" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmark" name="Market Benchmark" fill="#fb7185" radius={[4, 4, 0, 0]} />
                  <ReferenceLine y={5.5} stroke="#666" strokeDasharray="3 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ROI by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 text-left text-gray-400">Property</th>
                    <th className="py-3 text-right text-gray-400">Initial Value</th>
                    <th className="py-3 text-right text-gray-400">Current Value</th>
                    <th className="py-3 text-right text-gray-400">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {roiBreakdownData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 font-medium text-white">{item.name}</td>
                      <td className="py-3 text-right text-gray-300">${(item.initial).toLocaleString()}</td>
                      <td className="py-3 text-right text-white">${(item.current).toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-700/30">
                          {item.roi.toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 font-medium text-white">Total Average</td>
                    <td className="py-3 text-right text-gray-300">$1,350,000</td>
                    <td className="py-3 text-right text-white">$1,690,000</td>
                    <td className="py-3 text-right">
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-700/30">
                        25.2%
                      </Badge>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
