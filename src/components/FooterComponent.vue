<template>
	<v-card class="translation">
		<v-window v-model="this.$store.state.currentItem" v-if="showTranslation"
		class="translation_card">
			<v-window-item
				v-for="item in this.$store.state.items.concat(this.$store.state.more)"
				:key="item.word"
				:value="'tab-' + item.word"
			>
				<!-- <v-card flat>
					<v-card-text>
						<h2>{{ item.word }}</h2>
						{{ item.rus }}
						{{ this.$store.state.text }}
					</v-card-text>
				</v-card> -->
				<v-col cols="12">
          <v-card
            color="#1F7087"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  {{item.word}}
                </v-card-title>
								<v-card-subtitle>{{item.transcription}}</v-card-subtitle>
                <v-card-subtitle>{{item.rus}}</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2"
                    variant="outlined"
                    size="small"
										@click="saveWord({
											'word': item.word,
											'transcription': item.transcription,
											'rus': item.rus,
											'img': item.images[imgIdx]
										})"
                  >
                    +ADD
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <img 
								:src="item.images[imgIdx]"
								alt="img"
								class="word_img"
								/>
								<v-btn class="change_img_btn"
									icon
									color="info"
									@click="changeImg()"
								>
									<v-icon>mdi-cached</v-icon>
								</v-btn>
								<!-- {{item.images[this.$store.state.imageIdx]}} -->
								<!-- <v-carousel :show-arrows="false">
									<v-carousel-item
										v-for="(src, i) in item.images"
										:key="i"
										:src="src"
										cover
									></v-carousel-item>
								</v-carousel> -->
              </v-avatar>
            </div>
          </v-card>
        </v-col>
			</v-window-item>
		</v-window>

		<!-- color="deep-purple-accent-4" -->
		<v-toolbar
			class="footer-colors"
		>
			<v-tabs
				v-model="this.$store.state.currentItem"
				fixed-tabs
			>
				<v-tab
					v-for="item in this.$store.state.items"
					:key="item.word"
					:value="'tab-' + item.word"
					@click="toggle()"
				>
					{{ item.word }}
				</v-tab>
				
				<v-menu
					v-if="this.$store.state.more.length"
				>
					<template v-slot:activator="{ props }">
						<v-btn
							variant="plain"
							rounded="0"
							class="align-self-center mr-4"
							height="100%"
							v-bind="props"
						>
							more
							<v-icon right>
								mdi-menu-down
							</v-icon>
						</v-btn>
					</template>

					<v-list class="grey lighten-3">
						<v-list-item
							v-for="(item, i) in this.$store.state.more"
							:key="i"
							@click="addItem(item)"
						>
							{{ item.word }}
						</v-list-item>
					</v-list>
				</v-menu>
			</v-tabs>
			
			<!-- <v-btn flat @click="toggle()">
				Translation
			</v-btn> -->
		</v-toolbar>
	</v-card>
</template>

<script>
	export default {
		data: () => ({
			showTranslation: false,
			imgIdx: 0,
			current: ''
		}),
		methods: {
			addItem (item) {
				this.current = 'tab-' + item.word
				this.showTranslation = true;
				this.$store.commit("addItem", item);
				this.$nextTick(() => { this.$store.state.currentItem = 'tab-' + item.word })
			},
			// open() {
			// 	this.showTranslation = true;
			// },
			toggle() {
				// console.log('c: '+this.current, 'S:'+this.$store.state.currentItem)
				if(this.current !== this.$store.state.currentItem){
					this.showTranslation = true;
				} else {
					this.showTranslation = !this.showTranslation;
				}
				this.current = this.$store.state.currentItem;
			},
			changeImg(){
				if(this.imgIdx > 3){
					this.imgIdx = 0
				} else {
					this.imgIdx += 1
				}
			},
			saveWord(word) {
				console.log(word)
				window.ipcRenderer.send("toMain", {"type": "save_word", "data": word});
			}
		}
	}
</script>
<style scoped>
	.translation{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 10 !important;
	}
	.translation_card{
		z-index: 3 !important;
	}
	.change_img_btn {
		position: absolute;
	}
	.word_img {
		width: 100%;
		height: 100%;
	}
  .footer-colors {
    background: rgb(var(--v-theme-footerBackground));
    color: rgba(var(--v-theme-footerText), 0.9)
  }
	/* .other_words_menu {
		z-index: 1008;
	} */
	/* .more {
		align-self: flex-end;
	} */
</style>