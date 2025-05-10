"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ChartContainer } from "@/components/chart-container"
import { RefreshCw, Download, Settings } from "lucide-react"

// 模拟股票数据
const mockStocks = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF Trust" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "AMZN", name: "Amazon.com, Inc." },
]

// 模拟时间周期
const timeframes = [
  { value: "1d", label: "日线" },
  { value: "1h", label: "小时线" },
  { value: "15m", label: "15分钟线" },
  { value: "5m", label: "5分钟线" },
  { value: "1m", label: "1分钟线" },
]

// 模拟指标
const indicators = [
  { value: "sma", label: "简单移动平均线 (SMA)" },
  { value: "ema", label: "指数移动平均线 (EMA)" },
  { value: "bollinger", label: "布林带 (Bollinger Bands)" },
  { value: "macd", label: "MACD" },
  { value: "rsi", label: "相对强弱指标 (RSI)" },
]

export default function VisualizationPage() {
  const [symbol, setSymbol] = useState("AAPL")
  const [timeframe, setTimeframe] = useState("1d")
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(["sma"])
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: "2023-12-31",
  })
  const [isLoading, setIsLoading] = useState(false)

  const toggleIndicator = (indicator: string) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(selectedIndicators.filter((i) => i !== indicator))
    } else {
      setSelectedIndicators([...selectedIndicators, indicator])
    }
  }

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
        <h1 className="text-3xl font-bold tracking-tight">市场数据可视化</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "加载中..." : "刷新数据"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> 导出图表
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>图表设置</CardTitle>
              <CardDescription>配置图表显示参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">交易品种</Label>
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择交易品种" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStocks.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">时间周期</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间周期" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((tf) => (
                      <SelectItem key={tf.value} value={tf.value}>
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">开始日期</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">结束日期</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>技术指标</CardTitle>
              <CardDescription>选择要显示的技术指标</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {indicators.map((indicator) => (
                <div key={indicator.value} className="flex items-center justify-between">
                  <Label htmlFor={`indicator-${indicator.value}`} className="cursor-pointer">
                    {indicator.label}
                  </Label>
                  <Switch
                    id={`indicator-${indicator.value}`}
                    checked={selectedIndicators.includes(indicator.value)}
                    onCheckedChange={() => toggleIndicator(indicator.value)}
                  />
                </div>
              ))}

              {selectedIndicators.includes("sma") && (
                <div className="space-y-2 pt-4 border-t">
                  <Label>SMA 参数</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">周期 1</span>
                        <span className="text-sm font-medium">20</span>
                      </div>
                      <Slider defaultValue={[20]} max={200} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">周期 2</span>
                        <span className="text-sm font-medium">50</span>
                      </div>
                      <Slider defaultValue={[50]} max={200} step={1} />
                    </div>
                  </div>
                </div>
              )}

              {selectedIndicators.includes("rsi") && (
                <div className="space-y-2 pt-4 border-t">
                  <Label>RSI 参数</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">周期</span>
                        <span className="text-sm font-medium">14</span>
                      </div>
                      <Slider defaultValue={[14]} max={50} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">超买线</span>
                        <span className="text-sm font-medium">70</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">超卖线</span>
                        <span className="text-sm font-medium">30</span>
                      </div>
                      <Slider defaultValue={[30]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {symbol} - {timeframes.find((tf) => tf.value === timeframe)?.label}
                </CardTitle>
                <CardDescription>
                  {dateRange.start} 至 {dateRange.end}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="candle" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="candle">K线图</TabsTrigger>
                  <TabsTrigger value="line">线图</TabsTrigger>
                  <TabsTrigger value="area">面积图</TabsTrigger>
                </TabsList>
                <TabsContent value="candle" className="mt-0">
                  <ChartContainer type="candle" isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="line" className="mt-0">
                  <ChartContainer type="line" isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="area" className="mt-0">
                  <ChartContainer type="area" isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
