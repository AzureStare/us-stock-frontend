"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// 模拟数据
const data = [
  { date: "2020-01-01", value: 1000 },
  { date: "2020-02-01", value: 1050 },
  { date: "2020-03-01", value: 950 },
  { date: "2020-04-01", value: 1100 },
  { date: "2020-05-01", value: 1200 },
  { date: "2020-06-01", value: 1300 },
  { date: "2020-07-01", value: 1400 },
  { date: "2020-08-01", value: 1500 },
  { date: "2020-09-01", value: 1450 },
  { date: "2020-10-01", value: 1550 },
  { date: "2020-11-01", value: 1650 },
  { date: "2020-12-01", value: 1750 },
]

export function BacktestChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
