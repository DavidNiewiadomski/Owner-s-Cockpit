
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

interface ChartTabContentProps {
  chartType: string;
  setChartType: (value: string) => void;
  onAddChart: () => void;
}

export function ChartTabContent({ chartType, setChartType, onAddChart }: ChartTabContentProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="chart-type" className="text-gray-300">Chart Type</Label>
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger id="chart-type" className="bg-gray-900 border-cyan-900/30">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-cyan-900/30">
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-cyan-400" />
                Bar Chart
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="h-4 w-4 mr-2 text-green-400" />
                Line Chart
              </div>
            </SelectItem>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="h-4 w-4 mr-2 text-purple-400" />
                Pie Chart
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        onClick={onAddChart}
      >
        Add Chart
      </Button>
    </div>
  );
}
