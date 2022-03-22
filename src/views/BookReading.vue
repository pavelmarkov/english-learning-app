<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>BookReading</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          class="mx-auto"
          v-if="book"
        >
          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click="show = !show"
            >
              TABLE OF CONTENTS
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-list v-show="show">
              <v-list-item
                class="toc_item"
                v-for="(item, i) in book.toc"
                :key="i"
                :value="item"
                active-color="primary"
                variant="plain"
                @click="chooseChapter(item)"
              >
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
        <ChapterText :tokens="chapterTokens" />
        <!-- <WordTranslation /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {computed } from "vue";
import {useStore} from "vuex";
import ChapterText from "../components/ChapterText.vue"
// import WordTranslation from "../components/WordTranslation.vue"
export default {
  components: {
    ChapterText
    // WordTranslation
  },
  data: () => ({
    show: false,
    open: ['Content']
  }),
  methods: {
    chooseChapter(chapter) {
      let path = `${this.book.dir}${chapter.title}.json`;
      this.show = false;
      window.ipcRenderer.send("toMain", {"type": "choose_chapter", "data": path});
    }
  },
  setup(){
    const store = useStore();	
    let book = computed(function () {
      return store.state.currentBook
    });
    let chapterTokens = computed(function () {
      return store.state.chapterTokens
    });
    return {
      book,
      chapterTokens
    }
  }
}
</script>
