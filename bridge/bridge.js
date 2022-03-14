
import {fb} from '../src/fb'
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
      case "new_book":
        console.log("new_book")
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