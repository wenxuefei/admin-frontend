<template>
	<div class="user-container">
		<div class="form-container">
			<!-- :rules="adminRules" -->
			<el-form ref="form" :model='admin' :rules="adminRules" label-width="80px" class="form-form" status-icon>
				<el-row class="form-item">

					<el-form-item label="用户名称" prop="username">
						<el-input v-model="admin.username" maxlength="20" show-word-limit></el-input>
					</el-form-item>


				</el-row>
				<el-row class="form-item">

					<el-form-item label="用户密码" prop="password">
						<el-input show-password v-model="admin.password"></el-input>
					</el-form-item>

				</el-row>
				<el-row class="form-item">

					<el-form-item label="确认密码" prop="confirm">
						<el-input show-password v-model="admin.confirm"></el-input>
					</el-form-item>

				</el-row>
				<el-row class="form-item">

					<el-form-item label="手机号" prop="phone">
						<el-input v-model="admin.phone" maxlength="11" show-word-limit></el-input>
					</el-form-item>

				</el-row>
				<el-row class="form-item">

					<el-form-item label="启用" prop="status">
						<el-switch :width="50" v-model="admin.status" :active-value="1" inactive-value="0"></el-switch>
					</el-form-item>

				</el-row>

				<el-row class="form-upload">
					<el-form-item label="头像上传" prop="avatar">

						<el-upload class="avatar-uploader" :action="action" :before-upload="beforeAvatarUpload" :show-file-list="false">
							<img v-if="imgUrl" :src="imgUrl" class="avatar">
							<!-- v-else -->
							<i v-else class="el-icon-plus"></i>
						</el-upload>


					</el-form-item>
				</el-row>
				<el-row class="form-button">
					<el-button :loading="loading" type="primary" @click="save">添 加</el-button>
				</el-row>

			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		addUser,

	} from "@/api/user"
	import {
		uploadImage
	} from '@/api/upload'
	import config from '@/config'
	export default {
		data() {
			const validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (String(value).length < 6 || String(value).length > 20) {
					callback(new Error('长度在 6 到 20 个字符'));
				} else {
					if (this.admin.confirm !== '') {
						this.$refs.form.validateField('confirm');
					}
					callback();
				}
			}
			const validateConfirm = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入确认密码'));
				} else if (value !== this.admin.password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			}

			const validatePhone = (rule, value, callback) => {
				const reg = /^1[3456789]\d{9}$/
				if (value !== '') {
					reg.test(value) ? callback() : callback(new Error('手机号格式不正确'))
				}
			}

			return {
				admin: {
					username: '',
					password: '',
					confirm: '',
					phone: '',
					status: 1,
					avatar: './avatars/20200119/FGDngaXsIqSXRbFWEkFNBRwh6CsXezNtKNrVX8Sk.png'
				},
				adminRules: {
					username: [{
						required: true,
						message: '请输入用户名称',
						trigger: 'blur'
					}, {
						min: 5,
						max: 10,
						message: '长度在 5 到 10 个字符',
						trigger: 'blur'
					}],
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
					phone: [{
						validator: validatePhone,
						trigger: 'blur'
					}]
				},
				imgUrl: '',
				action: '',
				loading: false
			}
		},
		methods: {
			beforeAvatarUpload(file) {

				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB！')

					return false
				}

				var auffix = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
				const extension =
					auffix === "jpg" ||
					auffix === "png" ||
					auffix === "gif"
					
				if (!extension) {
					this.$message({
						message: "上传图片只能是jpg / png / gif格式!",
						type: "error"
					});
					return false;
				}

				uploadImage([file]).then(res => {
					this.admin.avatar = res.data
					this.imgUrl = config.uploadUrl.img + res.data
					this.$message.success('上传成功')
				}).catch(() => {
					this.$message.error('上传失败')
				})

				return false
			},
			save() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.loading = true
						const data = this.admin
						addUser(data).then(reponse => {
							this.loading = false
							window.console.log(reponse)
							this.$router.back(-1)
						}).catch(() => {
							this.loading = false
						})
					} else {
						return false
					}
				})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.el-form-item__error {
		color: #FF0000;
	}

	.form-upload .el-form-item__label {
		line-height: 200px;
	}


	.avatar-uploader .el-upload {
		margin-top: 22px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		width: 178px;
		height: 178px;
		font-size: 28px;
		line-height: 178px;
		text-align: center;
		color: #FFFFFF;

	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	// .avatar {
	// 	width: 178px;
	// 	height: 178px;
	// 	display: block;
	// }
</style>

<style rel="stylesheet/scss" lang="scss">
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


				.form-upload {
					height: 220px;
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
