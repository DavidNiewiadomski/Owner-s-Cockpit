
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Wrench, Users, BarChart3 } from 'lucide-react';

export function ResourceManagementHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Resource Management</h1>
          <p className="text-gray-400 mt-2">
            Manage equipment, materials, labor, and resource analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Truck className="h-4 w-4 mr-2" />
            Request Resources
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Equipment"
          value="127"
          subtitle="Units Deployed"
          icon={<Wrench className="h-5 w-5 text-blue-400" />}
        />
        <StatCard
          title="Material Inventory"
          value="$1.2M"
          subtitle="Current Value"
          icon={<Truck className="h-5 w-5 text-green-400" />}
        />
        <StatCard
          title="Labor Force"
          value="248"
          subtitle="Active Workers"
          icon={<Users className="h-5 w-5 text-purple-400" />}
        />
        <StatCard
          title="Utilization Rate"
          value="87%"
          subtitle="Overall Efficiency"
          icon={<BarChart3 className="h-5 w-5 text-cyan-400" />}
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
