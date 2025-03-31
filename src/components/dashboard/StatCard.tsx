
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon | ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  format?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  format,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-black border-gray-700", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">
              {format === "percent" ? `${value}%` : format === "days" ? `${value} days` : value}
            </h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            )}
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "inline-flex items-center text-xs font-medium",
                    trend === "up" && "text-green-600 dark:text-green-400",
                    trend === "down" && "text-red-600 dark:text-red-400",
                    trend === "neutral" && "text-gray-500"
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
          
          <div className="p-3 rounded-full bg-black border border-construction-800/30">
            {Icon && typeof Icon === 'function' ? (
              React.createElement(Icon, { className: "w-5 h-5 text-construction-600 dark:text-construction-400" })
            ) : (
              // For ReactNode icons
              Icon
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
