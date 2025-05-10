"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Save, RefreshCw, Info, LineChart, Activity, BarChart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟从后端获取指标详情
const fetchIndicatorById = async (id: string) => {
  // 模拟API调用延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 模拟指标数据
  const mockIndicators = [
    {
      id: "1",
      name: "简单移动平均线 (SMA)",
      description: "计算特定周期内价格的算术平均值",
      category: "趋势",
      created: "2025-04-10",
      updated: "2025-05-02",
      status: "active",
      formula: `// 简单移动平均线计算函数
function calculate(data, params) {
  const period = params.period || 20;
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
      continue;
    }
    
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    result.push(sum / period);
  }
  
  return result;
}`,
      parameters: [
        {
          id: "1",
          name: "period",
          label: "周期",
          defaultValue: "20",
          value: "20",
          type: "number",
          min: "2",
          max: "500",
          step: "1",
          description: "计算移动平均线的周期长度",
        },
      ],
      visualization: {
        defaultColor: "#1E88E5",
        lineStyle: "solid",
        lineWidth: 2,
        overlay: true,
        position: "main",
      },
    },
    {
      id: "2",
      name: "指数移动平均线 (EMA)",
      description: "赋予近期价格更高权重的移动平均线",
      category: "趋势",
      created: "2025-03-15",
      updated: "2025-04-28",
      status: "active",
      formula: `// 指数移动平均线计算函数
function calculate(data, params) {
  const period = params.period || 14;
  const result = [];
  const multiplier = 2 / (period + 1);
  
  // 第一个EMA值使用SMA
  let ema = 0;
  for (let i = 0; i < period; i++) {
    ema += data[i].close;
  }
  ema /= period;
  result.push(ema);
  
  // 计算剩余的EMA值
  for (let i = period; i < data.length; i++) {
    ema = (data[i].close - ema) * multiplier + ema;
    result.push(ema);
  }
  
  return result;
}`,
      parameters: [
        {
          id: "1",
          name: "period",
          label: "周期",
          defaultValue: "14",
          value: "14",
          type: "number",
          min: "2",
          max: "500",
          step: "1",
          description: "计算指数移动平均线的周期长度",
        },
      ],
      visualization: {
        defaultColor: "#43A047",
        lineStyle: "dashed",
        lineWidth: 2,
        overlay: true,
        position: "main",
      },
    },
    {
      id: "3",
      name: "相对强弱指标 (RSI)",
      description: "测量价格变化的速度和幅度，判断超买超卖状态",
      category: "动量",
      created: "2025-02-20",
      updated: "2025-04-15",
      status: "active",
      formula: `// RSI计算函数
function calculate(data, params) {
  const period = params.period || 14;
  const overbought = params.overbought || 70;
  const oversold = params.oversold || 30;
  const result = [];
  
  // 计算价格变化
  const changes = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i].close - data[i-1].close);
  }
  
  // 计算RSI
  for (let i = 0; i < changes.length; i++) {
    if (i < period) {
      result.push(null);
      continue;
    }
    
    let gains = 0;
    let losses = 0;
    
    for (let j = i - period + 1; j <= i; j++) {
      if (changes[j] >= 0) {
        gains += changes[j];
      } else {
        losses -= changes[j];
      }
    }
    
    if (losses === 0) {
      result.push(100);
    } else {
      const rs = gains / losses;
      result.push(100 - (100 / (1 + rs)));
    }
  }
  
  return result;
}`,
      parameters: [
        {
          id: "1",
          name: "period",
          label: "周期",
          defaultValue: "14",
          value: "14",
          type: "number",
          min: "2",
          max: "500",
          step: "1",
          description: "计算RSI的周期长度",
        },
        {
          id: "2",
          name: "overbought",
          label: "超买阈值",
          defaultValue: "70",
          value: "70",
          type: "number",
          min: "50",
          max: "100",
          step: "1",
          description: "RSI超过此值视为超买状态",
        },
        {
          id: "3",
          name: "oversold",
          label: "超卖阈值",
          defaultValue: "30",
          value: "30",
          type: "number",
          min: "0",
          max: "50",
          step: "1",
          description: "RSI低于此值视为超卖状态",
        },
      ],
      visualization: {
        defaultColor: "#E53935",
        lineStyle: "solid",
        lineWidth: 2,
        overlay: false,
        position: "separate",
      },
    },
  ]

  const indicator = mockIndicators.find((ind) => ind.id === id)
  if (!indicator) {
    throw new Error("指标未找到")
  }

  return indicator
}

// 模拟价格数据
const generateMockPriceData = (days = 100) => {
  const data = []
  let price = 100
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // 随机价格变动
    const change = (Math.random() - 0.5) * 2
    price = Math.max(50, price + change)

    const open = price
    const high = price * (1 + Math.random() * 0.02)
    const low = price * (1 - Math.random() * 0.02)
    const close = price * (1 + (Math.random() - 0.5) * 0.01)
    const volume = Math.floor(Math.random() * 10000) + 5000

    data.push({
      date: date.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
      volume,
    })
  }

  return data
}

// 模拟计算指标
const calculateIndicator = (priceData: any[], formula: string, parameters: any[]) => {
  try {
    // 将参数转换为适当的类型
    const params: { [key: string]: any } = {}
    parameters.forEach((param: any) => {
      if (param.type === "number") {
        params[param.name] = Number.parseFloat(param.value)
      } else if (param.type === "boolean") {
        params[param.name] = param.value === "true"
      } else {
        params[param.name] = param.value
      }
    })

    // 创建计算函数
    // 注意：在实际应用中，应该使用更安全的方法执行代码
    const calculateFn = new Function(
      "data",
      "params",
      `
      ${formula}
      return calculate(data, params);
    `,
    )

    // 计算指标值
    return calculateFn(priceData, params)
  } catch (error) {
    console.error("计算指标时出错:", error)
    return []
  }
}

// 图表组件
const IndicatorChart = ({ priceData, indicatorData, indicator }: { priceData: any[], indicatorData: number[], indicator: any }) => {
  // 在实际应用中，这里应该使用真实的图表库，如 recharts, d3, highcharts 等
  return (
    <div className="w-full h-[400px] bg-gray-50 dark:bg-gray-900 rounded-md p-4 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-muted-foreground">图表预览区域 - 实际应用中这里会显示交互式图表</p>
          <p className="text-sm text-muted-foreground mt-2">
            指标: {indicator.name} | 数据点: {indicatorData.length} | 参数:
            {indicator.parameters.map((p: any) => ` ${p.label}=${p.value}`).join(", ")}
          </p>
        </div>
      </div>
    </div>
  )
}

import React from "react";

export default function IndicatorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { toast } = useToast()
  const [indicator, setIndicator] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [calculating, setCalculating] = useState(false)
  const [priceData, setPriceData] = useState<any[]>([])
  const [indicatorData, setIndicatorData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("preview")
  const [paramId, setParamId] = useState<string>("");

  // 获取参数ID
  React.useEffect(() => {
    params.then(p => setParamId(p.id));
  }, [params]);

  // 加载指标数据
  useEffect(() => {
    if (!paramId) return;
    
    const loadIndicator = async () => {
      try {
        setLoading(true)
        const data = await fetchIndicatorById(paramId)
        setIndicator(data)

        // 生成模拟价格数据
        const mockPriceData = generateMockPriceData(100)
        setPriceData(mockPriceData)

        // 计算指标值
        const indicatorValues = calculateIndicator(mockPriceData, data.formula, data.parameters)
        setIndicatorData(indicatorValues)
      } catch (error) {
        console.error("加载指标数据失败:", error)
        toast({
          title: "加载失败",
          description: "无法加载指标数据，请稍后重试",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadIndicator()
  }, [paramId, toast])

  // 更新参数值
  const updateParameterValue = (parameterId: string, newValue: string) => {
    if (!indicator) return

    const updatedParameters = indicator.parameters.map((param: any) =>
      param.id === parameterId ? { ...param, value: newValue } : param,
    )

    setIndicator({
      ...indicator,
      parameters: updatedParameters,
    })
  }

  // 重新计算指标
  const recalculateIndicator = () => {
    if (!indicator || !priceData.length) return

    setCalculating(true)

    // 模拟计算延迟
    setTimeout(() => {
      try {
        const newIndicatorData = calculateIndicator(priceData, indicator.formula, indicator.parameters)
        setIndicatorData(newIndicatorData)

        toast({
          title: "计算完成",
          description: "指标已根据新参数重新计算",
        })
      } catch (error) {
        console.error("计算指标时出错:", error)
        toast({
          title: "计算失败",
          description: "无法计算指标，请检查参数和公式",
          variant: "destructive",
        })
      } finally {
        setCalculating(false)
      }
    }, 800)
  }

  // 保存指标
  const saveIndicator = async () => {
    if (!indicator) return

    setSaving(true)

    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 在实际应用中，这里应该调用API保存指标配置
    console.log("保存指标配置:", indicator)

    toast({
      title: "保存成功",
      description: "指标配置已更新",
    })

    setSaving(false)
  }

  // 重置参数到默认值
  const resetParameters = () => {
    if (!indicator) return

    const resetParams = indicator.parameters.map((param: any) => ({
      ...param,
      value: param.defaultValue,
    }))

    setIndicator({
      ...indicator,
      parameters: resetParams,
    })

    toast({
      title: "参数已重置",
      description: "所有参数已恢复为默认值",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载指标数据...</p>
        </div>
      </div>
    )
  }

  if (!indicator) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">指标未找到</h2>
        <p className="text-muted-foreground mb-6">无法找到ID为 {paramId} 的指标</p>
        <Link href="/indicators">
          <Button>返回指标列表</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/indicators">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{indicator.name}</h1>
            <Badge variant={indicator.status === "active" ? "default" : "secondary"}>
              {indicator.status === "active" ? "已激活" : "草稿"}
            </Badge>
          </div>
          <p className="text-muted-foreground">{indicator.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={recalculateIndicator} disabled={calculating}>
            <RefreshCw className={`mr-2 h-4 w-4 ${calculating ? "animate-spin" : ""}`} />
            重新计算
          </Button>
          <Button onClick={saveIndicator} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "保存中..." : "保存配置"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>指标的基本配置信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">指标名称</Label>
                <Input
                  id="name"
                  value={indicator.name}
                  onChange={(e) => setIndicator({ ...indicator, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={indicator.description}
                  onChange={(e) => setIndicator({ ...indicator, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Select
                  value={indicator.category}
                  onValueChange={(value) => setIndicator({ ...indicator, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="趋势">趋势</SelectItem>
                    <SelectItem value="动量">动量</SelectItem>
                    <SelectItem value="波动率">波动率</SelectItem>
                    <SelectItem value="成交量">成交量</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">激活状态</Label>
                  <p className="text-sm text-muted-foreground">激活后可用于策略和回测</p>
                </div>
                <Switch
                  id="status"
                  checked={indicator.status === "active"}
                  onCheckedChange={(checked) => setIndicator({ ...indicator, status: checked ? "active" : "draft" })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>参数设置</CardTitle>
                <CardDescription>调整指标计算参数</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={resetParameters}>
                恢复默认值
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {indicator.parameters.map((param: any) => (
                  <div key={param.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`param-${param.id}`}>{param.label}</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{param.description}</p>
                              {param.type === "number" && (
                                <p className="text-xs mt-1">
                                  范围: {param.min} - {param.max}, 步长: {param.step}
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge variant="outline">默认值: {param.defaultValue}</Badge>
                    </div>

                    {param.type === "number" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Input
                            id={`param-${param.id}`}
                            type="number"
                            value={param.value}
                            onChange={(e) => updateParameterValue(param.id, e.target.value)}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            className="w-24"
                          />
                          <Slider
                            value={[Number.parseFloat(param.value)]}
                            min={Number.parseFloat(param.min)}
                            max={Number.parseFloat(param.max)}
                            step={Number.parseFloat(param.step)}
                            onValueChange={(values) => updateParameterValue(param.id, values[0].toString())}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )}

                    {param.type === "boolean" && (
                      <Switch
                        id={`param-${param.id}`}
                        checked={param.value === "true"}
                        onCheckedChange={(checked) => updateParameterValue(param.id, checked.toString())}
                      />
                    )}

                    {param.type === "string" && !param.options && (
                      <Input
                        id={`param-${param.id}`}
                        value={param.value}
                        onChange={(e) => updateParameterValue(param.id, e.target.value)}
                      />
                    )}

                    {param.type === "string" && param.options && (
                      <Select value={param.value} onValueChange={(value) => updateParameterValue(param.id, value)}>
                        <SelectTrigger id={`param-${param.id}`}>
                          <SelectValue placeholder="选择选项" />
                        </SelectTrigger>
                        <SelectContent>
                          {(param.options || []).map((option: any) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={recalculateIndicator} disabled={calculating}>
                <RefreshCw className={`mr-2 h-4 w-4 ${calculating ? "animate-spin" : ""}`} />
                应用参数并重新计算
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>可视化设置</CardTitle>
              <CardDescription>调整指标在图表上的显示方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color">指标颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={indicator.visualization.defaultColor}
                    onChange={(e) =>
                      setIndicator({
                        ...indicator,
                        visualization: {
                          ...indicator.visualization,
                          defaultColor: e.target.value,
                        },
                      })
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={indicator.visualization.defaultColor}
                    onChange={(e) =>
                      setIndicator({
                        ...indicator,
                        visualization: {
                          ...indicator.visualization,
                          defaultColor: e.target.value,
                        },
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineStyle">线条样式</Label>
                <Select
                  value={indicator.visualization.lineStyle}
                  onValueChange={(value) =>
                    setIndicator({
                      ...indicator,
                      visualization: {
                        ...indicator.visualization,
                        lineStyle: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="lineStyle">
                    <SelectValue placeholder="选择线条样式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">实线</SelectItem>
                    <SelectItem value="dashed">虚线</SelectItem>
                    <SelectItem value="dotted">点线</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineWidth">线条宽度</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="lineWidth"
                    type="number"
                    value={indicator.visualization.lineWidth}
                    onChange={(e) =>
                      setIndicator({
                        ...indicator,
                        visualization: {
                          ...indicator.visualization,
                          lineWidth: Number.parseInt(e.target.value),
                        },
                      })
                    }
                    min="1"
                    max="5"
                    step="1"
                    className="w-20"
                  />
                  <Slider
                    value={[indicator.visualization.lineWidth]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(values) =>
                      setIndicator({
                        ...indicator,
                        visualization: {
                          ...indicator.visualization,
                          lineWidth: values[0],
                        },
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">显示位置</Label>
                <Select
                  value={indicator.visualization.position}
                  onValueChange={(value) =>
                    setIndicator({
                      ...indicator,
                      visualization: {
                        ...indicator.visualization,
                        position: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="选择显示位置" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">主图</SelectItem>
                    <SelectItem value="separate">副图</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="overlay">叠加显示</Label>
                  <p className="text-sm text-muted-foreground">与其他指标叠加显示</p>
                </div>
                <Switch
                  id="overlay"
                  checked={indicator.visualization.overlay}
                  onCheckedChange={(checked) =>
                    setIndicator({
                      ...indicator,
                      visualization: {
                        ...indicator.visualization,
                        overlay: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="preview">预览</TabsTrigger>
                  <TabsTrigger value="code">公式代码</TabsTrigger>
                  <TabsTrigger value="data">数据</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="preview" className="mt-0">
                  <div className="space-y-4">
                    <IndicatorChart priceData={priceData} indicatorData={indicatorData} indicator={indicator} />

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Activity className="h-4 w-4 mr-2 text-blue-500" />
                            指标统计
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-muted-foreground">数据点数量:</div>
                            <div className="font-medium">{indicatorData.filter((v) => v !== null).length}</div>

                            <div className="text-muted-foreground">最大值:</div>
                            <div className="font-medium">
                              {Math.max(...indicatorData.filter((v) => v !== null)).toFixed(2)}
                            </div>

                            <div className="text-muted-foreground">最小值:</div>
                            <div className="font-medium">
                              {Math.min(...indicatorData.filter((v) => v !== null)).toFixed(2)}
                            </div>

                            <div className="text-muted-foreground">平均值:</div>
                            <div className="font-medium">
                              {(
                                indicatorData.filter((v) => v !== null).reduce((a, b) => a + b, 0) /
                                indicatorData.filter((v) => v !== null).length
                              ).toFixed(2)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <BarChart className="h-4 w-4 mr-2 text-green-500" />
                            窗口大小影响
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="text-sm text-muted-foreground mb-2">窗口大小对指标计算的影响:</div>
                          <ul className="text-sm space-y-1">
                            <li>• 较小的窗口: 对价格变化更敏感，但可能产生更多噪声</li>
                            <li>• 较大的窗口: 平滑效果更好，但对价格变化反应较慢</li>
                            <li>
                              • 当前窗口:{" "}
                              <span className="font-medium">
                                {indicator.parameters.find((p: any) => p.name === "period")?.value || "N/A"}
                              </span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Textarea
                        value={indicator.formula}
                        onChange={(e) => setIndicator({ ...indicator, formula: e.target.value })}
                        className="font-mono h-[500px] resize-none"
                      />
                      <div className="absolute bottom-4 right-4">
                        <Button onClick={recalculateIndicator} disabled={calculating} size="sm">
                          <RefreshCw className={`mr-2 h-3 w-3 ${calculating ? "animate-spin" : ""}`} />
                          应用代码并重新计算
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="text-sm font-medium mb-2">公式说明</h3>
                      <p className="text-sm text-muted-foreground">
                        编写一个名为 <code>calculate</code> 的函数，接收两个参数:
                      </p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>
                          • <code>data</code>: 价格数据数组，每个元素包含 open, high, low, close, volume
                        </li>
                        <li>
                          • <code>params</code>: 参数对象，包含用户设置的所有参数
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">函数应返回一个数组，表示计算出的指标值</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">计算结果数据</h3>
                      <div className="text-sm text-muted-foreground">显示前 100 条记录</div>
                    </div>

                    <div className="border rounded-md">
                      <div className="overflow-auto max-h-[500px]">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                              <th className="text-left p-2 border-b">日期</th>
                              <th className="text-left p-2 border-b">收盘价</th>
                              <th className="text-left p-2 border-b">{indicator.name}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {priceData.slice(0, 100).map((item, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="p-2">{item.date}</td>
                                <td className="p-2">{item.close.toFixed(2)}</td>
                                <td className="p-2">
                                  {indicatorData[index] !== null ? indicatorData[index].toFixed(2) : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push("/indicators")}>
                  取消
                </Button>
                <Button onClick={saveIndicator} disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "保存中..." : "保存配置"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
