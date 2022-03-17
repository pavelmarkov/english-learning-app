
import {fb} from '../src/fb'
// import {database} from '../db'
// console.log(database)
// (async () => {
//   let words = await fb.getWords()
//   console.log(words)
// })()

function registerEvents(store) {
  window.ipcRenderer.receive("fromMain", async (dt) => {
    switch (dt.type) {
      case "test":
        store.commit("test", {"dt": "dt"});
        break;
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
        console.log(dt)
        fb.writeWord(dt.data.word, dt.data.rus)
        break;
      default:
        break;
    }
  });  
}

export {registerEvents};