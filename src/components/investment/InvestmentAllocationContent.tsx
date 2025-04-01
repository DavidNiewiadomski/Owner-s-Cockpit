import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Building2,
  Home,
  Layers,
  TrendingUp,
  CircleDollarSign
} from 'lucide-react';

export function InvestmentAllocationContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Investment Allocation by Property Type</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Commercial</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Residential</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">Infrastructure</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">Mixed-Use</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Investment Allocation by Region</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">North America</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Europe</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Asia Pacific</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Latin America</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 bg-gray-900 border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Investment Performance by Project Stage</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Planning</h4>
              <CircleDollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">$12.4M</p>
            <p className="text-xs text-gray-400 mt-1">8 projects</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Development</h4>
              <CircleDollarSign className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold">$45.8M</p>
            <p className="text-xs text-gray-400 mt-1">12 projects</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Construction</h4>
              <CircleDollarSign className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold">$78.2M</p>
            <p className="text-xs text-gray-400 mt-1">15 projects</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Operational</h4>
              <CircleDollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold">$103.6M</p>
            <p className="text-xs text-gray-400 mt-1">10 projects</p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Investment by Risk Profile</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Low Risk</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2 bg-gray-800">
                <div className="h-full bg-blue-500 rounded-full" />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Medium Risk</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-gray-800">
                <div className="h-full bg-amber-500 rounded-full" />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">High Risk</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <Progress value={20} className="h-2 bg-gray-800">
                <div className="h-full bg-red-500 rounded-full" />
              </Progress>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Investment by Funding Source</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Equity</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Debt</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Mezzanine</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Government</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Investment by Timeline</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Short-term (< 2 years)</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Medium-term (2-5 years)</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Long-term (> 5 years)</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
