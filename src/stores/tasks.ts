import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  getters: {
    getTasks: (state) => state.tasks
  },
  actions: {
    setTasks(tasks: any) {
      this.tasks = tasks
    },
    addTask(data: any) {
      // @ts-ignore
      this.tasks.push({ id: this.tasks.length, ...data })
    },
    updateTask(taskId: number, data: any) {
      const index = this.tasks.findIndex((task: any) => task.id === taskId)

      if (index === -1) {
        return
      }

      // @ts-ignore
      this.tasks[index] = data
    },
    deleteTask(taskId: number) {
      const index = this.tasks.findIndex((task: any) => task.id === taskId)

      if (index === -1) {
        return
      }

      this.tasks.splice(index, 1)
    }
  }
})
