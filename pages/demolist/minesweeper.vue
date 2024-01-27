<script lang='ts' setup>

</script>

<template>
  <Suspense>
    <LazyMinesweeper />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
