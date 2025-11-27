import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6 text-center", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="h-10 w-10 rounded-full bg-[#F4511E]/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#F4511E]" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {trend && trendValue && (
        <div className="mt-4 flex items-center justify-center">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              trend === "up" && "bg-green-100 text-green-800",
              trend === "down" && "bg-red-100 text-red-800",
              trend === "neutral" && "bg-gray-100 text-gray-800",
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
          <span className="ml-2 text-xs text-gray-500">지난 달 대비</span>
        </div>
      )}
    </div>
  )
}
