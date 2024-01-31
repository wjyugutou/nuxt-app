<script lang='ts' setup>
import demolist from '@/pages/demolist/list.json'

defineOptions({ name: 'Home' })
const str = ref('')
</script>

<template>
  <div>
    <button class="basic-btn">
      <NuxtLink to="/1/鱼骨头/21">
        多参数动态路由
      </NuxtLink>
    </button>
    <div>
      <button v-for="name in demolist" :key="name" class="basic-btn">
        <NuxtLink :to="`/demolist/${name}`">
          {{ name }}
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
