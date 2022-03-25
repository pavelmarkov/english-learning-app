<template>
    <!-- color="primary" -->
    <!-- color="purple" -->
  <v-app-bar
    class="nav-colors"
    prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>{{currentLink}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn variant="text" @click="to('/')" icon="mdi-view-dashboard"></v-btn>

    <v-btn variant="text" @click="to('/read')" icon="mdi-book"></v-btn>

    <v-btn variant="text" @click="to('/learn')" icon="mdi-star"></v-btn>

    <v-btn variant="text" @click="to('/test')" icon="mdi-ab-testing"></v-btn>

    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    bottom
    temporary
  >
    <v-list
      :items="items"
    ></v-list>
  </v-navigation-drawer>
</template>
<script>

  window.ipcRenderer.send("toMain", {"type": "books_list"});
  window.ipcRenderer.send("toMain", {"type": "words_list"});

  export default {
    data: () => ({
      drawer: false,
      currentLink: 'Books',
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),
    methods: {
      to (to) {
        switch (to) {
          case '/':
            this.currentLink = 'Books'
            window.ipc
            break;
          case '/read':
            this.currentLink = 'Read'
            window.ipcRenderer.send("toMain", {"type": "test", "data": "read"})
            break;
          case '/learn':
            this.currentLink = 'Lear'
            break;
          case '/test':
            this.currentLink = 'Test'
            break;                    
          default:
            break;
        }
        this.$router.push(to)
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
<style scoped>
  .nav-colors {
    background: rgb(var(--v-theme-navBackground));
    color: rgba(var(--v-theme-navText), 0.9)
  }
</style>