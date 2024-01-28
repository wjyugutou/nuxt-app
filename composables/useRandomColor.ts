import { random } from 'lodash-es'

export function useRandomColor(opacity: number = 1) {
  return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${opacity})`
}
