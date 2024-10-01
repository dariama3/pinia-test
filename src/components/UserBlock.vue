<script setup lang="ts">
const props = defineProps({
  user: Object
})
defineEmits(['delete-user', 'edit-user'])
</script>

<template>
  <span
    ><strong>{{ props.user.name }}</strong> - {{ props.user.company.name }}</span
  >
  <div>
    <button @click="$emit('edit-user')">Изменить</button>
    <button @click="$emit('delete-user')">x</button>
  </div>
</template>
