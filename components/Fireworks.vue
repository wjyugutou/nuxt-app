<script lang='ts' setup>
import confetti from 'canvas-confetti'

const props = defineProps<{
  show: boolean
}>()

const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function start() {
  // since particles fall down, start a bit higher than random
  confetti({ ...defaults, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
  confetti({ ...defaults, origin: { x: randomInRange(0.3, 0.5), y: Math.random() - 0.2 } })
  confetti({ ...defaults, origin: { x: randomInRange(0.5, 0.7), y: Math.random() - 0.2 } })
  confetti({ ...defaults, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
}

watchEffect(() => {
  props.show && start()
})
</script>
<template>

</template>
