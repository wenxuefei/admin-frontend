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
						<img :src="scope.row.avatar|avatarFilter" alt="" width="50" height="50" v-if="scope.row.avatar" />
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="手机号"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">

						<el-link type="success" v-if="scope.row.status == 1" @click="editStatus(scope.$index, scope.row)" icon="el-icon-open">启用</el-link>
						<el-link type="danger" v-if="scope.row.status == 0" @click="editStatus(scope.$index, scope.row)" icon="el-icon-turn-off">禁用</el-link>

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
					<template slot-scope="scope">
						<el-dropdown split-button plain>
							操作
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native.prevent="editPassword(scope.row)">修改密码</el-dropdown-item>
								<el-dropdown-item>狮子头</el-dropdown-item>
								<el-dropdown-item>螺蛳粉</el-dropdown-item>
								<el-dropdown-item>双皮奶</el-dropdown-item>
								<el-dropdown-item>蚵仔煎</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>

				</el-table-column>

			</el-table>
			<div class="page">
				<!-- @current-change="pagination" @size-change="sizeChange" :current-page.sync="current_page" -->
				<!-- :page-size.sync="pageSize"  -->
				<el-pagination :page-sizes="[10,20,25,50]" layout="total,sizes,prev, pager, next" :total="total">
				</el-pagination>
			</div>
			<Dialog title="密码重置" :show.sync="resetPassword">
				<el-form ref="form" :model="passwordForm" :rules="resetRules"  status-icon label-width="100px">
					<el-form-item label="新密码" prop="password">
						<el-input show-password v-model="passwordForm.password"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="confirm">
						<el-input show-password v-model="passwordForm.confirm"></el-input>
					</el-form-item>
				</el-form>

				<div class="dialog-footer" style="text-align: center;">
					<el-button :loading="resetLoading" type="primary" @click="savePassword()">确 定</el-button>
				</div>
			</Dialog>

		</div>
	</div>
</template>

<script>
	import {
		getUserList,
		editStatus,
		rePassword
	} from "@/api/user"
	import config from '@/config'
	import {
		formatTimeToStr
	} from '@/utils/date'
	import Dialog from '@/components/Dialog'
	export default {
		data() {
			const validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (String(value).length < 6 || String(value).length > 20) {
					callback(new Error('长度在 6 到 20 个字符'));
				} else {
					if (this.passwordForm.confirm !== '') {
						this.$refs.form.validateField('confirm');
					}
					callback();
				}
			}
			const validateConfirm = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入确认密码'));
				} else if (value !== this.passwordForm.password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			}
			return {
				search: {
					username: ''
				},
				passwordForm: {
					password: '',
					confirm: '',
					id:''
				},
				resetRules:{
					password: [{
						required: true,
						validator: validatePassword,
						trigger: 'blur'
					}],
					confirm: [{
						required: true,
						validator: validateConfirm,
						trigger: 'blur'
					}],
				},
				tableData: [],
				current_page: 1,
				page_size: 15,
				loading: true,
				total: 0,
				resetPassword: false,
				dialogWidth: '30%',
				resetLoading:false
			}
		},
		components: {
			Dialog
		},
		mounted() {
			this.getList()
		},

		methods: {

			/* 用户搜索 */
			searchList() {
				this.getList()
			},

			addAdmin() {
				this.$router.push({
					path: '/permission/admin-add'
				})
			},

			/* 获取用户列表 */
			getList(search = this.search, page = this.current_page, pageSize = this.page_size) {
				this.loading = true
				getUserList(search, page, pageSize).then(response => {
					this.loading = false
					this.tableData = response.data.data
					this.total = response.data.count
				}).catch(() => {
					this.loading = false
				})
			},

			/* 修改用户状态 */
			editStatus(index, row) {
				let status = row.status == 1 ? 0 : 1

				editStatus({
					status,
					id: row.id
				}).then(res => {
					window.console.log(res)
					this.$message.success('修改成功')
					this.tableData[index].status = status
				}).catch(() => {})

			},
			editPassword(row) {
				this.passwordForm.id = row.id
				this.resetPassword = true
			},
			savePassword(){
				this.$refs.form.validate((valid)=>{
					if(valid){
						this.resetLoading = true
						rePassword(this.passwordForm).then(res=>{
							this.$message.success(res.message)
							this.passwordForm = {
								password: '',
								confirm: '',
								id:''
							}
							this.resetPassword = false
							this.resetLoading = false
						}).catch(()=>{
							this.resetLoading = false
						})
					}else{
						return false
					}
				})
			}


		},
		filters: {
			avatarFilter(val) {
				return config.uploadUrl.img + val;
			},
			formatDate(time) {
				return formatTimeToStr(time)
			}
		}
	}
</script>

