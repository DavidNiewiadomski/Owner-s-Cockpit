
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function ProcurementHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Procurement Management</h1>
          <p className="text-gray-400 mt-2">
            Manage vendors, RFPs, purchase orders, and procurement analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Vendors"
          value="47"
          subtitle="Qualified & Approved"
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        />
        <StatCard
          title="Open RFPs"
          value="8"
          subtitle="Awaiting Responses"
          icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}
        />
        <StatCard
          title="This Month"
          value="$2.8M"
          subtitle="Total Procurement Value"
          icon={<TrendingUp className="h-5 w-5 text-blue-400" />}
        />
        <StatCard
          title="Cost Savings"
          value="12.5%"
          subtitle="vs Budget"
          icon={<TrendingUp className="h-5 w-5 text-green-400" />}
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
