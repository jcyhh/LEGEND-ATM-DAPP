import type { DirectiveBinding } from 'vue'

interface ScaleHTMLElement extends HTMLElement {
  _scaleHandlers?: {
    handleClick: () => void
  }
}

interface ScaleBindingValue {
  scale?: number
  duration?: number
}

const playScaleAnimation = (
  el: HTMLElement,
  scale = 0.9,
  duration = 220
) => {
  if (typeof el.animate === 'function') {
    el.animate(
      [
        { transform: 'scale(1)' },
        { transform: `scale(${scale})` },
        { transform: 'scale(1)' }
      ],
      {
        duration,
        easing: 'ease-out'
      }
    )
    return
  }

  el.style.transition = `transform ${duration}ms ease-out`
  el.style.transform = `scale(${scale})`
  window.setTimeout(() => {
    el.style.transform = 'scale(1)'
  }, duration / 2)
}

export default {
  beforeMount(el: ScaleHTMLElement, binding: DirectiveBinding<ScaleBindingValue | number>) {
    const value = binding.value
    const scale = typeof value === 'number' ? value : value?.scale ?? 0.9
    const duration = typeof value === 'number' ? 220 : value?.duration ?? 220

    const handleClick = () => {
      playScaleAnimation(el, scale, duration)
    }

    el.addEventListener('click', handleClick)
    el._scaleHandlers = { handleClick }
  },

  unmounted(el: ScaleHTMLElement) {
    const { handleClick } = el._scaleHandlers || {}
    if (handleClick) {
      el.removeEventListener('click', handleClick)
    }
  }
}