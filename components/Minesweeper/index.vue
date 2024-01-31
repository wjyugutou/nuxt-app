<script lang='ts' setup>
import { random } from 'lodash-es'
import type { MineBlock, MineState } from '.'

defineOptions({ name: 'Minesweeper' })

const state = reactive<MineState>({
  isDev: false,
  mode: 'normal',
  generateMine: false,
  mineCount: {
    normal: { x: 9, y: 9, total: 10 },
    default: { x: 16, y: 16, total: 40 },
    hard: { x: 16, y: 16, total: 99 },
  },
  total: 10,
  mines: [],
  gameState: 'play',
})

const mineAround = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
]

function newGame() {
  state.gameState = 'play'
  state.generateMine = false
  const mineCount = state.mineCount[state.mode]
  const mines: MineBlock[][] = []
  for (let y = 0; y < mineCount.y; y++) {
    const row: MineBlock[] = []
    for (let x = 0; x < mineCount.x; x++) {
      row.push({
        x,
        y,
        mine: false,
        flagged: false,
        revealed: false,
        adjacentMines: 0,
      })
    }
    mines.push(row)
  }

  state.mines = mines
}

function generateMines(block: MineBlock) {
  state.generateMine = true
  const mineCount = state.mineCount[state.mode]
  let count = mineCount.total
  while (count > 0) {
    const x = random(0, mineCount.x - 1)
    const y = random(0, mineCount.y - 1)

    // 点击的第一下不能是炸弹 判断 === 0  点击的第一下的周围也不能是炸弹 判断 <= 1
    if (Math.abs(x - block.x) <= 1 && Math.abs(y - block.y) <= 1)
      continue
    if (state.mines[y][x].mine)
      continue
    state.mines[y][x].mine = true

    getBlockSiblings(state.mines[y][x]).forEach((bs) => {
      bs.adjacentMines++
    })

    count--
  }
}

function toggleDev() {
  state.isDev = !state.isDev
}

function spreadNotMine(block: MineBlock) {
  if (block.adjacentMines)
    return
  getBlockSiblings(block).forEach((bs) => {
    if (bs.revealed)
      return
    bs.revealed = true
    spreadNotMine(bs)
  })
}

function getBlockSiblings(block: MineBlock) {
  const siblings: MineBlock[] = []
  for (let i = 0; i < mineAround.length; i++) {
    const [x, y] = mineAround[i]
    const blockAround = state.mines[block.y + y]?.[block.x + x]
    blockAround && siblings.push(blockAround)
  }
  return siblings
}

function result(block: MineBlock) {
  if (block.mine) {
    state.gameState = 'over'
    return true
  }

  const win = state.mines.flat(2).filter(item => !item.revealed).length === state.mineCount[state.mode].total
  console.log(state.mines.flat(2).filter(item => !item.revealed).length)

  win && (state.gameState = 'win')
  return win
}

function blockClick(block: MineBlock) {
  if (block.revealed)
    return
  if (state.gameState !== 'play')
    return
  block.revealed = true

  if (result(block))
    return

  if (!state.generateMine)
    generateMines(block)

  spreadNotMine(block)
}

function blockFlag(block: MineBlock) {
  if (block.revealed)
    return
  block.flagged = !block.flagged
}

newGame()

defineExpose({
  newGame,
  toggleDev,
  changeMode(mode: MineState['mode']) {
    state.mode = mode
    newGame()
  },
})
</script>

<template>
  <div class="flex-center h-full w-full flex-col">
    <div class="flex items-center justify-center">
      <!-- <div flex items-center justify-center p-3 text-2xl>
        <div i-carbon-timer />
        {{ timeMS }}
      </div> -->

      <div class="flex items-center justify-center p-3 text-2xl">
        <div i-carbon-switch-layer-3 />
      </div>
    </div>
    <div class="relative">
      <div v-show="state.gameState !== 'play'" class="flex-center absolute left-0 top-0 h-full w-full select-none bg-black/50 text-25">
        {{ state.gameState === 'over' ? 'You Lose' : 'You Win' }}
      </div>
      <div v-for="row, y in state.mines" :key="`y-${y}`" class="m-b-2 flex gap-2 last:m-b-0">
        <template v-for="block, x in row" :key="`x-${x}`">
          <MinesweeperBlock :block="block" :is-over="state.gameState === 'over'" :is-dev="state.isDev" @click="blockClick(block)" @contextmenu.prevent="blockFlag(block)" />
        </template>
      </div>
    </div>

    <Fireworks :show="state.gameState === 'win'" />
    <canvas id="canvasTest" width="100" height="100" />
  </div>
</template>

<style>
.m-btn {
  @apply rounded p-1 ;
}
</style>
