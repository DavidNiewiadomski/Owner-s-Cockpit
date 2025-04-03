
import React from 'react';
import { Contract, ContractMilestone } from '@/data/contracts/contractsData';
import { ContractsTable } from './ContractsTable';
import { ContractMilestonesTable } from './ContractMilestonesTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CalendarClock, DollarSign } from 'lucide-react';

interface ContractsTabProps {
  contracts: Contract[];
  milestones: ContractMilestone[];
}

export function ContractsTab({ contracts, milestones }: ContractsTabProps) {
  // Calculate contracts overview stats
  const activeContracts = contracts.filter(c => c.status === 'Active').length;
  const totalContractValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const pendingApproval = contracts.filter(c => c.status === 'In Review' || c.status === 'Draft').length;
  
  // Calculate milestones stats
  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;
  const upcomingMilestones = milestones.filter(m => m.status === 'Pending').length;
  const totalMilestoneValue = milestones.reduce((sum, milestone) => sum + milestone.value, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <FileText className="h-4 w-4 mr-2 text-cyan-400" />
              Active Contracts
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {activeContracts} <span className="text-sm text-gray-400">/ {contracts.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Total value: <span className="text-white font-medium">${totalContractValue.toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <CalendarClock className="h-4 w-4 mr-2 text-purple-400" />
              Contract Milestones
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {completedMilestones} <span className="text-sm text-gray-400">/ {milestones.length} completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              {upcomingMilestones} upcoming, worth <span className="text-white font-medium">${totalMilestoneValue.toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-gray-400">
              <DollarSign className="h-4 w-4 mr-2 text-green-400" />
              Pending Approvals
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {pendingApproval}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-xs text-gray-300">
                {contracts.filter(c => c.status === 'In Review').length} In Review
              </Badge>
              <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-xs text-gray-300">
                {contracts.filter(c => c.status === 'Draft').length} Drafts
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <ContractsTable contracts={contracts} />
      
      {/* Contract Milestones Table */}
      <ContractMilestonesTable milestones={milestones} contracts={contracts} />
    </div>
  );
}
