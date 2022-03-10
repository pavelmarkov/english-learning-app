
function registerEvents(store) {
  window.ipcRenderer.receive("fromMain", (dt) => {
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
      default:
        break;
    }
  });  
}

module.exports.registerEvents = registerEvents