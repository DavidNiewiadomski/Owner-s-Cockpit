
import React from 'react';

interface ChartLegendProps {
  items: {
    label: string;
    color: string;
  }[];
}

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className="flex items-center gap-2">
      {items.map((item, index) => (
        <div key={index} className={`flex items-center h-6 px-2 text-xs rounded-full bg-${item.color}-950/80 text-${item.color}-400 border border-${item.color}-700/50 shadow-${item.color}`}>
          <span className={`w-2 h-2 mr-1 rounded-full bg-${item.color}-500`}></span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
