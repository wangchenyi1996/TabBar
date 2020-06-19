<template>
	<view>
		<view class="ends">flex 布局最后一行问题</view>
		<view class="wrap">
			<view class="item" v-for="i in images" :key="i">
				<image class="image" :src="i" mode="widthFix" />
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			images: [
				'/static/images/d.png',
				'/static/images/e.png',
				'/static/images/g.png',
				'/static/images/i.png',
				'/static/images/j.png',
				'/static/images/l.png',
				'/static/images/m.png',
				'/static/images/n.png',
				'/static/images/o.png',
				'/static/images/p.png',
			]
		}
	},
}
</script>
<style lang="scss">
	.ends {
		font-size: 40rpx;
		text-align: center;
		margin: 30rpx 0;
	}

	$padding: 20rpx;

	.wrap {
		height: 100%;
		width: 100%;
		background-color: green;

		padding: $padding;
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 33.33%;
			display: flex;
			margin-bottom: 30rpx;
			padding: 0 $padding;

			.image {
				height: 200rpx;
				width: 100%;
				// background-color: red;
				color: #FFFFFF;
			}
		}
	}
</style>
