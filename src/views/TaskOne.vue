<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selectedOption = ref<string>('')
const saveToCookie = ref<boolean>(false)

const setCookie = (name: string, value: string, minutes: number): void => {
  const date = new Date()
  date.setTime(date.getTime() + minutes * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

const getCookie = (name: string): string | null => {
  const cname = name + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(cname) === 0) return cookie.substring(cname.length, cookie.length)
  }
  return null
}

const deleteCookie = (name: string): void => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
}

const onSelectChange = (): void => {
  if (saveToCookie.value) {
    setCookie('selectedOption', selectedOption.value, 15)
  }
}

const onCheckboxChange = (): void => {
  if (!saveToCookie.value) {
    deleteCookie('selectedOption')
  } else if (selectedOption.value) {
    setCookie('selectedOption', selectedOption.value, 15)
  }
}

onMounted(() => {
  const savedValue = getCookie('selectedOption')
  if (savedValue) {
    selectedOption.value = savedValue
  }
})
</script>

<template>
  <div class="task-one">
    <label for="data-select">Выберите опцию:</label>
    <select id="data-select" v-model="selectedOption" @change="onSelectChange">
      <option value="option1">Опция 1</option>
      <option value="option2">Опция 2</option>
      <option value="option3">Опция 3</option>
    </select>

    <label>
      <input type="checkbox" v-model="saveToCookie" @change="onCheckboxChange" />
      Сохранить в cookie
    </label>
  </div>
</template>

<style scoped>
.task-one {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 16px;
}
select {
  font-size: 16px;
  padding: 2px;
}
</style>
