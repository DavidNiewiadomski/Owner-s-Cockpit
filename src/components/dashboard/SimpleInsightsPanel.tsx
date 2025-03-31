
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

type InsightType = 'warning' | 'info' | 'success';

interface Insight {
  text: string;
  type: InsightType;
}

interface SimpleInsightsPanelProps {
  title?: string;
  projectName?: string;
  insights: string[];
}

export const SimpleInsightsPanel: React.FC<SimpleInsightsPanelProps> = ({
  title = 'Project Insights',
  projectName,
  insights = []
}) => {
  const getIconForType = (type: InsightType) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Simple insight parsing - assumes first word might indicate type
  const parseInsight = (text: string): Insight => {
    if (text.toLowerCase().includes('warning') || 
        text.toLowerCase().includes('alert') || 
        text.toLowerCase().includes('issue')) {
      return { text, type: 'warning' };
    } else if (text.toLowerCase().includes('complete') || 
               text.toLowerCase().includes('success') ||
               text.toLowerCase().includes('finished')) {
      return { text, type: 'success' };
    }
    return { text, type: 'info' };
  };

  const parsedInsights = insights.map(parseInsight);

  if (insights.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gray-900 border-gray-800 mb-6">
      <CardHeader className="pb-2 px-4 pt-4">
        <CardTitle className="text-lg font-medium">
          {title} {projectName && `for ${projectName}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-3">
          {parsedInsights.map((insight, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-md bg-gray-800 border border-gray-700"
            >
              <span className="mt-0.5">{getIconForType(insight.type)}</span>
              <p className="text-sm text-gray-300">{insight.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
