
import React from "react";
import { formatCurrency } from "./CostVarianceData";

interface CostVarianceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CostVarianceTooltip: React.FC<CostVarianceTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-cyan-700/40 backdrop-blur-lg rounded-lg shadow-lg py-2 px-3 text-white">
        <p className="text-cyan-400 font-semibold">{label}</p>
        <div className="text-sm text-cyan-200 space-y-1">
          <div>Planned: {formatCurrency(payload[0].payload.planned)}</div>
          <div>Actual: {formatCurrency(payload[0].payload.actual)}</div>
          <div className={payload[0].payload.variance >= 0 ? "text-emerald-400" : "text-rose-400"}>
            Variance: {formatCurrency(payload[0].payload.variance)}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
