
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Risk } from '@/data/investment/riskData';

interface RiskMitigationPlansTableProps {
  risks: Risk[];
}

export function RiskMitigationPlansTable({ risks }: RiskMitigationPlansTableProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-black border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Risk Mitigation Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-900/50">
                <TableHead className="text-gray-400">Risk ID</TableHead>
                <TableHead className="text-gray-400">Risk Name</TableHead>
                <TableHead className="text-gray-400">Mitigation Plan</TableHead>
                <TableHead className="text-gray-400">Owner</TableHead>
                <TableHead className="text-gray-400">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.slice(0, 3).map((risk) => (
                <TableRow key={`${risk.id}-plan`} className="hover:bg-gray-900/50">
                  <TableCell className="font-medium text-gray-300">{risk.id}</TableCell>
                  <TableCell>{risk.name}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2">{risk.mitigation}</p>
                  </TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>{risk.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 hover:bg-gray-900"
            onClick={() => navigate('/risk-mitigation-plans')}
          >
            View All Mitigation Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
