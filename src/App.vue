<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Task1</RouterLink>
        <RouterLink to="/task-two">Task2</RouterLink>
        <RouterLink to="/task-three">Task3</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
