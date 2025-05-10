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
import { Search, Filter, ArrowUpDown, Edit, Trash2, Plus, LineChart, Activity } from "lucide-react"

// 模拟指标数据
const mockIndicators = [
  {
    id: 1,
    name: "简单移动平均线 (SMA)",
    description: "计算特定周期内价格的算术平均值",
    category: "趋势",
    created: "2025-04-10",
    updated: "2025-05-02",
    status: "active",
    parameters: [{ name: "周期", value: "20", type: "number" }],
  },
  {
    id: 2,
    name: "指数移动平均线 (EMA)",
    description: "赋予近期价格更高权重的移动平均线",
    category: "趋势",
    created: "2025-03-15",
    updated: "2025-04-28",
    status: "active",
    parameters: [{ name: "周期", value: "14", type: "number" }],
  },
  {
    id: 3,
    name: "相对强弱指标 (RSI)",
    description: "测量价格变化的速度和幅度，判断超买超卖状态",
    category: "动量",
    created: "2025-02-20",
    updated: "2025-04-15",
    status: "active",
    parameters: [
      { name: "周期", value: "14", type: "number" },
      { name: "超买阈值", value: "70", type: "number" },
      { name: "超卖阈值", value: "30", type: "number" },
    ],
  },
  {
    id: 4,
    name: "布林带 (Bollinger Bands)",
    description: "基于价格波动性的技术指标，包含上中下三条带",
    category: "波动率",
    created: "2025-01-25",
    updated: "2025-04-05",
    status: "active",
    parameters: [
      { name: "周期", value: "20", type: "number" },
      { name: "标准差倍数", value: "2", type: "number" },
    ],
  },
  {
    id: 5,
    name: "MACD",
    description: "移动平均线收敛发散指标，用于判断趋势方向和动量",
    category: "动量",
    created: "2025-03-05",
    updated: "2025-04-20",
    status: "draft",
    parameters: [
      { name: "快线周期", value: "12", type: "number" },
      { name: "慢线周期", value: "26", type: "number" },
      { name: "信号线周期", value: "9", type: "number" },
    ],
  },
  {
    id: 6,
    name: "随机指标 (Stochastic)",
    description: "测量当前价格相对于特定时期价格范围的位置",
    category: "动量",
    created: "2025-02-10",
    updated: "2025-03-30",
    status: "draft",
    parameters: [
      { name: "%K周期", value: "14", type: "number" },
      { name: "%K减缓", value: "3", type: "number" },
      { name: "%D周期", value: "3", type: "number" },
    ],
  },
]

export default function IndicatorsPage() {
  const [indicators, setIndicators] = useState(mockIndicators)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤指标
  const filteredIndicators = indicators.filter((indicator) => {
    const matchesSearch =
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || indicator.category === categoryFilter
    const matchesStatus = statusFilter === "all" || indicator.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // 删除指标
  const deleteIndicator = (id: number) => {
    setIndicators(indicators.filter((indicator) => indicator.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">指标管理</h1>
        <Link href="/indicators/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 创建指标
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">全部指标</TabsTrigger>
          <TabsTrigger value="active">已激活</TabsTrigger>
          <TabsTrigger value="draft">草稿</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索指标..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="分类筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="趋势">趋势</SelectItem>
                  <SelectItem value="动量">动量</SelectItem>
                  <SelectItem value="波动率">波动率</SelectItem>
                  <SelectItem value="成交量">成交量</SelectItem>
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
                  <SelectItem value="active">已激活</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      {indicator.category === "趋势" ? (
                        <LineChart className="h-5 w-5 text-blue-500" />
                      ) : indicator.category === "动量" ? (
                        <Activity className="h-5 w-5 text-green-500" />
                      ) : (
                        <LineChart className="h-5 w-5 text-purple-500" />
                      )}
                      {indicator.name}
                    </CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        indicator.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {indicator.status === "active" ? "已激活" : "草稿"}
                    </div>
                  </div>
                  <CardDescription>{indicator.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Label className="text-muted-foreground">分类</Label>
                      <p>{indicator.category}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">更新时间</Label>
                      <p>{indicator.updated}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-muted-foreground">参数</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {indicator.parameters.map((param, index) => (
                        <Badge key={index} variant="outline">
                          {param.name}: {param.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Link href={`/indicators/${indicator.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> 编辑
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteIndicator(indicator.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> 删除
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndicators
              .filter((indicator) => indicator.status === "active")
              .map((indicator) => (
                <Card key={indicator.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        {indicator.category === "趋势" ? (
                          <LineChart className="h-5 w-5 text-blue-500" />
                        ) : indicator.category === "动量" ? (
                          <Activity className="h-5 w-5 text-green-500" />
                        ) : (
                          <LineChart className="h-5 w-5 text-purple-500" />
                        )}
                        {indicator.name}
                      </CardTitle>
                      <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        已激活
                      </div>
                    </div>
                    <CardDescription>{indicator.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <Label className="text-muted-foreground">分类</Label>
                        <p>{indicator.category}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">更新时间</Label>
                        <p>{indicator.updated}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label className="text-muted-foreground">参数</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {indicator.parameters.map((param, index) => (
                          <Badge key={index} variant="outline">
                            {param.name}: {param.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Link href={`/indicators/${indicator.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> 编辑
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteIndicator(indicator.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndicators
              .filter((indicator) => indicator.status === "draft")
              .map((indicator) => (
                <Card key={indicator.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        {indicator.category === "趋势" ? (
                          <LineChart className="h-5 w-5 text-blue-500" />
                        ) : indicator.category === "动量" ? (
                          <Activity className="h-5 w-5 text-green-500" />
                        ) : (
                          <LineChart className="h-5 w-5 text-purple-500" />
                        )}
                        {indicator.name}
                      </CardTitle>
                      <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        草稿
                      </div>
                    </div>
                    <CardDescription>{indicator.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <Label className="text-muted-foreground">分类</Label>
                        <p>{indicator.category}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">更新时间</Label>
                        <p>{indicator.updated}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label className="text-muted-foreground">参数</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {indicator.parameters.map((param, index) => (
                          <Badge key={index} variant="outline">
                            {param.name}: {param.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Link href={`/indicators/${indicator.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> 编辑
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteIndicator(indicator.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
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
