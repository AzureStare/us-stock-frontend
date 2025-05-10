"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Plus, Trash2, FileCode, Info } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function RegisterStrategyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "draft",
    filePath: "",
    className: "",
    parameters: [
      { key: "短期均线周期", value: "10", type: "number" },
      { key: "长期均线周期", value: "50", type: "number" },
      { key: "止损比例", value: "2", type: "number" },
      { key: "止盈比例", value: "6", type: "number" },
    ],
  })

  const addParameter = () => {
    setFormData({
      ...formData,
      parameters: [...formData.parameters, { key: "", value: "", type: "string" }],
    })
  }

  const removeParameter = (index: number) => {
    const newParameters = [...formData.parameters]
    newParameters.splice(index, 1)
    setFormData({ ...formData, parameters: newParameters })
  }

  const updateParameter = (index: number, field: string, value: string) => {
    const newParameters = [...formData.parameters]
    newParameters[index] = { ...newParameters[index], [field]: value }
    setFormData({ ...formData, parameters: newParameters })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 将参数数组转换为JSON对象
    const parametersObject = formData.parameters.reduce(
      (acc, param) => {
        acc[param.key] = param.type === "number" ? Number(param.value) : param.value
        return acc
      },
      {} as Record<string, any>,
    )

    // 构建要发送到后端的数据
    const dataToSubmit = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      filePath: formData.filePath,
      className: formData.className,
      parameters: parametersObject,
    }

    console.log("提交策略注册:", dataToSubmit)
    // 在实际应用中，这里会调用API注册策略
    // 然后跳转到策略列表页面
    router.push("/strategies")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/strategies">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">注册新策略</h1>
          </div>
          <p className="text-muted-foreground">注册服务器上已存在的策略文件，配置元数据和默认参数</p>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" /> 注册并保存策略配置
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>设置策略的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  策略名称 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="输入策略名称"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">此名称将用于在系统中识别和启动策略</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">策略描述</Label>
                <Textarea
                  id="description"
                  placeholder="描述策略的交易逻辑和目标"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">策略分类</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择策略分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="技术指标">技术指标</SelectItem>
                    <SelectItem value="动量">动量</SelectItem>
                    <SelectItem value="波动率">波动率</SelectItem>
                    <SelectItem value="季节性">季节性</SelectItem>
                    <SelectItem value="基本面">基本面</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">激活策略</Label>
                  <p className="text-sm text-muted-foreground">激活后可用于回测和交易</p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "draft" })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>策略文件信息</CardTitle>
              <CardDescription>指定服务器上策略文件的位置和类名</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filePath">
                  策略文件路径 <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <Input
                    id="filePath"
                    placeholder="例如: my_strategies/sma_crossover_strategy.py"
                    value={formData.filePath}
                    onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                    required
                    className="flex-1"
                  />
                  <Button variant="outline" type="button" className="ml-2">
                    <FileCode className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">服务器上策略Python文件的相对或绝对路径</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="className">
                  策略主类名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="className"
                  placeholder="例如: SMACrossoverStrategy"
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Python文件中的主要策略类名称</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>参数设置</CardTitle>
              <CardDescription>配置策略的默认运行参数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.parameters.map((param, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="flex-1 space-y-2">
                      <Label>参数名称</Label>
                      <Input
                        value={param.key}
                        onChange={(e) => updateParameter(index, "key", e.target.value)}
                        placeholder="参数名称"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>参数值</Label>
                      <Input
                        value={param.value}
                        onChange={(e) => updateParameter(index, "value", e.target.value)}
                        placeholder="参数值"
                      />
                    </div>
                    <div className="w-[120px] space-y-2">
                      <Label>类型</Label>
                      <Select value={param.type} onValueChange={(value) => updateParameter(index, "type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">字符串</SelectItem>
                          <SelectItem value="number">数字</SelectItem>
                          <SelectItem value="boolean">布尔值</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => removeParameter(index)}
                      className="mb-0.5"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" type="button" onClick={addParameter} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" /> 添加参数
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>策略API文档</CardTitle>
              <CardDescription>策略开发参考信息</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>策略类结构</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">策略类必须包含以下方法：</p>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs">
                        {`class MyStrategy:
    def __init__(self, parameters=None):
        self.parameters = parameters or {}
        
    def initialize(self):
        # 在策略开始时调用一次
        pass
        
    def on_data(self, data):
        # 每个数据点都会调用此方法
        pass`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>参数使用</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">您在此页面配置的参数将作为字典传递给策略类的构造函数：</p>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs">
                        {`def __init__(self, parameters=None):
    self.parameters = parameters or {}
    self.short_period = self.parameters.get('短期均线周期', 10)
    self.long_period = self.parameters.get('长期均线周期', 50)`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>交易API</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">在策略中使用以下API进行交易操作：</p>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs">
                        {`def on_data(self, data):
    # 买入操作
    self.buy(quantity=100, limit_price=None)
    
    # 卖出操作
    self.sell(quantity=100, limit_price=None)
    
    # 获取当前持仓
    position = self.get_position()
    
    # 设置止损止盈
    self.set_stop_loss(percent=2.0)
    self.set_take_profit(percent=6.0)`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>技术指标</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">系统提供了常用的技术指标计算函数：</p>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs">
                        {`from trading.indicators import SMA, EMA, RSI, MACD

def on_data(self, data):
    # 计算简单移动平均线
    short_ma = SMA(data.close, self.short_period)
    long_ma = SMA(data.close, self.long_period)
    
    # 判断均线交叉
    if short_ma > long_ma and self.prev_short_ma <= self.prev_long_ma:
        self.buy()
    elif short_ma < long_ma and self.prev_short_ma >= self.prev_long_ma:
        self.sell()
        
    self.prev_short_ma = short_ma
    self.prev_long_ma = long_ma`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-muted-foreground">
                <Info className="h-4 w-4 mr-2" />
                <p>
                  更多详细文档请参考
                  <a href="#" className="text-blue-500 hover:underline">
                    策略开发指南
                  </a>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" type="button" onClick={() => router.push("/strategies")}>
            取消
          </Button>
          <Button type="submit">注册并保存策略配置</Button>
        </div>
      </form>
    </div>
  )
}
