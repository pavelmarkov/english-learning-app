import { createWebHistory, createRouter } from "vue-router";
import BooksBoard from "@/views/BooksBoard.vue";
import BookReading from "@/views/BookReading.vue";
import WordsLearning from "@/views/WordsLearning.vue";
import TestKnowledge from "@/views/TestKnowledge.vue";

const routes = [
  {
    path: "/",
    name: "BooksBoard",
    component: BooksBoard,
  },
  {
    path: "/read",
    name: "BookReading",
    component: BookReading,
  },
  {
    path: "/learn",
    name: "WordsLearning",
    component: WordsLearning,
  },
  {
    path: "/test",
    name: "TestKnowledge",
    component: TestKnowledge,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
