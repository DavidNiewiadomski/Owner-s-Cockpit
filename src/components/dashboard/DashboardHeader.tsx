
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Building2,
  BarChart3,
  Calendar,
  MapPin
} from 'lucide-react';

export function DashboardHeader() {
  const stats = [
    {
      title: 'RFP Management',
      value: '8',
      subtitle: 'Critical deadlines in next 48 hours',
      icon: <FileText className="h-8 w-8" />,
      gradient: 'from-red-600 via-red-700 to-red-800',
      iconBg: 'bg-red-500/20',
      trend: 'critical'
    },
    {
      title: 'Contracts & Approvals',
      value: '12',
      subtitle: 'Pending approvals across all stages',
      icon: <CheckCircle className="h-8 w-8" />,
      gradient: 'from-orange-600 via-orange-700 to-orange-800',
      iconBg: 'bg-orange-500/20',
      trend: 'critical'
    },
    {
      title: 'Portfolio Value',
      value: '$147M',
      subtitle: 'Active development pipeline',
      icon: <BarChart3 className="h-8 w-8" />,
      gradient: 'from-green-600 via-green-700 to-green-800',
      iconBg: 'bg-green-500/20',
      trend: 'up'
    },
    {
      title: 'Active Properties',
      value: '15+',
      subtitle: 'Site selection to facility management',
      icon: <Building2 className="h-8 w-8" />,
      gradient: 'from-blue-600 via-blue-700 to-blue-800',
      iconBg: 'bg-blue-500/20',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
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
                  {stat.trend === 'critical' && <AlertTriangle className="h-4 w-4 text-red-300 animate-pulse flex-shrink-0" />}
                  {stat.trend === 'up' && <MapPin className="h-4 w-4 text-green-300 flex-shrink-0" />}
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
      
      {/* Additional Info Badge */}
      <div className="flex justify-center">
        <Badge variant="outline" className="text-gray-400 border-gray-600 px-4 py-2">
          <MapPin className="h-4 w-4 mr-2" />
          This is a partial list - {Math.floor(Math.random() * 25) + 20} additional locations in portfolio
        </Badge>
      </div>
    </div>
  );
}
