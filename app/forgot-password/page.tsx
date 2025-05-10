"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChartIcon as ChartLineUp, Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (err) {
      setError("发送重置邮件时发生错误，请稍后再试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <ChartLineUp className="h-10 w-10 text-primary" />
            <span className="ml-2 text-2xl font-bold">旗舰策略</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">找回密码</CardTitle>
          <CardDescription className="text-center">
            {isSubmitted ? "重置密码链接已发送到您的邮箱" : "输入您的邮箱，我们将发送重置密码链接"}
          </CardDescription>
        </CardHeader>
        {isSubmitted ? (
          <CardContent className="space-y-4 pt-4">
            <div className="p-3 text-sm bg-green-50 text-green-600 rounded-md border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              重置密码链接已发送到 {email}。请检查您的邮箱并按照邮件中的指示进行操作。
            </div>
            <div className="text-center mt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> 返回登录
                </Button>
              </Link>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "发送中..." : "发送重置链接"}
              </Button>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> 返回登录
                </Button>
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
