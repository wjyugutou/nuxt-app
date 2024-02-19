<script lang='ts' setup>
const voice = ref()
const url = ref()

function fileChange(e: Event) {
  console.log(e)
  // @ts-expect-error file
  const urll = URL.createObjectURL(e.target.files[0])
  url.value = urll
}

onMounted(() => {
  console.log(voice.value)
})
</script>

<template>
  <div class="p-x-15% p-t-40">
    <input id="" type="file" accept="audio/*" @change="fileChange">
    <VoiceVisual ref="voice" :url="url" />
  </div>
</template>
