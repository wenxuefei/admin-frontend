import {
	loginByUsername,
	// getUserInfo
} from '@/api/login'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'

const user = {
	state: {
		token: getToken()
	},


	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		}
	},

	actions: {
		/* 用户名登录 */
		LoginByUsername({
			commit
		}, userInfo) {
			const username = userInfo.username.trim()

			return new Promise((resolve, reject) => {
				loginByUsername(username, userInfo.password).then(response => {
					const data = response.data
					commit('SET_TOKEN', data.access_token)
					setToken(response.data.access_token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		LogOut({commit}){
			return new Promise(resolve=>{
				commit('SET_TOKEN','')
				removeToken()
				resolve()
			})
		}
	},
}

export default user
