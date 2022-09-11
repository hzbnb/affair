const {login} = require('./login.js')

export const mixins = {
	
	data() {
		return {
			courses: [],
			loading:false,
		};
	},

	onShow() {
		if (!this.courses.length&&!getApp().globalData.err) {
			let courses = uni.getStorageSync('courses');
			let delTime = uni.getStorageSync('delTime');
			let time = uni.getStorageSync('time');
			if(new Date().getTime()>delTime || new Date().getTime()>time.schdeltime) {
				this.get_cookie()
				return
			}
			if (courses) {
				this.courses = courses;
			} else if(!courses) {
				let cookie = uni.getStorageSync('cookie');
				if (cookie) this.getCourse()
				else this.get_cookie();
			}
		}
	},
	methods: {
		async get_cookie() {
			this.loading = true
			let openid = uni.getStorageSync('openid')
			if(!openid) {
				this.loading = false
				return 
			}
			const co = uniCloud.importObject('login');
			const res = await co.get_info(openid);
			let {username,password} = res[0]
			if(!username&&!password){
				// 已登录
				this.loading = false
				if(this.show_login) this.show_login()
			}else{
				// 登录 获取cookie
				let res = await login(username,password)
				if (res.data.status == 200) this.getCourse()
			}
		},
		getCourse() {
			this.loading = true
			let cookie = uni.getStorageSync('cookie')
			uni.request({
				url: 'XXXX',
				data: {
					"cookie":cookie
				},
				method: 'POST',
				success: res => {
					let courses = res.data;
					console.log("res.data",res.data)
					if(courses == "kong"){
						this.get_cookie()
						return
					}
					if(courses.length){
						courses.forEach(item => {
							item[2] = item[2].split(/[-,]/);
							switch (item[3]) {
								case '(单)':
									item[3] = 1;
									break;
								case '(双)':
									item[3] = 2;
									break;
								default:
									item[3] = '';
							}
							item[5] = item[5].split('-');
							switch (item[4]) {
								case '一':
									item[4] = 1;
									break;
								case '二':
									item[4] = 2;
									break;
								case '三':
									item[4] = 3;
									break;
								case '四':
									item[4] = 4;
									break;
								case '五':
									item[4] = 5;
									break;
								case '六':
									item[4] = 6;
									break;
								case '七':
									item[4] = 7;
									break;
								default:
									item[4] = ''; // 如果没有与表达式相同的值，则执行该代码
							}
						});
						this.courses = courses;
						uni.setStorageSync('courses', courses);
						let delTime = new Date().getTime() + 30*24*60*60*1000
						uni.setStorageSync('delTime', delTime);
						if(this.get_del) {this.get_del()}
						if(this.getcour) {this.getcour()}
						console.log('this.get_login',this.get_login)
						if(this.get_login) {this.get_login()}
						this.loading = false
					}else{
						uni.showModal({
							title:'获取失败',
							content:'请检测您教务系统是否有课表',
						})
						getApp().globalData.err=true
						console.log(getApp().globalData)
						return
					}
				},
				complete: () => {
					this.loading =false
				}
			});
		},

	},
};
