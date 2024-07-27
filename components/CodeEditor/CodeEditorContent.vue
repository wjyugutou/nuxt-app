<script lang='ts' setup>
import type { ModuleOptions } from 'nuxt-shiki'

type BundledLanguage = Exclude<ModuleOptions['bundledLangs'], undefined>[number]
type BundledTheme = Exclude<ModuleOptions['bundledThemes'], undefined>[number]

const props = defineProps<{
  lang: BundledLanguage
  theme: BundledTheme
  isEdit: boolean
}>()

const code = defineModel<string>({ required: true })

const textarea = ref<HTMLTextAreaElement>()

const highlighter = await getShikiHighlighter()
const html = computed(() => highlighter.highlight(code.value, { lang: props.lang, theme: props.theme }))
</script>

<template>
  <div class="editor-content">
    <div>
      <div v-html="html" />
      <textarea
        ref="textarea"
        v-model="code"
        :disabled="!isEdit"
        autocomplete="new-password"
        class="code-textarea"
      />
    </div>
  </div>
</template>

<style>
.editor-content {
    position: relative;

    & .shiki {
      padding: 14px 16px;
    }

    & textarea {
      position: absolute;
      padding: 14px 16px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      color: transparent;
      background: transparent;
      outline: none;
      resize: none;
      inset: 0;
      caret-color: #fff;
    }
  }
</style>
