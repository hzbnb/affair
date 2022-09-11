<template>
	<view class="wai">
		<!-- 自定义导航 -->
		<view style="height: 100rpx;"></view>
		<view class="navbar">
			<view class="popup" @click="showtip = !showtip"><van-icon name="more-o" size="23" /></view>
			<view class="middel" @click="showpoint = !showpoint">
				<text>第 {{ week }} 周</text>
				<van-icon name="arrow-down" />
			</view>
		</view>

		<!-- 弹出 -->
		<view v-if="loading" class="loading">
			<van-loading color="#1989fa" size="24px">从教务系统获取数据中...</van-loading>
		</view>
		<van-popup :show="showtip" position="top" custom-style="height: 30%;" @close="showtip = false">
			<view class="pop_title">宿院速办</view>
			<view class="pop_list">
				<view class="pop_list_item" @click="getCourse()">
					<van-icon name="replay" size="33" />
					<text>刷新数据</text>
				</view>
				<view class="pop_list_item" @click="upimage()">
					<van-icon name="photo-o" size="33" />
					<text>自定义背景</text>
				</view>
				<view class="pop_list_item" @click="clearimg()">
					<van-icon name="close" size="33" />
					<text>删除背景</text>
				</view>
			</view>
		</van-popup>

		<!-- 课表小点点 -->
		<view class="main" :style="{ backgroundImage: 'url(' + bgimg + ')' }">
			<scroll-view
				:show-scrollbar="false"
				scroll-with-animation
				scroll-x
				v-show="showpoint"
				:scroll-into-view="`i${week}`"
				style=" white-space: nowrap;"
			>
				<view :id="`i${b + 3}`" @click="on_point(b + 1)" class="point_item" v-for="(a, b) of 20" :key="b">
					<view class="point_wai" :style="{ backgroundColor: b + 1 == week ? 'rgb(188,187,193)' : '' }">
						<text>第{{ b + 1 }}周</text>
						<view class="point">
							<view
								class="mipot"
								v-for="(c, d) of pointArr"
								:key="d"
								:style="{
									backgroundColor:
										((c[0][0] <= b + 1 && b + 1 <= c[0][1]) ||
											(c[0][2] <= b + 1 && b + 1 <= c[0][3])) &&
										(!c[2] || c[2] % 2 == (b + 1) % 2) &&
										c[1] == 2
											? 'rgb(56,201,153)'
											: ((c[0][0] <= b + 1 && b + 1 <= c[0][1]) ||
													(c[0][2] <= b + 1 && b + 1 <= c[0][3])) &&
											  (!c[2] || c[2] % 2 == (b + 1) % 2) &&
											  c[1] == 1
											? '#76B1E4'
											: '#d4d4d4'
								}"
							></view>
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 星期栏 week -->
			<view class="week">
				<view>
					<text>{{ dates(1).split('/')[0] }}</text>
					<text>月</text>
				</view>
				<view v-for="(w, index) of weeks" :key="index" class="week_date">
					<text>{{ w }}</text>
					<text style="color: #999999; font-size: 21rpx; ">{{ dates(index + 1) }}</text>
				</view>
			</view>

			<!-- 课表 -->
			<swiper style="height: 95%; " @change="move" circular :current="current">
				<swiper-item v-for="(a, i) of 3" :key="i">
					<view class="schedule">
						<view class="left">
							<view v-for="(item, index) of courseTime" :key="index">
								<text v-show="index != 4" style="font-size: 25rpx;">
									{{ index < 4 ? index + 1 : index }}
								</text>
								<text style="color: #999999;font-size: 17rpx;">{{ item }}</text>
							</view>
						</view>
						<!-- 主要课表 -->
						<view v-show="week <= delweek" class="right">
							<view
								@click="show_info(course)"
								class="sch_main"
								v-for="(course, index) of courses"
								:key="index"
								:style="{
									top: isNaN(course[5][0])
										? 4 * 9 + '%'
										: (course[5][0] < 4 ? course[5][0] - 1 : course[5][0]) * 9 + '%',
									left: ((course[4] - 1) * 94) / 7 + '%',
									height: isNaN(course[5][0])?'9%':(course[5][1] - course[5][0] + 1) * 9 + '%'
								}"
								v-show="
									((course[2][0] <= week && week <= course[2][1]) ||
										(course[2][2] <= week && week <= course[2][3])) &&
										(!course[3] || course[3] % 2 == week % 2)
								"
							>
								<view :style="{ backgroundColor: colorArrays[index % 20],alignItems: (isNaN(course[5][0])||!course[5][1])?'flex-start':'center' }">
									<text style="margin: 2rpx;">{{ course[0] }}@{{ course[6] }}</text>
								</view>
							</view>
							<view v-show="week > delweek && courses.length" class="delweek">
								<text>放假了，出去玩吧！</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
const { nor_date } = require('../../static/js/time.js');
const { mixins } = require('../../static/js/mixin.js');
const db = uniCloud.database();
let user = uni.getStorageSync('user');
let gweek;
export default {
	data() {
		return {
			showpoint: false,
			showtip: false,
			current: 0,
			week: 0,
			delweek: 0,
			courses: [],
			bgimg: '',
			weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			pointArr: [],
			courseTime: ['8:05','9:00','10:05','11:00','中午','14:40','15:35','16:30','17:25','19:00','19:55'],
			tipShow: false,
			colorArrays: []
		};
	},
	mixins: [mixins],
	mounted() {
		this.getweek();
		this.bgimg = user.bgimg;
		let colorArr = [
			'#99CCFF',
			'#FFCC99',
			'#FFCCCC',
			'#CC6699',
			'#99CCCC',
			'#FF6666',
			'#CCCC66',
			'#66CC99',
			'#FF9966',
			'#66CCCC',
			'#6699CC',
			'#99CC99',
			'#669966',
			'#99CC99',
			'#99CCCC',
			'#66CCFF',
			'#CCCCFF',
			'#99CC66',
			'#CCCC99',
			'#FF9999'
		];
		this.colorArrays = colorArr.sort(function(a, b) {
			return 0.5 - Math.random();
		});
		if (this.courses.length) this.get_del();
	},
	methods: {
		show_point() {
			this.showpoint = !this.showpoint;
		},
		show_info(e) {
			uni.showToast({
				title: `教师：${e[1]}\r\n地点：${e[6]}`,
				icon: 'none',
				duration: 2800
			});
		},
		move(e) {
			if (!this.current) {
				if (e.detail.current == 1) {
					this.week < 20 ? this.week++ : (this.week = 1);
				} else {
					this.week > 1 ? this.week-- : (this.week = 20);
				}
			}
			if (this.current) {
				if (e.detail.current - this.current == -1) {
					this.week > 1 ? this.week-- : (this.week = 20);
				} else {
					this.week < 20 ? this.week++ : (this.week = 1);
				}
			}
			this.current = e.detail.current;
		},
		on_point(e) {
			// console.log(this.week, e);
			this.week = e;
		},
		getweek() {
			let time = uni.getStorageSync('time');
			if(!time.firstday){
				uniCloud.database().collection('newtime').limit(1).get().then(res=>{
					let {_id,...time1} = res.result.data[0]
					uni.setStorageSync('time',time1)
				})
			}
			let week = parseInt((new Date().getTime() - time.firstday) / (1000 * 60 * 60 * 24 * 7) + 1);
			this.week = week;
			gweek = week;
		},
		dates(e) {
			let date = new Date();
			let xq = date.getDay();
			let date1 = date.getTime() - (gweek - this.week) * (1000 * 60 * 60 * 24 * 7);
			if (e > xq) {
				date1 += (e - xq) * 1000 * 60 * 60 * 24;
			} else if (e < xq) {
				date1 += (xq - e) * 1000 * 60 * 60 * 24;
			}
			let date2 = new Date(date1);
			return nor_date(date2);
		},

		get_del() {
			let pointArr = new Array(35).fill('');
			let delweek = 0;
			for (let c of this.courses) {
				if (delweek < parseInt(c[2].slice(-1)[0])) {
					delweek = parseInt(c[2].slice(-1)[0]);
				}
				if (!isNaN(c[5][0])) {
					pointArr[(((c[5][0] % 2 == 0 ? c[5][0] - 1 : c[5][0]) - 1) / 2) * 7 + c[4] - 1] = [
						c[2],
						c[5].length,
						c[3]
					];
				}
			}
			this.pointArr = pointArr;
			this.delweek = delweek;
		},
		clearimg() {
			this.bgimg = '';
			uniCloud.callFunction({
				name: 'delbgimg',
				data: {
					bgimg: user.bgimg
				},
				success: res => {
					console.log(res);
					user.bgimg = '';
					uni.setStorageSync('user', user);
					uni.showToast({
						title: '成功'
					});
					this.showtip = false;
				}
			});
		},
		upimage() {
			//前端代码
			uni.chooseImage({
				count: 1,
				success: res => {
					console.log(res);
					if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0];
						if (res.tempFiles[0].size > 5120000) {
							uni.showToast({
								title: '只能上传大小为5m以下的哦~',
								icon: 'none'
							});
							return;
						}
						// 图片压缩
						uni.showLoading({
							title:'上传中...',
						})
						uni.compressImage({
							src: filePath,
							quality: 80,
							success: async res => {
								console.log(res.tempFilePath);
								//进行上传操作
								const result = await uniCloud.uploadFile({
									filePath: res.tempFilePath,
									cloudPath: new Date().getTime() + '.jpg',
									onUploadProgress: function(progressEvent) {
										console.log(progressEvent);
										var percentCompleted = Math.round(
											(progressEvent.loaded * 100) / progressEvent.total
										);
									}
								});
								if (result.success) {
									db.collection('users')
										.where({ openid: uni.getStorageSync('openid') })
										.update({
											bgimg: result.fileID
										})
										.then(res => {
											if (user.bgimg) {
												uniCloud.callFunction({
													name: 'delbgimg',
													data: {
														bgimg: user.bgimg
													},
													success: res => {
														console.log(res);
													}
												});
											}
											user.bgimg = result.fileID;
											uni.setStorageSync('user', user);
											this.bgimg = result.fileID;
											this.showtip = false;
											uni.showToast({
												title: '设置成功'
											});
										});
								}
							}
						});
					}
				}
			});
		},

		show_login() {
			uni.showModal({
				title: '请先登录',
				content: '登录后我们才能获取到您的课表哦~',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		}
		// 下拉框方法
	}
};
</script>

<style lang="scss" scoped>
.wai {
	height: 100%;
	background-size: cover;
}
.main {
	height: 89%;
	overflow: hidden;
	background-size: cover;
}
.loading {
	width: 100%;
	position: fixed;
	bottom: 18%;
	z-index: 88;
	text-align: center;
}
/* 自定义导航栏 */
.navbar {
	height: 65rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-size: 28rpx;
}
.popup {
	position: absolute;
	left: 30rpx;
	margin-bottom: 10rpx;
	z-index: 888;
}
.pop_title {
	display: flex;
	justify-content: center;
	margin-top: 108rpx;
	font-size: 32rpx;
	letter-spacing: 2rpx;
}
.pop_list {
	display: flex;
	flex-wrap: wrap;
	padding: 58rpx 28rpx;
	.pop_list_item {
		height: 138rpx;
		display: flex;
		flex-direction: column;
		margin-right: 50rpx;
		justify-content: space-around;
		font-size: 28rpx;
	}
}

/* 下拉小圆点 */

.point_item {
	display: inline-block;
	width: 130rpx;
	height: 128rpx;
	padding: 0 5rpx;
	.point_wai {
		display: flex;
		padding: 6rpx 0;
		border-radius: 20rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		text {
			margin-bottom: 5rpx;
		}
		.point {
			width: 105rpx;
			height: 75rpx;
			display: flex;
			flex-flow: wrap;
			position: relative;
			.mipot {
				height: 13rpx;
				width: 13rpx;
				margin: 1%;
				border-radius: 100%;
			}
		}
	}
}

/* 星期周几 */
.week {
	display: flex;
	font-size: 24rpx;
	height: 5%;
}

.week_date {
	width: calc(94% / 7);
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.week > view:first-child {
	display: flex;
	flex-direction: column;
	width: 6%;
	align-items: center;
}

/* 整个课表 */
.schedule {
	display: flex;
	width: 100%;
	height: 100%;
	background-size: cover;
	/* background-image: url(''); */
}

/* 课表背景图片 */
.backimg {
	position: absolute;
	top: 200rpx;
}

/* 课表左侧 */
.left {
	width: 6%;
	height: 100%;
}

.left > view {
	display: flex;
	flex-direction: column;
	height: 9%;
	justify-content: center;
	align-items: center;
	font-size: 20rpx;
}

/* 课表右侧 */
.right {
	display: flex;
	flex-shrink: 0;
	width: 100%;
	position: relative;
	font-weight: bolder;
}

.sch_main {
	position: absolute;
	width: 14%;
	color: white;
	font-size: 23rpx;
	padding: 2rpx 6rpx;
	word-break: break-word;
	box-sizing: border-box;
	overflow: hidden;
}
.sch_main > view {
	width: 100%;
	height: 100%;
	border-radius: 18rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.delweek {
	width: 100%;
	line-height: 600rpx;
	text-align: center;
	font-size: 50rpx;
	color: #76c26b;
}
.ce {
	background-image: url('https://ts3.cn.mm.bing.net/th?id=OIP-C.8olSEek1RZjSQDgPizhxEAHaJ3&w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2');
}

@media (prefers-color-scheme: dark) {
	/deep/.van-popup{
		background-color: #000;
	}
}
</style>
