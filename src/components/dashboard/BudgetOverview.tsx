
import React from 'react';

export interface BudgetOverviewProps {
  detailed?: boolean;
}

export function BudgetOverview({ detailed = false }: BudgetOverviewProps) {
  return (
    <div className="bg-black p-4 rounded-md text-white">
      <p>{detailed ? 'Detailed Budget Overview' : 'Budget Overview'} (placeholder)</p>
      <p className="text-sm text-gray-400 mt-2">This component will display financial information about the project.</p>
    </div>
  );
}
