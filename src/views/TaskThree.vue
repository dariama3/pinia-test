<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskBlock from '@/components/TaskBlock.vue'
import type { Task } from '@/task'

const tasksStore = useTasksStore()
const dialog = useTemplateRef('dialog')
const activeTaskId = ref<number | null>(null)

const title = ref<string>('')
const description = ref<string>('')
const id = ref<number | null>(null)
const name = ref<string>('')
const email = ref<string>('')

onMounted(() => {
  tasksStore.setTasks([
    {
      id: 1,
      title: 'sample text',
      description: 'sample',
      assignedUser: {
        id: 1,
        name: 'sample',
        email: 'sample@sample.com'
      }
    },
    {
      id: 2,
      title: 'sample text2',
      description: 'sample2',
      assignedUser: {
        id: 2,
        name: 'sample2',
        email: 'sampl2e@samp2le.com'
      }
    }
  ])
})

function deleteTask(taskId: number): void {
  const approve = confirm('Delete task?')

  if (!approve) return

  tasksStore.deleteTask(taskId)
}
function addTask(): void {
  title.value = ''
  description.value = ''
  id.value = null
  name.value = ''
  email.value = ''

  activeTaskId.value = null

  dialog.value?.showModal()
}
function editTask(task: Task): void {
  title.value = task.title
  description.value = task.description
  id.value = task.assignedUser.id
  name.value = task.assignedUser.name
  email.value = task.assignedUser.email

  activeTaskId.value = task.id

  dialog.value?.showModal()
}

function save(): void {
  if (activeTaskId.value !== null) {
    tasksStore.updateTask(activeTaskId.value, {
      id: activeTaskId.value,
      title: title.value,
      description: description.value,
      assignedUser: {
        id: Number(id.value),
        name: name.value,
        email: email.value
      }
    })
  } else {
    tasksStore.addTask({
      id: 0,
      title: title.value,
      description: description.value,
      assignedUser: {
        id: Number(id.value),
        name: name.value,
        email: email.value
      }
    })
  }

  activeTaskId.value = null

  dialog.value?.close()
}
function cancel() {
  activeTaskId.value = null

  dialog.value?.close()
}
</script>

<template>
  <div class="task-three">
    <h1>Tasks list</h1>
    <ul class="list">
      <li v-for="task in tasksStore.getTasks" :key="task.id">
        <TaskBlock :task="task" @delete-task="deleteTask(task.id)" @edit-task="editTask(task)" />
      </li>
    </ul>
    <button class="add-button" @click="addTask">Add</button>
    <dialog ref="dialog">
      <form @submit.prevent="save">
        <label class="required">
          <span>Title</span>
          <input name="title" type="text" v-model="title" required />
        </label>
        <label class="required">
          <span>Description</span>
          <input name="description" type="text" v-model="description" required />
        </label>
        <fieldset>
          <legend>User</legend>
          <label>
            <span>Id</span>
            <input name="id" type="text" v-model="id" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" type="text" v-model="name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" v-model="email" />
          </label>
        </fieldset>
        <button type="submit">Save</button>
        <button type="button" @click="cancel">Cancel</button>
      </form>
    </dialog>
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
  align-items: center;
  border-bottom: 1px solid #bbb;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.add-button {
  margin-top: 1.5rem;
}
dialog {
  margin: auto;
}
form,
fieldset {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
form label {
  column-gap: 1rem;
  display: flex;
  justify-content: space-between;
}
form label.required span::after {
  color: tomato;
  content: '*';
}
</style>
