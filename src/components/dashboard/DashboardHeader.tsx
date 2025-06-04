
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CheckCircle, 
  DollarSign, 
  Building,
  AlertTriangle,
  MapPin
} from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">RFP MANAGEMENT</p>
                <p className="text-3xl font-bold text-white mb-2">8</p>
                <div className="flex items-center text-xs text-yellow-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Critical deadlines in next 48 hours
                </div>
              </div>
              <div className="bg-red-900/30 p-3 rounded-full">
                <FileText className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">CONTRACTS & APPROVALS</p>
                <p className="text-3xl font-bold text-white mb-2">12</p>
                <div className="flex items-center text-xs text-orange-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Pending approvals across all stages
                </div>
              </div>
              <div className="bg-orange-900/30 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">PORTFOLIO VALUE</p>
                <p className="text-3xl font-bold text-white mb-2">$1.2B</p>
                <div className="flex items-center text-xs text-green-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  Active development pipeline
                </div>
              </div>
              <div className="bg-green-900/30 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">ACTIVE PROPERTIES</p>
                <p className="text-3xl font-bold text-white mb-2">15+</p>
                <div className="flex items-center text-xs text-cyan-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  Site selection to facility management
                </div>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-full">
                <Building className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
