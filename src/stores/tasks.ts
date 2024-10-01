import { defineStore } from 'pinia'
import type { Task } from '@/task'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: ref<Task[]>([])
  }),
  getters: {
    getTasks: (state): Task[] => state.tasks
  },
  actions: {
    setTasks(tasks: Task[]): void {
      this.tasks = tasks
    },
    addTask(task: Task): void {
      this.tasks.push({ ...task, id: this.tasks.length })
    },
    updateTask(taskId: number, task: Task): void {
      const index = this.tasks.findIndex((task: any) => task.id === taskId)

      if (index === -1) {
        return
      }

      this.tasks[index] = task
    },
    deleteTask(taskId: number): void {
      const index = this.tasks.findIndex((task: any) => task.id === taskId)

      if (index === -1) {
        return
      }

      this.tasks.splice(index, 1)
    }
  }
})
