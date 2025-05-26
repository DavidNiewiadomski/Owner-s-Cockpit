
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
// Local Contract type removed
import type { Contract as SupabaseContract } from '@/lib/supabase'; // Import Supabase Contract
import { 
  MoreHorizontal, 
  EyeIcon, 
  FileEdit, 
  FileWarning, 
  ArrowUpDown 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContractsTableProps {
  contracts: SupabaseContract[]; // Expect SupabaseContract array
}

export function ContractsTable({ contracts }: ContractsTableProps) {
  // Ensure sortColumn and handleSort are compatible with SupabaseContract keys
  const [sortColumn, setSortColumn] = useState<keyof SupabaseContract>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: keyof SupabaseContract) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedContracts = [...contracts].sort((a, b) => {
    // Handle cases where a value might be null or undefined for SupabaseContract
    const valueA = a[sortColumn] ?? ''; // Default to empty string for null/undefined
    const valueB = b[sortColumn] ?? ''; // Default to empty string for null/undefined
    
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

  // Status badge color mapping for SupabaseContract statuses
  // Supabase status values: 'draft' | 'in-review' | 'active' | 'expired' | 'terminated'
  const statusColor: Record<SupabaseContract['status'], string> = {
    'draft': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    'in-review': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'active': 'bg-green-500/20 text-green-400 border-green-500/50',
    'expired': 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    'terminated': 'bg-red-500/20 text-red-400 border-red-500/50'
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white">Contracts</CardTitle>
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
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Contract Type</TableHead> {/* Changed from Type */}
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
                    onClick={() => handleSort('value')}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Value
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('start_date')} {/* Changed to start_date */}
                    className="px-0 font-medium text-gray-400 hover:text-white"
                  >
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>End Date</TableHead> {/* Keep as is, will sort by end_date */}
                <TableHead>Contractor</TableHead> {/* Changed from Project to Contractor */}
                <TableHead>Project ID</TableHead> {/* Added Project ID */}
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContracts.map((contract) => (
                <TableRow key={contract.id} className="hover:bg-gray-800/50 border-gray-800">
                  <TableCell className="font-medium text-cyan-400">{contract.id}</TableCell>
                  <TableCell>{contract.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300">
                      {contract.contract_type} {/* Changed to contract_type */}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColor[contract.status]}`}>
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)} {/* Capitalize status */}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${contract.value.toLocaleString()}</TableCell>
                  <TableCell>{new Date(contract.start_date).toLocaleDateString()}</TableCell> {/* Changed to start_date */}
                  <TableCell>{new Date(contract.end_date).toLocaleDateString()}</TableCell> {/* Changed to end_date */}
                  <TableCell>{contract.contractor_name}</TableCell> {/* Changed to contractor_name */}
                  <TableCell>
                     <Badge variant="secondary" className="bg-gray-700/80 border-gray-600 hover:bg-gray-600/50">
                       {contract.project_id || 'N/A'} {/* Display project_id */}
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
                          <span>Edit Contract</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center text-gray-400 hover:text-white">
                          <FileWarning className="mr-2 h-4 w-4" />
                          <span>View Issues</span>
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
