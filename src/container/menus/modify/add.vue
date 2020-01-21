<template>
	<div class="user-container">
		<div class="form-container">
			<el-row class="form-item">
				<el-steps :space="space" :active="active" finish-status="success" align-center>
					<el-step title=""></el-step>
					<el-step title=""></el-step>
					<el-step title=""></el-step>
				</el-steps>
			</el-row>

			<el-form ref="form" :model="menu" :rules='menuRules' label-width="80px" class="form-form" status-icon>
				<transition name="fade-transform" mode="out-in">
					<el-row class="form-form" v-if="active == 0">
						<el-row class="form-item">

							<el-form-item label="菜单名称" prop="title">
								<el-input v-model="menu.title" maxlength="20" show-word-limit></el-input>
							</el-form-item>


						</el-row>
						<el-row class="form-item">

							<el-form-item label="路由名称" prop="name">
								<el-input v-model="menu.name" maxlength="20" show-word-limit></el-input>
							</el-form-item>


						</el-row>
						<el-row class="form-item">

							<el-form-item label="组件名称" prop="component">
								<el-input v-model="menu.component" maxlength="20" show-word-limit></el-input>
							</el-form-item>


						</el-row>
					</el-row>
					<el-row class="form-form" v-if="active == 1">
						<el-row class="form-item">
							<el-form-item label="父级菜单" prop="parent_id">
								<el-select v-model="menu.parent_id" placeholder="请选择">
									<el-option v-for="item in parentMenu" :key="item.parent_id" :label="item.title" :value="item.parent_id"></el-option>
								</el-select>
							</el-form-item>
						</el-row>
						<el-row class="form-item">

							<el-form-item label="菜单图标" prop="icon">
								<el-input v-model="menu.icon" maxlength="30" show-word-limit></el-input>
							</el-form-item>

						</el-row>
						<el-row class="form-item">
							<el-form-item label="菜单链接" prop="path">
								<el-input v-model="menu.path" maxlength="30" show-word-limit></el-input>
							</el-form-item>
						</el-row>
						<el-row class="form-item">
							<el-form-item label="高亮链接" prop="activeMenu">
								<el-input v-model="menu.activeMenu" maxlength="30" show-word-limit></el-input>
							</el-form-item>
						</el-row>
						<el-row class="form-item">
							<el-form-item label="菜单权限" prop="slug">
								<el-input v-model="menu.slug" maxlength="30" show-word-limit></el-input>
							</el-form-item>
						</el-row>
					</el-row>
					<el-row class="form-form" v-if="active == 2">
						<el-row class="form-item">
							<el-form-item label="菜单排序" prop="sort">
								<el-input v-model="menu.sort"></el-input>
							</el-form-item>
						</el-row>

						<el-row class="form-item">

							<el-form-item label="菜单显示" prop="hidden">
								<el-switch :width="50" v-model="menu.hidden" :active-value="1" inactive-value="0"></el-switch>
							</el-form-item>

						</el-row>
						<el-row class="form-item">

							<el-form-item label="路由显示" prop="alwaysShow">
								<el-switch :width="50" v-model="menu.alwaysShow" :active-value="1" inactive-value="0"></el-switch>
							</el-form-item>

						</el-row>
						<el-row class="form-item">

							<el-form-item label="是否缓存" prop="noCache">
								<el-switch :width="50" v-model="menu.noCache" :active-value="0" inactive-value="1"></el-switch>
							</el-form-item>

						</el-row>
						<el-row class="form-item">

							<el-form-item label="导航显示" prop="breadcrumb">
								<el-switch :width="50" v-model="menu.breadcrumb" :active-value="1" inactive-value="0"></el-switch>
							</el-form-item>

						</el-row>

						<el-row class="form-button">
							<el-button :loading="loading" type="primary" @click="save">保 存</el-button>
						</el-row>
					</el-row>
				</transition>
			</el-form>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menu: {
					hidden: 1,
					alwaysShow: 1,
					noCache: 1,
					breadcrumb: 1,
				},
				menuRules: {
					title: [{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入路由名称',
						trigger: 'blur'
					}],
					component: [{
						required: true,
						message: '请输入组件名称',
						trigger: 'blur'
					}],
				},
				parentMenu: [],
				loading: false,
				active: 1,
			}
		},
		methods: {
			save() {

			}
		}
	}
</script>
<style ref="stylesheet/scss" lang="scss">
	.el-form-item__error {
		color: #FF0000;
	}
</style>
<style scoped="scoped" ref="stylesheet/scss" lang="scss">
	.user-container {
		.form-container {

			.form-form {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.form-item {
					height: 80px;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					min-width: 300px;
					width: 30%;
				}

				.form-button {
					height: 80px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					min-width: 200px;
					width: 15%;
				}

			}


		}
	}
</style>
