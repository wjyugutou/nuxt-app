<script lang='ts' setup>
import { random } from 'lodash-es'

interface Props {
  modelValue: string
  placeholder: string
  colorFilter?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  colorFilter: 15,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', ev: Event): void
  (e: 'change', ev: Event): void

}>()
const input = ref<HTMLInputElement>()
const value = ref('')

function changeHandle(e: Event) {
  emits('change', e)
}

function inputHandle(e: Event) {
  emits('input', e)
}

function clearInput() {
  value.value = ''
}

watchEffect(() => {
  emits('update:modelValue', value.value)
})

onMounted(() => {
  if (props.modelValue.length > 0)
    input.value!.focus()
})
</script>

<template>
  <div class="animate-input">
    <input v-model="value" :placeholder="placeholder" required @change="changeHandle" @input="inputHandle">
    <div class="clear i-material-symbols-cancel-outline-rounded" @click="clearInput" />
    <label>
      <span
        v-for="s, i in placeholder" :key="i" :style="{
          transitionDelay: `${i * 30}ms`,
          filter: `hue-rotate(${i * props.colorFilter}deg)`,
        }"
      >{{ s }}</span>
    </label>
  </div>
</template>

<style>
.animate-input {
  position: relative;
  padding-top: 30px;
  width: fit-content;

  & label {
    position: absolute;
    left: 0;
    letter-spacing: 0.2em;
    user-select: none;
    pointer-events: none;

    & span {
      display: inline-block;
      color: gray;
      transition-duration: 400ms;
    }
  }

  .clear {
    display: none;
    position: absolute;
    right: 0;
    bottom: 5px;
    font-size: 13px;
    color: gray;
    cursor: pointer;
    filter: hue-rotate(14deg);
  }

  & > input {
    border-bottom: 1px solid;
    background-color: transparent;
    outline: none;

    &:focus,
    &:valid {
      & ~ .clear {
        display: block;
      }

      & ~ label > span {
        color: #07f419;
        text-shadow: 0 0 5px #07f419, 0 0 15px #07f419, 0 0 25px #07f419;
        transform: translateY(-30px);
      }
    }

  }

}

.animate-input input::placeholder {
  color: transparent;
}
</style>
