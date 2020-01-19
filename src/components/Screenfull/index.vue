<template>
	<div>
		<svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"></svg-icon>
	</div>
</template>

<script>
	import screenfull from 'screenfull'
	export default {
		name:'Screenfull',
		data() {
			return {
				isFullscreen: false
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			click() {
				if (!screenfull.isEnabled) {
					this.$message({
						message: '您的浏览器不支持',
						type: 'warning'
					})

					return false
				}

				screenfull.toggle()
			},
			init() {
				if (screenfull.isEnabled) {
					screenfull.on('change', () => {
						this.isFullscreen = screenfull.isFullscreen
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.screenfull-svg {
		display: inline-block;
		cursor: pointer;
		fill: #347600;
		width: 20px;
		height: 20px;
		vertical-align: 10px;
	}
</style>
