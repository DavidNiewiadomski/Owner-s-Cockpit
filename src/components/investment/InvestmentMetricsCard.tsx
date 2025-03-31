
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';

interface InvestmentMetric {
  label: string;
  original: string;
  current: string;
  impact: 'negative' | 'positive';
  variance: string;
}

interface InvestmentMetricsCardProps {
  metrics: InvestmentMetric[];
  activeAnimation: boolean;
}

export const InvestmentMetricsCard: React.FC<InvestmentMetricsCardProps> = ({ 
  metrics, 
  activeAnimation 
}) => {
  return (
    <Card className="glass-card shadow-glow col-span-full md:col-span-1 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-500" />
          ROI Impact Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">{metric.original}</span>
                  <span className={metric.impact === 'negative' ? 'text-red-400' : 'text-green-400'}>
                    {metric.current}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Variance</span>
                <span className={metric.impact === 'negative' ? 'text-red-400' : 'text-green-400'}>
                  {metric.variance}
                </span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full mt-1">
                <div 
                  className={`h-1 rounded-full ${
                    metric.impact === 'negative' ? 'bg-red-500' : 'bg-green-500'
                  } transition-all duration-1000 ease-in-out ${
                    activeAnimation ? 'opacity-70' : 'opacity-100'
                  }`}
                  style={{ width: `${metric.impact === 'negative' ? '75%' : '85%'}` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
