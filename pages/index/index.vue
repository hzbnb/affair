<template>
	<view class="content">
		<view v-if="loading" class="loading">
			<van-loading color="#1989fa" size="24px">从教务系统获取数据中...</van-loading>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="head"><text>宿院速办</text></view>
		<view class="main">
			<view class="top">
				<navigator url="/pages/club/club" class="ability">
						<text>社团大全</text>
						<img
							src="https://user-assets.sxlcdn.com/images/1004139/Frj_doWYV6XAzsrbebVx5s6ZvvSk.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
							alt=""
						/>
				</navigator>
				<navigator url="/pages/map/map" class="ability" >
					<text>校园导航</text>
					<img
						src="https://user-assets.sxlcdn.com/images/1004139/Fm72zGrnENgUKBIOmABDM6tepJGm.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
						alt=""
					/>
				</navigator>
				<navigator url="/pages/about/about" class="ability" >
					<text>关于我们</text>
					<img
						src="https://user-assets.sxlcdn.com/images/1004139/Fmbv_zkegXXZNeoBlQ5EvmkRftzJ.png?imageMogr2/strip/auto-orient/thumbnail/130x130%3E/format/png"
						alt=""
					/>
				</navigator>
			</view>
			<view class="title">今日课表</view>
			<view class="center">
				<view class="center_top">
					<text>{{ newtime() }}</text>
					<text v-if="todayCour.length">今天一共{{ todayCour.length }}节课</text>
					<text>第{{ week }}周</text>
				</view>
				<view class="schedule">
					<view
						@click="show_info(item)"
						class="schedule_item"
						v-for="(item, index) in todayCour"
						:key="index"
					>
						<text>{{ schtime(item[5]) }}</text>
						<text>{{ item[0] }}</text>
						<text>教师：{{ item[1] }}</text>
					</view>
					<view v-if="!todayCour.length&&islogin" class="nosch">
						<text> 今天没有课，出去玩吧~ </text>
					</view>
					<view v-if="!islogin" class="nosch">
						<text> 还没有登录哦~ </text>
					</view>
				</view>
			</view>
			<view class="title">学校通知</view>
			<navigator
				:url="'/pages/notice/notice?url=' + `${item[1]}`"
				v-for="(item, index) in notices"
				:key="index"
				class="notice"
			>
				<text>{{ item[2] }}</text>
				<text>{{ item[0] }}</text>
			</navigator>
			<view class="bottom">默认显示前20条，后续会补充更多的~</view>
		</view>
	</view>
</template>

<script>
const { mixins } = require('../../static/js/mixin.js');
const { nor_date } = require('../../static/js/time.js');
export default {
	data() {
		return {
			todayCour: [],
			week: 0,
			notices: [],
			islogin:false,
		};
	},
	mixins: [mixins],
	 mounted() {
		this.getnotice();
	},
	onShow() {
		this.getweek();
		this.getcour();
		this.get_login();
	},
	methods: {
		async getweek() {
			let time = uni.getStorageSync('time');
			if(!time.firstday){
			 	let res = await uniCloud.database().collection('newtime').limit(1).get()
					let {_id,...time1} = res.result.data[0]
					uni.setStorageSync('time',time1)
					let week = parseInt((new Date().getTime() - time1.firstday) / (1000 * 60 * 60 * 24 * 7) + 1);
					this.week = week;
					return
			}
			let week = parseInt((new Date().getTime() - time.firstday) / (1000 * 60 * 60 * 24 * 7) + 1);
			this.week = week;
		},
		getcour() {
			let arr = [];
			this.courses.forEach(item => {
				let week = this.week;
				let isout =
					item[4] == new Date().getDay() &&
					((item[2][0] <= week && week <= item[2][1]) || (item[2][2] <= week && week <= item[2][3])) &&
					(!item[3] || item[3] % 2 == week % 2);
				if (isout) {
					arr.push(item);
				}
			});
			this.todayCour = arr;
		},
		getnotice() {
			let arr = [];
			uni.request({
				url: 'https://www.ahszu.edu.cn/xxxw/tzgg.htm',
				success: async res => {
					let reg = /style="list-style: none;"><IMG.*?<A title="(.*?)"\shref="\.\.\/(.*?)"[\s\S]*?\(<FON[\s\S]*?>(.*?)</g;
					for (let s of res.data.matchAll(reg)) {
						arr.push([s[1], s[2], s[3]]);
					}
					this.notices = arr;
				}
			});
		},
		schtime(e) {
			let arr = ['8:05', '9:00', '10:05', '11:00', '14:40', '15:35', '16:30', '17:25', '19:00', '19:55'];
			if (isNaN(e[0])) {
				return '中午';
			}
			if (e[0] < 5) {
				let res = arr[e[0] * 1 - 1];
				return '上午 ' + res;
			} else if (4< e[0]&& e[0] <9) {
				let res = arr[e[0] * 1 - 1];
				return '下午 ' + res;
			} else if (8 < e[0]) {
				let res = arr[e[0] * 1 - 1];
				return '晚上 ' + res;
			}
		},
		show_info(e) {
			uni.showToast({
				title: `教师：${e[1]}\r\n地点：${e[6]}`,
				icon: 'none',
				duration: 2800
			});
		},
		get_login(){
			console.log('get_loginget_loginget_loginget_loginget_loginget_loginget_loginget_loginget_login')
			uni.getStorage({
				key:'user',
				success: (res) => {
					if(res.data.username){
					this.islogin = true
					}
				}
			})
		},
		newtime() {
			let arr = ['日', '一', '二', '三', '四', '五', '六'];
			let date = new Date();
			let riqi = nor_date(date.getTime()).replace(/\//, '.');
			let xq = arr[date.getDay()];
			return `${riqi} | 周${xq}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	font-size: 28rpx;
	background-image: linear-gradient(208deg, #f3e7e9 10%, #e3eeff 20%, #f8f8f8 50%);
}
.loading {
	width: 100%;
	position: fixed;
	bottom: 18%;
	z-index: 88;
	text-align: center;
}
.head {
	height: 100rpx;
	font-size: 38rpx;
	font-weight: bold;
	margin-left: 38rpx;
	letter-spacing: 5rpx;
}
.main {
	padding: 0 18rpx;
}
.top {
	display: flex;
	justify-content: space-between;

	.ability {
		width: 31%;
		color: #191919;
		height: 268rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		border-radius: 28rpx;
		font-size: 28rpx;
		font-weight: bolder;
		letter-spacing: 4rpx;
		box-shadow: 9rpx 9rpx 10rpx #818181;
		&:nth-child(1) {
			background-color: #fcefe9;
		}
		&:nth-child(2) {
			background-color: #f0fdf5;
		}
		&:nth-child(3) {
			background-color: #ffe0ff;
		}
		img {
			height: 158rpx;
			width: 158rpx;
		}
		text {
			margin-top: 30rpx;
		}
	}
}
.center {
	min-height: 300rpx;
	padding-top: 10rpx;
	border-radius: 38rpx;
	box-shadow: #ccc 8rpx 8rpx 8rpx;
	color: #191919;
	background-image: linear-gradient(0deg, #fcefe9 20%, #f8f8f8 100%);
	.schedule {
		padding: 38rpx 18rpx;
		.schedule_item {
			color: #002fa7;
			padding: 13rpx;
			font-size: 30rpx;
			margin: 5rpx 0;
			text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				&:first-child {
					margin-right: 28rpx;
				}
				&:nth-child(2) {
					position: absolute;
					left: 218rpx;
					width: 35%;
				}
				&:last-child {
					position: absolute;
					left: 490rpx;
					width: 30%;
				}
			}
		}
	}
}
.center_top {
	padding: 2rpx 10rpx;
	text {
		margin: 0 28rpx;
		&:last-child {
			position: absolute;
			right: 18rpx;
		}
	}
}

.title {
	padding: 50rpx 35rpx 38rpx 35rpx;
	font-size: 32rpx;
	font-weight: bolder;
	letter-spacing: 3rpx;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		left: 13rpx;
		background-color: #2eeaf4;
		width: 12rpx;
		height: 33%;
		bottom: 37rpx;
		border-radius: 10rpx;
	}
}
.notice {
	padding: 28rpx;
	margin: 10rpx 0;
	border-radius: 38rpx;
	border: #e3eeff solid 3rpx;
	box-shadow: #ccc 5rpx 5rpx 10rpx;
	text {
		&:first-child {
			color: #70b1ff;
			margin-right: 28rpx;
		}
	}
}
.nosch{
	height: 158rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 32rpx;
	font-weight: bolder;
	color: #5576a7;
}
.bottom {
	text-align: center;
	height: 128rpx;
	line-height: 128rpx;
	color: #8d949e;
	font-size: 26rpx;
}

@media (prefers-color-scheme: dark) {
	.content {
		background-image: none;
		background-color: #191919;
	}
	.ability{
		box-shadow: 9rpx 9rpx 10rpx #2b2b2b;
	}
	.notice {
		box-shadow: #2b2b2b 5rpx 5rpx 10rpx;
		border: #63686f solid 3rpx;
	}
	.center {
		box-shadow: #2b2b2b 8rpx 8rpx 8rpx;
	}
	.notice {
		text {
			&:first-child {
				color: #ffe5fd;
			}
		}
	}
}
</style>
