import request from '@/utils/request'

export function loginByUsername(username, password) {
	const data = {
		username: username,
		password: password
	}

	return request({
		url: 'login',
		method: 'post',
		data
	})
}
