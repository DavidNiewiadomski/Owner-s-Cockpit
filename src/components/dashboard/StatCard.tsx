
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden bg-gradient-to-br from-black to-gray-850 border border-cyan-800/40 shadow-lg animate-fade-in",
      className
    )}>
      {/* Vibrant gradient top border */}
      <div className={cn(
        "h-1 w-full",
        trend === "up" ? "bg-gradient-to-r from-emerald-400 to-green-500" :
        trend === "down" ? "bg-gradient-to-r from-red-400 to-rose-500" :
        "bg-gradient-to-r from-blue-400 to-cyan-500"
      )}></div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-cyan-300">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            {description && (
              <p className="text-sm text-cyan-100/90 mt-1">{description}</p>
            )}
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "inline-flex items-center text-xs font-medium rounded-full px-2 py-0.5",
                    trend === "up" && "bg-green-900/30 text-green-300 border border-green-500/40",
                    trend === "down" && "bg-red-900/30 text-red-300 border border-red-500/40",
                    trend === "neutral" && "bg-gray-900/30 text-gray-200 border border-gray-500/40"
                  )}
                >
                  {trend === "up" && (
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                  {trend === "down" && (
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className="p-2.5 rounded-full bg-black/50 border border-cyan-500/30">
              <Icon className="h-5 w-5 text-cyan-300" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
