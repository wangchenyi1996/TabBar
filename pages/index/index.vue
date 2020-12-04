<template>
	<view>
		<button type="default" @click="goPage('home')">首页tabbar</button>
		<button type="default" @click="goPage('red_bag')">发红包</button>
		<button type="default" @click="goPage('citys')">城市示例</button>
		<button type="default" @click="goPage('address-list')">通讯录示例</button>
		<button type="default" @click="goPage('webview')">webview</button>
		<button type="default" @click="goPage('luck')">canvas 转盘抽奖</button>
		<button type="default" @click="goPage('reg')">滑动验证</button>
		<button type="default" @click="goPage('card')">卡片滑动</button>
		<button type="default" @click="goPage('swiper')">滚动渐变的顶部导航栏</button>
		<view style="font-size: 20px;font-weight: bold;">实时监测网络状态</view>
		<!-- <text style="font-size: 20px;font-weight: bold;color: red;">{{ status ? '有网络' : '无网络' }}</text> -->
		<text style="font-size: 20px;font-weight: bold;color: red;">{{ isOnline ? '有网络2' : '无网络2' }}</text>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			isOnline: true
		};
	},
	computed: {
		...mapState({
			status: state => state.netStatus
		})
	},
	onLoad() {
		uni.onNetworkStatusChange(res => {
			this.isOnline = res.isConnected;
		});
	},
	methods: {
		goPage(str) {
			// if (str === 'home') {
			// 	uni.switchTab({
			// 		url: `/pages/${str}/${str}`
			// 	});
			// 	return;
			// }
			uni.navigateTo({
				url: `/pages/${str}/${str}`
			});
		}
	}
};
</script>

<style lang="scss"></style>
