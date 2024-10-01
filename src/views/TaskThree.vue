<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskBlock from '@/components/TaskBlock.vue'

const tasksStore = useTasksStore()
const dialog = useTemplateRef('dialog')
const form = useTemplateRef('form')
const activeTaskId = ref(null)

const title = ref('')
const description = ref('')
const id = ref('')
const name = ref('')
const email = ref('')

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

function deleteTask(taskId) {
  tasksStore.deleteTask(taskId)
}
function addTask() {
  form.value.reset()
  dialog.value.showModal()
}
function editTask(task) {
  title.value = task.title
  description.value = task.description
  id.value = task.assignedUser.id
  name.value = task.assignedUser.name
  email.value = task.assignedUser.email

  activeTaskId.value = task.id

  dialog.value.showModal()
}

function save() {
  if (activeTaskId.value !== null) {
    tasksStore.updateTask(activeTaskId.value, {
      title,
      description,
      assignedUser: {
        id,
        name,
        email
      }
    })
  } else {
    tasksStore.addTask({
      title,
      description,
      assignedUser: {
        id,
        name,
        email
      }
    })
  }

  activeTaskId.value = null

  dialog.value.close()
}
function cancel() {
  activeTaskId.value = null

  dialog.value.close()
}
</script>

<template>
  <div class="task-three">
    <h1>Список задач</h1>
    <ul class="list">
      <li v-for="(task, index) in tasksStore.tasks" :key="task.id">
        <TaskBlock :task="task" @delete-task="deleteTask(task.id)" @edit-task="editTask(task)" />
      </li>
    </ul>
    <button class="add-button" @click="addTask">Добавить</button>
    <dialog ref="dialog">
      <form @submit.prevent="save" ref="form">
        <label class="required">
          <span>Тайтл</span>
          <input name="title" type="text" v-model="title" required />
        </label>
        <label class="required">
          <span>Описание</span>
          <input name="description" type="text" v-model="description" required />
        </label>
        <fieldset>
          <legend>Пользователь</legend>
          <label>
            <span>Айди</span>
            <input name="id" type="text" v-model="id" />
          </label>
          <label>
            <span>Имя</span>
            <input name="name" type="text" v-model="name" />
          </label>
          <label>
            <span>Почта</span>
            <input name="email" type="email" v-model="email" />
          </label>
        </fieldset>
        <button type="submit">Сохранить</button>
        <button type="button" @click="cancel">Отмена</button>
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
