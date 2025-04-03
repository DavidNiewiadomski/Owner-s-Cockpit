
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Insurance } from '@/data/contracts/contractsData';
import { 
  MoreHorizontal, 
  EyeIcon, 
  FileEdit, 
  Calendar, 
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InsuranceTableProps {
  insurances: Insurance[];
}

export function InsuranceTable({ insurances }: InsuranceTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Insurance>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: keyof Insurance) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedInsurances = [...insurances].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    return 0;
  });

  // Status badge color mapping
  const statusColor = {
    'Active': 'bg-green-500/20 text-green-400 border-green-500/50',
    'Pending': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'Expired': 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    'Renewed': 'bg-purple-500/20 text-purple-400 border-purple-500/50'
  };

  // Check if policy is expiring soon (less than 30 days)
  const isExpiringSoon = (endDate: string): boolean => {
    const today = new Date();
    const expiryDate = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white">Insurance Policies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/50 border-gray-800">
                <TableHead className="w-[100px]">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('id')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('title')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Policy Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('status')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('premium')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Premium
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Coverage</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('endDate')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Expiry Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInsurances.map((insurance) => (
                <TableRow key={insurance.id} className="hover:bg-gray-800/50 border-gray-800">
                  <TableCell className="font-medium text-cyan-400">{insurance.id}</TableCell>
                  <TableCell>{insurance.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300">
                      {insurance.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColor[insurance.status]}`}>
                      {insurance.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${insurance.premium.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">${insurance.coverage.toLocaleString()}</TableCell>
                  <TableCell>{insurance.provider}</TableCell>
                  <TableCell className="flex items-center">
                    {isExpiringSoon(insurance.endDate) && insurance.status === 'Active' && (
                      <AlertCircle className="h-4 w-4 text-amber-400 mr-1.5" />
                    )}
                    {new Date(insurance.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/50">
                      {insurance.project}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem className="cursor-pointer flex items-center text-gray-400 hover:text-white">
                          <EyeIcon className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center text-gray-400 hover:text-white">
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Edit Policy</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center text-gray-400 hover:text-white">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Renew Policy</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
