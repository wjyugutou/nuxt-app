<template>
  <div class="loading flex-center h-full w-full" />
</template>

<style>
.loading {
  --color: #000;

  display: inline-grid;
  font-family: monospace;
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2em;
}

.dark .loading {
  --color: #fff;
}

.loading::before,
.loading::after {
  color: var(--color);
  text-shadow: 0 0 0 var(--color),0 calc(var(--s,1)*1.2em) 0 var(--color);
  animation: l15 1s infinite;
  content: "Not Found...";
  grid-area: 1/1;
  mask: linear-gradient(90deg,var(--color) 50%, var(--color) 0) 0 50%/2ch 100%;
}

.loading::after {
  --s:-1;

  mask-position: 1ch 50%;
}

@keyframes l15 {
  80%,
  100% {
    text-shadow: 0 calc(var(--s,1)* - 1.2em)  0 var(--color),
                 0 0 0 var(--color)
  }
}
</style>
