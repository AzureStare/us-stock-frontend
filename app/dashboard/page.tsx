import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LineChartIcon as ChartLineUp,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Activity,
  Zap,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentBacktests } from "@/components/recent-backtests"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">仪表板</h1>
        <div className="flex items-center gap-2">
          <Link href="/strategies/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 创建策略
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="reports">报告</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总策略数</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 新增策略（本月）</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">回测次数</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+12 新增回测（本周）</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">最佳策略收益</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+24.5%</div>
                <p className="text-xs text-muted-foreground">均线交叉策略（年化）</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均回测时间</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4分钟</div>
                <p className="text-xs text-muted-foreground">-30秒（相比上月）</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>策略表现</CardTitle>
                <CardDescription>过去30天内各策略的累计收益率</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>最近回测</CardTitle>
                <CardDescription>您最近执行的回测结果</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBacktests />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>活跃策略</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8 / 12</div>
                <p className="text-sm text-muted-foreground mt-2">8个策略处于活跃状态，可以执行回测和实盘交易。</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  管理策略
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>系统状态</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">正常运行</div>
                <p className="text-sm text-muted-foreground mt-2">所有系统组件运行正常，API响应时间: 45ms。</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  查看详情
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>快速操作</CardTitle>
                <ChartLineUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> 创建新策略
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" /> 运行回测
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" /> 查看市场数据
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分析数据</CardTitle>
              <CardDescription>查看详细的策略分析和性能指标</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-muted-foreground">分析数据将在这里显示</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>报告中心</CardTitle>
              <CardDescription>查看和导出系统生成的报告</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-muted-foreground">报告数据将在这里显示</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
