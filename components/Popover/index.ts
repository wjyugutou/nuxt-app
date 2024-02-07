const popoverContainerId = 'popover-container'
export const popoverContainerSelector = `#${popoverContainerId}`

export function createPopoverContainer() {
  if (!window)
    return
  if (!document.querySelector(popoverContainerSelector)) {
    const popoverContainer = document.createElement('div')
    popoverContainer.id = popoverContainerId
    document.body.appendChild(popoverContainer)
  }
}
