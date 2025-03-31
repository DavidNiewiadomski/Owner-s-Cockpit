
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const FinancialRiskIndicators: React.FC = () => {
  return (
    <Card className="glass-card shadow-glow col-span-full lg:col-span-1 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Financial Risk Indicators
        </CardTitle>
        <CardDescription className="text-gray-400">
          Key metrics indicating financial health
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Debt Service Coverage</span>
              <span className="text-sm font-medium text-amber-400">1.2x</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-amber-500 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Below safe threshold (1.25x)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Cost Variance</span>
              <span className="text-sm font-medium text-red-400">+12.5%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-red-500 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Above contingency budget (10%)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Schedule Variance</span>
              <span className="text-sm font-medium text-amber-400">+18%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-amber-500 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Projected completion delay</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Loan Covenant Status</span>
              <span className="text-sm font-medium text-green-400">Compliance</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-green-500 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: '90%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Within acceptable parameters</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
