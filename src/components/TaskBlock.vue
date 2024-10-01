<script setup lang="ts">
const props = defineProps({
  task: Object
})
defineEmits(['delete-task', 'edit-task'])
</script>

<template>
  <div class="task">
    <strong>{{ props.task.title }}</strong>
    <p>{{ props.task.description }}</p>
    <div>
      {{ props.task.assignedUser.id }}: {{ props.task.assignedUser.name }} ({{
        props.task.assignedUser.email
      }})
    </div>
  </div>
  <div>
    <button @click="$emit('edit-task')">Изменить</button>
    <button @click="$emit('delete-task')">x</button>
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
