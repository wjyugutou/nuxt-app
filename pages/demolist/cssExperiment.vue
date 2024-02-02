<script lang='ts' setup>
const bg_img_1 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
linear-gradient(to right,transparent 0%,transparent 55%,#000 50%,#000 100%)`
const bg_img_2 = `linear-gradient(to right,red 0%,red 50%,#000 50%,#000 100%),
linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%)`
const bg_img_3 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
linear-gradient(to right,transparent 0%,transparent 25%,#000 50%,#000 100%)`

const bgImgCode = computed(() =>
`background-image: ${bg_img_1};

background-image: ${bg_img_2};

background-image: ${bg_img_3};`)
</script>

<template>
  <div class="">
    <div class="p-5">
      <h1 class="font-bold">
        background-image
      </h1>
      <p>多个参数时前面的 颜色层级高</p>
      <div class="flex gap-8">
        <div class="bg-img" :style="{ backgroundImage: bg_img_1 }" />
        <div class="bg-img" :style="{ backgroundImage: bg_img_2 }" />
        <div class="bg-img" :style="{ backgroundImage: bg_img_3 }" />
      </div>

      <LazyCodeLine
        class="w-min"
        title="background-image(linear-gradient)"
        type="css" :code="bgImgCode"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: 100px;
}
</style>
