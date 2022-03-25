<template>
  <!-- <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>WordsLearning</h1>
      </v-col>
    </v-row>
  </v-container> -->
  <v-card
    max-width="450"
    class="mx-auto"
  >

    <v-toolbar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-toolbar-title>Filter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list three-line :items="words">
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
    <!-- <v-list>
      <v-list-subheader>Words</v-list-subheader>
      <v-list-item
        v-for="(word, i) in words"
        :key="i"
        :value="word"
        active-color="primary"
        rounded="xl"
      >
          <v-img
            src="https://picsum.photos/350/165?random"
            max-height="125"
            contain
            class="grey darken-4"
          ></v-img>
        <v-list-item-title v-text="word.word"></v-list-item-title>
      </v-list-item>
    </v-list> -->
  </v-card>
</template>

<script>
  // import {computed } from "vue";
  import {computed} from "vue";
  import {useStore} from "vuex";
  export default {
    name: 'WordsLearning',
    data: () => ({}),
    setup(){
      const store = useStore();	
      let words = computed(function () {
        let result = []
        result[0] = { $type: 'subheader', text: 'Words' }
        for (let i = 0; i < store.state.words.length; i++) {
          const word = store.state.words[i];
          result.push({ $type: 'divider', inset: true })
          result.push({
              prependAvatar: word.img,
              title: word.word,
              subtitle: `<span class="text-primary">${word.transcription}</span> &mdash; ${word.rus}`
          })
        }
        // console.log(store.state.words)
        return result//// store.state.words
      });
      return {
        words
      }
    }
  }
</script>
<style scoped>
  .v-avatar {
    height: 100px;
  }
</style>
