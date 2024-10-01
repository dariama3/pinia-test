<script setup lang="ts">
import type { User } from '@/user'

defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (event: 'delete-user'): void
  (event: 'edit-user'): void
}>()
</script>

<template>
  <span
    ><strong>{{ user.name }}</strong> - {{ user.company.name }}</span
  >
  <div>
    <button @click="emit('edit-user')">Изменить</button>
    <button @click="emit('delete-user')">x</button>
  </div>
</template>
