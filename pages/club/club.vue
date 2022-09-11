<template>
	<view class="content">
		<view class="block" v-for="(arr, index) of arrs" :key="index">
			<view class="title">{{ arr.title }}</view>
			<view class="list">
				<view class="list_item" v-for="(list, ind) of arr.lists" :key="ind" @click="showqq(list)">
					<img :src="list.img" alt="" srcset="" />
					<text>{{ list.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
export default {
	data() {
		return {
			arrs: []
		};
	},
	methods: {
		showqq(e) {
			console.log(e);
			uni.showModal({
				content: 'QQ群：' + e.qq,
				confirmText: '复制群号',
				success: res => {
					if (res.confirm) {
						uni.setClipboardData({
							data: e.qq, //要被复制的内容
							success: () => {
								//复制成功的回调函数
								uni.showToast({
									//提示
									title: '复制成功',
									duration:1000
								});
							}
						});
					}
				}
			});
		}
	},
	onLoad() {
		uni.showLoading();
		db.collection('club')
			.get()
			.then(res => {
				this.arrs = res.result.data;
				uni.hideLoading();
			});
	}
};
</script>

<style lang="scss">
.content {
	width: 100%;
	min-height: 100%;
	padding: 18rpx;
	box-sizing: border-box;
}
.block {
	.title {
		font-size: 32rpx;
		letter-spacing: 3rpx;
		font-weight: bolder;
		padding: 20rpx 0;
	}
	.list {
		padding: 10rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
}
.list_item {
	width: 23%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx 0;
	img {
		width: 88rpx;
		height: 88rpx;
		border-radius: 100%;
	}
	text {
		width: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28rpx;
		text-align: center;
	}
}
</style>
