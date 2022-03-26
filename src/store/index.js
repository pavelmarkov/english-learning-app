import { createStore } from "vuex";

export default createStore({
  state: {
    books: [],
    currentBook: false,
    chapterTokens: [],
    currentItem: 'tab-Web',
    items: [],
    more: [],
    text: '',
    words: [],
    wordProcessing: false
  },
  mutations: {
    test() {
      console.log("change state from electron thread test")
    },
    addBook(state, item) {
      if(!state.currentBook){
        state.currentBook = item
      }
      state.books.unshift(item);
    },
    addToWords(state, item) {
      // console.log(item)
      let f = state.words.find((e) => e.word == item.word);
      if(f) return;
      state.words.push(item)
    },
    chooseBook(state, item) {
      state.currentBook = item;
    },
    updateChapter(state, item) {
      state.chapterTokens = item;
    },
    addWord(state, item){
      state.wordProcessing = false
      let f = state.items.find((e) => e.word == item.data.word);
      if(f) return;
      if(state.items.length < 4){
        state.items.unshift(item.data)
      } else {
        state.more.unshift(item.data)
      }
    },
    addItem(state, item) {
      console.log(item)
      const removed = state.items.splice(0, 1)
      state.items.unshift(item)
      const idx = state.more.findIndex(obj => {
        return obj.word == item.word;
      }) 
      state.more.splice(idx, 1)
      state.more.push(removed[0])
    },
    deleteWord(state, w){
      state.words = state.words.filter(obj => {
        return obj.word !== w;
      })
    }
  },
  actions: {
    toggleTranslation(state) {
      state.translationActive = !state.translationActive
    }
  }
});