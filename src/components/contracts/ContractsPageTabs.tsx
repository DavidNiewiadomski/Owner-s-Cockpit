
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, ShieldCheck } from 'lucide-react';
import { ContractsTab } from './ContractsTab';
import { InsuranceTab } from './InsuranceTab';
// Local Contract type removed, ContractMilestone and Insurance kept for now
import { ContractMilestone, Insurance } from '@/data/contracts/contractsData';
import type { Contract as SupabaseContract } from '@/lib/supabase'; // Import Supabase Contract

interface ContractsPageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  contracts: SupabaseContract[]; // Expect SupabaseContract array
  milestones: ContractMilestone[];
  insurances: Insurance[];
}

export function ContractsPageTabs({ 
  activeTab, 
  setActiveTab,
  contracts,
  milestones,
  insurances
}: ContractsPageTabsProps) {
  return (
    <Tabs defaultValue={activeTab} className="space-y-8" onValueChange={setActiveTab}>
      <TabsList className="bg-gray-900/40 border border-gray-800 rounded-md p-1 w-full flex justify-start overflow-x-auto">
        <TabsTrigger 
          value="contracts" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          <FileText className="h-4 w-4 mr-2" />
          Contracts
        </TabsTrigger>
        <TabsTrigger 
          value="insurance" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          Insurance
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="contracts" className="space-y-6 animate-in fade-in-50 duration-300">
        <ContractsTab contracts={contracts} milestones={milestones} />
      </TabsContent>
      
      <TabsContent value="insurance" className="space-y-6 animate-in fade-in-50 duration-300">
        <InsuranceTab insurances={insurances} />
      </TabsContent>
    </Tabs>
  );
}
