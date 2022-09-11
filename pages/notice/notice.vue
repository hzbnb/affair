<template>
	<view class="main">
		<view class="title">
			<view>{{title}}</view>
			<text>数据来源：学校官网</text>
		</view>
			<rich-text selectable user-select  class="detail" :nodes="strings"></rich-text>
	</view>
</template>

<script>
	let opt = '';
	export default {
		data() {
			return {
				strings:'',
				title:'',
				
			}
		},
		onLoad(option) {
			console.log(option)
			opt = option.url
			uni.request({
				url:`https://www.ahszu.edu.cn/${option.url}`,
				success: (res) => {
					let reg = /<FONT color="red" size="4">([\s\S]*?)<\/FONT>[\s\S]*(<div class="v_news_content">[\s\S]*?)<\/div>\r\n\r/
					let regRes = res.data.match(reg)
					if(!regRes) return this. strings = res.data
					let strings = regRes[2]
					let newstrings= strings.replace(/style="text-indent: 0em;"/, 'style="text-indent: 0em;margin-bottom:10px;"')
					this. strings = newstrings
					this.title = regRes[1]
				}
			})
		},
		methods: {
			
		},
		onShareAppMessage(res) { // 发送给朋友
		    return {
				title: this.title,
				path: '/pages/notice/notice?url='+opt,
			}
		},
		onShareTimeline(res) { // 分享到朋友圈
		    return {
				title: this.title,
				path: '/pages/notice/notice?url='+opt,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		padding: 18rpx;
		box-sizing: border-box;
		min-width: 100%;
	}
	.title{
		padding: 20rpx 5rpx;
		font-size: 35rpx;
		letter-spacing: 3rpx;
		font-weight: bolder;
		position: relative;
		margin-bottom: 20rpx;
		text{
			font-size: 24rpx;
			font-weight: normal;
			letter-spacing: 0;
			position: absolute;
			color: #c7c7c7;
			right: 20rpx;
			bottom: -28rpx;
		}
	}
	.wai{
		min-width: 100%;
	}
	.detail{
		margin: 18rpx;
		font-size: 28rpx;
		min-width: 100%;
	}

</style>
