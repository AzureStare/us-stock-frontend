"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, Filter } from "lucide-react"
import { StatisticsChart } from "@/components/statistics-chart"

// 模拟统计数据
const mockStrategies = [
  { id: 1, name: "均线交叉策略" },
  { id: 2, name: "动量反转策略" },
  { id: 3, name: "波动率突破策略" },
  { id: 4, name: "季节性交易策略" },
  { id: 5, name: "基本面筛选策略" },
]

const mockTimeframes = [
  { value: "1w", label: "一周" },
  { value: "1m", label: "一个月" },
  { value: "3m", label: "三个月" },
  { value: "6m", label: "六个月" },
  { value: "1y", label: "一年" },
  { value: "all", label: "全部" },
]

const mockPerformanceData = [
  {
    strategy: "均线交叉策略",
    returns: "+15.2%",
    sharpeRatio: "1.32",
    maxDrawdown: "-8.5%",
    winRate: "62%",
    tradesCount: 45,
    profitFactor: "1.8",
  },
  {
    strategy: "动量反转策略",
    returns: "+22.7%",
    sharpeRatio: "1.65",
    maxDrawdown: "-12.3%",
    winRate: "58%",
    tradesCount: 37,
    profitFactor: "2.1",
  },
  {
    strategy: "波动率突破策略",
    returns: "+8.9%",
    sharpeRatio: "0.95",
    maxDrawdown: "-7.2%",
    winRate: "53%",
    tradesCount: 62,
    profitFactor: "1.4",
  },
  {
    strategy: "季节性交易策略",
    returns: "+11.3%",
    sharpeRatio: "1.18",
    maxDrawdown: "-6.8%",
    winRate: "65%",
    tradesCount: 28,
    profitFactor: "1.9",
  },
  {
    strategy: "基本面筛选策略",
    returns: "+18.5%",
    sharpeRatio: "1.42",
    maxDrawdown: "-9.7%",
    winRate: "60%",
    tradesCount: 32,
    profitFactor: "2.0",
  },
]

export default function StatisticsPage() {
  const [selectedStrategy, setSelectedStrategy] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1y")
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">统计分析</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "加载中..." : "刷新数据"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> 导出报告
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-[250px]">
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="选择策略" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有策略</SelectItem>
              {mockStrategies.map((strategy) => (
                <SelectItem key={strategy.id} value={strategy.id.toString()}>
                  {strategy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[250px]">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              {mockTimeframes.map((timeframe) => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均收益率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+15.3%</div>
            <p className="text-xs text-muted-foreground">相比上期: +2.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均夏普比率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.30</div>
            <p className="text-xs text-muted-foreground">相比上期: +0.05</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均最大回撤</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-8.9%</div>
            <p className="text-xs text-muted-foreground">相比上期: -0.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均胜率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">59.6%</div>
            <p className="text-xs text-muted-foreground">相比上期: +1.2%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="performance">策略表现</TabsTrigger>
          <TabsTrigger value="comparison">策略对比</TabsTrigger>
          <TabsTrigger value="correlation">相关性分析</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>策略表现统计</CardTitle>
              <CardDescription>
                各策略在{mockTimeframes.find((tf) => tf.value === selectedTimeframe)?.label}内的表现
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>策略名称</TableHead>
                    <TableHead>收益率</TableHead>
                    <TableHead>夏普比率</TableHead>
                    <TableHead>最大回撤</TableHead>
                    <TableHead>胜率</TableHead>
                    <TableHead>交易次数</TableHead>
                    <TableHead>盈亏比</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPerformanceData.map((data) => (
                    <TableRow key={data.strategy}>
                      <TableCell className="font-medium">{data.strategy}</TableCell>
                      <TableCell className={data.returns.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {data.returns}
                      </TableCell>
                      <TableCell>{data.sharpeRatio}</TableCell>
                      <TableCell className="text-red-600">{data.maxDrawdown}</TableCell>
                      <TableCell>{data.winRate}</TableCell>
                      <TableCell>{data.tradesCount}</TableCell>
                      <TableCell>{data.profitFactor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>月度收益率</CardTitle>
              <CardDescription>各策略的月度收益率对比</CardDescription>
            </CardHeader>
            <CardContent>
              <StatisticsChart type="bar" isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>策略对比</CardTitle>
              <CardDescription>各策略的累计收益率对比</CardDescription>
            </CardHeader>
            <CardContent>
              <StatisticsChart type="line" isLoading={isLoading} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>风险收益对比</CardTitle>
                <CardDescription>各策略的风险收益特征</CardDescription>
              </CardHeader>
              <CardContent>
                <StatisticsChart type="scatter" isLoading={isLoading} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>回撤分析</CardTitle>
                <CardDescription>各策略的回撤情况对比</CardDescription>
              </CardHeader>
              <CardContent>
                <StatisticsChart type="area" isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>策略相关性</CardTitle>
              <CardDescription>各策略之间的相关性分析</CardDescription>
            </CardHeader>
            <CardContent>
              <StatisticsChart type="heatmap" isLoading={isLoading} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>相关性详情</CardTitle>
              <CardDescription>策略相关性数值表</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>策略</TableHead>
                    {mockStrategies.map((strategy) => (
                      <TableHead key={strategy.id}>{strategy.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStrategies.map((strategy) => (
                    <TableRow key={strategy.id}>
                      <TableCell className="font-medium">{strategy.name}</TableCell>
                      {mockStrategies.map((s) => (
                        <TableCell key={s.id}>
                          {strategy.id === s.id ? <Badge>1.00</Badge> : (Math.random() * 0.8 - 0.4).toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
