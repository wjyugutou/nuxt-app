import type { ModuleOptions } from 'nuxt-shiki'

export const shikiConfig: ModuleOptions = {
  bundledThemes: ['vitesse-dark', 'vitesse-light', 'github-dark', 'github-light'],
  bundledLangs: ['vue', 'js', 'json', 'ts', 'jsx', 'tsx', 'json5'],
  defaultTheme: 'vitesse-dark',
}
