
function registerEvents(store) {
  window.ipcRenderer.receive("fromMain", (dt) => {
    switch (dt.type) {
      case "test":
        store.commit("test", {"dt": "dt"});
        break;
      default:
        break;
    }
  });  
}

module.exports.registerEvents = registerEvents