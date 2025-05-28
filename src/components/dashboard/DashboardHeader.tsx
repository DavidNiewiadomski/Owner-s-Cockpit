
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  DollarSign, 
  Users, 
  AlertTriangle,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export function DashboardHeader() {
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      subtitle: '+2 this month',
      icon: <Building2 className="h-8 w-8" />,
      gradient: 'from-blue-600 via-blue-700 to-blue-800',
      iconBg: 'bg-blue-500/20',
      trend: 'up'
    },
    {
      title: 'Total Budget',
      value: '$125,000,000',
      subtitle: '63% utilized',
      icon: <DollarSign className="h-8 w-8" />,
      gradient: 'from-green-600 via-green-700 to-green-800',
      iconBg: 'bg-green-500/20',
      trend: 'up'
    },
    {
      title: 'Team Members',
      value: '156',
      subtitle: 'Across 12 projects',
      icon: <Users className="h-8 w-8" />,
      gradient: 'from-orange-600 via-orange-700 to-orange-800',
      iconBg: 'bg-orange-500/20',
      trend: 'stable'
    },
    {
      title: 'Critical Tasks',
      value: '8',
      subtitle: 'Require immediate attention',
      icon: <AlertTriangle className="h-8 w-8" />,
      gradient: 'from-red-600 via-red-700 to-red-800',
      iconBg: 'bg-red-500/20',
      trend: 'critical'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <Card className={`h-full bg-gradient-to-br ${stat.gradient} border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden relative group`}>
              <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between min-h-[160px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-3 flex-1">
                    <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-white break-words">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-full ${stat.iconBg} backdrop-blur-sm flex-shrink-0 ml-4`}>
                    <div className="text-white/90">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-white/70 mt-auto">
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-300 flex-shrink-0" />}
                  {stat.trend === 'critical' && <AlertTriangle className="h-4 w-4 text-red-300 animate-pulse flex-shrink-0" />}
                  <span className="break-words">{stat.subtitle}</span>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ maskImage: 'linear-gradient(90deg, transparent, black, transparent)' }} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
