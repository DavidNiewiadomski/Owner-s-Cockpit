
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useProject } from "@/contexts/ProjectContext";

const data = [
  {
    month: "Jan",
    inflow: 320000,
    outflow: 285000,
    cashBalance: 35000
  },
  {
    month: "Feb",
    inflow: 450000,
    outflow: 420000,
    cashBalance: 65000
  },
  {
    month: "Mar",
    inflow: 380000,
    outflow: 365000,
    cashBalance: 80000
  },
  {
    month: "Apr",
    inflow: 520000,
    outflow: 490000,
    cashBalance: 110000
  },
  {
    month: "May",
    inflow: 480000,
    outflow: 510000,
    cashBalance: 80000
  },
  {
    month: "Jun",
    inflow: 560000,
    outflow: 530000,
    cashBalance: 110000
  },
  {
    month: "Jul",
    inflow: 620000,
    outflow: 580000,
    cashBalance: 150000
  },
  {
    month: "Aug",
    inflow: 580000,
    outflow: 620000,
    cashBalance: 110000
  },
  {
    month: "Sep",
    inflow: 490000,
    outflow: 510000,
    cashBalance: 90000
  },
  {
    month: "Oct",
    inflow: 530000,
    outflow: 480000,
    cashBalance: 140000
  },
  {
    month: "Nov",
    inflow: 450000,
    outflow: 470000,
    cashBalance: 120000
  },
  {
    month: "Dec",
    inflow: 380000,
    outflow: 410000,
    cashBalance: 90000
  }
];

export function CashFlowForecastChart() {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const chartConfig = {
    inflow: {
      label: "Cash Inflow",
      theme: {
        light: "rgba(16, 185, 129, 0.7)",
        dark: "rgba(16, 185, 129, 0.7)"
      }
    },
    outflow: {
      label: "Cash Outflow",
      theme: {
        light: "rgba(239, 68, 68, 0.7)",
        dark: "rgba(239, 68, 68, 0.7)"
      }
    },
    cashBalance: {
      label: "Cash Balance",
      theme: {
        light: "rgba(59, 130, 246, 0.9)",
        dark: "rgba(59, 130, 246, 0.9)"
      }
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cash Flow Forecast</CardTitle>
        <CardDescription>
          Monthly cash projections for {projectName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="font-medium">{label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="text-green-500">
                              Inflow: {formatCurrency(payload[0].payload.inflow)}
                            </div>
                            <div className="text-red-500">
                              Outflow: {formatCurrency(payload[0].payload.outflow)}
                            </div>
                            <div className="text-blue-500 font-medium">
                              Balance: {formatCurrency(payload[0].payload.cashBalance)}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  fill="var(--color-inflow)"
                  stroke="var(--color-inflow)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  fill="var(--color-outflow)"
                  stroke="var(--color-outflow)" 
                  fillOpacity={0.3}
                />
                <ReferenceLine y={0} stroke="#666" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
