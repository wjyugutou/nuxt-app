export const isDark = useDark()

const isAppearanceTransition
  = typeof document !== 'undefined'
  && document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event)
    return isDark.value = !isDark.value

  const x = event.clientX
  const y = event.clientY

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  // @ts-expect-error ViewTransition
  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate({
      clipPath: isDark.value ? clipPath.toReversed() : clipPath,
    }, {
      duration: 400,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)',
    })
  })
}
