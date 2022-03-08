import { createStore } from "vuex";

export default createStore({
  state: {},
  mutations: {
    test() {
      console.log("change state from electron thread test")
    }
  }
});