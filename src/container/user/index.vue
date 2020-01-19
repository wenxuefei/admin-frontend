<template>
	<div class="user-container">
		<div class="form-container">
			<el-form :inline="true" :model="search">
				<el-col :span=24>
					<el-form-item>
						<el-input v-model="search.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button plain icon="el-icon-search" @click="searchList">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addAdmin">添加</el-button>
					</el-form-item>
				</el-col>
			</el-form>


			<el-table :data="tableData" v-loading="loading">
				<el-table-column prop="id" sortable label="ID"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column label="头像">
					<template slot-scope="scope">
						<img :src="scope.row.avatar|avatarFilter" alt="" width="50" height="50" v-if="scope.row.avatar"/>
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="手机号"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span style="color: #FF0000;" v-if="scope.row.status == 0">禁用</span>
						<span style="color: #1AA034;" v-if="scope.row.status == 1">启用</span>
					</template>
				</el-table-column>
				<el-table-column prop="last_login" label="上次登录时间">
					<template slot-scope="scope">
						<span v-if="scope.row.last_login">{{scope.row.last_login | formatDate}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="last_ip" label="上次登录IP"></el-table-column>
				<el-table-column prop="created_at" label="创建时间"></el-table-column>
				<el-table-column prop="updated_at" label="修改时间"></el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<el-dropdown split-button plain>
						操作
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>黄金糕</el-dropdown-item>
							<el-dropdown-item>狮子头</el-dropdown-item>
							<el-dropdown-item>螺蛳粉</el-dropdown-item>
							<el-dropdown-item>双皮奶</el-dropdown-item>
							<el-dropdown-item>蚵仔煎</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

				</el-table-column>

			</el-table>
			<div class="page">
				<!-- @current-change="pagination" @size-change="sizeChange" :current-page.sync="current_page" -->
				<!-- :page-size.sync="pageSize"  -->
				<el-pagination :page-sizes="[10,20,25,50]" layout="total,sizes,prev, pager, next" :total="total">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		getUserList
	} from "@/api/user"
	import config from '@/config'
	import { formatTimeToStr } from '@/utils/date'
	export default {
		data() {
			return {
				search: {
					username: ''
				},
				tableData: [],
				current_page: 1,
				page_size: 15,
				loading: true,
				total: 0,
			}
		},
		mounted() {
			this.getList()
		},

		methods: {
			aaa() {
				window.console.log(111)
			},

			searchList() {
				this.getList()
			},

			addAdmin() {
				this.$router.push({
					path: '/permission/admin-add'
				})
			},

			getList(search = this.search, page = this.current_page, pageSize = this.page_size) {

				this.loading = true
				getUserList(search, page, pageSize).then(response => {
					this.loading = false
					this.tableData = response.data.data
					this.total = response.data.count
				}).catch(() => {
					this.loading = false
				})
			}
		},
		filters: {
			avatarFilter(val) {
				return config.uploadUrl.img + val;
			},
			formatDate(time){
				// var date = new Date(time)
				window.console.log(time)
				return formatTimeToStr(time)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped='scoped'>
	.user-container {
		padding: 5px;
		color: #FFFFFF;
		font-size: 14px;

		.form-container {
			width: 95%;
			height: auto;
			margin: 2.5%;
			background: rgba($color: #FFFFFF, $alpha: 0.4);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 5px;
			padding: 2.5% 1.5% 2.5%;

			.action {
				text-align: right;
			}

		}
	}
</style>
