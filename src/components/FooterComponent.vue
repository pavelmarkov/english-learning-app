<template>
	<v-card class="translation">
		<v-window v-model="this.$store.state.currentItem" v-if="showTranslation">
			<v-window-item
				v-for="item in this.$store.state.items.concat(this.$store.state.more)"
				:key="item.word"
				:value="'tab-' + item.word"
			>
				<v-card flat>
					<v-card-text>
						<h2>{{ item.word }}</h2>
						{{ item.rus }}
						{{ this.$store.state.text }}
					</v-card-text>
				</v-card>
			</v-window-item>
		</v-window>

		<v-toolbar
			color="deep-purple-accent-4"
		>
			<v-tabs
				v-model="this.$store.state.currentItem"
				fixed-tabs
			>
				<v-tab
					v-for="item in this.$store.state.items"
					:key="item.word"
					:value="'tab-' + item.word"
					@click="open()"
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
							v-for="item in this.$store.state.more"
							:key="item.word"
							@click="addItem(item)"
						>
							{{ item.word }}
						</v-list-item>
					</v-list>
				</v-menu>
			</v-tabs>
			
			<v-btn flat @click="toggle()">
				Translation
			</v-btn>
		</v-toolbar>
	</v-card>
</template>

<script>
	export default {
		data: () => ({
			showTranslation: false
		}),
		methods: {
			addItem (item) {
				this.showTranslation = true;
				this.$store.commit("addItem", item);
				this.$nextTick(() => { this.$store.state.currentItem = 'tab-' + item.word })
			},
			open() {
				this.showTranslation = true;
			},
			toggle() {
				this.showTranslation = !this.showTranslation;
			}
		}
	}
</script>
<style scoped>
	.translation{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>