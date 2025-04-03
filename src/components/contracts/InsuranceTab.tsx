
import React from 'react';
import { Insurance } from '@/data/contracts/contractsData';
import { InsuranceTable } from './InsuranceTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Calendar, AlertCircle } from 'lucide-react';

interface InsuranceTabProps {
  insurances: Insurance[];
}

export function InsuranceTab({ insurances }: InsuranceTabProps) {
  // Calculate insurance overview stats
  const activeInsurance = insurances.filter(i => i.status === 'Active').length;
  const totalPremium = insurances.reduce((sum, insurance) => sum + insurance.premium, 0);
  const totalCoverage = insurances.reduce((sum, insurance) => sum + insurance.coverage, 0);
  
  // Find the nearest expiring policy
  const today = new Date();
  const upcomingExpirations = insurances
    .filter(i => i.status === 'Active')
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .filter(i => new Date(i.endDate) > today);
  
  const nearestExpiration = upcomingExpirations.length > 0 ? upcomingExpirations[0] : null;
  
  // Days until expiration
  const daysUntilExpiration = nearestExpiration 
    ? Math.ceil((new Date(nearestExpiration.endDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <ShieldCheck className="h-4 w-4 mr-2 text-cyan-400" />
              Active Policies
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {activeInsurance} <span className="text-sm text-gray-400">/ {insurances.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Total coverage: <span className="text-white font-medium">${totalCoverage.toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2 text-purple-400" />
              Next Expiration
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {nearestExpiration ? (
                <>{daysUntilExpiration} days</>
              ) : (
                <>N/A</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nearestExpiration ? (
              <p className="text-sm text-gray-400">
                {nearestExpiration.title} <br />
                <span className="text-white font-medium">Expires {new Date(nearestExpiration.endDate).toLocaleDateString()}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400">No upcoming expirations</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-400" />
              Premium Costs
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              ${totalPremium.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(insurances.map(i => i.type))).map(type => (
                <Badge key={type} variant="outline" className="bg-gray-800/50 border-gray-700 text-xs text-gray-300">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Table */}
      <InsuranceTable insurances={insurances} />
    </div>
  );
}
