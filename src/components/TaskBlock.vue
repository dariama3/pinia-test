<script setup lang="ts">
import type { Task } from '@/task'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (event: 'delete-task'): void
  (event: 'edit-task'): void
}>()
</script>

<template>
  <div class="task">
    <strong>{{ task.title }}</strong>
    <p>{{ task.description }}</p>
    <div>
      {{ task.assignedUser.id }}: {{ task.assignedUser.name }} ({{ task.assignedUser.email }})
    </div>
  </div>
  <div>
    <button @click="emit('edit-task')">Change</button>
    <button @click="emit('delete-task')">x</button>
  </div>
</template>

<style scoped>
.task {
  text-align: initial;
}
.task p {
  margin: 0;
}
</style>
