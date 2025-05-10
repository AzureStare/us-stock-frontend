"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Calendar, Info, RotateCcw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// 模拟策略数据
const mockStrategies = [
  { id: 1, name: "均线交叉策略" },
  { id: 2, name: "动量反转策略" },
  { id: 3, name: "波动率突破策略" },
  { id: 4, name: "季节性交易策略" },
  { id: 5, name: "基本面筛选策略" },
]

// 模拟策略参数数据 - 包含更多的类型信息和验证规则
const mockStrategyParams = {
  "1": [
    {
      name: "short_ma_period",
      label: "短期均线周期",
      type: "number",
      default: 10,
      description: "短期移动平均线的周期",
      required: true,
      min: 2,
      max: 100,
      step: 1,
    },
    {
      name: "long_ma_period",
      label: "长期均线周期",
      type: "number",
      default: 50,
      description: "长期移动平均线的周期",
      required: true,
      min: 10,
      max: 200,
      step: 1,
    },
    {
      name: "position_size",
      label: "仓位大小",
      type: "number",
      default: 100,
      description: "每次交易的股数",
      required: true,
      min: 1,
      max: 10000,
      step: 1,
    },
    {
      name: "use_trailing_stop",
      label: "使用追踪止损",
      type: "boolean",
      default: false,
      description: "是否启用追踪止损功能",
    },
    {
      name: "trailing_stop_pct",
      label: "追踪止损百分比",
      type: "number",
      default: 5,
      description: "追踪止损的百分比距离",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.1,
      depends_on: {
        param: "use_trailing_stop",
        value: true,
      },
    },
    {
      name: "signal_type",
      label: "信号类型",
      type: "select",
      default: "cross",
      description: "选择使用的信号类型",
      options: [
        { value: "cross", label: "均线交叉" },
        { value: "above", label: "价格在均线之上" },
        { value: "below", label: "价格在均线之下" },
      ],
    },
  ],
  "2": [
    {
      name: "lookback_period",
      label: "回溯周期",
      type: "number",
      default: 20,
      description: "计算动量的回溯周期",
      required: true,
      min: 5,
      max: 100,
      step: 1,
    },
    {
      name: "threshold",
      label: "反转阈值",
      type: "number",
      default: 2,
      description: "触发反转信号的标准差倍数",
      required: true,
      min: 0.5,
      max: 5,
      step: 0.1,
    },
    {
      name: "holding_period",
      label: "持有周期",
      type: "number",
      default: 5,
      description: "持有头寸的天数",
      required: true,
      min: 1,
      max: 30,
      step: 1,
    },
  ],
  "3": [
    {
      name: "volatility_period",
      label: "波动率周期",
      type: "number",
      default: 20,
      description: "计算波动率的周期",
      required: true,
      min: 5,
      max: 100,
      step: 1,
    },
    {
      name: "breakout_multiplier",
      label: "突破倍数",
      type: "number",
      default: 2.5,
      description: "突破信号的波动率倍数",
      required: true,
      min: 0.5,
      max: 5,
      step: 0.1,
    },
    {
      name: "exit_multiplier",
      label: "退出倍数",
      type: "number",
      default: 1,
      description: "退出信号的波动率倍数",
      required: true,
      min: 0.1,
      max: 3,
      step: 0.1,
    },
  ],
  "4": [
    {
      name: "month_to_buy",
      label: "买入月份",
      type: "number",
      default: 11,
      description: "买入的月份 (1-12)",
      required: true,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      name: "month_to_sell",
      label: "卖出月份",
      type: "number",
      default: 4,
      description: "卖出的月份 (1-12)",
      required: true,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      name: "day_of_month_to_buy",
      label: "买入日",
      type: "number",
      default: 1,
      description: "买入的日期 (1-31)",
      required: true,
      min: 1,
      max: 31,
      step: 1,
    },
    {
      name: "day_of_month_to_sell",
      label: "卖出日",
      type: "number",
      default: 30,
      description: "卖出的日期 (1-31)",
      required: true,
      min: 1,
      max: 31,
      step: 1,
    },
  ],
  "5": [
    {
      name: "min_pe_ratio",
      label: "最小PE比率",
      type: "number",
      default: 5,
      description: "最小市盈率",
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
    },
    {
      name: "max_pe_ratio",
      label: "最大PE比率",
      type: "number",
      default: 20,
      description: "最大市盈率",
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
    },
    {
      name: "min_market_cap",
      label: "最小市值(百万)",
      type: "number",
      default: 1000,
      description: "最小市值(百万美元)",
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
    },
    {
      name: "min_dividend_yield",
      label: "最小股息率(%)",
      type: "number",
      default: 2,
      description: "最小股息率百分比",
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
    },
  ],
}

// 模拟股票数据
const mockStocks = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF Trust" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "AMZN", name: "Amazon.com, Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "META", name: "Meta Platforms, Inc." },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "XLF", name: "Financial Select Sector SPDR Fund" },
  { symbol: "XLE", name: "Energy Select Sector SPDR Fund" },
  { symbol: "XLK", name: "Technology Select Sector SPDR Fund" },
  { symbol: "XLV", name: "Health Care Select Sector SPDR Fund" },
  { symbol: "XLY", name: "Consumer Discretionary Select Sector SPDR Fund" },
  { symbol: "XLP", name: "Consumer Staples Select Sector SPDR Fund" },
  { symbol: "XLI", name: "Industrial Select Sector SPDR Fund" },
  { symbol: "XLB", name: "Materials Select Sector SPDR Fund" },
  { symbol: "XLU", name: "Utilities Select Sector SPDR Fund" },
  { symbol: "XLRE", name: "Real Estate Select Sector SPDR Fund" },
  { symbol: "XLC", name: "Communication Services Select Sector SPDR Fund" },
  { symbol: "IWM", name: "iShares Russell 2000 ETF" },
]

// 参数验证错误类型
interface ValidationErrors {
  name?: string
  strategyId?: string
  symbol?: string
  startDate?: string
  endDate?: string
  initialCapital?: string
  strategyParameters?: Record<string, string>
}

export default function CreateBacktestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const strategyId = searchParams.get("strategyId")

  const [formData, setFormData] = useState({
    name: "",
    strategyId: strategyId || "",
    symbol: "",
    startDate: "2020-01-01",
    endDate: "2024-12-31",
    initialCapital: 10000,
    commissionRate: 0.1,
    slippageRate: 0.05,
    useStopLoss: false,
    stopLossPercent: 2,
    useTakeProfit: false,
    takeProfitPercent: 6,
    description: "",
    strategyParameters: {} as Record<string, any>,
  })

  // 当前选择的策略参数
  const [strategyParams, setStrategyParams] = useState<any[]>([])

  // 表单验证错误
  const [errors, setErrors] = useState<ValidationErrors>({})

  // 是否正在加载参数
  const [loadingParams, setLoadingParams] = useState(false)

  // 是否打开股票选择器
  const [openSymbolSelect, setOpenSymbolSelect] = useState(false)

  // 当策略ID变化时，获取策略参数
  useEffect(() => {
    if (formData.strategyId) {
      // 模拟API请求加载
      setLoadingParams(true)

      // 模拟网络延迟
      setTimeout(() => {
        // 在实际应用中，这里会调用API获取策略参数
        // 例如: fetch(`/api/v1/strategies/${formData.strategyId}/default_parameters`)
        const params = mockStrategyParams[formData.strategyId as keyof typeof mockStrategyParams] || []
        setStrategyParams(params)

        // 初始化策略参数为默认值
        const defaultParams: Record<string, any> = {}
        params.forEach((param) => {
          defaultParams[param.name] = param.default
        })
        setFormData((prev) => ({
          ...prev,
          strategyParameters: defaultParams,
        }))

        setLoadingParams(false)
      }, 500)
    } else {
      setStrategyParams([])
      setFormData((prev) => ({
        ...prev,
        strategyParameters: {},
      }))
    }
  }, [formData.strategyId])

  // 更新策略参数
  const updateStrategyParameter = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      strategyParameters: {
        ...prev.strategyParameters,
        [name]: value,
      },
    }))

    // 清除该参数的错误
    if (errors.strategyParameters && errors.strategyParameters[name]) {
      setErrors((prev) => {
        const newParams = { ...prev.strategyParameters };
        delete newParams[name];
        return {
          ...prev,
          strategyParameters: newParams,
        };
      });
    }
  }

  // 重置策略参数到默认值
  const resetStrategyParameters = () => {
    const defaultParams: Record<string, any> = {}
    strategyParams.forEach((param) => {
      defaultParams[param.name] = param.default
    })
    setFormData((prev) => ({
      ...prev,
      strategyParameters: defaultParams,
    }))

    // 清除参数相关的错误
    if (errors.strategyParameters) {
      setErrors((prev) => ({
        ...prev,
        strategyParameters: {},
      }));
    }
  }

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // 验证基本字段
    if (!formData.name.trim()) {
      newErrors.name = "回测名称不能为空"
    }

    if (!formData.strategyId) {
      newErrors.strategyId = "请选择策略"
    }

    if (!formData.symbol) {
      newErrors.symbol = "请选择交易品种"
    }

    // 验证日期
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)

    if (isNaN(startDate.getTime())) {
      newErrors.startDate = "请输入有效的开始日期"
    }

    if (isNaN(endDate.getTime())) {
      newErrors.endDate = "请输入有效的结束日期"
    } else if (endDate <= startDate) {
      newErrors.endDate = "结束日期必须晚于开始日期"
    }

    // 验证初始资金
    if (formData.initialCapital <= 0) {
      newErrors.initialCapital = "初始资金必须大于0"
    }

    // 验证策略参数
    if (strategyParams.length > 0) {
      const paramErrors: Record<string, string> = {}

      strategyParams.forEach((param) => {
        // 检查参数是否应该被验证（考虑依赖关系）
        const shouldValidate =
          !param.depends_on || formData.strategyParameters[param.depends_on.param] === param.depends_on.value

        if (shouldValidate && param.required) {
          const value = formData.strategyParameters[param.name]

          // 检查是否为空
          if (value === undefined || value === null || value === "") {
            paramErrors[param.name] = `${param.label}不能为空`
          }
          // 数字类型的范围检查
          else if (param.type === "number") {
            const numValue = Number(value)
            if (isNaN(numValue)) {
              paramErrors[param.name] = `${param.label}必须是数字`
            } else if (param.min !== undefined && numValue < param.min) {
              paramErrors[param.name] = `${param.label}不能小于${param.min}`
            } else if (param.max !== undefined && numValue > param.max) {
              paramErrors[param.name] = `${param.label}不能大于${param.max}`
            }
          }
        }
      })

      if (Object.keys(paramErrors).length > 0) {
        newErrors.strategyParameters = paramErrors
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 验证表单
    if (!validateForm()) {
      // 滚动到第一个错误
      const firstError = document.querySelector(".error-message")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // 构建提交到后端的数据结构
    const backtestRunParameters = {
      backtest_name: formData.name,
      strategy_id: Number.parseInt(formData.strategyId),
      symbols: [formData.symbol], // 这里可以扩展为多个交易品种
      start_date: formData.startDate,
      end_date: formData.endDate,
      description: formData.description,
      initial_capital: formData.initialCapital,
      advanced_settings: {
        commission_rate: formData.commissionRate,
        slippage_rate: formData.slippageRate,
        use_stop_loss: formData.useStopLoss,
        stop_loss_percent: formData.stopLossPercent,
        use_take_profit: formData.useTakeProfit,
        take_profit_percent: formData.takeProfitPercent,
      },
      strategy_params: formData.strategyParameters,
    }

    console.log("提交回测表单:", backtestRunParameters)

    // 在实际应用中，这里会调用API创建回测
    // 例如: fetch('/api/v1/backtests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(backtestRunParameters)
    // })

    // 然后跳转到回测列表页面
    router.push("/backtests")
  }

  // 检查参数是否应该显示（基于依赖关系）
  const shouldShowParam = (param: any): boolean => {
    if (!param.depends_on) return true
    return formData.strategyParameters[param.depends_on.param] === param.depends_on.value
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/backtests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">创建回测</h1>
          </div>
          <p className="text-muted-foreground">配置回测参数，评估您的交易策略表现</p>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" /> 开始回测
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>设置回测的基本参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                  回测名称
                </Label>
                <Input
                  id="name"
                  placeholder="输入回测名称"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: undefined })
                  }}
                  className={errors.name ? "border-destructive" : ""}
                  required
                />
                {errors.name && <p className="text-sm text-destructive error-message">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategy" className={errors.strategyId ? "text-destructive" : ""}>
                  选择策略
                </Label>
                <Select
                  value={formData.strategyId.toString()}
                  onValueChange={(value) => {
                    setFormData({ ...formData, strategyId: value })
                    if (errors.strategyId) setErrors({ ...errors, strategyId: undefined })
                  }}
                  required
                >
                  <SelectTrigger className={errors.strategyId ? "border-destructive" : ""}>
                    <SelectValue placeholder="选择交易策略" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStrategies.map((strategy) => (
                      <SelectItem key={strategy.id} value={strategy.id.toString()}>
                        {strategy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.strategyId && <p className="text-sm text-destructive error-message">{errors.strategyId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol" className={errors.symbol ? "text-destructive" : ""}>
                  交易品种
                </Label>
                <Popover open={openSymbolSelect} onOpenChange={setOpenSymbolSelect}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSymbolSelect}
                      className={cn(
                        "w-full justify-between",
                        !formData.symbol && "text-muted-foreground",
                        errors.symbol && "border-destructive",
                      )}
                    >
                      {formData.symbol
                        ? mockStocks.find((stock) => stock.symbol === formData.symbol)?.symbol || formData.symbol
                        : "选择交易品种"}
                      <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="搜索交易品种..." />
                      <CommandList>
                        <CommandEmpty>未找到匹配的交易品种</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-auto">
                          {mockStocks.map((stock) => (
                            <CommandItem
                              key={stock.symbol}
                              value={stock.symbol}
                              onSelect={(currentValue) => {
                                setFormData({ ...formData, symbol: currentValue })
                                if (errors.symbol) setErrors({ ...errors, symbol: undefined })
                                setOpenSymbolSelect(false)
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.symbol === stock.symbol ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {stock.symbol} - {stock.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.symbol && <p className="text-sm text-destructive error-message">{errors.symbol}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className={errors.startDate ? "text-destructive" : ""}>
                    开始日期
                  </Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => {
                        setFormData({ ...formData, startDate: e.target.value })
                        if (errors.startDate) setErrors({ ...errors, startDate: undefined })
                      }}
                      className={errors.startDate ? "border-destructive" : ""}
                      required
                    />
                  </div>
                  {errors.startDate && <p className="text-sm text-destructive error-message">{errors.startDate}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className={errors.endDate ? "text-destructive" : ""}>
                    结束日期
                  </Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => {
                        setFormData({ ...formData, endDate: e.target.value })
                        if (errors.endDate) setErrors({ ...errors, endDate: undefined })
                      }}
                      className={errors.endDate ? "border-destructive" : ""}
                      required
                    />
                  </div>
                  {errors.endDate && <p className="text-sm text-destructive error-message">{errors.endDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">回测描述</Label>
                <Textarea
                  id="description"
                  placeholder="输入回测描述（可选）"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 策略参数配置区域 - 仅在选择策略后显示 */}
          {formData.strategyId && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>策略参数配置</CardTitle>
                  <CardDescription>
                    配置 "{mockStrategies.find((s) => s.id.toString() === formData.strategyId)?.name}" 的参数
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={resetStrategyParameters} disabled={loadingParams}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  恢复默认值
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                {loadingParams ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2">加载参数中...</span>
                  </div>
                ) : strategyParams.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>该策略没有可配置的参数</AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {strategyParams.map(
                      (param) =>
                        shouldShowParam(param) && (
                          <div key={param.name} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor={param.name}
                                className={errors.strategyParameters?.[param.name] ? "text-destructive" : ""}
                              >
                                {param.label}
                                {param.required && <span className="text-destructive ml-1">*</span>}
                              </Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
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

                            {param.type === "boolean" ? (
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={param.name}
                                  checked={formData.strategyParameters[param.name] || false}
                                  onCheckedChange={(checked) => updateStrategyParameter(param.name, checked)}
                                />
                                <Label htmlFor={param.name}>
                                  {formData.strategyParameters[param.name] ? "启用" : "禁用"}
                                </Label>
                                <Badge variant="outline" className="ml-auto">
                                  默认: {param.default ? "启用" : "禁用"}
                                </Badge>
                              </div>
                            ) : param.type === "number" ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                  <Input
                                    id={param.name}
                                    type="number"
                                    value={formData.strategyParameters[param.name] || param.default}
                                    onChange={(e) =>
                                      updateStrategyParameter(param.name, Number.parseFloat(e.target.value))
                                    }
                                    min={param.min}
                                    max={param.max}
                                    step={param.step}
                                    className={cn(
                                      "w-full",
                                      errors.strategyParameters?.[param.name] && "border-destructive",
                                    )}
                                  />
                                  <Badge variant="outline">默认: {param.default}</Badge>
                                </div>
                                {param.min !== undefined && param.max !== undefined && (
                                  <Slider
                                    id={`${param.name}-slider`}
                                    min={param.min}
                                    max={param.max}
                                    step={param.step}
                                    value={[formData.strategyParameters[param.name] || param.default]}
                                    onValueChange={(value) => updateStrategyParameter(param.name, value[0])}
                                  />
                                )}
                              </div>
                            ) : param.type === "select" ? (
                              <div className="flex items-center gap-4">
                                <Select
                                  value={formData.strategyParameters[param.name] || param.default}
                                  onValueChange={(value) => updateStrategyParameter(param.name, value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="选择选项" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {param.options.map((option: any) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Badge variant="outline">
                                  默认: {param.options.find((o: any) => o.value === param.default)?.label}
                                </Badge>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4">
                                <Input
                                  id={param.name}
                                  type="text"
                                  value={formData.strategyParameters[param.name] || param.default}
                                  onChange={(e) => updateStrategyParameter(param.name, e.target.value)}
                                  className={cn(
                                    "w-full",
                                    errors.strategyParameters?.[param.name] && "border-destructive",
                                  )}
                                />
                                <Badge variant="outline">默认: {param.default}</Badge>
                              </div>
                            )}

                            {errors.strategyParameters?.[param.name] && (
                              <p className="text-sm text-destructive error-message">
                                {errors.strategyParameters[param.name]}
                              </p>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>配置回测的高级参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialCapital" className={errors.initialCapital ? "text-destructive" : ""}>
                  初始资金 (USD)
                </Label>
                <Input
                  id="initialCapital"
                  type="number"
                  min="1000"
                  value={formData.initialCapital}
                  onChange={(e) => {
                    setFormData({ ...formData, initialCapital: Number(e.target.value) })
                    if (errors.initialCapital) setErrors({ ...errors, initialCapital: undefined })
                  }}
                  className={errors.initialCapital ? "border-destructive" : ""}
                  required
                />
                {errors.initialCapital && (
                  <p className="text-sm text-destructive error-message">{errors.initialCapital}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionRate">手续费率 (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="commissionRate"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[formData.commissionRate]}
                    onValueChange={(value) => setFormData({ ...formData, commissionRate: value[0] })}
                  />
                  <span className="w-12 text-right">{formData.commissionRate}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slippageRate">滑点率 (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="slippageRate"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[formData.slippageRate]}
                    onValueChange={(value) => setFormData({ ...formData, slippageRate: value[0] })}
                  />
                  <span className="w-12 text-right">{formData.slippageRate}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="useStopLoss">启用止损</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>这是回测引擎提供的全局止损功能，当亏损达到设定比例时自动平仓。</p>
                          <p>与策略内部的止损逻辑无关。</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">当亏损达到设定比例时自动平仓</p>
                </div>
                <Switch
                  id="useStopLoss"
                  checked={formData.useStopLoss}
                  onCheckedChange={(checked) => setFormData({ ...formData, useStopLoss: checked })}
                />
              </div>
              {formData.useStopLoss && (
                <div className="space-y-2">
                  <Label htmlFor="stopLossPercent">止损比例 (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="stopLossPercent"
                      min={1}
                      max={20}
                      step={0.5}
                      value={[formData.stopLossPercent]}
                      onValueChange={(value) => setFormData({ ...formData, stopLossPercent: value[0] })}
                    />
                    <span className="w-12 text-right">{formData.stopLossPercent}%</span>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="useTakeProfit">启用止盈</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>这是回测引擎提供的全局止盈功能，当盈利达到设定比例时自动平仓。</p>
                          <p>与策略内部的止盈逻辑无关。</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">当盈利达到设定比例时自动平仓</p>
                </div>
                <Switch
                  id="useTakeProfit"
                  checked={formData.useTakeProfit}
                  onCheckedChange={(checked) => setFormData({ ...formData, useTakeProfit: checked })}
                />
              </div>
              {formData.useTakeProfit && (
                <div className="space-y-2">
                  <Label htmlFor="takeProfitPercent">止盈比例 (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="takeProfitPercent"
                      min={1}
                      max={50}
                      step={0.5}
                      value={[formData.takeProfitPercent]}
                      onValueChange={(value) => setFormData({ ...formData, takeProfitPercent: value[0] })}
                    />
                    <span className="w-12 text-right">{formData.takeProfitPercent}%</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/backtests")}>
                取消
              </Button>
              <Button type="submit">开始回测</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
