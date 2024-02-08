<script lang='ts' setup>
const props = defineProps<{
  visible: boolean
}>()
</script>

<template>
  <div v-show="visible" class="mask-root" />
</template>

<style>
.mask-root {
  @apply fixed inset-0 h-100vh w-100vw bg-black/50;
}
</style>
