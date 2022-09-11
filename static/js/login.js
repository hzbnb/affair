const {
	code
} = require('./code.js')

function login(username, password) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'xxxxxx',
			method: 'GET',
			success: res => {
				console.log(res)
				if (res.statusCode != 200) return
				let {
					my_cookie,
					...obj
				} = res.data
				obj.username = username
				obj.password = password
				let params = code(obj)
				uni.request({
					url: 'xxxxxx',
					data: {
						"cookie": my_cookie,
						"data": params
					},
					method: 'POST',
					success: res => {
						uni.setStorageSync('cookie', my_cookie)
						resolve(res)
						return res
					}
				})
			},
			fail: err => {
				reject(err)
				uni.showToast({
					title: '发生致命错误，请联系管理员',
					icon: 'error'
				})
			}
		});
	})
}


module.exports = {
	login
}
