
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
      "overflow-hidden bg-black border-cyan-900/60 shadow-lg animate-fade-in card-hover relative",
      className
    )}>
      {/* Vibrant gradient top border */}
      <div className={cn(
        "h-1.5 w-full",
        trend === "up" ? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" :
        trend === "down" ? "bg-gradient-to-r from-red-400 via-rose-500 to-amber-400" :
        "bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-400"
      )}></div>
      
      <CardContent className="p-6 relative">
        {/* Enhanced background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-b-lg"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-sm font-medium text-cyan-200">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            {description && (
              <p className="text-sm text-white mt-1 font-medium">{description}</p>
            )}
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "inline-flex items-center text-xs font-medium rounded-full px-2 py-1",
                    trend === "up" && "bg-green-900/50 text-green-300 border border-green-500/70 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
                    trend === "down" && "bg-red-900/50 text-red-300 border border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
                    trend === "neutral" && "bg-gray-900/50 text-gray-200 border border-gray-500/70 shadow-[0_0_10px_rgba(107,114,128,0.3)]"
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
            <div className="p-3 rounded-full bg-gradient-to-br from-black to-gray-900 border border-cyan-500/70 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse-glow">
              <Icon className="h-5 w-5 text-cyan-300" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
