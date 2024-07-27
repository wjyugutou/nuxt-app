<script lang='ts' setup>
import type { ModuleOptions } from 'nuxt-shiki'
import { shikiConfig } from '~/assets/shiki'

type BundledLanguage = Exclude<ModuleOptions['bundledLangs'], undefined>[number]
type BundledTheme = Exclude<ModuleOptions['bundledThemes'], undefined>[number]

const props = withDefaults(defineProps<{
  isEdit?: boolean
  collapse?: boolean
}>(), { lang: 'typescript', collapse: false, isEdit: false })
const code = defineModel<string>({ required: true })
const lang = defineModel<BundledLanguage>('lang', { default: 'vue' })
const theme = defineModel<BundledTheme>('theme', { default: 'vitesse-dark' })

const [collapse, setCollapse] = useToggle(props.collapse)

const edit = ref(props.isEdit)
const langs = ref<BundledLanguage[]>([lang.value!])
function handleLangChange(e: Event) {
  const value: BundledLanguage = (e.target as HTMLInputElement).value as BundledLanguage
  langs.value.push(value)
}

const themes = ref<BundledTheme[]>([theme.value!])
function handleThemeChange(e: Event) {
  const value: BundledTheme = (e.target as HTMLInputElement).value as BundledTheme
  themes.value.push(value)
}

function copyCode() {
  navigator.clipboard.writeText(code.value)
}
</script>

<template>
  <div class="code-editor" :class="theme">
    <div
      class="editor-toolbar" :class="collapse ? 'important-border-b-none' : ''"
    >
      <ArrowIcon class="tool-arrow" :rotate="collapse" @click="setCollapse()" />
      <!-- <p>{{ title }}</p> -->
      <div class="tool-select">
        <select v-model="lang" @change="handleLangChange">
          <option v-for="lang in shikiConfig.bundledLangs" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
        <select v-model="theme" @change="handleThemeChange">
          <option v-for="theme in shikiConfig.bundledThemes" :key="theme" :value="theme">
            {{ theme }}
          </option>
        </select>
        <label>
          edit
          <input v-model="edit" type="checkbox">
        </label>
      </div>
      <div @click="copyCode">
        复制代码
      </div>
    </div>

    <Suspense>
      <template #fallback>
        <Loading />
      </template>
      <CodeEditorContent v-show="!collapse" v-model="code" :langs="langs" :lang="lang!" :themes="themes" :theme="theme!" :is-edit="edit" />
    </Suspense>
  </div>
</template>

<style>
.code-editor {
  overflow: hidden;
  border-radius: 10px;

  @apply  border b-gray-400;

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 10px;

    @apply b-solid border-b b-gray-400;

    .tool-arrow {
      position: absolute;
      font-size: 24px;
      transition-duration: 0.3s
    }

    .tool-select {
      margin-left: 50px;
      outline: none;
    }
  }

}
</style>
