"use client"

import type { FilterType } from "@/app/page"
import { Button } from "@/components/ui/button"

interface TodoFiltersProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  todoCount: {
    all: number
    completed: number
    incomplete: number
  }
}

export function TodoFilters({ filter, onFilterChange, todoCount }: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-slate-800/20 border border-white/30 dark:border-slate-700/30">
      <Button
        variant={filter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className={
          filter === "all"
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-lg"
            : "bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60"
        }
      >
        All ({todoCount.all})
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
        className={
          filter === "completed"
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg"
            : "bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60"
        }
      >
        Completed ({todoCount.completed})
      </Button>
      <Button
        variant={filter === "incomplete" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("incomplete")}
        className={
          filter === "incomplete"
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg"
            : "bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60"
        }
      >
        Incomplete ({todoCount.incomplete})
      </Button>
    </div>
  )
}
