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
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Parameter {
  id: string
  name: string
  defaultValue: string
  type: string
  min?: string
  max?: string
  step?: string
  description?: string
}

export default function CreateIndicatorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "draft",
    formula: `// 指标计算公式示例
function calculate(data, params) {
  const period = params.period || 14;
  const result = [];
  
  // 计算简单移动平均线
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
  })

  const [parameters, setParameters] = useState<Parameter[]>([
    {
      id: "1",
      name: "period",
      defaultValue: "14",
      type: "number",
      min: "1",
      max: "200",
      step: "1",
      description: "计算周期",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交指标表单:", { ...formData, parameters })
    // 在实际应用中，这里会调用API创建指标
    // 然后跳转到指标列表页面
    router.push("/indicators")
  }

  const addParameter = () => {
    const newParam: Parameter = {
      id: Date.now().toString(),
      name: "",
      defaultValue: "",
      type: "number",
      min: "",
      max: "",
      step: "",
      description: "",
    }
    setParameters([...parameters, newParam])
  }

  const updateParameter = (id: string, field: keyof Parameter, value: string) => {
    setParameters(parameters.map((param) => (param.id === id ? { ...param, [field]: value } : param)))
  }

  const removeParameter = (id: string) => {
    setParameters(parameters.filter((param) => param.id !== id))
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
            <h1 className="text-3xl font-bold tracking-tight">创建指标</h1>
          </div>
          <p className="text-muted-foreground">创建新的技术指标，定义计算公式和参数</p>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" /> 保存指标
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>设置指标的基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">指标名称</Label>
                  <Input
                    id="name"
                    placeholder="输入指标名称"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">指标描述</Label>
                  <Textarea
                    id="description"
                    placeholder="描述指标的用途和特点"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">指标分类</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择指标分类" />
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
                    <Label htmlFor="status">激活指标</Label>
                    <p className="text-sm text-muted-foreground">激活后可用于策略和回测</p>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>参数设置</CardTitle>
                  <CardDescription>配置指标的参数</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addParameter}>
                  <Plus className="h-4 w-4 mr-1" /> 添加参数
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {parameters.map((param) => (
                    <div key={param.id} className="space-y-4 pb-4 border-b last:border-0">
                      <div className="flex justify-between items-center">
                        <Label>参数 #{parameters.findIndex((p) => p.id === param.id) + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                          onClick={() => removeParameter(param.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">删除参数</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>参数名称</Label>
                        <Input
                          value={param.name}
                          onChange={(e) => updateParameter(param.id, "name", e.target.value)}
                          placeholder="例如: period"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>默认值</Label>
                          <Input
                            value={param.defaultValue}
                            onChange={(e) => updateParameter(param.id, "defaultValue", e.target.value)}
                            placeholder="例如: 14"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>类型</Label>
                          <Select
                            value={param.type}
                            onValueChange={(value) => updateParameter(param.id, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="选择类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="number">数字</SelectItem>
                              <SelectItem value="boolean">布尔值</SelectItem>
                              <SelectItem value="string">字符串</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {param.type === "number" && (
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>最小值</Label>
                            <Input
                              value={param.min || ""}
                              onChange={(e) => updateParameter(param.id, "min", e.target.value)}
                              placeholder="最小值"
                              type="number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>最大值</Label>
                            <Input
                              value={param.max || ""}
                              onChange={(e) => updateParameter(param.id, "max", e.target.value)}
                              placeholder="最大值"
                              type="number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>步长</Label>
                            <Input
                              value={param.step || ""}
                              onChange={(e) => updateParameter(param.id, "step", e.target.value)}
                              placeholder="步长"
                              type="number"
                            />
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label>描述</Label>
                        <Input
                          value={param.description || ""}
                          onChange={(e) => updateParameter(param.id, "description", e.target.value)}
                          placeholder="参数描述"
                        />
                      </div>
                    </div>
                  ))}
                  {parameters.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>没有参数</p>
                      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addParameter}>
                        <Plus className="h-4 w-4 mr-1" /> 添加参数
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>指标公式</CardTitle>
                <CardDescription>编写指标的计算公式</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="code">代码编辑</TabsTrigger>
                    <TabsTrigger value="visual">可视化编辑</TabsTrigger>
                    <TabsTrigger value="docs">文档</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code" className="mt-0">
                    <Textarea
                      value={formData.formula}
                      onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                      className="font-mono h-[500px]"
                    />
                  </TabsContent>
                  <TabsContent value="visual" className="mt-0">
                    <div className="h-[500px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
                      <p className="text-muted-foreground">可视化编辑器将在这里显示</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="docs" className="mt-0">
                    <div className="h-[500px] overflow-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <h3 className="text-lg font-medium mb-2">指标API文档</h3>
                      <p className="mb-4">使用以下API函数来构建您的技术指标：</p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">计算函数</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>function calculate(data, params) {}</code>
                          </pre>
                          <p className="text-sm mt-1">接收价格数据和参数，返回计算结果。</p>
                        </div>

                        <div>
                          <h4 className="font-medium">数据结构</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>
                              data = [{"{"}
                              date: "2023-01-01", open: 100, high: 105, low: 98, close: 103, volume: 1000
                              {"}"}, ... ]
                            </code>
                          </pre>
                          <p className="text-sm mt-1">输入数据格式，包含OHLCV价格数据。</p>
                        </div>

                        <div>
                          <h4 className="font-medium">参数访问</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>const period = params.period || 14;</code>
                          </pre>
                          <p className="text-sm mt-1">从params对象中获取参数值，可设置默认值。</p>
                        </div>

                        <div>
                          <h4 className="font-medium">辅助函数</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>sum(array, period)</code>
                          </pre>
                          <p className="text-sm mt-1">计算数组中指定周期的和。</p>
                        </div>

                        <div>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>avg(array, period)</code>
                          </pre>
                          <p className="text-sm mt-1">计算数组中指定周期的平均值。</p>
                        </div>

                        <div>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">
                            <code>stdDev(array, period)</code>
                          </pre>
                          <p className="text-sm mt-1">计算数组中指定周期的标准差。</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex gap-2">
                  <Button variant="outline" type="button" onClick={() => router.push("/indicators")}>
                    取消
                  </Button>
                  <Button type="submit">保存指标</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
