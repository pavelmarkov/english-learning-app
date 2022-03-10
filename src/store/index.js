import { createStore } from "vuex";

export default createStore({
  state: {
    books: [],
    currentBook: false,
    chapterTokens: []
  },
  mutations: {
    test() {
      console.log("change state from electron thread test")
    },
    addBook(state, item) {
      state.books.unshift(item);
    },
    chooseBook(state, item) {
      state.currentBook = item;
    },
    updateChapter(state, item) {
      state.chapterTokens = item;
    }
  }
});