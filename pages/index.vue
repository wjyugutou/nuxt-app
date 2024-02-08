<script lang='ts' setup>
import demolist from '@/pages/demolist/list.json'

defineOptions({ name: 'Home' })

useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <button class="basic-btn">
      <NuxtLink to="/1/鱼骨头/21">
        多参数动态路由
      </NuxtLink>
    </button>
    <div class="flex gap-2">
      <button v-for="name in demolist" :key="name" class="basic-btn">
        <NuxtLink :to="`/demolist/${name}`">
          {{ name }}
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
