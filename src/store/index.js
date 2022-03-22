import { createStore } from "vuex";

export default createStore({
  state: {
    books: [],
    currentBook: false,
    chapterTokens: [],
    translationActive: false,
    currentWord: {},
    /*------------------------------*/
    currentItem: 'tab-Web',
    items: [
      //{'word': 'Web', 'rus': 'Wb'} //, 'Shopping', 'Videos', 'Images',
    ],
    more: [
      // 'News', 'Maps', 'Books', 'Flights', 'Apps',
    ],
    text: ''
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
    },
    setWord(state, item) {
      state.currentWord = item.data;
      console.log(state.currentWord)
    },
    addWord(state, item){
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
      // state.currentItem = 'tab-' + item
    }
  },
  actions: {
    toggleTranslation(state) {
      state.translationActive = !state.translationActive
    }
  }
});