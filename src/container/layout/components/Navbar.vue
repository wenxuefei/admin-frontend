<template>
	<div class="navbar">
		<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<template v-if="device !== 'mobile'">
				<screenfull class="right-menu-item hover-effect" />
			</template>
			<el-dropdown class="avatar-container right-menu-item" trigger="click">
				<div class="avatar-wrapper">
					<img src="../../../assets/logo.png" class="user-avatar" />
					<i class="el-icon-caret-bottom" />
				</div>
				<el-dropdown-menu slot="dropdown">

					<el-dropdown-item>
						<span style="display:block;">首页</span>
					</el-dropdown-item>
					<el-dropdown-item>
						<span style="display:block;">修改密码</span>
					</el-dropdown-item>

					<el-dropdown-item divided>
						<span style="display:block;" @click="logout">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import Hamburger from '@/components/Hamburger'
	import Breadcrumb from '@/components/Breadcrumb'
	import Screenfull from '@/components/Screenfull'
	export default {
		components: {
			Hamburger,
			Breadcrumb,
			Screenfull
		},
		computed: {
			...mapGetters([
				'sidebar',
				'device'
			])
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('toggleSideBar')
			},
			logout(){
				this.$store.dispatch('LogOut').then(()=>{
					location.reload()
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	.navbar {
		height: 50px;
		overflow: hidden;

		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background .3s;

			&:hover {
				background: rgba(0, 0, 0, .025);
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:foucs {
				outline: none;
			}


			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #C3B946;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background .3s;

					&hover {
						background: rgba($color: #000000, $alpha: 0.25);
					}
				}
			}

			.avatar-container {
				margin-right: 30px;

				.avatar-wrapper {
					margin-top: 5px;
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 25px;
						font-size: 12px;
						color: #fff;
					}
				}
			}
		}
	}
</style>
