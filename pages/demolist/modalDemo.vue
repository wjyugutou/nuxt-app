<script lang='ts' setup>
const modelValue = ref(false)
const modelValue1 = ref(false)
</script>

<template>
  <div class="absolute top-50% m-x-auto w-fit flex gap-5">
    <button class="basic-btn" @click="modelValue = !modelValue">openModal</button>
    <button class="basic-btn" @click="modelValue = !modelValue">openModal</button>
    <button class="basic-btn" @click="modelValue1 = !modelValue">openModal</button>
    <button class="basic-btn" @click="modelValue1 = !modelValue">openModal</button>

    <Modal v-model="modelValue">
      你好
    </Modal>
    <Modal v-model="modelValue1" :mask-close="false" />
  </div>
</template>
