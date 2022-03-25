
// import {fb} from '../src/fb'
// import {database} from '../db'
// console.log(database)
// (async () => {
//   let words = await fb.getWords()
//   console.log(words)
// })()

function registerEvents(store) {
  window.ipcRenderer.receive("fromMain", async (dt) => {
    switch (dt.type) {
      case "books_list":        
        store.commit("books_list", dt.data);
        break;
      case "new_book":
        console.log("new_book")
        // console.log(dt.data)
        // database.insertBook(dt.data)
        store.commit("addBook", dt.data);
        break;
      case "chapter":
        console.log("chapter")
        store.commit("updateChapter", dt.data);
        break;
      case "new_word":
        // fb.writeWord(dt.data.word, dt.data.rus)
        // store.commit("setWord", dt);
        store.commit("addWord", dt);
        break;
      case "add_to_words_list":
        // fb.writeWord(dt.data.word, dt.data.rus)
        // store.commit("setWord", dt);
        store.commit("addToWords", dt.data);
        break;
      default:
        break;
    }
  });  
}

export {registerEvents};