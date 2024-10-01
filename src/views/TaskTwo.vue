<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserBlock from '@/components/UserBlock.vue'
import type { User } from '@/user'

const users = ref<User[]>([])

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  users.value = await response.json()
})
function editUser(index: number): void {
  const name = prompt('Введите имя', users.value[index].name)
  if (name === null) {
    return
  }

  const company = prompt('Введите компанию', users.value[index].company.name)
  if (company === null) {
    return
  }

  users.value[index].name = name
  users.value[index].company.name = company
}
function deleteUser(index: number): void {
  const approve = confirm('Удалить запись?')

  if (!approve) return

  users.value.splice(index, 1)
}
function addUser(): void {
  const name = prompt('Введите имя')
  if (name === null) {
    return
  }

  const company = prompt('Введите компанию')
  if (company === null) {
    return
  }

  users.value.push({
    name,
    company: {
      name: company
    }
  })
}
</script>

<template>
  <div class="task-two">
    <h1>Список пользователей</h1>
    <ul class="list">
      <li v-for="(user, index) in users" :key="user.id">
        <UserBlock :user="user" @delete-user="deleteUser(index)" @edit-user="editUser(index)" />
      </li>
    </ul>
    <button class="add-button" @click="addUser">Добавить</button>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}
li {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.add-button {
  margin-top: 1.5rem;
}
</style>
