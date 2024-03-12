export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* 在这里写入你的代码 */
    console.log('asdasf')
    console.log(nuxtApp)
  })
})
