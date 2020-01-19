import router from './router'
// import store from './store'
// import {
// 	Message
// } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	getToken
} from '@/utils/auth'

NProgress.configure({
	showSpinner: false
})

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		if (to.path === '/login') {
			next({
				path: '/'
			})
			NProgress.done()
		} else {
			window.console.log(2)
			next() // hack方法 确保addRoutes已完成
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=$(to.path)`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
