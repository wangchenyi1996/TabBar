<template>
	<view class="wrap">
		<view class="item" v-for="i in 11" :key="i">
			<view class="image">flex 布局最后一行问题</view>
		</view>
	</view>
</template>

<script>
	
</script>
<style lang="scss">
$padding: 20rpx;
.wrap{
	height: 100%;
	width: 100%;
	background-color: green;
	
	padding: $padding;
	display: flex;
	flex-wrap: wrap;
	.item{
		width: 33.33%;
		display: flex;
		margin-bottom: 30rpx;
		padding: 0 $padding;
		.image{
			height: 200rpx;
			width: 100%;
			background-color: red;
			color: #FFFFFF;
		}
	}
}
</style>
