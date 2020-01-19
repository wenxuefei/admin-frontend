<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<!-- :include="cachedViews" -->
			<keep-alive >
				<!-- :key="key" -->
				<router-view ></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	export default {
		name: 'AppMain',
		computed: {
			// cachedViews() {
			// 	return this.$store.state.tagsView.cachedViews
			// },
			// key() {
			// 	return this.$route.fullPath
			// }
		}

	}
</script>

<style scoped="scoped">
	.app-main {
		min-height: calc(100vh-84px);
		width: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
