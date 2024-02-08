<script lang='ts' setup>
const clickPop = ref(false)
const hoverPop = ref(false)
</script>

<template>
  <div class="h-100 w-100 overflow-auto">
    <div class="flex-center h-200 w-200 gap-10">
      <Popover v-model="clickPop" content="<p>你好</p>" trigger="click">
        <span>Click</span>
        <template #content>
          <div>你好</div>
        </template>
      </Popover>

      <Popover v-model="hoverPop" content="hover">
        <div>Hover</div>
      </Popover>
    </div>
  </div>
</template>
