
import React from 'react';

export interface InvestmentInsight {
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
  
  return (
    <div className="space-y-4">
      {investmentInsights.map((insight, index) => (
        <div key={index} className={`p-4 rounded-lg border ${
          insight.type === 'info' ? 'bg-blue-50 border-blue-200' :
          insight.type === 'warning' ? 'bg-amber-50 border-amber-200' :
          'bg-green-50 border-green-200'
        }`}>
          <h3 className="font-semibold text-lg">{insight.title}</h3>
          <p className="text-sm text-gray-700">{insight.content}</p>
        </div>
      ))}
    </div>
  );
};

// Helper function to get insights without rendering
export const getInvestmentInsights = (projectId: string): InvestmentInsight[] => {
  return [
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
};
