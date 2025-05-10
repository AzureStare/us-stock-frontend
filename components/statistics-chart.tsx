"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface StatisticsChartProps {
  type: "bar" | "line" | "scatter" | "area" | "heatmap"
  isLoading?: boolean
}

export function StatisticsChart({ type, isLoading = false }: StatisticsChartProps) {
  if (isLoading) {
    return (
      <div className="h-[400px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
      <p className="text-muted-foreground">
        {type === "bar"
          ? "柱状图"
          : type === "line"
            ? "线图"
            : type === "scatter"
              ? "散点图"
              : type === "area"
                ? "面积图"
                : "热力图"}
        将在这里显示
      </p>
    </div>
  )
}
