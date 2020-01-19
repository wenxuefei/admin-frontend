<template>
	<el-breadcrumb class="app-breadcurmb" seperator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="item in levelList" :key="item.path">
				<span v-if="item.id < 3" class="redirect">{{item.title}}</span>
				<span v-else class="no-redirect">{{item.title}}</span>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script>
	export default {
		data() {
			return {
				levelList: [{
					id: 1,
					path: '222',
					title: '首页'
				}, {
					id: 2,
					path: '333',
					title: '活动管理'
				}, {
					id: 3,
					path: '555',
					title: '活动列表'
				}]
			}
		},
		created() {
			this.getBreadcrumb()
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)

				window.console.log(matched)
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.app-breadcrumb,
	.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 8px;

		.redirect {
			color: #fff;
			// color: #22C2C2;
			font-weight: bold;
		}

		.no-redirect {
			// color: #97a8be;
			color: #22C2C2;
			cursor: text;
		}
	}
</style>
