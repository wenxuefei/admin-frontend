import request from '@/utils/request'

export function getUserList(search = {}, page = 1, pageSize = 10) {
	const data = {
		username: search.username,
		page: page,
		pageSize: pageSize
	}
	return request({
		url: 'getUserList',
		method: 'post',
		data: data
	})
}

export function addUser(data) {
	return request({
		url: 'addUser',
		method: 'post',
		data: data
	})
}

export function editStatus(data) {
	return request({
		url: 'editStatus',
		method: 'post',
		data: data
	})
}

export function rePassword(data) {
	return request({
		url: 'rePassword',
		method: 'post',
		data: data
	})
}
