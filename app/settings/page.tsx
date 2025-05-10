"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Trash2, Save } from "lucide-react"

export default function SettingsPage() {
  const [profileForm, setProfileForm] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    bio: "量化交易爱好者，专注于技术指标策略开发。",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    backtest: true,
    system: false,
  })

  const [appearance, setAppearance] = useState({
    theme: "system",
    language: "zh-CN",
    compactMode: false,
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "开发环境",
      key: "sk_test_*****************************",
      created: "2025-01-15",
      lastUsed: "2025-05-01",
    },
    {
      id: 2,
      name: "生产环境",
      key: "sk_prod_****************************",
      created: "2025-02-20",
      lastUsed: "2025-05-08",
    },
  ])

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("保存个人资料:", profileForm)
    // 在实际应用中，这里会调用API保存个人资料
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("修改密码:", passwordForm)
    // 在实际应用中，这里会调用API修改密码
  }

  const createNewApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: "新API密钥",
      key: "sk_new_*****************************",
      created: "2025-05-09",
      lastUsed: "从未使用",
    }
    setApiKeys([...apiKeys, newKey])
  }

  const deleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="password">密码安全</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="appearance">外观设置</TabsTrigger>
          <TabsTrigger value="api">API密钥</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>更新您的个人信息和简介</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> 保存更改
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-0">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>密码安全</CardTitle>
                <CardDescription>修改您的账户密码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">修改密码</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>配置您希望接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">邮件通知</Label>
                  <p className="text-sm text-muted-foreground">接收重要更新和通知到您的邮箱</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">浏览器通知</Label>
                  <p className="text-sm text-muted-foreground">在浏览器中接收实时通知</p>
                </div>
                <Switch
                  id="browser-notifications"
                  checked={notifications.browser}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, browser: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="backtest-notifications">回测通知</Label>
                  <p className="text-sm text-muted-foreground">当回测完成或失败时接收通知</p>
                </div>
                <Switch
                  id="backtest-notifications"
                  checked={notifications.backtest}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, backtest: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">系统通知</Label>
                  <p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
                </div>
                <Switch
                  id="system-notifications"
                  checked={notifications.system}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, system: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义系统的外观和显示方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>主题</Label>
                <RadioGroup
                  value={appearance.theme}
                  onValueChange={(value) => setAppearance({ ...appearance, theme: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">浅色</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">深色</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">跟随系统</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">语言</Label>
                <Select
                  value={appearance.language}
                  onValueChange={(value) => setAppearance({ ...appearance, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">紧凑模式</Label>
                  <p className="text-sm text-muted-foreground">减少界面间距，显示更多内容</p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={appearance.compactMode}
                  onCheckedChange={(checked) => setAppearance({ ...appearance, compactMode: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API密钥</CardTitle>
                <CardDescription>管理您的API密钥，用于访问系统API</CardDescription>
              </div>
              <Button onClick={createNewApiKey}>
                <Plus className="mr-2 h-4 w-4" /> 创建密钥
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>密钥</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>最后使用</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{key.key}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteApiKey(key.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> 删除
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <p>API密钥仅在创建时显示一次，请妥善保存</p>
              <Badge variant="outline">最多可创建5个密钥</Badge>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
