<script lang='ts' setup>
const props = defineProps < {
  text: string
}>()
const color = useRandomColor()
const _text = computed(() => `\u00A0${props.text}`)
</script>

<template>
  <span class="text-fallen" :data-text="_text" :style="`--color: ${color}`">
    <span
      v-for="str, i in _text" :key="i" :style="{
        animationDuration: `${i * 5 * Math.random() + 0.5}s`,
      }"
    >{{ str }}</span>
  </span>
</template>

<style>
.text-fallen {
  position: relative;
  letter-spacing: .5em;

  & > span {
    animation-name: text-fallen;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &::before {
    position: absolute;
    border-right: 3px solid;
    width: 0;
    color: var(--color);
    transition-duration: 0.5s;
    content: attr(data-text);
  }

  &:hover {
    & > span {
      opacity: 0;
    }

    &::before {
      z-index: 1;
      width: 100%;
      color: var(--color);
      filter: drop-shadow( 0 0 25px var(--color));
    }
  }
}

@keyframes text-fallen {
  0%,
  20% {
    filter: drop-shadow( 0 0 0 var(--color));
  }

  21.001%,
  79.999% {
    color: var(--color);
    filter: drop-shadow( 0 0 25px var(--color));
  }

 80%,
 100% {
    filter: drop-shadow( 0 0 0 var(--color));
  }
}
</style>
