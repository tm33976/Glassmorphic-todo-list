"use client"

import { useEffect, useState } from "react"
import { TodoForm } from "@/components/todo-form"
import { TodoItem } from "@/components/todo-item"
import { TodoFilters } from "@/components/todo-filters"
import { ThemeToggle } from "@/components/theme-toggle"

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type FilterType = "all" | "completed" | "incomplete"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const updateTodo = (id: string, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "incomplete") return !todo.completed
    return true
  })

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Glassmorphism container */}
      <div className="w-full max-w-md mx-auto mt-8 mb-8 backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden transition-all duration-300">
        {/* Header with glassmorphism effect */}
        <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 dark:from-slate-800/10 dark:to-slate-800/5 backdrop-blur-sm border-b border-white/10 dark:border-slate-700/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400">
              Todo List
            </h1>
            <ThemeToggle />
          </div>

          <TodoForm onAddTodo={addTodo} />

          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            todoCount={{
              all: todos.length,
              completed: todos.filter((t) => t.completed).length,
              incomplete: todos.filter((t) => !t.completed).length,
            }}
          />
        </div>

        {/* Todo items container */}
        <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 dark:scrollbar-thumb-slate-700/20">
          <div className="space-y-3">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {filter === "all" ? "No todos yet. Add one above!" : `No ${filter} todos found.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
