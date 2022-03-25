<template>
	<span 
	v-for="(token, i) in tokens"
	:key="i"
	active-color="primary"
	variant="plain"
	@click.stop="token.isWord && word(token, $event)"
	:class="token.isWord ? 'word' : ''">
		{{token.token == '<br><br>' ? '' : token.token}}
		<span 
		v-if="token.token == '<br><br>'"
		class="delimiter"></span>
	</span>
</template>

<script>
	import {computed} from "vue";
	// import {useStore} from "vuex";
	export default {
		// components: {
			
		// },
		props: {
			tokens: Array
		},
		data: () => ({

		}),
		methods: {
			word(token, e){
				let f = this.$store.state.items.find((e) => e.word == token.token);
				if(f) {
					// console.log('word already exists')
					return;
				}
				if(this.$store.state.wordProcessing){
					// console.log('translation is in progress')
				} else {
					console.log(token, e)
					window.ipcRenderer.send("toMain", {"type": "translate_word", "data": token.token});
					this.$store.state.wordProcessing = true
				}
			}
		},
		setup(){
			let translation = computed(function () {
				return this.$store.state.currentWord
			});
			return {
				translation
			}			
		}
	}
</script>
<style scoped>
	.delimiter {
		display: block;
		margin: 10px;
	}
	.word {
		color: rgb(99, 98, 98);
		cursor: pointer;
	}
	.word:hover {
		color: black;
	}
	.translation {
		position: static;
		bottom: 0;
	}
</style>