
import React from 'react';

interface InvestmentInsight {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
}

interface InvestmentInsightsProps {
  projectId: string;
  projectName: string;
}

export const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({
  projectId,
  projectName
}) => {
  // Create investment insights based on the project
  const investmentInsights: InvestmentInsight[] = [
    {
      title: 'ROI Forecast',
      content: projectId === '1' ? 'East Tower ROI forecast adjusted to 18.2% (down 1.3%) due to material cost increases' :
               projectId === '2' ? 'Green Valley ROI holding steady at 22.1% despite schedule delays' :
               projectId === '3' ? 'Bridge project ROI projected at 15.6%, below initial target of 17%' :
               'Portfolio ROI forecast adjusted to 19.5% (down 0.8%) due to market conditions',
      type: 'info'
    },
    {
      title: 'Budget Alert',
      content: projectId === '1' ? 'East Tower contingency fund usage at 62%, exceeding projected 40% at this stage' :
               projectId === '2' ? 'Green Valley budget line items for landscaping exceed allocation by 23%' :
               projectId === '3' ? 'Bridge project emergency reinforcement costs require budget reallocation' :
               'Three projects currently exceeding quarterly budget allocation by >15%',
      type: 'warning'
    },
    {
      title: 'Market Impact',
      content: projectId === '1' ? 'Luxury condo market showing 6% appreciation, positive for East Tower valuation' :
               projectId === '2' ? 'Sustainable development tax incentives increase Green Valley projected returns' :
               projectId === '3' ? 'Infrastructure funding increase approved, positive for Bridge project financing' :
               'Construction material costs stabilizing, positive outlook for Q3 procurement',
      type: 'success'
    }
  ];
  
  return { investmentInsights };
};
