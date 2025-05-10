"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface ChartContainerProps {
  type: "candle" | "line" | "area"
  isLoading?: boolean
}

export function ChartContainer({ type, isLoading = false }: ChartContainerProps) {
  if (isLoading) {
    return (
      <div className="h-[600px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  return (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
      <p className="text-muted-foreground">
        {type === "candle" ? "K线图" : type === "line" ? "线图" : "面积图"}将在这里显示
      </p>
    </div>
  )
}
