<script lang='ts' setup>
import type { ShallowRef } from 'vue'

const props = defineProps<{
  monitorMouse?: boolean
}>()

interface Star {
  x: number
  y: number
  z: number
}

const CONSTANT = {
  STAR_QUANTITY: 0,
  // 定义星星的大小
  STAR_SIZE: 3,
  // 定义星星的最小缩放比例
  STAR_MIN_SCALE: 0.2,
  // 速度
  STAR_SPEED: {
    x: 0,
    y: 0,
    z: 0.001,
    accelerate_x: 0,
    accelerate_y: 0,
  },
  POINTER_X: 0,
  POINTER_Y: 0,
  // 边界
  BOUNDARY: 50,
  WIDTH: 100,
  HEIGHT: 100,
}

const canvas = shallowRef<HTMLCanvasElement>()
const ctx = shallowRef() as ShallowRef<CanvasRenderingContext2D>
const stars: Star[] = []

const { x, y } = useMouse()

function generateStar() {
  for (let i = 0; i < CONSTANT.STAR_QUANTITY; i++)
    stars.push({ x: 0, y: 0, z: CONSTANT.STAR_MIN_SCALE + (1 - CONSTANT.STAR_MIN_SCALE) * Math.random() })
}

// 将星星放置到随机位置
function placeStar(star: Star) {
  star.x = Math.random() * CONSTANT.WIDTH
  star.y = Math.random() * CONSTANT.HEIGHT
}

function resize() {
  // 定义宽度和高度
  CONSTANT.WIDTH = window.innerWidth
  CONSTANT.HEIGHT = window.innerHeight
  canvas.value!.width = CONSTANT.WIDTH
  canvas.value!.height = CONSTANT.HEIGHT

  stars.forEach(placeStar)
}

function update() {
  CONSTANT.STAR_SPEED.accelerate_x *= 0.97
  CONSTANT.STAR_SPEED.accelerate_y *= 0.97

  CONSTANT.STAR_SPEED.x = (CONSTANT.STAR_SPEED.accelerate_x - CONSTANT.STAR_SPEED.x) * 0.8
  CONSTANT.STAR_SPEED.y = (CONSTANT.STAR_SPEED.accelerate_y - CONSTANT.STAR_SPEED.y) * 0.8

  stars.forEach((star) => {
    star.x += CONSTANT.STAR_SPEED.x * star.z
    star.y += CONSTANT.STAR_SPEED.y * star.z

    star.x += (star.x - CONSTANT.WIDTH / 2) * CONSTANT.STAR_SPEED.z
    star.y += (star.y - CONSTANT.HEIGHT / 2) * CONSTANT.STAR_SPEED.z
    star.z += CONSTANT.STAR_SPEED.z

    if (star.x < -CONSTANT.BOUNDARY || star.x > CONSTANT.WIDTH + CONSTANT.BOUNDARY
    || star.y < -CONSTANT.BOUNDARY || star.y > CONSTANT.HEIGHT + CONSTANT.BOUNDARY)
      placeStar(star)
  })
}

function render() {
  stars.forEach((star) => {
    ctx.value.beginPath()
    ctx.value.lineCap = 'round'
    ctx.value.lineWidth = Math.min(CONSTANT.STAR_SIZE * star.z * 1, CONSTANT.STAR_SIZE)
    ctx.value.strokeStyle = useRandomColor(0.5 + 0.5 * Math.random())

    // 绘制星星的路径
    ctx.value.moveTo(star.x, star.y)
    const tail = {
      x: CONSTANT.STAR_SPEED.x * 2,
      y: CONSTANT.STAR_SPEED.y * 2,
    }
    // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
    if (Math.abs(tail.x) < 0.1)
      tail.x = 0.5
    if (Math.abs(tail.y) < 0.1)
      tail.y = 0.5
    ctx.value.lineTo(star.x + tail.x, star.y + tail.y)
    ctx.value.stroke()
    ctx.value.closePath()
  })
}

function animate() {
  // 清空画布
  ctx.value.clearRect(0, 0, CONSTANT.WIDTH, CONSTANT.HEIGHT)
  update()
  render()
  requestAnimationFrame(animate)
}

function init() {
  CONSTANT.STAR_QUANTITY = (window.innerWidth + window.innerHeight) / 8
  generateStar()
  resize()
  animate()
}

useEventListener(window, 'resize', resize)

watchEffect(() => {
  if (!props.monitorMouse)
    return
  CONSTANT.STAR_SPEED.accelerate_x += (x.value - CONSTANT.POINTER_X) / 8 * -1
  CONSTANT.STAR_SPEED.accelerate_y += (y.value - CONSTANT.POINTER_Y) / 8 * -1

  CONSTANT.POINTER_X = x.value
  CONSTANT.POINTER_Y = y.value
})

onMounted(() => {
  ctx.value = canvas.value!.getContext('2d')!
  init()
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 select-none" />
  <slot />
</template>
