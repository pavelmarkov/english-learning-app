<template>
  <v-app>
    <NavComponent/>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavComponent from './components/NavComponent.vue'

export default {
  name: 'App',

  components: {
    NavComponent,
  },

  data: () => ({
    //
  }),
}
</script>
