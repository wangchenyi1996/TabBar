<template>
	<view>
		<button type="default" @click="goPage('citys')">城市示例</button>
		<button type="default" @click="goPage('address-list')">通讯录示例</button>
		<button type="default" @click="goPage('webview')">webview</button>
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
		uni.onNetworkStatusChange((res) => {
			this.isOnline = res.isConnected
		})
	},
	methods: {
		goPage(str) {
			uni.navigateTo({
				url: `/pages/${str}/${str}`
			});
		}
	}
};
</script>

<style lang="scss"></style>
