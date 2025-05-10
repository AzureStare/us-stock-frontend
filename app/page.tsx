import { redirect } from "next/navigation"

export default function Home() {
  // 在实际应用中，这里会检查用户是否已登录
  // 如果已登录，重定向到仪表板
  // 如果未登录，重定向到登录页面
  redirect("/login")
}
