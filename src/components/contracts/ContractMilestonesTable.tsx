
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ContractMilestone, Contract } from '@/data/contracts/contractsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, AlertTriangle } from 'lucide-react';

interface ContractMilestonesTableProps {
  milestones: ContractMilestone[];
  contracts: Contract[];
}

export function ContractMilestonesTable({ milestones, contracts }: ContractMilestonesTableProps) {
  // Helper function to get contract title by ID
  const getContractTitle = (contractId: string): string => {
    const contract = contracts.find(c => c.id === contractId);
    return contract ? contract.title : 'Unknown Contract';
  };

  // Status badge color and icon mapping
  const statusConfig = {
    'Completed': {
      color: 'bg-green-500/20 text-green-400 border-green-500/50',
      icon: <Check className="h-3.5 w-3.5 mr-1" />
    },
    'Pending': {
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      icon: <Clock className="h-3.5 w-3.5 mr-1" />
    },
    'Delayed': {
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white">Contract Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/50 border-gray-800">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.id} className="hover:bg-gray-800/50 border-gray-800">
                  <TableCell className="font-medium text-cyan-400">{milestone.id}</TableCell>
                  <TableCell>{milestone.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={getContractTitle(milestone.contractId)}>
                    {getContractTitle(milestone.contractId)}
                  </TableCell>
                  <TableCell>{new Date(milestone.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${statusConfig[milestone.status].color} flex items-center w-fit`}
                    >
                      {statusConfig[milestone.status].icon}
                      {milestone.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${milestone.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
