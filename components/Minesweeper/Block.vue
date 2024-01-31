<script lang='ts' setup>
import type { MineBlock } from '.'

const props = defineProps<{
  block: MineBlock
  isDev: boolean
  isOver: boolean
}>()
const numberColors = [
  'text-transparent',
  'text-red-500',
  'text-blue-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
  'text-teal-500',
]
const blockClass = computed(() => {
  if (props.isOver && props.block.mine)
    return 'bg-red-600'
  if (props.block.revealed)
    return { 'cursor-default': true, [numberColors[props.block.adjacentMines]]: !props.block.mine }
  return 'bg-gray/50 hover:bg-gray/10'
})
</script>

<template>
  <button class="h-10 w-10 flex items-center justify-center border" :class="blockClass">
    <span v-if="isDev">
      {{ block.mine ? '💣' : block.adjacentMines }}
      {{ block.flagged ? '🚩' : '' }}
    </span>
    <span v-else>
      {{ (isOver && block.mine) ? '💣' : '' }}
      {{ (block.revealed && !block.mine) ? block.adjacentMines : '' }}
      {{ (!block.revealed && block.flagged) ? '🚩' : '' }}

    </span>
  </button>
</template>
