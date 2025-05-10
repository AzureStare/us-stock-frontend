"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, ArrowUpDown, Edit, Trash2, Play } from "lucide-react"

// 模拟策略数据
const mockStrategies = [
  {
    id: 1,
    name: "均线交叉策略",
    description: "基于短期均线和长期均线的交叉信号进行交易",
    category: "技术指标",
    created: "2025-04-15",
    updated: "2025-05-01",
    status: "active",
  },
  {
    id: 2,
    name: "动量反转策略",
    description: "利用价格动量和反转信号进行交易",
    category: "动量",
    created: "2025-03-22",
    updated: "2025-04-28",
    status: "active",
  },
  {
    id: 3,
    name: "波动率突破策略",
    description: "基于价格波动率突破特定阈值进行交易",
    category: "波动率",
    created: "2025-02-10",
    updated: "2025-04-15",
    status: "draft",
  },
  {
    id: 4,
    name: "季节性交易策略",
    description: "基于历史季节性模式进行交易",
    category: "季节性",
    created: "2025-01-05",
    updated: "2025-03-20",
    status: "active",
  },
  {
    id: 5,
    name: "基本面筛选策略",
    description: "基于公司财务指标进行股票筛选和交易",
    category: "基本面",
    created: "2025-04-01",
    updated: "2025-04-10",
    status: "draft",
  },
]

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState(mockStrategies)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤策略
  const filteredStrategies = strategies.filter((strategy) => {
    const matchesSearch =
      strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || strategy.category === categoryFilter
    const matchesStatus = statusFilter === "all" || strategy.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // 删除策略
  const deleteStrategy = (id: number) => {
    setStrategies(strategies.filter((strategy) => strategy.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">策略管理</h1>
        <Link href="/strategies/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 创建策略
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">全部策略</TabsTrigger>
          <TabsTrigger value="active">已激活</TabsTrigger>
          <TabsTrigger value="draft">草稿</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索策略..."
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
                  <SelectItem value="技术指标">技术指标</SelectItem>
                  <SelectItem value="动量">动量</SelectItem>
                  <SelectItem value="波动率">波动率</SelectItem>
                  <SelectItem value="季节性">季节性</SelectItem>
                  <SelectItem value="基本面">基本面</SelectItem>
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
            {filteredStrategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{strategy.name}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        strategy.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {strategy.status === "active" ? "已激活" : "草稿"}
                    </div>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Label className="text-muted-foreground">分类</Label>
                      <p>{strategy.category}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">更新时间</Label>
                      <p>{strategy.updated}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Link href={`/strategies/${strategy.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> 编辑
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteStrategy(strategy.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> 删除
                    </Button>
                  </div>
                  <Link href={`/backtests/create?strategyId=${strategy.id}`}>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1" /> 回测
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStrategies
              .filter((strategy) => strategy.status === "active")
              .map((strategy) => (
                <Card key={strategy.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{strategy.name}</CardTitle>
                      <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        已激活
                      </div>
                    </div>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <Label className="text-muted-foreground">分类</Label>
                        <p>{strategy.category}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">更新时间</Label>
                        <p>{strategy.updated}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Link href={`/strategies/${strategy.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> 编辑
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteStrategy(strategy.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                    </div>
                    <Link href={`/backtests/create?strategyId=${strategy.id}`}>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" /> 回测
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStrategies
              .filter((strategy) => strategy.status === "draft")
              .map((strategy) => (
                <Card key={strategy.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{strategy.name}</CardTitle>
                      <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        草稿
                      </div>
                    </div>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <Label className="text-muted-foreground">分类</Label>
                        <p>{strategy.category}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">更新时间</Label>
                        <p>{strategy.updated}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Link href={`/strategies/${strategy.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> 编辑
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteStrategy(strategy.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                    </div>
                    <Link href={`/backtests/create?strategyId=${strategy.id}`}>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" /> 回测
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
