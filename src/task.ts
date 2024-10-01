export interface Task {
  id: number
  title: string
  description: string
  assignedUser: {
    id: number
    name: string
    email: string
  }
}
