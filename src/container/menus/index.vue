<template>
	<div class="user-container">
		<div class="form-container">
			<el-form :inline="true" :model="search">
				<el-col :span=24>
					<el-form-item>
						<el-input v-model="search.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button plain icon="el-icon-search">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addMenu">添加</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<el-table></el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {
					username: ''
				},
			}

		},
		methods:{
			addMenu(){
				this.$router.push({
					path: '/permission/menu-add'
				})
			}
		}

	}
</script>

