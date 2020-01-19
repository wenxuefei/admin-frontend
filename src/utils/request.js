import axios from 'axios'
import {
	Message
} from 'element-ui'
import myconfig from '@/config'
import {
	getToken,
	getSignature
} from '@/utils/auth'
import store from '@/store'
import qs from 'qs'

const baseUrl = process.env.NODE_ENV === 'production' ? myconfig.baseUrl.pro : myconfig.baseUrl.dev


/* 创建 axios 实例*/
const service = axios.create({
	baseURL: baseUrl,
	timeout: myconfig.timeout,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;chareset=utf-8'
	},
})

/* 请求拦截器 */
service.interceptors.request.use(
	config => {

		config.data.appid = myconfig.appid // 头部添加应用ID
		if (store.getters.token) {
			config.data.token = getToken()
		}
		
		if (config.method === 'post') {
			config.data = getSignature(config.data)
			
			if(config.headers['Content-Type'] != 'multipart/form-data'){
				config.data = qs.stringify(config.data)
			}

		} else if (config.method === 'get') {
			config.params = getSignature(config.params)
		}

		return config
	},
	error => {
		window.console.log(error)
		Promise.reject(error)
	}
)


/* 响应拦截器 */
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.status_code !== 200) {
			Message({
				message: res.message,
				type: 'error',
				duration: 5 * 1000
			})

			return Promise.reject('error')
		}

		return response.data

	},
	error => {

		let message = ''
		if (error.response.status) {
			const res = error.response
			const errors = res.data.errors

			switch (res.status) {
				case 422:
					for (const i in errors) {
						message += errors[i][0]
						break
					}
					break
				case 404:
					message += res.data.message
					break
				default:
					message += '网络异常'

			}

		}

		Message({
			message: message,
			type: 'error',
			duration: 5 * 1000
		})


		return Promise.reject(error)
	}
)

export default service
