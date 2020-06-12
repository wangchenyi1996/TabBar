<template>
	<view class="u-f cu-progress round sm striped" :class="active?'active':''" :style="{width:widths+'upx'}">
		<view class="bg-green" :style="[{ width:loading ? loadWidth : ''}]">{{ percent2 }}%</view>
	</view>
</template>

<script>
	export default {
		props: {
			loadWidth: {
				type: [Number,String],
			},
			widths: {
				type: Number,
				default: 0
			},
			percent2: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				loading:true,
				active: false
			}
		},
		created() {
			console.log('我是进度条');
		}
	}
</script>

<style>
	.cu-progress{
		position: absolute;
		bottom: 4rpx;
	}
</style>
