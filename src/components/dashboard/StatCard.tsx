
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
      "overflow-hidden bg-gradient-to-br from-gray-900/95 to-black border-gray-800/50 shadow-xl animate-fade-in transition-all duration-300 hover:translate-y-[-4px]",
      className
    )}>
      {/* Color gradient top border based on trend */}
      <div className={cn(
        "h-1.5 w-full bg-gradient-to-r",
        trend === "up" ? "from-emerald-500 to-green-400" :
        trend === "down" ? "from-red-500 to-rose-400" :
        "from-blue-500 to-cyan-400"
      )}></div>
      
      <CardContent className="pt-6 pb-5 px-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1 opacity-80">{description}</p>
            )}
          </div>
          
          {Icon && (
            <div className="p-3 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 shadow-lg transform hover:rotate-3 transition-transform duration-200">
              <Icon className={cn(
                "h-6 w-6",
                trend === "up" ? "text-green-400" :
                trend === "down" ? "text-red-400" :
                "text-blue-400"
              )} />
            </div>
          )}
        </div>
        
        {trend && (
          <div className="mt-4">
            <div className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border",
              trend === "up" && "bg-green-900/30 text-green-300 border-green-700/40",
              trend === "down" && "bg-red-900/30 text-red-300 border-red-700/40",
              trend === "neutral" && "bg-blue-900/30 text-blue-300 border-blue-700/40"
            )}>
              {trend === "up" && (
                <svg
                  className="w-3 h-3 mr-1.5"
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
                  className="w-3 h-3 mr-1.5"
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
            </div>
          </div>
        )}
        
        {/* Add a subtle glow effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30">
          <div className={cn(
            "h-full w-16 mx-auto rounded-t-full blur-md",
            trend === "up" ? "bg-green-400" :
            trend === "down" ? "bg-red-400" :
            "bg-blue-400"
          )}></div>
        </div>
      </CardContent>
    </Card>
  );
}
