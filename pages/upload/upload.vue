<template>
	<view class="my-upload u-f u-f-ac">
		<uploadOneImg :widths="w1" :heights="w1" 
		@getUPImg="getImg1" :isDel="isDel" @deleteImg="deleteImg1"
		:isMutiImgs="true">
			<view slot="imgs" class="imgs u-f u-f-ajc">
				<text class="cuIcon-add u-f u-f-ajc"></text>
			</view>
		</uploadOneImg>
	</view>
</template>

<script>
	import uploadOneImg from '@/components/upload-imgs/uploadImg.vue'
	export default {
		components: {
			uploadOneImg
		},
		data() {
			return {
				w1: 200,
				h1: 200,
				isDel:true
			}
		},
		methods: {
			getImg1(data){
				// console.log('图片数组：',data);
			},
			deleteImg1(idx){
				console.log(idx);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #FFFFFF;
	}
	.my-upload{
		padding: 30rpx 0;
		background-color: #f9f9f9;
		.imgs{
			width:200rpx;
			height:200rpx;
			background:#efefef;
			border-radius:8upx;
			margin-bottom: 20rpx;
			color: #bfbfbf;
			text{
				font-size: 100rpx;
			}
		}
	}
	
</style>
