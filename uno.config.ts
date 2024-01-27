// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons({
    scale: 1.2,
    warn: true,
  }), presetAttributify()],
  transformers: [transformerDirectives()],
})
