<template>
  <v-app>
    <NavComponent/>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <TranslationComponent/>
  </v-app>
</template>

<script>
import NavComponent from './components/NavComponent.vue'
import TranslationComponent from "./components/TranslationComponent.vue"

export default {
  name: 'App',

  components: {
    NavComponent,
    TranslationComponent
  },

  data: () => ({
    //
  }),
}
</script>
