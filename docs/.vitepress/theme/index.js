import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './custom.css'

export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute()

    const initZoom = () => {
      // Aplica zoom a todas las imágenes del contenido principal
      // Excluye el logo del header con :not(.VPImage)
      mediumZoom('.vp-doc img:not(.no-zoom)', {
        background: 'rgba(0, 0, 0, 0.85)',
        margin: 24,
      })
    }

    // Inicializa al montar por primera vez
    onMounted(() => {
      initZoom()
    })

    // Re-inicializa al navegar entre páginas
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
