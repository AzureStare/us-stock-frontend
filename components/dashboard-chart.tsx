"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// 模拟数据
const data = [
  { name: "1月", 均线交叉策略: 4000, 动量反转策略: 2400, 波动率突破策略: 2400 },
  { name: "2月", 均线交叉策略: 3000, 动量反转策略: 1398, 波动率突破策略: 2210 },
  { name: "3月", 均线交叉策略: 2000, 动量反转策略: 9800, 波动率突破策略: 2290 },
  { name: "4月", 均线交叉策略: 2780, 动量反转策略: 3908, 波动率突破策略: 2000 },
  { name: "5月", 均线交叉策略: 1890, 动量反转策略: 4800, 波动率突破策略: 2181 },
  { name: "6月", 均线交叉策略: 2390, 动量反转策略: 3800, 波动率突破策略: 2500 },
  { name: "7月", 均线交叉策略: 3490, 动量反转策略: 4300, 波动率突破策略: 2100 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="均线交叉策略" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="动量反转策略" stroke="#82ca9d" />
        <Line type="monotone" dataKey="波动率突破策略" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}
