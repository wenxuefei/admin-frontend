import Cookies from 'js-cookie'
import myconfig from '@/config'

import qs from 'qs'
import crypto from 'crypto'

const _token = 'admin-token'

export function getToken(){
	return Cookies.get(_token)
}

export function setToken(token){
	return Cookies.set(_token,token, {expires: myconfig.cookieExpires})
}

export function removeToken(){
	return Cookies.remove(_token)
}


/**
 * 数据加密
 * @param {Object} obj 加密对象
 * @param {Object} signKey 加密私钥
 */
function getEncrypt(obj,signKey){
	const arr = []
	const keys = []
	
	for (const i in obj){
		if (typeof obj[i] !== 'object' && i !== 'signature'){
			keys.push(i)
		}
	}
	
	keys.sort()
	
	for (const i in keys){
		arr[keys[i]] = obj[keys[i]]
	}
	
	const arr_str = qs.stringify(arr)
	
	window.console.log(arr_str)
	
	
	let arr_sha1 = crypto.createHash('sha1').update(arr_str).digest('hex') // 将arr_str用sha1方式加密 并返回hex 格式
	
	arr_sha1 = arr_sha1 + signKey // 返回新的arr_sha1
	
	return crypto.createHash('md5').update(arr_sha1).digest('hex') // 将新的arr_sha1 通过md5 的方式加密 返回 hex 格式
}


/**
 * 数据签名
 * @param {Object} obj  签名对象
 */
export function getSignature(obj) {
	let encrypt = {}
	
	if (obj) {
		encrypt = obj
	}
	
	/* 签名 */
	const signature = getEncrypt(encrypt,myconfig.appSecret)
	
	encrypt.signature = signature
	
	return encrypt
}