
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
  ArrowUpRight,
  Bot,
  Calendar,
  MapPin,
  Zap,
  Clock
} from 'lucide-react';

export function DashboardHeader() {
  const aiInsights = [
    {
      id: 1,
      type: 'Schedule Update',
      icon: <Calendar className="h-4 w-4" />,
      title: 'Foundation work is ahead of schedule by 3 days.',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700/30'
    },
    {
      id: 2,
      type: 'Budget Alert',
      icon: <DollarSign className="h-4 w-4" />,
      title: 'Electrical subcontractor costs are 5% over projections.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/20',
      borderColor: 'border-amber-700/30'
    },
    {
      id: 3,
      type: 'Weather Impact',
      icon: <Zap className="h-4 w-4" />,
      title: 'Incoming storm system may affect exterior work next week.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700/30'
    },
    {
      id: 4,
      type: 'Material Delay',
      icon: <Clock className="h-4 w-4" />,
      title: 'Custom glass panels shipment delayed by 2 weeks.',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700/30'
    }
  ];

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
      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                  <Bot className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Insights for Dashboard</h2>
                  <p className="text-sm text-gray-400">Real-time intelligent project monitoring</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
              >
                Chat with AI
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`p-4 rounded-lg border ${insight.bgColor} ${insight.borderColor} backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                      <div className={insight.color}>
                        {insight.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${insight.color} border-current/30`}
                        >
                          {insight.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {insight.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <Card className={`bg-gradient-to-br ${stat.gradient} border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden relative group`}>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-300" />}
                      {stat.trend === 'critical' && <AlertTriangle className="h-4 w-4 text-red-300 animate-pulse" />}
                      <span>{stat.subtitle}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${stat.iconBg} backdrop-blur-sm`}>
                    <div className="text-white/90">
                      {stat.icon}
                    </div>
                  </div>
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
