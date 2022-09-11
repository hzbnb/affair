<template>
	<view class="body">
		<map
			id="map"
			class="map"
			enable-3D
			scale="17"
			@tap="tapMap"
			:layer-style="theme"
			show-compass
			subkey="5K7BZ-V34C5-N7XIS-Q372Z-42JWS-E6FQ2"
			enable-building
			@updated="init"
			show-location
			:enable-satellite="star"
			:latitude="latitude"
			:longitude="longitude"
			:markers="covers"
		></map>
		<view class="fly" @click="star = !star">
			<img src="../../static/other/starmap.gif" class="img" />
			<text class="info">卫星图</text>
		</view>
		<view class="text">宿州学院（邮编：234099）</view>
		<view class="text">东校区：安徽省宿州市埇桥区教育园区学府大道1769号</view>
		<view class="text">西校区：安徽省宿州市埇桥区汴河中路49号</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			latitude: 33.6310109011955,
			longitude: 117.07670503753323,
			star: false,
			covers: [
				{
					id: 2,
					latitude: 33.63283752595397,
					longitude: 117.07819696322667,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '逸夫楼A',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 3,
					latitude: 33.63238407206598,
					longitude: 117.07810855036814,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '逸夫楼B',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 4,
					latitude: 33.631879378360125,
					longitude: 117.07776225189173,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '教学楼B',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 5,
					latitude: 33.63129921173987,
					longitude: 117.07793440447654,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '教学楼A',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 6,
					latitude: 33.63103352192954,
					longitude: 117.07623604246396,
					height: 1,
					width: 1,
					joinCluster:true,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '图书馆',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 7,
					latitude: 33.630158253930354,
					longitude: 117.07569118538606,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '实训楼C',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 8,
					latitude: 33.629824932928706,
					longitude: 117.07485608540458,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '实训楼B',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 33,
					latitude: 33.629173192996575,
					longitude: 117.07564543096112,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '实训楼A',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 9,
					latitude: 33.637054857125875,
					longitude: 117.0784239454307,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男10号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 11,
					latitude: 33.635923637314185,
					longitude: 117.0759600796033,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女1号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 12,
					latitude: 33.63552008533485,
					longitude: 117.07583893935737,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女2号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 13,
					latitude: 33.635136632628935,
					longitude: 117.07579051150867,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女3号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 14,
					latitude: 33.63470280689554,
					longitude: 117.075717798808,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女4号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 15,
					latitude: 33.63412858366253,
					longitude: 117.07548577363423,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女11号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 16,
					latitude: 33.634490575151545,
					longitude: 117.07522260151973,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '创客空间',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 17,
					latitude: 33.63032017638699,
					longitude: 117.0777245634697,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '实验楼A楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 18,
					latitude: 33.62993805715455,
					longitude: 117.07757965300209,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '实验楼B楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 19,
					latitude: 33.62926575972275,
					longitude: 117.07784223191743,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '工科类A楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 20,
					latitude: 33.628821292381666,
					longitude: 117.07779796577813,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '工科类B楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 21,
					latitude: 33.62894703605681,
					longitude: 117.07726101527976,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '工科类C楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 22,
					latitude: 33.63360315140327,
					longitude: 117.07397440889758,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女13号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 23,
					latitude: 33.633075986002524,
					longitude: 117.07389267640588,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女14号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 24,
					latitude: 33.6325907959744,
					longitude: 117.0737919170673,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '女15号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 25,
					latitude: 33.6374100753359,
					longitude: 117.07872079293406,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男9号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 26,
					latitude: 33.63694530354812,
					longitude: 117.07747638220235,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男7号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 27,
					latitude: 33.63731865665272,
					longitude: 117.07746726759103,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男8号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 28,
					latitude: 33.63739449784657,
					longitude: 117.0764421206477,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男6号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 29,
					latitude: 33.63704991065433,
					longitude: 117.07638903568284,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男5号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 30,
					latitude: 33.633351907730066,
					longitude: 117.07521031967576,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '音乐学院',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 31,
					latitude: 33.63279673184864,
					longitude: 117.07514110443253,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '美术学院',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 32,
					latitude: 33.636667406536354,
					longitude: 117.07991750589326,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '体育馆',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				},
				{
					id: 10,
					latitude: 33.63662624003365,
					longitude: 117.07852690847551,
					height: 1,
					width: 1,
					iconPath: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
					callout: {
						content: '男12号楼',
						display: 'ALWAYS',
						bgColor: '#fff',
						padding: 2,
						color: '#00138C',
						borderWidth: 2,
						borderRadius: 3
					}
				}
			],

			theme: 1
		};
	},
	methods: {
		tapMap(e) {
			// console.log(e.detail);
		},
		init() {
			let sys = uni.getSystemInfoSync();
			if (sys.theme == 'light') this.theme = 1;
			else if (sys.theme == 'dark') this.theme = 2;
		}
	}
};
</script>

<style scoped>
.body {
	height: 100%;
}
.map {
	width: 100%;
	height: 80%;
}
.text {
	font-size: 28rpx;
	padding: 28rpx 0 0 28rpx;
}
.fly {
	position: relative;
}
.img {
	position: absolute;
	height: 88rpx;
	width: 88rpx;
	right: 18rpx;
	bottom: 188rpx;
}
.info {
	position: absolute;
	color: #191919;
	right: 30rpx;
	bottom: 188rpx;
	font-size: 22rpx;
	font-weight: bolder;
}
.showme {
	position: absolute;
	height: 80rpx;
	width: 80rpx;
	right: 18rpx;
	bottom: 88rpx;
	background-color: #4799d0;
	opacity: 0.6;
	font-size: 28rpx;
	text-align: center;
	letter-spacing: 4rpx;
}
</style>
