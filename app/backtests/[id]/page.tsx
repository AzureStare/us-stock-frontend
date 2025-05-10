"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, ArrowLeft, Calendar, Briefcase } from "lucide-react"
import { BacktestChart } from "@/components/backtest-chart"

// 模拟回测详情数据
const mockBacktestDetails = {
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
  annualizedReturn: "+3.6%",
  volatility: "12.4%",
  winRate: "62%",
  profitFactor: "1.8",
  description:
    "该策略基于短期均线（10日）和长期均线（50日）的交叉信号进行交易。当短期均线上穿长期均线时买入，当短期均线下穿长期均线时卖出。",
  parameters: [
    { name: "短期均线周期", value: "10" },
    { name: "长期均线周期", value: "50" },
    { name: "止损比例", value: "2%" },
    { name: "止盈比例", value: "6%" },
    { name: "初始资金", value: "$10,000" },
    { name: "手续费率", value: "0.1%" },
  ],
  trades: [
    { id: 1, date: "2020-02-15", type: "买入", price: "$320.45", shares: "10", value: "$3,204.50" },
    {
      id: 2,
      date: "2020-04-22",
      type: "卖出",
      price: "$286.12",
      shares: "10",
      value: "$2,861.20",
      pnl: "-$343.30",
      pnlPercent: "-10.7%",
    },
    { id: 3, date: "2020-06-08", type: "买入", price: "$323.78", shares: "9", value: "$2,914.02" },
    {
      id: 4,
      date: "2020-09-17",
      type: "卖出",
      price: "$335.45",
      shares: "9",
      value: "$3,019.05",
      pnl: "+$105.03",
      pnlPercent: "+3.6%",
    },
    { id: 5, date: "2020-11-05", type: "买入", price: "$348.72", shares: "8", value: "$2,789.76" },
    {
      id: 6,
      date: "2021-01-20",
      type: "卖出",
      price: "$383.26",
      shares: "8",
      value: "$3,066.08",
      pnl: "+$276.32",
      pnlPercent: "+9.9%",
    },
  ],
  monthlyReturns: [
    { month: "2020-01", return: "+1.2%" },
    { month: "2020-02", return: "-3.5%" },
    { month: "2020-03", return: "-8.2%" },
    { month: "2020-04", return: "+5.7%" },
    { month: "2020-05", return: "+2.3%" },
    { month: "2020-06", return: "+1.8%" },
    { month: "2020-07", return: "+4.2%" },
    { month: "2020-08", return: "+3.1%" },
    { month: "2020-09", return: "-2.4%" },
    { month: "2020-10", return: "-1.5%" },
    { month: "2020-11", return: "+6.8%" },
    { month: "2020-12", return: "+2.9%" },
    { month: "2021-01", return: "+0.7%" },
  ],
}

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" }
  ];
}

export default function BacktestDetailPage() {
  const params = useParams()
  const [backtest, setBacktest] = useState(mockBacktestDetails)

  // 在实际应用中，这里会根据ID从API获取回测详情
  useEffect(() => {
    // 模拟API调用
    console.log(`Fetching backtest with ID: ${params.id}`)
    // setBacktest(data)
  }, [params.id])

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/backtests">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回回测列表
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{backtest.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="default">
              {backtest.status === "completed" ? "已完成" : backtest.status === "running" ? "进行中" : "失败"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {backtest.startDate} 至 {backtest.endDate}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              {backtest.symbol}
            </div>
          </div>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> 导出报告
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总收益率</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                backtest.returns.startsWith("+")
                  ? "text-green-600"
                  : backtest.returns.startsWith("-")
                    ? "text-red-600"
                    : ""
              }`}
            >
              {backtest.returns}
            </div>
            <p className="text-xs text-muted-foreground">年化: {backtest.annualizedReturn}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">夏普比率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backtest.sharpeRatio}</div>
            <p className="text-xs text-muted-foreground">波动率: {backtest.volatility}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">最大回撤</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{backtest.maxDrawdown}</div>
            <p className="text-xs text-muted-foreground">盈亏比: {backtest.profitFactor}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">胜率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backtest.winRate}</div>
            <p className="text-xs text-muted-foreground">总交易次数: {backtest.trades.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>收益曲线</CardTitle>
            <CardDescription>回测期间的累计收益率变化</CardDescription>
          </CardHeader>
          <CardContent>
            <BacktestChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>月度收益</CardTitle>
            <CardDescription>按月度统计的收益率</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>月份</TableHead>
                  <TableHead className="text-right">收益率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backtest.monthlyReturns.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell
                      className={`text-right ${
                        item.return.startsWith("+")
                          ? "text-green-600"
                          : item.return.startsWith("-")
                            ? "text-red-600"
                            : ""
                      }`}
                    >
                      {item.return}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="trades">交易记录</TabsTrigger>
          <TabsTrigger value="parameters">参数设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>策略概述</CardTitle>
              <CardDescription>{backtest.strategyName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{backtest.description}</p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">风险分析</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">波动率</p>
                    <p className="font-medium">{backtest.volatility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">最大回撤</p>
                    <p className="font-medium text-red-600">{backtest.maxDrawdown}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">夏普比率</p>
                    <p className="font-medium">{backtest.sharpeRatio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">盈亏比</p>
                    <p className="font-medium">{backtest.profitFactor}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="font-medium mb-2">绩效分析</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">总收益率</p>
                    <p
                      className={`font-medium ${
                        backtest.returns.startsWith("+")
                          ? "text-green-600"
                          : backtest.returns.startsWith("-")
                            ? "text-red-600"
                            : ""
                      }`}
                    >
                      {backtest.returns}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">年化收益率</p>
                    <p
                      className={`font-medium ${
                        backtest.annualizedReturn.startsWith("+")
                          ? "text-green-600"
                          : backtest.annualizedReturn.startsWith("-")
                            ? "text-red-600"
                            : ""
                      }`}
                    >
                      {backtest.annualizedReturn}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">胜率</p>
                    <p className="font-medium">{backtest.winRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">交易次数</p>
                    <p className="font-medium">{backtest.trades.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>交易记录</CardTitle>
              <CardDescription>回测期间的所有交易记录</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>交易额</TableHead>
                    <TableHead>盈亏</TableHead>
                    <TableHead>盈亏比例</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backtest.trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.date}</TableCell>
                      <TableCell className={trade.type === "买入" ? "text-green-600" : "text-red-600"}>
                        {trade.type}
                      </TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell>{trade.shares}</TableCell>
                      <TableCell>{trade.value}</TableCell>
                      <TableCell
                        className={
                          trade.pnl?.startsWith("+")
                            ? "text-green-600"
                            : trade.pnl?.startsWith("-")
                              ? "text-red-600"
                              : ""
                        }
                      >
                        {trade.pnl || "-"}
                      </TableCell>
                      <TableCell
                        className={
                          trade.pnlPercent?.startsWith("+")
                            ? "text-green-600"
                            : trade.pnlPercent?.startsWith("-")
                              ? "text-red-600"
                              : ""
                        }
                      >
                        {trade.pnlPercent || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>参数设置</CardTitle>
              <CardDescription>回测使用的策略参数</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>参数名称</TableHead>
                    <TableHead>参数值</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backtest.parameters.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell>{param.name}</TableCell>
                      <TableCell>{param.value}</TableCell>
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
