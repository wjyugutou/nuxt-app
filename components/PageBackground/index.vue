<script lang="ts" setup>
defineOptions({ name: 'PageBackground' })
const props = withDefaults(defineProps<{
  starBg: boolean
  partBg: boolean
}>(), {
  starBg: true,
  partBg: false,
})
</script>

<template>
  <ClientOnly>
    <CosmicStars v-if="starBg" />
    <Tsparticles v-if="partBg" />
  </ClientOnly>

  <slot />
</template>
