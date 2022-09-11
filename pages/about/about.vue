<template>
	<view class="container page">
		<view class="content">
			<view class="version">
				<view class="version-title">
					<text class="title-name">宿院速办</text>
					<!-- <text class="version-text">{{version}}</text> -->
				</view>
			</view>
			<view class="describe">
				<text class="desc-title">简介</text>
				<text class="desc-content" style="text-indent:2em;">
					“宿院速办”是“宿院速帮”旗下一款面向宿州学院的非学校官方微信小程序，致力于帮助我们学校师生更方便的查询教务信息，以及浏览学校通知等功能。
				</text>
				<text class="desc-content" style="text-indent:2em;">
					“宿院速帮”目前以宿州学院为试点高校，致力探索更加便捷的校园生活方式，也欢迎志同道合的朋友与我们一起打造校园生态，我们将有一系列新的功能正在我们的开发计划中。“你想要的，都在这里！”
				</text>
				<text class="desc-content" style="text-indent:2em;">我们保证信息安全，不会获取任何个人信息。</text>
				<text class="desc-title">数据来源</text>
				<text class="desc-content">
					* 课表、成绩等数据来自教务处官网；\r\n* 前端代码来自GitHub各位大佬的开源代码；\r\n* 学校通知、校历来自于学院官方网站；
				</text>
				<text class="desc-title">开发贡献</text>
				<view class="avatarGroup">
					<view class="oneAvatar" v-for="(item, index) of coder" :key="index">
						<view class="userinfo-avatar">
							<image :src="item.avatar" style="width:110rpx;height:110rpx;"></image>
						</view>
						<view class="coperatorName">{{ item.nickName }}</view>
					</view>
				</view>
				<button class="weui-btn" type="primary" plain="true" open-type="contact">联系我们</button>
			</view>
		</view>

		<view class="footer">
			<view class="footer-beingshawn"></view>
			<text>宿院速帮</text>
			<text>Copyright @ 2022</text>
		</view>
		<view style="height: 58rpx;"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			coder: [],
		};
	},
	onLoad() {
		uniCloud.callFunction({
			name:'about',
			success: (res) => {
				this.coder = res.result
			}
		})
	},
	methods: {}
};
</script>

<style scoped>


.container {
	padding: 0;
	font-size: 11pt;
}

.content {
	flex: 1;
}

.version {
	border-radius: 20rpx;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	padding: 0 45rpx;
	box-sizing: border-box;
	font-size: 13pt;
	color: #666;
	border-bottom: 1px #e5e5e5 solid;
}

.version-title {
	flex: 1;
	display: flex;
	align-items: center;
}

.title-name {
	padding-right: 10rpx;
}

.version-text {
	font-size: 10pt;
	line-height: 100%;
	color: #7acfa6;
	border: 1px solid #7acfa6;
	padding: 5rpx 10rpx;
	border-radius: 5rpx;
	margin-left: 10rpx;
	text-align: center;
}

.version-log-link {
	position: relative;
	font-size: 12pt;
	color: #7acfa6;
}

.version-log-link:active {
	opacity: 0.8;
}

.describe {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 45rpx 30rpx;
	display: flex;
	flex-flow: column nowrap;
	color: #545454;
	line-height: 175%;
	background: #fff;
	margin-top: 15rpx;
	border-top: 1px #e5e5e5 solid;
	border-bottom: 1px #e5e5e5 solid;
	border-radius: 25rpx;
}
.coperatorName{
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.desc-title {
	display: flex;
	font-size: 13pt;
	line-height: 200%;
	margin-bottom: 15rpx;
}

.desc-v {
	flex: 1;
}




.desc-content {
	padding-bottom: 15rpx;
}

.footer {
	display: flex;
	flex-direction: column;
	font-size: 9pt;
	line-height: 150%;
	text-align: center;
	margin-bottom: 15rpx;
	color: #c2c2c2;
}

.footer-beingshawn {
	font-size: 10pt;
	height: 10pt;
	line-height: 10pt;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8rpx;
}

.footer-beingshawn image {
	width: 10pt;
	height: 10pt;
	margin-right: 5rpx;
}

.userinfo-avatar {
	border-radius: 50rpx;
	clip-path: circle(50% at center);
	width: 110rpx;
	height: 110rpx;
	box-shadow: 5rpx 5rpx 15rpx #ccc;
}

.avatarGroup {
	margin-bottom: 15rpx;
	min-height: 158rpx;
}

.oneAvatar {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	float: left;
	width: 20%;
	height: 170rpx;
	font-size: 26rpx;
}

.button-sp-area {
	padding: 30rpx 35rpx;
}

button[type='primary'][plain] {
	color: #fff;
	width: 58%;
	border: 1px solid #96deda;
	background-image: linear-gradient(-45deg, #7acfa6 0%, #7acfa6 50%);
	border-radius: 50px;
}

.button-hover[type='primary'][plain] {
	color: #fff;
	border-color: #96deda;
	opacity: 0.6;
}


@media (prefers-color-scheme: dark) {
	.version{
		background-color: #000;
		border-bottom: 1px #5e5e5e solid;
		color: #c2c2c2;
	}
	.describe{
		background-color: #000;
		border-top: 1px #5e5e5e solid;
		border-bottom: 1px #5e5e5e solid;
		color: #c2c2c2;
	}
}


</style>
