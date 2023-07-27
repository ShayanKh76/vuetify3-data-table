import type { App } from 'vue'
import { Vuetify3DataTable } from './components'

export default {
  install: (app: App) => {
    app.component('Vuetify3DataTable', Vuetify3DataTable)
  }
}

export { Vuetify3DataTable }
