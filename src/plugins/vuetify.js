// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// export default createVuetify(
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// )
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          // ..., // We have omitted the standard color properties here to emphasize the custom one that we've added
          navBackground: '#9C27B0',
          navText: '#FFFFFF',
          footerBackground: '#9C27B0',
          footerText: '#FFFFFF',
          secondaryColor: "#1F7087"
        }
      }
    }
  }
})
