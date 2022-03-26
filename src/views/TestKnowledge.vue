<template>
  <v-container class="test_container">
    <v-row class="text-center">
      <v-col cols="12">
        <h1>TestKnowledge</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-subheader inset>Right</v-list-subheader>
          <v-list-item
            v-for="(word, i) in right" :key="i"
            :title="word.word"
            :subtitle="word.rus"
          >
          </v-list-item>
          <!-- <v-divider inset></v-divider> -->
        </v-list>
      </v-col>
      <v-col cols="6" 
      class="d-flex flex-column align-center">
        <v-card
          class="mx-auto test_card"
          max-width="100%"
        >
          <img :src="currentWord.img" class="test_img">
          <v-card-title>
            {{currentWord.rus}}
          </v-card-title>
          <!-- <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle> -->
          <v-card-actions>
            <input type="text"
              class="answer"
              v-model="answer"
              ref="answer"
              @keyup.enter="answerSubmit()">
          </v-card-actions>
        </v-card>
        <!-- color="indigo darken-2" -->
        <v-progress-circular
          :model-value="progress"
          :size="100"
          :width="15"
          :value="progress"
          color="teal"
        >{{progress}}</v-progress-circular>
      </v-col>
      <!-- class="d-flex flex-row justify-center" -->
      <v-col cols="3" >
        <!-- <div v-for="(word, i) in wrong" :key="i">
          <span>{{word.word}}</span>
          <span>-</span>
          <span>{{word.rus}}</span>
        </div> -->
              <!-- prepend-icon="mdi-error" -->
        <v-list>
          <v-list-subheader inset>Wrong</v-list-subheader>
          <v-list-item
            v-for="(word, i) in wrong" :key="i"
            :title="word.word"
            :subtitle="word.rus"
          >
          </v-list-item>
          <!-- <v-divider inset></v-divider> -->
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { computed } from '@vue/runtime-core';

export default {
  name: 'TestKnowledge',
  data: () => ({
    words: [],
    right: [],
    wrong: [],
    answer: '',
    currentWord: {
      "id": 1,
      "img": "data:image/jpeg;base64,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",
      "rus": "цепь, непрерывный ряд",
      "transcription": "|səkˈseʃ(ə)n|",
      "word": "succession",
    },
    curIdx: 0,
    progress: 0,
    isFinished: false
  }),
  mounted() {
    this.focusInput();
    this.words = this.$store.state.words
  },
  methods: {
    focusInput() {
      this.$refs.answer.focus()
    },
    getWords() {
      this.words = this.$store.state.words
    },
    answerSubmit() {
      let isCorrect = this.answer == this.currentWord.word
      this.answer = ''
      isCorrect ? this.right.push(this.currentWord) : this.wrong.push(this.currentWord);
      this.next()
    },
    next(){
      if(this.curIdx >= this.words.length-1){
        this.curIdx = 0
        this.isFinished = true
      } else {
        this.curIdx += 1
      }
      this.currentWord = this.words[this.curIdx]
      this.progress = Math.round((this.curIdx / this.words.length) * 100)
    }
  }
}
</script>
<style scoped>
  .test_container {
    padding-bottom: 64px;
  }
  .v-text-field input {
    text-align: center;
  }
  .test_card {
    margin-bottom: 20px;
  }
  .answer {
    width: 100%;
    outline: none;
    text-align: center;
  }
  .test_img {
    max-height: 200px;
    width: 100%;
  }
</style>
