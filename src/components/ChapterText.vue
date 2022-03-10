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
	export default {
		props: {
			tokens: Array
		},
		data: () => ({}),
		methods: {
			word(token, e){
				console.log(token, e)
				window.ipcRenderer.send("toMain", {"type": "word", "data": token.token});
			}
		},
		setup(){}
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
</style>