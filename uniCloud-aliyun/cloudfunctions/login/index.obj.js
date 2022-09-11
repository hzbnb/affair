// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const appId = "wxb22f02280d03f048";
const appSecret = "e9b2d4be118e613bf0a4859fda526091";
const db = uniCloud.database();
module.exports = {
	_before: function() { // 通用预处理器

	},
	async login(code) {
		const res = await uniCloud.httpclient.request(
			"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret +
			"&js_code=" + code + "&grant_type=authorization_code", {
				dataType: "json"
			}
		)
		Reflect.deleteProperty(res.data, 'session_key')
		let isnew = await db.collection("users").where({
			openid: res.data.openid
		}).limit(1).get()
		if (isnew.data.length <= 0) {
			await  db.collection("users").add({
				unionid: res.data.unionid,
				openid: res.data.openid
			}).then(res => console.log(res))
			return [res.data]
		} else {
			return isnew.data
		}
	},
	async get_info(openid){
		let info = await db.collection("users").where({
			openid:openid
		}).limit(1).get()
		console.log(info.data)
		return info.data
	}

}
