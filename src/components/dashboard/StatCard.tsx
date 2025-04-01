
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
      "overflow-hidden bg-black border-cyan-900/20 shadow-lg animate-fade-in card-hover relative",
      className
    )}>
      {/* Gradient top border */}
      <div className={cn(
        "h-1 w-full",
        trend === "up" ? "bg-gradient-to-r from-green-400 to-cyan-400" :
        trend === "down" ? "bg-gradient-to-r from-amber-400 to-red-400" :
        "bg-gradient-to-r from-blue-400 to-cyan-400"
      )}></div>
      
      <CardContent className="p-6 relative">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-blue-900/5 rounded-b-lg"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-sm font-medium text-cyan-300">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "inline-flex items-center text-xs font-medium rounded-full px-2 py-1",
                    trend === "up" && "bg-green-900/20 text-green-400 border border-green-500/30",
                    trend === "down" && "bg-red-900/20 text-red-400 border border-red-500/30",
                    trend === "neutral" && "bg-gray-900/20 text-gray-400 border border-gray-500/30"
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
            <div className="p-3 rounded-full bg-black border border-cyan-800/30 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
