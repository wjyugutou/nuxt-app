<script setup lang="ts">
import { isDark, toggleDark } from '@/composables/dark'

</script>

<template>
  <ClientOnly>
    <nav class="footer h-full flex items-center justify-center gap-2 text-xl">
      <button class="icon-btn !outline-none" @click="navigateTo('/')">
        <div class="i-carbon-home" />
      </button>
      <button class="icon-btn !outline-none" @click="navigateTo('/blog')">
        <div class="i-carbon-doc" />
      </button>
      <button class="icon-btn !outline-none" @click="toggleDark">
        <div v-if="isDark" class="i-carbon-moon" />
        <div v-else class="i-carbon-sun" />
      </button>
    </nav>
  </ClientOnly>
</template>

<style scoped>
.footer {
  & > button {
    pointer-events: auto;
  }
}
</style>
