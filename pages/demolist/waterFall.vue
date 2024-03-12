<script lang='ts' setup>
import { random } from 'lodash-es'

const codeStr = `
\<script lang='ts' setup generic="T"\>
import { random } from 'lodash-es';

const props = withDefaults(defineProps\<{
  list: T[]
  /** 列数 */
  col?: number
  // col?: number
}\>(), {
  col: random(4,10),
  // row: random(4,10)
})

const slots = defineSlots\<{
  default(props: T): any
}\>()

\</script\>

\<template\>
 \<div class="waterfall-container" :style="'--repeat: '+ col + ';'"\>
  \<div :style="{ height: '100%', width: '100%', display: 'inline-block', gridRowEnd: 'span '+ random(2, col) +'' }" v-for="item,index in list" :key="index"\>
    \<slot v-bind="item" /\>
  \</div\>
 \</div\>
\</template\>
\<style\>
.waterfall-container {
  display: grid;
  grid-auto-rows: 5px;
  grid-template-columns: repeat(var(--repeat), 1fr);
  align-items: start;
  justify-content: space-between;
  padding: 0 10px 10px;
  gap: 12px;
}
\</style\>
`

const list = ref<{
  color: string
  row: number
  col: number
}[]>([])

function randomData() {
  const a = Array.from({ length: random(100, 200) }, () => ({ color: useRandomColor(), col: random(1, 3), row: random(4, 8) }))
  list.value = a
}

randomData()
</script>

<template>
  <div>
    <CssWaterFall :list="list">
      <div class="h-full w-full" :style="{ backgroundColor: useRandomColor() }">
        sdsad
      </div>
    </CssWaterFall>
    <CodeView lang="xml" title="css实现瀑布流" :code="codeStr" />
  </div>
</template>
