<script lang='ts' setup>
import { isString } from 'lodash-es'

const props = withDefaults(defineProps<{
  header?: boolean | string
  maskClose?: boolean
  width?: number | string
}>(), {
  maskClose: true,
  width: 520,
})
const emits = defineEmits<{
  cancel: []
  open: []
}>()
const slots = defineSlots<{
  default(): any
}>()

const modelValue = defineModel<boolean>({ required: true })
const dialog = ref<HTMLDialogElement>()
const { x, y } = useMouse({ touch: false })
const { isOutside } = useMouseInElement(dialog)

let animateState: {
  keyframes: Record<string, string[]>
  options: KeyframeAnimationOptions
}

const _width = computed(() => isString(props.width) ? props.width : `${props.width}px`)

watch(modelValue, (value) => {
  if (value)
    openModalAnimate()

  else
    closeModalAnimate()
})

function openModalAnimate() {
  dialog.value?.showModal()

  animateState = {
    keyframes: {
      display: ['none', 'block'],
      margin: ['0', '0'],
      width: ['10px', _width.value],
      top: [`${y.value - dialog.value!.clientHeight}px`, '100px'],
      left: [`${x.value}px`, '50%'],
      transform: ['translate(-50%, 0)', 'translate(-50%, 0)'],
    },
    options: {
      duration: 200,
      easing: 'ease-out',
    },
  }

  dialog.value?.animate(animateState.keyframes, animateState.options)
}

async function closeModalAnimate() {
  const keyframes = animateState.keyframes
  for (const key in animateState.keyframes) {
    if (Object.prototype.hasOwnProperty.call(animateState.keyframes, key)) {
      const keyframe = animateState.keyframes[key]
      keyframes[key] = keyframe?.toReversed()
    }
  }
  await dialog.value!.animate(keyframes, animateState.options).finished

  dialog.value?.close()
}

function dialogClick(e: Event) {
  if (isOutside.value && props.maskClose)
    modelValue.value = false
}

function dialogClose() {
  emits('cancel')
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <dialog ref="dialog" class="modal" :class="{ maskNoCLose: !maskClose }" :style="{ width: _width }" @click="dialogClick" @close="dialogClose">
        <span class="modal-close-icon" @click="modelValue = false" />
        <div v-if="props.header || $slots.header" class="modal-header">
          <p>header</p>
        </div>
        <div class="modal-content">
          <slot />
        </div>
      </dialog>
    </Teleport>
  </ClientOnly>
</template>

<style>
.modal {
  @apply rounded-10px top-100px fixed m-y-0 m-x-auto max-w-[100vw-32px] h-fit p-4;

  &.maskNoCLose::backdrop {
    pointer-events: none;
  }

  & .modal-close-icon {
    @apply i-carbon-close-large absolute right-4 top-4 transition-transform-500 hover:rotate-z-180 cursor-pointer;
  }

  & .modal-content {
    min-height: 100px;
    pointer-events: none;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 5s ease-out;
}

.modal-enter-form {
  top: 100px;
}

.modal-enter-to {
  top: 100px !important;
}
</style>
