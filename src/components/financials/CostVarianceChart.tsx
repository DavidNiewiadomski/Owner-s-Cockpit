
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useProject } from "@/contexts/ProjectContext";

const data = [
  {
    name: "Site Work",
    planned: 425000,
    actual: 412750,
    variance: 12250,
  },
  {
    name: "Structural Framing",
    planned: 720000,
    actual: 748800,
    variance: -28800,
  },
  {
    name: "Electrical",
    planned: 345000,
    actual: 341550,
    variance: 3450,
  },
  {
    name: "Plumbing & HVAC",
    planned: 520000,
    actual: 546000,
    variance: -26000,
  },
  {
    name: "Interior Finishes",
    planned: 635000,
    actual: 622300,
    variance: 12700,
  },
  {
    name: "Exterior Facades",
    planned: 390000,
    actual: 409500,
    variance: -19500,
  },
];

export function CostVarianceChart() {
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
  
  // Updated chart config with futuristic colors
  const chartConfig = {
    planned: {
      label: "Planned",
      theme: {
        light: "rgba(56, 189, 248, 0.9)", // Bright cyan
        dark: "rgba(56, 189, 248, 0.9)"
      }
    },
    actual: {
      label: "Actual",
      theme: {
        light: "rgba(168, 85, 247, 0.9)", // Bright purple
        dark: "rgba(168, 85, 247, 0.9)"
      }
    }
  };
  
  return (
    <Card className="h-full bg-black border-cyan-900/30">
      <CardHeader className="bg-black">
        <CardTitle className="text-blue-300">Cost Variances by Category</CardTitle>
        <CardDescription>
          Planned vs actual costs for {projectName}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-black">
        <div className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 70, // Increased bottom margin to prevent text overlap
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#94a3b8" }} 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#475569"
                  tickMargin={10} // Added margin between text and axis
                />
                <YAxis 
                  tickFormatter={(value) => `$${value / 1000}k`}
                  width={60}
                  tick={{ fill: "#94a3b8" }}
                  stroke="#475569"
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-cyan-800/50 bg-black p-2 shadow-blue-900/20 shadow-lg backdrop-blur-sm">
                          <div className="font-medium text-blue-300">{payload[0].payload.name}</div>
                          <div className="text-xs text-cyan-200 mt-1">
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
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => <span className="text-gray-300">{value}</span>}
                />
                <Bar 
                  dataKey="planned" 
                  fill="var(--color-planned)" 
                  name="Planned" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="actual" 
                  fill="var(--color-actual)" 
                  name="Actual" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
