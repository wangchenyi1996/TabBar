import store from '../store/index.js'

// 网络监听
const netWork = {
	// 网络状态
	isConnect: false,
	// 监听网络状态
	On() {
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if (res.networkType !== 'none') {
					this.isConnect = true;
					store.commit('setNetStatus', true)
					return;
				}
				uni.showToast({
					icon: "none",
					title: '请先连接网络',
				});
			}
		})
		// 监听网络状态变化
		uni.onNetworkStatusChange((res) => {
			this.isConnect = res.isConnected;
			store.commit('setNetStatus', res.isConnected)
			if (!res.isConnected) {
				uni.showToast({
					icon: "none",
					title: '您目前处于断网状态',
				});
			}
		})
	}
}
export default {
	netWork
}
