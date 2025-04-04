
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  TrendingUp,
  DollarSign,
  Clock,
  Building
} from 'lucide-react';
import { InvestmentStat } from './types';

// Sample data for investment stats
const investmentStats: InvestmentStat[] = [
  {
    title: 'Total Investment',
    value: '$86.4M',
    change: {
      value: '12.5%',
      trend: 'up'
    },
    icon: DollarSign
  },
  {
    title: 'Annual Return',
    value: '8.2%',
    change: {
      value: '2.1%',
      trend: 'up'
    },
    icon: TrendingUp
  },
  {
    title: 'Average Timeline',
    value: '36 mo',
    change: {
      value: '3 mo',
      trend: 'down'
    },
    icon: Clock
  },
  {
    title: 'Active Projects',
    value: '8',
    change: {
      value: '2',
      trend: 'up'
    },
    icon: Building
  }
];

export function InvestmentStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {investmentStats.map((stat, index) => (
        <Card key={index} className="bg-black border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
                <div className={`flex items-center mt-2 text-xs ${
                  stat.change.trend === 'up' ? 'text-green-400' : 
                  stat.change.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : stat.change.trend === 'down' ? (
                    <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                  ) : null}
                  <span>{stat.change.value} {stat.change.trend !== 'neutral' && (stat.change.trend === 'up' ? 'increase' : 'decrease')}</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gray-800">
                <stat.icon className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
