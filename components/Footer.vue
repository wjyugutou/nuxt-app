<script lang='ts' setup>
import { isDark, toggleDark } from '@/composables/dark'
</script>

<template>
  <nav fixed bottom-0 w-full flex items-center justify-center gap-2 text-xl>
    <button class="icon-btn !outline-none">
      <NuxtLink to="/" replace>
        <div i-carbon-home />
      </NuxtLink>
    </button>
    <button class="icon-btn !outline-none">
      <NuxtLink to="/blog">
        <div i-carbon-doc />
      </NuxtLink>
    </button>
    <button class="icon-btn !outline-none" @click="toggleDark">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>
  </nav>
</template>
