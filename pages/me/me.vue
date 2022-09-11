<!-- 个人中心 -->
<template>
	<view style="overflow: hidden;">
		<navigator target="miniProgram" app-id="" version="release" hover-class="none">
			<view class="dong" @click="music()" v-show="ce">
				<view class="monster">
					<view class="monster__face">
						<view class="monster__eye avatar-eye avatar-eye--green eye--left">
							<view class="avatar-eye-pupil pupil--green">
								<span class="avatar-eye-pupil-blackThing">
									<span class="avatar-eye-pupil-lightReflection"></span>
								</span>
							</view>
						</view>
						<view class="monster__eye avatar-eye avatar-eye--violet eye--right">
							<view class="avatar-eye-pupil pupil--pink">
								<span class="avatar-eye-pupil-blackThing">
									<span class="avatar-eye-pupil-lightReflection"></span>
								</span>
							</view>
						</view>
						<view class="monster__noses">
							<view class="monster__nose"></view>
							<view class="monster__nose"></view>
						</view>
						<view class="monster__mouth">
							<view class="monster__top"></view>
							<view class="monster__bottom"></view>
						</view>
					</view>
				</view>
			</view>
		</navigator>
		<!-- 弹窗确认 -->
		<van-popup :show="modal" round @close="modal = false">
			<view class="popup">
				<view class="modal_bg"></view>
				<view class="modal_main">
					<view class="nav-list ">
						<view
							:class="'nav-li bg-zt' + (index + 1)"
							v-for="(item, index) in inter"
							:key="index"
							@click="switchImage(index, item.name)"
						>
							<view class="nav-name">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</van-popup>
		<!-- 顶部背景 -->
		<view
			class="UCenter-bg"
			:style="'background-image: url(' + pic[topBackGroupImageIndex].link + ');margin-top:' + CustomBar + 'px;'"
		>
			<view class="space" v-show="spaceShow">
				<view class="stars ">
					<view class="star "></view>
					<view class="star pink "></view>
					<view class="star blue "></view>
					<view class="star yellow "></view>
				</view>
			</view>

			<block>
				<view class="user" @click="login">
					<view class="cu-avatar2">
						<image
							style="border-radius: 100%;"
							:src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/logo.png'"
							:style="userInfo.avatarUrl ? '' : 'opacity:0.7;'"
						></image>
					</view>
					<view class="nick">
						<text>{{ userInfo.nickName ? userInfo.nickName : '你好，同学' }}</text>
					</view>
				</view>
			</block>

			<image
				src="https://cdn.nlark.com/yuque/0/2019/gif/280373/1570670848649-assets/web-upload/3dbaa72a-062b-470f-9b9d-058ff8f85ab8.gif"
				mode="scaleToFill"
				class="gif-wave"
			></image>
		</view>
		<view class="middel">
			<view class="mid_left" @click="login()">
				<text>{{ username ? '学号：' + username : '未登录' }}</text>
			</view>
			<view class="mid_right"><text>学校：宿州学院</text></view>
		</view>

		<view class="" style="margin-top: 60rpx;">
			<van-cell-group inset>
				<van-cell
					icon="https://user-assets.sxlcdn.com/images/1004139/FnE46QDB-QEXDLXTW6_H2m0HxeiG.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
					title="主题切换"
					:value="picName"
					@click="modal = !modal"
					is-link
				/>
				<van-cell
					icon="https://user-assets.sxlcdn.com/images/1004139/Fj3GCQtEVOo2mJ1iTuZdIRG5WvAy.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
					title="关于我们"
					is-link
					url="/pages/about/about"
				/>
				<van-cell
					icon="https://user-assets.sxlcdn.com/images/1004139/FlKPyzT87XH4ypmp3PuiJXMRpnMh.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
					title="重新登录"
					:value="userInfo ? '已登录' : '未登录'"
					is-link
					url="/pages/login/login"
				/>
				<button open-type="contact" style="padding: 0;box-shadow: 0; text-align: left;">
					<van-cell
						icon="https://user-assets.sxlcdn.com/images/1004139/Fpo0imQh7AYWDIhddZsTtzXjmzY-.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
						title="联系客服"
						is-link
						url="/pages/kefu/kefu"
					/>
				</button>
				<button open-type="share" style="padding: 0;box-shadow: 0; text-align: left;">
					<van-cell
						icon="https://user-assets.sxlcdn.com/images/1004139/FmunJLPgcDvyv6pGqsHFzErjQ-Q1.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
						title="分享小程序"
						is-link
					/>
				</button>
				<!-- 				<van-cell
					icon="https://user-assets.sxlcdn.com/images/1004139/FsDMqeXN7OaT5jniPzGsTPujhzpE.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
					title="关于我们" is-link /> -->
			</van-cell-group>
		</view>

		<view style="height: 110rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			// Custom: this.Custom,
			// CustomBar: this.CustomBar,
			spaceShow: true,
			modal: false,
			userInfo: '',
			ce: true,
			username: '',
			picName: '幽兰星空',
			pic: [
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg1.jpeg',
					name: '春天'
				},
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg2.jpeg',
					name: '夏天'
				},
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg3.jpeg',
					name: '秋天'
				},
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg4.jpeg',
					name: '冬天'
				},
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg5.jpeg',
					name: '幽静'
				},
				{
					link: 'https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg',
					name: '天空'
				}
			],
			topBackGroupImageIndex: 4,
			inter: [
				{
					title: 'mimicry',
					name: '活力春天',
					color: ''
				},
				{
					title: 'theme',
					name: '清爽夏日',
					color: ''
				},
				{
					title: 'theme',
					name: '金秋之韵',
					color: ''
				},
				{
					title: 'theme',
					name: '冬日之阳',
					color: ''
				},
				{
					title: 'theme',
					name: '幽兰星空',
					color: ''
				},
				{
					title: 'theme',
					name: '流星之夜',
					color: ''
				}
			]
		};
	},
	// 分享小程序
	onShareAppMessage(res) {
		return {
			title: '看看这个小程序～'
		};
	},
	watch: {
		topBackGroupImageIndex(val) {
			console.log(val);
			if (val == 4 || val == 5) {
				this.spaceShow = true;
			} else {
				this.spaceShow = false;
			}
		}
	},
	onShow() {
		let user = uni.getStorageSync('user');
		let meTem = uni.getStorageSync('meTem');
		this.userInfo = user.userInfo;
		this.username = user.username;
		this.topBackGroupImageIndex = meTem[0];
		this.picName = meTem[1];
	},
	methods: {
		switchImage(index, name) {
			this.topBackGroupImageIndex = index;
			this.picName = name;
			uni.setStorageSync('meTem', [index, name]);
			this.modal = false;
		},
		showModal(e) {
			this.modal = true;
			this.modalName = e.currentTarget.dataset.target;
		},

		hideModal(e) {
			this.modalName = null;
		},

		//音效
		music() {
			this.ce = false;
			uni.setInnerAudioOption({
				obeyMuteSwitch: false
			});

			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.obeyMuteSwitch = false;
			innerAudioContext.src = 'xxxxx';
			innerAudioContext.onPlay(() => {
				console.log('开始播放');
			});
			innerAudioContext.onError(res => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
			innerAudioContext.onEnded(res => {
				innerAudioContext.destroy();
				this.ce = true;
			});
		},
		login() {
			console.log(this.realName);
			if (!this.username) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.UCenter-bg {
	background: #fff;
	background-size: 100% 100%;
	/* background-size: cover; */
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg image {
	width: 140rpx;
	height: 140rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

// 头像
.cu-avatar2 {
	margin-bottom: 38rpx;
	padding: 0;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 150rpx;
	height: 150rpx;
	border-radius: 100%;
	z-index: 99;
	overflow: hidden;
}

.nick {
	font-weight: bold;
	font-size: 30rpx;
}

.name {
	text-shadow: 2px 2px 1px #2f9bfe;
}

.dialog2 {
	background: none;
}

.saicode {
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}

.img-big image {
	top: -40px;
	width: 280rpx;
	height: 280rpx;
}

.shadow-me {
	box-shadow: 0rpx 0rpx 100rpx 0rpx rgba(0, 0, 0, 0.1);
}

.tn-footerfixed {
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 1024;
	box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.35);
}
.popup {
	width: 650rpx;
	margin-top: 188rpx;
}

.modal_bg {
	width: 100%;
	height: 400rpx;
	position: absolute;
	top: -100rpx;
	background-image: url(https://zhoukaiwen.com/img/qdpz/modal_bg.png);
	background-size: 100%;
	background-repeat: no-repeat;
}

.modal_main {
	background-color: #ffffff;
}

/* 主题色 */

.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 30rpx;
	justify-content: space-between;
}

.nav-li {
	padding: 22upx;
	border-radius: 12upx;
	width: 25%;
	margin: 0 2.5% 40upx;
	background-image: url(../../static/me/NyU04x.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}
.middel {
	width: 100%;
	height: 158rpx;
	background-color: #fff;
	display: flex;
	font-size: 28rpx;
	.mid_left {
		height: 100%;
		width: 50%;
		position: relative;
		box-shadow: 0 5rpx 5rpx rgba(0, 0, 0, 0.1);
	}
	.mid_right {
		height: 100%;
		width: 50%;
		position: relative;
		box-shadow: 0 5rpx 5rpx rgba(0, 0, 0, 0.1);
	}
	text {
		line-height: 158rpx;
		margin-left: 28rpx;
	}
}
.mid_left::after {
	position: absolute;
	content: '';
	top: 20rpx;
	bottom: 30rpx;
	left: 20rpx;
	width: 100%;
	box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.16);
	transform: rotate(-6deg);
	z-index: -1;
}
.mid_right::after {
	position: absolute;
	content: '';
	top: 20rpx;
	bottom: 30rpx;
	left: 20rpx;
	width: 100%;
	box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.16);
	transform: rotate(6deg);
	z-index: -1;
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

// 好玩动态
.dong {
	z-index: 9999;
	position: fixed;
	top: -40px;
	right: -80px;
	transform: scale(0.24);
	-webkit-transform: scale(0.24);
	-moz-transform: scale(0.24);
}

.monster {
	transform: rotate(-50deg);
	-ms-transform: rotate(-50deg);
	/* IE 9 */
	-moz-transform: rotate(-50deg);
	/* Firefox */
	-webkit-transform: rotate(-50deg);
	/* Safari 和 Chrome */
	-o-transform: rotate(-50deg);
	/* Opera */
	display: flex;
	justify-content: center;
	position: relative;
	width: 170px;
	height: 400px;
	border-top-left-radius: 200px;
	border-top-right-radius: 200px;
	background-color: #3c47d7;
	box-shadow: 20px 20px 60px #4650e5;
}

.monster__face {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 14%;
	width: 75%;
	height: 160px;
}

.monster__noses {
	top: 50%;
	display: flex;
	justify-content: space-between;
	width: 28%;
	height: auto;
	margin-bottom: 10px;
}

.monster__nose {
	width: 8px;
	height: 12px;
	border-radius: 20px;
	background: rgba(0, 0, 0, 0.5);
	box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
}

.monster__mouth {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	height: 0%;
	overflow: hidden;
	border: 25px solid #ffc333;
	border-radius: 100px;
	background-color: #810332;
	animation: mouth 1.75s infinite;
	box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
}

.monster__mouth::before {
	content: '';
	position: absolute;
	width: 150px;
	height: 80px;
	border-radius: 100px;
	background-color: #400018;
}

.monster__mouth::after {
	content: '';
	position: absolute;
	bottom: -80px;
	width: 160px;
	height: 80px;
	border-top-left-radius: 50%;
	border-top-right-radius: 50%;
	background-color: #dc1b50;
	animation: tongue 1.75s infinite;
}

.monster__top {
	position: absolute;
	top: -30px;
	width: 170px;
	height: 30px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	background-color: #ffffff;
	z-index: 100;
	animation: t 1.75s infinite;
}

.monster__bottom {
	position: absolute;
	bottom: 0;
	width: 100px;
	height: 30px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background-color: #ffffff;
	z-index: 100;
	animation: b 1.75s infinite;
}

.avatar-eye {
	position: absolute;
	top: -10%;
	width: 65px;
	height: 65px;
	background: linear-gradient(105deg, white, #cb87f4);
	border-radius: 100%;
	box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
	margin: 3px;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}

.avatar-eye--green {
	background: linear-gradient(to bottom, #fdfdfd, #c3efea);
}

.avatar-eye--violet {
	background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
}

.eye--left {
	left: 10%;
}

.eye--right {
	left: 85%;
}

.eye--center {
	left: 45%;
	top: 10%;
}

.avatar-eye-pupil {
	position: absolute;
	width: 55%;
	height: 55%;
	left: 50%;
	top: 25%;
	-webkit-transform: translate(-50%);
	transform: translate(-50%);
	z-index: 100;
	border-radius: 100%;
}

.pupil--green {
	background: linear-gradient(135deg, rgba(188, 248, 177, 0.7), #2fa38c 75%);
}

.pupil--pink {
	background: linear-gradient(135deg, #f1a183, #8535cd);
}

.avatar-eye-pupil-blackThing {
	position: absolute;
	width: 55%;
	height: 55%;
	left: 50%;
	top: 25%;
	background: #2c2f32;
	-webkit-transform: translate(-50%);
	transform: translate(-50%);
	border-radius: 100%;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.avatar-eye-pupil-lightReflection {
	position: absolute;
	width: 7px;
	height: 7px;
	left: 25%;
	top: 10%;
	background: #ebebeb;
	-webkit-transform: translate(-50%);
	transform: translate(-50%);
	border-radius: 100%;
	box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
}

/**/
@keyframes t {
	0%,
	10%,
	80%,
	100% {
		top: -30px;
	}

	20% {
		top: 0px;
	}

	30% {
		top: -20px;
	}

	40% {
		top: -0px;
	}

	50% {
		top: -25px;
	}

	70% {
		top: 0px;
	}
}

@keyframes b {
	0%,
	10%,
	80%,
	100% {
		bottom: -30px;
	}

	20% {
		bottom: 0px;
	}

	30% {
		bottom: -20px;
	}

	40% {
		bottom: -0px;
	}

	50% {
		bottom: -25px;
	}

	70% {
		bottom: 0px;
	}
}

@keyframes mouth {
	0%,
	10%,
	100% {
		width: 100%;
		height: 0%;
	}

	15% {
		width: 90%;
		height: 30%;
	}

	20% {
		width: 50%;
		height: 70%;
	}

	25% {
		width: 70%;
		height: 70%;
	}

	30% {
		width: 80%;
		height: 60%;
	}

	35% {
		width: 60%;
		height: 70%;
	}

	40% {
		width: 55%;
		height: 75%;
	}

	45% {
		width: 50%;
		height: 90%;
	}

	50% {
		width: 40%;
		height: 70%;
	}

	55% {
		width: 70%;
		height: 95%;
	}

	60% {
		width: 40%;
		height: 50%;
	}

	65% {
		width: 100%;
		height: 60%;
	}

	70% {
		width: 100%;
		height: 70%;
	}

	75% {
		width: 90%;
		height: 70%;
	}

	80% {
		width: 50%;
		height: 70%;
	}

	85% {
		width: 90%;
		height: 50%;
	}

	85% {
		width: 40%;
		height: 70%;
	}

	90% {
		width: 90%;
		height: 30%;
	}

	95% {
		width: 100%;
		height: 10%;
	}
}

@keyframes tongue {
	0%,
	20%,
	100% {
		bottom: -80px;
	}

	30%,
	90% {
		bottom: -40px;
	}

	40% {
		bottom: -45px;
	}

	50% {
		bottom: -50px;
	}

	70% {
		bottom: -80px;
	}

	90% {
		bottom: -40px;
	}
}

// 顶部流星
.space {
	position: absolute;
	top: 0;
	left: 0;
}

.star {
	display: block;
	width: 5rpx;
	height: 5rpx;
	border-radius: 50%;
	background: #fff;
	top: 100rpx;
	left: 400rpx;
	position: relative;
	transform-origin: 100% 0;
	animation: star-ani 6s infinite ease-out;
	box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, 0.3);
	opacity: 0;
	z-index: 2;
}

.star:after {
	content: '';
	display: block;
	top: 0rpx;
	left: 4rpx;
	border: 0rpx solid #fff;
	border-width: 0rpx 90rpx 2rpx 90rpx;
	border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
	transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
	box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, 0.1);
	transform-origin: 0% 100%;
	animation: shooting-ani 3s infinite ease-out;
}

.pink {
	top: 30rpx;
	left: 395rpx;
	background: #ff5a99;
	animation-delay: 5s;
	-webkit-animation-delay: 5s;
	-moz-animation-delay: 5s;
}

.pink:after {
	border-color: transparent transparent transparent #ff5a99;
	animation-delay: 5s;
	-webkit-animation-delay: 5s;
	-moz-animation-delay: 5s;
}

.blue {
	top: 35rpx;
	left: 432rpx;
	background: cyan;
	animation-delay: 7s;
	-webkit-animation-delay: 7s;
	-moz-animation-delay: 7s;
}

.blue:after {
	/* border-color: transpareanimation-delay: 12s; */
	-webkit-animation-delay: 7s;
	-moz-animation-delay: 7s;
	animation-delay: 7s;
}

.yellow {
	top: 50rpx;
	left: 600rpx;
	background: #ffcd5c;
	animation-delay: 5.8s;
}

.yellow:after {
	border-color: transparent transparent transparent #ffcd5c;
	animation-delay: 5.8s;
}

@keyframes star-ani {
	0% {
		opacity: 0;
		transform: scale(0) rotate(0) translate3d(0, 0, 0);
		-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
	}

	50% {
		opacity: 1;
		transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		-webkit-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		-moz-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
	}

	100% {
		opacity: 0;
		transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		-webkit-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		-moz-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
	}
}
@media (prefers-color-scheme: dark) {
	.middel {
		background-color: #000;
	}
	.gif-wave {
		display: none;
	}
	.modal_main{
		background-color: #191919;
	}
	.mid_left::after  {
		box-shadow: 0 30rpx 20rpx rgba(105, 105, 105, 0.16);
	}
	.mid_right::after{
		box-shadow: 0 30rpx 20rpx rgba(105, 105, 105, 0.16);
	}
	/deep/.van-cell{
		background-color: #191919;
		color: #e5e5e5;
	}
	.modal_bg{
		background-image:none;
		background-color: #191919;
	}
}
</style>
