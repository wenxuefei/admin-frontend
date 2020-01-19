<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<el-menu :show-timeout="200" class="el-menu-vertical-demo" :collapse="isCollapse"  background-color="#00242D" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">
				<i class="el-icon-s-platform"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
			<el-submenu index="5">
				<template slot="title">
					<svg-icon icon-class="people"></svg-icon>
					<span slot="title">权限管理</span>
				</template>
				<el-menu-item index="5-1">用户管理</el-menu-item>
				<el-menu-item index="5-2">选项2</el-menu-item>
				<el-menu-item index="5-3">选项3</el-menu-item>
				<el-menu-item index="5-4">选项1</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-scrollbar>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed:{
			...mapGetters([
				'sidebar'
			]),
			isCollapse(){
				return !this.sidebar.opened
			}
		}
	}
</script>
