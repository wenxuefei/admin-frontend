export default {

	/* 应用ID */
	appid: 'da320986e2423e2d',

	/* 应用秘钥 */
	appSecret: 'ad675d4e0900bb8d703169935152b3fdf8b0ddf1',

	/* 浏览器显示的title */
	title: ' 后台管理系统',

	/* tooken 在 Cookie 中存储的时间 默认1天*/
	cookieExpires: 1,
	
	/* 请求超时时间 */
	timeout:10000,

	/* api 请求基础路径 */
	baseUrl: {
		dev: 'http://admin.admin.com/api/', // 生产环境
		pro: 'http://admin.admin.com/api/'  // 正式环境
	},

	/* 图片路径 */
	uploadUrl: {
		img: 'http://admin.admin.com/',
		video: '',
		file: ''
	}
}
