"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

// 模拟数据
const recentBacktests = [
  {
    id: 1,
    name: "均线交叉策略回测 - SPY",
    status: "completed",
    date: "2025-05-08",
    returns: "+3.2%",
  },
  {
    id: 2,
    name: "动量反转策略回测 - QQQ",
    status: "completed",
    date: "2025-05-07",
    returns: "+5.7%",
  },
  {
    id: 3,
    name: "波动率突破策略回测 - AAPL",
    status: "running",
    date: "2025-05-08",
    returns: "-",
  },
  {
    id: 4,
    name: "基本面筛选策略回测 - 科技板块",
    status: "failed",
    date: "2025-05-05",
    returns: "-",
  },
]

export function RecentBacktests() {
  return (
    <div className="space-y-4">
      {recentBacktests.map((backtest) => (
        <div key={backtest.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{backtest.name}</span>
              <Badge
                variant={
                  backtest.status === "completed"
                    ? "default"
                    : backtest.status === "running"
                      ? "outline"
                      : "destructive"
                }
                className="text-xs"
              >
                {backtest.status === "completed" ? "已完成" : backtest.status === "running" ? "进行中" : "失败"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{backtest.date}</span>
              {backtest.returns !== "-" && (
                <span className={backtest.returns.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {backtest.returns}
                </span>
              )}
            </div>
          </div>
          <Link href={`/backtests/${backtest.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-1" /> 查看
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
