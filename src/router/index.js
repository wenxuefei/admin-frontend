import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 后台布局 */

import Layout from '@/container/layout/Layout'

export const routerMap = [{
		path: '/login',
		component: () => import('@/container/login/index'),
		hidden: false
	},
	{
		path: '/auth-redirect',
		component: () => import('@/container/login/authredirect'),
		hidden: true
	},
	// {

	// 	path: '/redirect',
	// 	component: Layout,
	// 	hidden: true,
	// 	children: [{
	// 		path: 'redirect/:path*',
	// 		// component: () => import('@/container/redirect/index')
	// 	}]
	// },
	{
		path: '',
		component: Layout,
		// redirect: 'dashboard',
		// children: [{
		// 	path: 'dashboard',
		// 	component: () => import('@/container/dashboard/index'),
		// 	name: 'Dashboard',
		// 	meta: {
		// 		title: 'dashboard',
		// 		icon: 'dashboard',
		// 		noCache: true
		// 	}
		// }]
	},
	{
		path: '/permission',
		component: Layout,
		name: 'permission',
		redirect: '/permission/index',
		alwaysShow: true,
		meta: {
			title: '权限管理',
			icon: 'people'
		},
		hidden: false,
		children: [{
			path: 'index',
			component: () => import('@/container/user/index'),
			name: 'role_index',
			meta: {
				title: '用户管理',
				icon: 'user'
			},
		}, {
			path: 'admin-add',
			component: () => import('@/container/user/menu/add'),
			name: 'role_index',
			meta: {
				title: '用户添加',
				icon: 'user'
			},
			hidden: true,
		}]
	}
]

export default new Router({
	mode: 'hash',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: routerMap
})
