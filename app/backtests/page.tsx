"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpDown, Eye, Trash2, Plus } from "lucide-react"

// 模拟回测数据
const mockBacktests = [
  {
    id: 1,
    name: "均线交叉策略回测 - SPY",
    strategyName: "均线交叉策略",
    symbol: "SPY",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    status: "completed",
    created: "2025-05-01",
    returns: "+15.2%",
    sharpeRatio: "1.32",
    maxDrawdown: "-8.5%",
  },
  {
    id: 2,
    name: "动量反转策略回测 - QQQ",
    strategyName: "动量反转策略",
    symbol: "QQQ",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    status: "completed",
    created: "2025-04-28",
    returns: "+22.7%",
    sharpeRatio: "1.65",
    maxDrawdown: "-12.3%",
  },
  {
    id: 3,
    name: "波动率突破策略回测 - AAPL",
    strategyName: "波动率突破策略",
    symbol: "AAPL",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    status: "running",
    created: "2025-05-08",
    returns: "-",
    sharpeRatio: "-",
    maxDrawdown: "-",
  },
  {
    id: 4,
    name: "季节性交易策略回测 - XLF",
    strategyName: "季节性交易策略",
    symbol: "XLF",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    status: "completed",
    created: "2025-04-15",
    returns: "+8.9%",
    sharpeRatio: "0.95",
    maxDrawdown: "-6.2%",
  },
  {
    id: 5,
    name: "基本面筛选策略回测 - 科技板块",
    strategyName: "基本面筛选策略",
    symbol: "多股票",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    status: "failed",
    created: "2025-05-05",
    returns: "-",
    sharpeRatio: "-",
    maxDrawdown: "-",
  },
]

export default function BacktestsPage() {
  const [backtests, setBacktests] = useState(mockBacktests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [strategyFilter, setStrategyFilter] = useState("all")

  // 过滤回测
  const filteredBacktests = backtests.filter((backtest) => {
    const matchesSearch =
      backtest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backtest.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || backtest.status === statusFilter
    const matchesStrategy = strategyFilter === "all" || backtest.strategyName === strategyFilter

    return matchesSearch && matchesStatus && matchesStrategy
  })

  // 删除回测
  const deleteBacktest = (id: number) => {
    setBacktests(backtests.filter((backtest) => backtest.id !== id))
  }

  // 获取所有策略名称（用于筛选）
  const strategyNames = [...new Set(backtests.map((backtest) => backtest.strategyName))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">回测管理</h1>
        <Link href="/backtests/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 新建回测
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">全部回测</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
          <TabsTrigger value="running">进行中</TabsTrigger>
          <TabsTrigger value="failed">失败</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索回测..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="策略筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部策略</SelectItem>
                  {strategyNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="running">进行中</SelectItem>
                  <SelectItem value="failed">失败</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4">
            {filteredBacktests.map((backtest) => (
              <Card key={backtest.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{backtest.name}</CardTitle>
                    <Badge
                      variant={
                        backtest.status === "completed"
                          ? "default"
                          : backtest.status === "running"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {backtest.status === "completed" ? "已完成" : backtest.status === "running" ? "进行中" : "失败"}
                    </Badge>
                  </div>
                  <CardDescription>
                    策略: {backtest.strategyName} | 股票: {backtest.symbol}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">回测区间</Label>
                      <p>
                        {backtest.startDate} 至 {backtest.endDate}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">创建时间</Label>
                      <p>{backtest.created}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">收益率</Label>
                      <p
                        className={
                          backtest.returns.startsWith("+")
                            ? "text-green-600"
                            : backtest.returns.startsWith("-")
                              ? "text-red-600"
                              : ""
                        }
                      >
                        {backtest.returns}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">夏普比率</Label>
                      <p>{backtest.sharpeRatio}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">最大回撤</Label>
                      <p className="text-red-600">{backtest.maxDrawdown}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteBacktest(backtest.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> 删除
                    </Button>
                    <Link href={`/backtests/${backtest.id}`}>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-1" /> 查看详情
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="grid gap-4">
            {filteredBacktests
              .filter((backtest) => backtest.status === "completed")
              .map((backtest) => (
                <Card key={backtest.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{backtest.name}</CardTitle>
                      <Badge>已完成</Badge>
                    </div>
                    <CardDescription>
                      策略: {backtest.strategyName} | 股票: {backtest.symbol}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">回测区间</Label>
                        <p>
                          {backtest.startDate} 至 {backtest.endDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">创建时间</Label>
                        <p>{backtest.created}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">收益率</Label>
                        <p
                          className={
                            backtest.returns.startsWith("+")
                              ? "text-green-600"
                              : backtest.returns.startsWith("-")
                                ? "text-red-600"
                                : ""
                          }
                        >
                          {backtest.returns}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">夏普比率</Label>
                        <p>{backtest.sharpeRatio}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">最大回撤</Label>
                        <p className="text-red-600">{backtest.maxDrawdown}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteBacktest(backtest.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                      <Link href={`/backtests/${backtest.id}`}>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-1" /> 查看详情
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="running" className="mt-0">
          <div className="grid gap-4">
            {filteredBacktests
              .filter((backtest) => backtest.status === "running")
              .map((backtest) => (
                <Card key={backtest.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{backtest.name}</CardTitle>
                      <Badge variant="outline">进行中</Badge>
                    </div>
                    <CardDescription>
                      策略: {backtest.strategyName} | 股票: {backtest.symbol}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">回测区间</Label>
                        <p>
                          {backtest.startDate} 至 {backtest.endDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">创建时间</Label>
                        <p>{backtest.created}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">收益率</Label>
                        <p>计算中...</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">夏普比率</Label>
                        <p>计算中...</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">最大回撤</Label>
                        <p>计算中...</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteBacktest(backtest.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                      <Link href={`/backtests/${backtest.id}`}>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-1" /> 查看详情
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="mt-0">
          <div className="grid gap-4">
            {filteredBacktests
              .filter((backtest) => backtest.status === "failed")
              .map((backtest) => (
                <Card key={backtest.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{backtest.name}</CardTitle>
                      <Badge variant="destructive">失败</Badge>
                    </div>
                    <CardDescription>
                      策略: {backtest.strategyName} | 股票: {backtest.symbol}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">回测区间</Label>
                        <p>
                          {backtest.startDate} 至 {backtest.endDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">创建时间</Label>
                        <p>{backtest.created}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">收益率</Label>
                        <p>-</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">夏普比率</Label>
                        <p>-</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">最大回撤</Label>
                        <p>-</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteBacktest(backtest.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                      <Link href={`/backtests/${backtest.id}`}>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-1" /> 查看详情
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
