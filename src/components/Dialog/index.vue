<template>
	<el-dialog :title="title" :visible.sync="visible" :show="show" @close="$emit('update:show', false)" :close-on-click-modal="false" :width="width" center :top="top">
		<slot></slot>

	</el-dialog>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '标题',
			},
			maxWidth: {
				type: String,
				default: '80%'
			},
			minWidth: {
				type: String,
				default: '20%'
			},
			show: {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '30vh'
			}
		},
		data() {
			return {
				width: '80%',
				visible: this.show
			}
		},
		watch: {
			show() {
				this.visible = this.show;
			}
		},
		beforeMount() {
			window.addEventListener('resize', this.setDialogWidth)
		},
		mounted() {
			this.setDialogWidth()
		},
		methods: {

			setDialogWidth() {
				let val = document.body.clientWidth
				const def = 800 // 默认宽度
				val < def ? this.width = this.maxWidth : this.width = this.minWidth
			}
		}
	}
</script>

<style>
</style>
