"use client"

import { useState } from "react"
import type { Todo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Pencil, Trash, Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)

  const handleUpdate = () => {
    if (editedTitle.trim() && editedTitle !== todo.title) {
      onUpdate(todo.id, editedTitle)
    } else {
      setEditedTitle(todo.title)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(todo.title)
    setIsEditing(false)
  }

  const createdDate = new Date(todo.createdAt)
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true })

  return (
    <Card className="p-4 backdrop-blur-md bg-white/20 dark:bg-slate-800/20 border border-white/30 dark:border-slate-700/30 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-200 group">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 border-white/40 dark:border-slate-600/40"
        />

        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1 bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/40 rounded-lg"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleUpdate}
                className="hover:bg-green-500/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCancel}
                className="hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <p
                className={`text-slate-800 dark:text-slate-200 ${todo.completed ? "line-through text-slate-500 dark:text-slate-400" : ""} transition-all duration-200`}
              >
                {todo.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Created {timeAgo}</p>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg w-8 h-8"
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg w-8 h-8"
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
