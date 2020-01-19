import request from '@/utils/request'
import {
	getToken,
	getSignature
} from '@/utils/auth'
import myconfig from '@/config'
export function uploadImage(params) {

	let [file] = params
	let fd = new FormData()
	fd.append('appid', myconfig.appid)
	fd.append('token', getToken())
	
	const arr = {
		appid:myconfig.appid,
		token:getToken(),
	}
	
	const data = getSignature(arr)

	fd.append('signature',data.signature)
	fd.append('file', file)

	return request({
		url: 'upload',
		headers: {
			'Content-Type': 'multipart/form-data' //multipart/form-data
		},
		method: 'post',
		data: fd
	})
}
