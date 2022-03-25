<template>
  <v-app>
    <NavComponent/>
    <v-main class="main_container">
      <v-container >
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
<style scoped>
  /* .main_container {
    background: white;
    height: 100vh;
  } */
</style>