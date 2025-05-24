
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Shield, AlertTriangle, TrendingUp } from 'lucide-react';

export function QualityControlHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Quality Control</h1>
          <p className="text-gray-400 mt-2">
            Monitor quality metrics, inspections, and compliance standards
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Schedule Inspection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Quality Score"
          value="94.2%"
          subtitle="Overall Rating"
          icon={<Shield className="h-5 w-5 text-green-400" />}
        />
        <StatCard
          title="Inspections"
          value="156"
          subtitle="This Month"
          icon={<ClipboardCheck className="h-5 w-5 text-blue-400" />}
        />
        <StatCard
          title="Non-Conformance"
          value="3"
          subtitle="Active Issues"
          icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}
        />
        <StatCard
          title="Improvement"
          value="+12%"
          subtitle="vs Last Month"
          icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
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
