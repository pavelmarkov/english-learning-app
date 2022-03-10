<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>BooksBoard</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        :cols="6"
      >
        <v-card
          class="mx-auto"
          width="100%"
          variant="outlined"
          height="100%"
        >
          <v-card-header>
            <div>
              <div class="text-overline mb-1">
                Add new
              </div>
              <div class="text-caption">Upload .epub file from your disk folder</div>
            </div>
          </v-card-header>

          <v-card-actions>
            <v-btn
              variant="outlined"
              rounded
              text
              @click="chooseFile"
            >
              Upload
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-for="book in books"
        :key="book.book_title"
        :cols="6"
        hight="100%"
        ref="card"
      >
        <v-card>
          <!-- :src="require('@/assets/'+book.cover_img)" -->
          <v-img
            :src="'data:image/jpg;base64,'+book.img"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            cover
            max-height="200px"
          >
          <v-card-title class="text-white" v-text="book.book_title"></v-card-title>
          </v-img>
          <v-card-actions>
            <router-link to="/read">
              <v-btn @click="chooseBook(book)" black text>Open</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
export default {
  name: 'BooksBoard',
  data: () => ({}),
  methods: {
    chooseFile() {
      window.ipcRenderer.send("toMain", {"type": "choose_file"});
    }
  },
  setup(){
    const store = useStore();	
    let books = computed(function () {
      return store.state.books
    });
    let chooseBook = (book) => {
      console.log(book)
      store.commit("chooseBook", book);
    }
    return {
      books,
      chooseBook
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.3);
  }
</style>
