
import React from 'react';

export function ProjectRisks() {
  // Sample risk data - in a real application, this would come from a database or API
  const risks = [
    {
      id: 1,
      title: "Supply Chain Disruption",
      impact: "High",
      probability: "Medium",
      mitigation: "Multiple suppliers identified and contracts in place with secondary vendors"
    },
    {
      id: 2,
      title: "Weather Delays",
      impact: "Medium",
      probability: "High",
      mitigation: "Schedule buffer added and weather-resistant construction methods implemented"
    },
    {
      id: 3,
      title: "Budget Overrun",
      impact: "High",
      probability: "Low",
      mitigation: "10% contingency fund allocated and weekly financial reviews"
    }
  ];

  return (
    <div className="bg-black text-white space-y-4">
      {risks.map(risk => (
        <div key={risk.id} className="border border-gray-700 rounded-md p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-white">{risk.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              risk.impact === 'High' ? 'bg-red-900 text-red-200' : 
              risk.impact === 'Medium' ? 'bg-amber-900 text-amber-200' : 
              'bg-blue-900 text-blue-200'
            }`}>
              {risk.impact} Impact
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              risk.probability === 'High' ? 'bg-red-900 text-red-200' : 
              risk.probability === 'Medium' ? 'bg-amber-900 text-amber-200' : 
              'bg-blue-900 text-blue-200'
            }`}>
              {risk.probability} Probability
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-400">
            <span className="font-medium text-gray-300">Mitigation:</span> {risk.mitigation}
          </p>
        </div>
      ))}
    </div>
  );
}
