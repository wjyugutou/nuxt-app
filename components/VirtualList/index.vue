<script lang='ts' setup>
import type { ComputedRef } from 'vue'
import type { VirtualListProps } from './type'

defineOptions({ name: 'VirtualList' })

const props = defineProps<VirtualListProps>()

const renderCount = 10

const virtualList = ref<HTMLDivElement>()
const virtualContent = ref<HTMLDivElement>()

const startIndex = ref(0)

const itemMap = shallowReactive({
  itemHeight: {} as Record<any, number>,
})

const virtualContainerPaddingTop = ref('0px')

const virtualContentHeight = ref(props.dataSource.length * (props.itemSize ?? 50))

const viewList: ComputedRef<(typeof props.dataSource)[number][]> = computed(() => {
  const endIndex = Math.min(props.dataSource.length - 1, startIndex.value + renderCount)

  return props.dataSource.slice(startIndex.value, endIndex + 1).map((item, index) => ({
    record: item,
    index: index + startIndex.value,
  }))
})

function childHeightChange(node: HTMLElement, index: number) {
  let height = props.dataSource.length * (props.itemSize ?? 50)

  itemMap.itemHeight[index] = node.clientHeight

  for (const itemHeight in itemMap.itemHeight)
    height += itemMap.itemHeight[itemHeight] - 50
  virtualContentHeight.value = height
}

function getStartIndex(scrollTop: number): number {
  if (props.itemSize)
    return Math.floor(scrollTop / props.itemSize)
  let num = 0
  let i = 0
  for (let index = 0; index < props.dataSource.length; index++) {
    num += (itemMap.itemHeight[index] || 50)
    i++

    console.log(num, Math.max(i - 2, 0))
    if (num >= scrollTop)
      break
  }

  return Math.max(i - 2, 0)
}

function getPaddingTop(index: number): string {
  if (props.itemSize)
    return `${index * props.itemSize}px`
  let paddingTop = 0

  for (let i = 0; i < startIndex.value; i++) {
    if (i > +startIndex.value)
      break
    paddingTop += itemMap.itemHeight[i] || 50
  }
  return `${paddingTop}px`
}

function scrollHandle(e: Event) {
  const el = e.target as HTMLElement

  startIndex.value = getStartIndex(el.scrollTop)

  virtualContainerPaddingTop.value = getPaddingTop(startIndex.value)
}
</script>

<template>
  <div ref="virtualList" class="virtualList" @scroll="scrollHandle">
    <div ref="virtualContent" :style="{ height: `${virtualContentHeight}px`, paddingTop: virtualContainerPaddingTop }">
      <VirtualListItem v-for="(item) of viewList" :key="item.index" :index="item.index" @size-change="childHeightChange">
        <slot :record="item.record" :index="item.index" />
      </VirtualListItem>
    </div>
  </div>
</template>

<style>
.virtualList {
  overflow-y: auto;
  position: relative;
  height: 200px;
}
</style>
