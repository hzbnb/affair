<script>
export default {
	onLaunch: function() {
		const updateManager = uni.getUpdateManager();
		// 检查小程序是否有新版本发布
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
		});
		// 小程序有新版本，则静默下载新版本，做好更新准备
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，点击确定重新启动',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
			uni.showModal({
				title: '已经有新版本了哟~',
				content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
			});
		});
		
		let time = uni.getStorageSync('time')
		if(!time||time.thisdeltime < new Date().getTime()){
			uniCloud.database().collection('newtime').limit(1).get().then(res=>{
				let {_id,...time1} = res.result.data[0]
				uni.setStorageSync('time',time1)
			})
		}

		const openid = uni.getStorageSync('openid');
		if (!openid || openid=='') {
			const co = uniCloud.importObject('login');
			uni.login({
				success: async res => {
					let user={};
					let code = res.code;
					try {
						const res = await co.login(code);
						uni.setStorageSync('unionid', res[0].unionid);
						uni.setStorageSync('openid', res[0].openid);
						console.log(res)
						let { userInfo,username,bgimg } = res[0];
						if (userInfo == undefined) return;
						user.userInfo = userInfo;
						user.username = username
						if (bgimg == undefined) return uni.setStorageSync('user', user);
						user.bgimg = bgimg
						uni.setStorageSync('user', user);
					} catch (e) {
						console.log(e);
					}
				}
			});
		}

	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	globalData: {
		err: false
	}
};
</script>

<style>
page {
	/*每个页面公共css */
	background-color: #f8f8f8;
	height: 100%;
}
button::after {
	border: none;
}
@media (prefers-color-scheme: dark) {
	page {
		/*每个页面公共css */
		background-color: #191919;
	}
}
</style>
