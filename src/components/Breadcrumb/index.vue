<template>
	<el-breadcrumb class="app-breadcurmb" seperator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
				<span v-if="item.redirect==='noredirect' || index==levelList.length - 1" class="no-redirect">{{item.meta.title}}</span>
				<span v-else class="redirect" @click.prevent="handleLink(item)">{{item.meta.title}}</span>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script>
	import PathToRegexp from 'path-to-regexp'
	export default {
		data() {
			return {
				levelList: []
			}
		},
		watch:{
			$route(){
				this.getBreadcrumb()
			}
		},
		created() {
			this.getBreadcrumb()
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)
				
				const first = matched[0]
				
				if(first && first.name.trim().toLowerCase() !== 'Dashboard'.toLocaleLowerCase()){
					matched = [{path:'/dashboard',meta:{title:'首页'}}].concat(matched)
				}
				
				this.levelList = matched.filter(item=>item.meta && item.meta.title && item.meta.breadcrumb !== false)
			},
			
			pathCompile(path){
				const { params } = this.$route
				let toPath = PathToRegexp.compile(path)
				
				return toPath(params)
			},
			
			handleLink(item){
				const {redirect,path} = item
				
				if(redirect){
					this.$router.push(redirect)
					return
				}
				
				this.$router.push(this.pathCompile(path))
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
			font-weight: bold;
			
			&:hover{
				color: #ffd04b;
			}
		}

		.no-redirect {
			color: #22C2C2;
			cursor: text;
		}
	}
</style>
