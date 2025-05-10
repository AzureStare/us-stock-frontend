"use client"

import { useEffect, useState } from "react"

interface StrategyCodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
}

export function StrategyCodeEditor({ value, onChange }: StrategyCodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (isMounted && !editor) {
      // 在实际应用中，这里会加载代码编辑器，如Monaco Editor
      // 这里使用简单的textarea代替
      console.log("初始化代码编辑器")
    }
  }, [isMounted, editor])

  if (!isMounted) {
    return null
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <textarea
        className="w-full h-[500px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  )
}
