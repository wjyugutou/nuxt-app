<script lang='ts' setup>
import type Minesweeper from '@/components/Minesweeper/index.vue'

const minesweeper = ref<InstanceType<typeof Minesweeper>>()
</script>

<template>
  <div class="flex-center flex flex-col p-t-10">
    <div class="m-b-5 flex gap-10">
      <button class="basic-btn m-btn" @click="minesweeper?.toggleDev"> toggleDev </button>
      <button class="basic-btn m-btn" @click="minesweeper?.newGame"> 新游戏 </button>
      <button class="basic-btn m-btn" @click="minesweeper?.changeMode('normal')"> 简单 </button>
      <button class="basic-btn m-btn" @click="minesweeper?.changeMode('default')"> 正常 </button>
      <button class="basic-btn m-btn" @click="minesweeper?.changeMode('hard')"> 困难 </button>
    </div>
    <Suspense>
      <LazyMinesweeper ref="minesweeper" />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>
