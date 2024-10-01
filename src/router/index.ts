import { createRouter, createWebHistory } from 'vue-router'
import TaskOne from '@/views/TaskOne.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task-one',
      component: TaskOne
    },
    {
      path: '/task-two',
      name: 'task-two',
      component: () => import('../views/TaskTwo.vue')
    },
    {
      path: '/task-three',
      name: 'task-three',
      component: () => import('../views/TaskThree.vue')
    }
  ]
})

export default router
