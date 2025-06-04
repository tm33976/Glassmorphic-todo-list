"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface TodoFormProps {
  onAddTodo: (title: string) => void
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:bg-white/60 dark:focus:bg-slate-800/60 focus:border-white/50 dark:focus:border-slate-600/50 transition-all duration-200"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-slate-400 disabled:to-slate-500 text-white border-0 rounded-xl px-6 py-3 shadow-lg backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}
