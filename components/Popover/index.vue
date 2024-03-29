<script lang='ts' setup>
import { arrow, autoPlacement, autoUpdate, flip, inline, offset, shift, useFloating } from '@floating-ui/vue'
import { isElement } from 'lodash-es'
import type { Placement, Side } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import type { Fn } from '@vueuse/core'
import { createPopoverContainer, popoverContainerSelector } from '.'

const props = withDefaults(defineProps<{
  content?: string
  trigger?: 'click' | 'hover'
  arrowSize?: number
  placement?: Placement
}>(), {
  arrowSize: 10,
  trigger: 'hover',
})
createPopoverContainer()

const modelValue = defineModel<boolean>('modelValue')

const ins = getCurrentInstance()
const reference = ref<HTMLElement>()
const floating = ref<HTMLDivElement>()
const floatingArrow = ref<HTMLSpanElement>()
const removeWindowClick = ref <Fn>()

const floatingOffset = Math.sqrt(2 * props.arrowSize ** 2) / 2

const { middlewareData, placement, floatingStyles } = useFloating(reference, floating, {
  strategy: 'absolute',
  placement: 'top',
  transform: false,
  open: false,
  middleware: [offset(floatingOffset), inline(), flip(), shift(),
    arrow({ element: floatingArrow }),
  ],
  whileElementsMounted: autoUpdate,
})

const side = computed(() => placement.value.split('-')[0])
const staticSide = computed(() => ({
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}[side.value as Side]))

const floatingStyle = computed(() => Object.assign(floatingStyles.value, {
  '--arrow-width': `${props.arrowSize}px`,
  '--arrow-height': `${props.arrowSize}px`,
  '--arrow-top': middlewareData.value?.arrow?.y != null ? `${middlewareData.value?.arrow.y}px` : '',
  '--arrow-left': middlewareData.value?.arrow?.x != null ? `${middlewareData.value?.arrow.x}px` : '',
  [`--arrow-${staticSide.value}`]: `${-props.arrowSize / 2}px`,
}))

const arrowStyle = computed(() => ({
  width: `${props.arrowSize}px`,
  height: `${props.arrowSize}px`,
  top: middlewareData.value?.arrow?.y != null ? `${middlewareData.value?.arrow.y}px` : '',
  left: middlewareData.value?.arrow?.x != null ? `${middlewareData.value?.arrow.x}px` : '',
  [`${staticSide.value}`]: `${-props.arrowSize / 2}px`,
}))

function initEvent() {
  if (reference.value) {
    if (props.trigger === 'click') {
      useEventListener(reference, 'click', (e) => {
        modelValue.value = !modelValue.value
        e.stopPropagation()
      })
    }
    else if (props.trigger === 'hover') {
      useEventListener(reference, 'mouseenter', (e) => {
        modelValue.value = true
        e.stopPropagation()
      })

      useEventListener(reference, 'mouseleave', (e) => {
        modelValue.value = false
        e.stopPropagation()
      })
    }
  }

  if (props.trigger === 'click') {
    removeWindowClick.value = useEventListener(window, 'click', () => {
      modelValue.value = false
    })
  }
}

watchEffect(() => {
  if (props.trigger !== 'click')
    removeWindowClick.value?.()
})

watchEffect(() => {
  floating.value?.[modelValue.value ? 'showPopover' : 'hidePopover']()
})

onMounted(() => {
  const el = isElement(ins!.vnode.el) ? ins!.vnode.el : ins!.vnode.el!.nextElementSibling
  reference.value = el

  initEvent()
})
</script>

<template>
  <slot />
  <ClientOnly>
    <Teleport :to="popoverContainerSelector">
      <div
        ref="floating" popover="manual"
        :style="floatingStyle" class="popover-content" :class="{
          'popover-enter-active': modelValue,
          'popover-leave-active': !modelValue,
        }"
      >
        <span ref="floatingArrow" class="popover-arrow" :style="arrowStyle" />

        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="content" />
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style>
.popover-content {
  overflow: unset;
  border-radius: 8px;
  padding: 4px;
  background-color: color-mix(in lch, var(--bg-color), gray);
  animation: .5s ease-out forwards;

  & .popover-arrow {
    display: none;
    position: absolute;
    background-color: inherit;
    transform: rotate(45deg);
  }

  &::before {
    position: absolute;
    top: var(--arrow-top);
    right: var(--arrow-right);
    bottom: var(--arrow-bottom);
    /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
    left: var(--arrow-left);
    width: var(--arrow-width);
    height: var(--arrow-height);
    color: var(--arrow);
    background-color: inherit;
    transform: rotate(45deg);
    content: '';
  }
}

.popover-enter-active {
  animation-name:  popover-enter-active;
}

.popover-leave-active {
  animation-name:  popover-leave-active;
}

@keyframes popover-enter-active {
  0% {
    display: none;
    opacity: 0;

  }

  100%{
    display: block;
    opacity: 1;
  }
}

@keyframes popover-leave-active {
  0% {
    display: block;
    opacity: 1;
  }

  100% {
    display: none;
    opacity: 0;
  }
}
</style>
