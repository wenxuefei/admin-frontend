<template>
	<div class="login-container">

		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">

			<div class="title-container">
				<h3 class="title">系统登录</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input v-model="loginForm.username" placeholder="账号" name="username" type="text" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input :type="passwordType" v-model="loginForm.password" placeholder="密码" name="password" auto-complete="off"></el-input>
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>
			<el-form-item prop="captch" class='captch-container'>
				<el-row type="flex" justify="space-between">

					<el-col :span="11">
						<el-input v-model="loginForm.captch" class="captch" placeholder="验证码" name="captch" :maxlength="codeLen" type="text" auto-complete="off"></el-input>

					</el-col>

					<captch :codeLen="codeLen" @getCode="getCode"></captch>

				</el-row>

			</el-form-item>

			<el-button :loading="loading" @click.native.prevent="handleLogin" type="primary" style="width:100%;margin-bottom:30px;">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	// import myconfig from '@/config'
	import captch from '../../components/Captcha/index.vue' // 引入验证码组件
	export default {
		name: 'Login',
		data() {
			const validateUsername = (rule, value, callback) => {
				!value ? callback(new Error('请输入账号')) : callback()
			}

			const validatePassword = (rule, value, callback) => {
				value.length < 6 ? callback(new Error('密码不能少于6位')) : callback()
			}

			const validateCaptch = (rule, value, callback) => {
				value.toLowerCase() != this.code.toLowerCase() ? callback(new Error('验证码不正确')) : callback()
			}
			return {
				loginForm: {
					username: '',
					password: '',
					captch: ''
				},
				loginRules: {
					username: [{
						required: true,
						trigger: 'blur',
						validator: validateUsername
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePassword
					}],
					captch: [{
						required: true,
						trigger: 'blur',
						validator: validateCaptch
					}],
				},
				passwordType: 'password',
				code: '',
				codeLen: 5,
				loading: false,
				redirect: undefined
			}

		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		components: {
			'captch': captch
		},
		methods: {

			/* 密码是否隐藏 */
			showPwd() {
				this.passwordType = this.passwordType === 'password' ? '' : 'password'
			},

			/* 获取验证码 */
			getCode(data) {
				this.code = data
			},

			/* 登录 */
			handleLogin() {
				this.$refs.loginForm.validate(valid => {

					if (valid) {
						this.loading = true
						this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
							this.$router.push({
								path: this.redirect || '/'
							})
							window.console.log('登录成功')
						}).catch((error) => {
							window.console.log(error)
							this.loading = false
						})
					} else {
						window.console.log('请输入正确的账号密码')
						return false
					}
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	$bg:#002B36;
	$light_gray:#eee;
	$cursor: #fff;

	@supports (-webkit-mask:none) and (not (cater-color:$cursor)) {
		.login-container .el-input input {
			color: $cursor;

			&::first-line {
				color: $light_gray;
			}

		}
	}

	/* 重写element-ui 部分样式 */

	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background: $bg;
		left: 0;
		top: 0;


		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
		}

		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				caret-color: $cursor;

				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}

		}

		.captch {
			display: inline-block;
			height: 47px;
			width: 100%;

			input {
				border: 1px solid rgba(255, 255, 255, 0.1);
				background: rgba(0, 0, 0, 0.1);
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $cursor;
				height: 47px;
				caret-color: $cursor;

				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}

				&::first-line {
					color: $cursor;
				}
			}
		}





	}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
	$bg:#002B36;
	$light_gray:#eee;
	$dark_gray:#889aa4;

	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background: $bg;
		left: 0;
		top: 0;



		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
		}

		.title-container {
			position: relative;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0 auto 40px auto;
				text-align: center;
				font-weight: bold;
			}
		}


		.captch-container {
			border: none;
			background: none;
			border-radius: 5px;
			color: #454545;
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			display: inline-block;
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}

		.el-col {
			min-height: 47px;
		}

	}
</style>
