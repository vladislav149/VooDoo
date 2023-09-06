import VooLoader from '@/components/VooLoader.vue'
import VooErrors from '@/components/VooErrors.vue'
import type {App} from 'vue'

export default {
  install(app: App) {
    app.component('VooLoader', VooLoader)
    app.component('VooErrors', VooErrors)
  }
}
