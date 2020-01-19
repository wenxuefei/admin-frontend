<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	#nprogress .bar {
		background: #1DDBDA !important; 
	}
	
	.page{
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: flex-end;
		
		.el-pagination{
			margin-top: 25px;
			button,button:disabled{
				background: none;
			}
			// .el-icon{
			// 	i{
			// 		background: none!important;
			// 	}
			// }
			.el-pager{
				li{
					color: #E6DD1;
					background: none;
				}
			}
		}
	}
</style>
