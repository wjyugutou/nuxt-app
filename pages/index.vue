<script lang='ts' setup>
const str = ref('')
</script>

<template>
  <div>
    <h1>首页</h1>
    <NuxtLink to="/1/鱼骨头/21">
      多参数动态路由
    </NuxtLink>
    <AnimateInput v-model="str" placeholder="请输入内容" />
  </div>
</template>
