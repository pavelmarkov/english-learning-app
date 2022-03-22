<template>
  <v-app>
    <NavComponent/>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<script>
import NavComponent from './components/NavComponent.vue'
import FooterComponent from "./components/FooterComponent.vue"

export default {
  name: 'App',

  components: {
    NavComponent,
    FooterComponent
  },

  data: () => ({
    //
  }),
}
</script>
