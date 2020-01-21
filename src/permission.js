import router from './router'
// import store from './store'
// import {
// 	Message
// } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css'
import {
	getToken
} from '@/utils/auth'

NProgress.configure({
	showSpinner: false // 是否有转圈效果
})

const whiteList = ['/login', '/auth-redirect'] // 没有重定向白名单

router.beforeEach((to, from, next) => {

	/* 开始进度条 */
	NProgress.start()

	if (getToken()) { // 确定用户是否已登录

		if (to.path === '/login') {
			next({
				path: '/' // 如果已登录，则重定向到主页
			})
			NProgress.done()
		} else {
			window.console.log(2)
			next() // hack方法 确保addRoutes已完成
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next() // 在免登录白名单，直接去
		} else {
			/* 没有访问权限的其他页面被重定向到登录页面 */
			next(`/login?redirect=$(to.path)`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done() /* 完成进度条 */
})
