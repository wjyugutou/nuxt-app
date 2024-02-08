<script lang='ts'>
import { defineEmits } from 'vue'

export default defineComponent({
  emits: ['click'],
  setup(props, { slots, expose, attrs }) {
    console.log(props, attrs)

    const slotRef = ref(null)
    const [defaultSlot] = slots.default!()

    expose({ slotRef })
    return () => h(defaultSlot, { ref: slotRef, attrs })
  },
})
</script>
