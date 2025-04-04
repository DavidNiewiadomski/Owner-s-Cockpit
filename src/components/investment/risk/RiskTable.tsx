
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, ArrowUpDown, DownloadIcon } from 'lucide-react';
import { Risk } from '@/data/investment/riskData';

interface RiskTableProps {
  riskData: Risk[];
}

export function RiskTable({ riskData }: RiskTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Risk>('severity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Risk) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedRisks = [...riskData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <Card className="md:col-span-2 bg-black border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Major Risks and Status</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-900">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-900">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-900/50">
                <TableHead className="text-gray-400" onClick={() => handleSort('id')}>
                  <div className="flex items-center cursor-pointer">
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-400" onClick={() => handleSort('name')}>
                  <div className="flex items-center cursor-pointer">
                    Risk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-400" onClick={() => handleSort('severity')}>
                  <div className="flex items-center cursor-pointer">
                    Severity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-400" onClick={() => handleSort('likelihood')}>
                  <div className="flex items-center cursor-pointer">
                    Likelihood
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-400" onClick={() => handleSort('status')}>
                  <div className="flex items-center cursor-pointer">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRisks.slice(0, 5).map((risk) => (
                <TableRow key={risk.id} className="hover:bg-gray-900/50">
                  <TableCell className="font-medium text-gray-300">{risk.id}</TableCell>
                  <TableCell>{risk.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        risk.severity === 'High' 
                          ? "bg-red-900/20 text-red-400 border-red-700/30" 
                          : risk.severity === 'Medium'
                            ? "bg-amber-900/20 text-amber-400 border-amber-700/30"
                            : "bg-green-900/20 text-green-400 border-green-700/30"
                      }
                    >
                      {risk.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        risk.likelihood === 'High' 
                          ? "bg-red-900/20 text-red-400 border-red-700/30" 
                          : risk.likelihood === 'Medium'
                            ? "bg-amber-900/20 text-amber-400 border-amber-700/30"
                            : "bg-blue-900/20 text-blue-400 border-blue-700/30"
                      }
                    >
                      {risk.likelihood}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        risk.status === 'Active' 
                          ? "bg-red-900/20 text-red-400 border-red-700/30" 
                          : risk.status === 'Mitigated'
                            ? "bg-green-900/20 text-green-400 border-green-700/30"
                            : "bg-blue-900/20 text-blue-400 border-blue-700/30"
                      }
                    >
                      {risk.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
