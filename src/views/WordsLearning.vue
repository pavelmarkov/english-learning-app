<template>
  <v-card
    max-width="500"
    class="mx-auto words_card"
  >
    <!-- color="cyan"
    dark -->
    <v-toolbar
      class="secondary-colors"
      dark
    >
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-toolbar-title>Filter</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        icon
        color="white"
        @click="update()"
      >
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn> -->
      <v-btn
        icon
        @click="uploadToFirebase()"
      >
        <v-icon large color="orange darken-2">
          mdi-arrow-up-bold-box-outline
        </v-icon>
      </v-btn>
    </v-toolbar>
  <v-container class="grey lighten-5">
    <v-row         
        v-for="(word, i) in words"
        :key="i"
        :value="word"
        class="row">
      <v-col cols="2" class="d-flex flex-column justify-space-around">
        <img :src="word.img" class="avatar">
      </v-col>
      <v-col cols="8" class="d-flex flex-column justify-space-around">
        <div>{{word.word}}</div>
        <div class="font-weight-light">{{word.transcription}}</div>
        <div class="font-weight-light">{{word.rus}}</div>
      </v-col>
      <v-col cols="2" class="d-flex flex-column justify-space-around">
        <span>
          <v-btn 
            variant="text"
            icon="mdi-delete"
            @click="deleteWord(word.word)"
            color="grey"
          ></v-btn>
        </span>
      </v-col>
    <v-divider
      inset
    ></v-divider>
    </v-row>
  </v-container>
  </v-card>
</template>

<script>
  import {computed} from "vue";
  import {useStore} from "vuex";
  export default {
    name: 'WordsLearning',
    data: () => ({}),
    methods: {
      deleteWord(w){
        window.ipcRenderer.send("toMain", {"type": "delete_word", "data": w});
      },
      update(){
          window.ipcRenderer.send("toMain", {"type": "words_list"});
      },
      uploadToFirebase(){
        console.log(1)
      }
    },
    setup(){
      let words = computed({
        get () {
          const store = useStore()
          return store.state.words
        },
        set(val) {
          return val
        }
      });
      return {
        words
      }
    }
  }
</script>
<style scoped>
  .words_card{
    padding-bottom: 64px
  }
  .v-avatar {
    height: 100px;
  }
  .secondary-colors {
    background: rgb(var(--v-theme-secondaryColor));
    color: white;
  }
  /* .actions {
    z-index: 6 !important;
    position: absolute;
    right: 0%;
    bottom: 0%;
  } */
  .avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .row {
    padding: 0;
  }
</style>
