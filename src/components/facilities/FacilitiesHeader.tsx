
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Wrench, Zap, Calendar } from 'lucide-react';

export function FacilitiesHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Facilities Management</h1>
          <p className="text-gray-400 mt-2">
            Manage assets, maintenance, energy systems, and tenant relations
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Assets"
          value="1,247"
          subtitle="Under Management"
          icon={<Building2 className="h-5 w-5 text-blue-400" />}
        />
        <StatCard
          title="Open Work Orders"
          value="23"
          subtitle="Pending Completion"
          icon={<Wrench className="h-5 w-5 text-amber-400" />}
        />
        <StatCard
          title="Energy Efficiency"
          value="94%"
          subtitle="Performance Score"
          icon={<Zap className="h-5 w-5 text-green-400" />}
        />
        <StatCard
          title="Occupancy Rate"
          value="96.8%"
          subtitle="Across All Properties"
          icon={<Building2 className="h-5 w-5 text-cyan-400" />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs mt-1 text-gray-400">{subtitle}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
