<template>
	<view class="mainBox bg-white">
		<view class="top" style="position: relative;">
			<text
				@click="goBack"
				class="cuIcon-back"
				style="position: absolute; left: 40rpx;top: 100rpx;color: #000000;"
			></text>
			<image class="logoImg" :src="avatar?avatar:'/static/logo.png'"></image>
			<view class="logoName text-white text-bold text-xl">{{ nickName ? nickName : '宿院速办' }}</view>
		</view>

		<view class="center">
			<view class="center_box ">
				<view style=" height: 88rpx;"></view>
				<van-cell-group>
					<van-field
						:model:value="username"
						label="账号："
						placeholder="请输入教务系统的账号(学号)"
						clearable
						@change="username = $event.mp.detail"
					/>
					<van-field
						:model:value="password"
						label="密码："
						password
						placeholder="请输入教务系统的密码"
						clearable
						@change="password = $event.mp.detail"
					/>
				</van-cell-group>

				<!-- 声明 -->
				<view class="shen_title">
					<image
						class="about"
						src="https://user-assets.sxlcdn.com/images/1004139/Fu0U1Y9JVrFxOd7exACNAUOdubUq.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
					/>
					使用帮助
				</view>
				<view class="des">1. 账号密码是教务系统的账号密码(账号一般为学号)</view>
				<view class="des">
					2. 忘记密码请到教务系统
					<text @click="copy_add" style="color: #1E63E4;">http://211.86.128.194/suzxyjw</text>
					找回密码
				</view>
				<view class="des">3. 大一新生的初始密码为身份证号后六位</view>
				<view class="des">4. 本系统仅支持宿州学院使用</view>
				<!-- 提交按钮 -->
				<view class="sub_real">
					<van-button
						custom-style="width: 300rpx;"
						round
						size="normal"
						color="linear-gradient(to right, #4bb0ff, #6149f6)"
						@click="login()"
					>
						确认登录
					</van-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const { login } = require('../../static/js/login.js');
const db = uniCloud.database();
export default {
	data() {
		return {
			username: '',
			password: '',
			nickName: '',
			avatar: ''
		};
	},
	mounted() {
		let user = uni.getStorageSync('user')
		this.username = user.username
		this.nickName = user.userInfo.nickName
		this.avatar = user.userInfo.avatarUrl
	},
	methods: {
		async login() {
			if (!this.username || !this.password) {
				uni.showToast({
					title: '账号密码不能为空',
					icon: 'none'
				});
				return;
			}
			uni.showLoading();
			let res = await login(this.username, this.password);
			if (res.data.status == 200) {
				uni.showToast({
					title: '教务系统登录成功',
					icon: 'none',
				});
				setTimeout(function() {uni.showLoading()}, 1500);
				let userinfo = await this.getUserProfile();
				if (userinfo.userInfo) {
					let { nickName, avatarUrl } = userinfo.userInfo;
					let data = {
						userInfo: {
							nickName,
							avatarUrl
						},
						username: this.username,
						password: this.password
					};
					db.collection('users')
						.where({
							openid: uni.getStorageSync('openid')
						})
						.update(data)
						.then(res => {
							console.log(res);
							uni.setStorageSync('user', {
								userInfo: {
									nickName,
									avatarUrl
								},
								username: this.username
							});
							uni.getStorage({
								key: 'courses',
								success: function (res) {
									console.log(res.data)
									if(res.data){
										uni.hideLoading()
										uni.showModal({
											title:'提示',
											content:"切换用户的话存在旧数据，要点课表页左上角刷新数据，从而获取最新数据",
											complete: (res) => {
												uni.navigateBack();
												return
											}
										})
									}
								}
							});
							uni.navigateBack();
						});
				}
			} else if (res.data.status == 401) {
				uni.showToast({
					title: '十分罕见验证码错误，请重新登录下',
					icon: 'none'
				});
				return;
			} else {
				uni.showToast({
					title: res.data.message,
					icon: 'none'
				});
				return;
			}
		},
		getUserProfile() {
			var that = this;
			return new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: '获取您的微信信息以授权小程序',
					success: userRes => {
						console.log('getUserProfile-res', userRes);
						resolve(userRes);
					},
					fail: userErr => {
						uni.showToast({
							title: '授权失败',
							icon: 'error'
						});
						console.log('getUserProfile-err', userErr);
						reject(userErr);
					}
				});
			});
		},

		copy_add() {
			uni.setClipboardData({
				data: 'http://211.86.128.194/suzxyjw', //要被复制的内容
				success: () => {
					//复制成功的回调函数
					uni.showToast({
						//提示
						title: '已复制地址,快去浏览器打开吧',
						icon: 'none'
					});
				}
			});
		}
	},
	onShow() {}
};
</script>

<style lang="scss" scoped>
.mainBox {
	background: url(https://cdn.zhoukaiwen.com/login_top2.jpg);
	background-size: 100%;
	background-repeat: no-repeat;
	background-color: #fff;
	height: 100vh;

	.top {
		height: 470rpx;
		position: relative;
		z-index: 0;
	}

	.logoImg {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		margin-left: -70rpx;
		top: 170rpx;
		display: block;
	}

	.logoName {
		width: 750rpx;
		position: absolute;
		left: 0;
		top: 340rpx;
		text-align: center;
	}
}

.center {
	display: flex;
	justify-content: center;

	.center_box {
		width: 90%;
		height: 900rpx;
		overflow: hidden;
		border-radius: 35px;
		background: #fff;
		box-shadow: -8px 8px 16px #295766, 8px -8px 16px #a3ffff;

		.van-button--block {
			margin: 10rpx;
		}
	}
}

.bottom_bg {
	width: 750rpx;
	position: fixed;
	bottom: 0;

	image {
		width: 750rpx;
	}
}

// copy 之前
.shen_title {
	color: #191919;
	margin-top: 88rpx;
	font-size: 32rpx;
	letter-spacing: 2rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 20rpx;
}

.shen_title image {
	width: 32rpx;
	height: 32rpx;
	padding-right: 10rpx;
}

.des {
	padding-left: 30rpx;
	padding-top: 18rpx;
	font-size: 26rpx;
	color: #acacac;
	letter-spacing: 2rpx;
	line-height: 38rpx;
}

.sub_real {
	position: absolute;
	bottom: 288rpx;
	width: 100%;
	left: 0;
	
	
}

.sub_real van-button {
	display: flex;
	justify-content: center;
}

</style>
