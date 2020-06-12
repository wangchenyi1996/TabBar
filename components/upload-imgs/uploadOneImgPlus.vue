<template>
	<!-- 测试上传单张图片。上传、预览、删除 -->
	<view class="uni-uploader">
		<view class="uni-uploader-body" style="margin: 0;">
			<view class="uni-uploader__files">
				<template v-if="imageURL.length>0">
					<view style="position: relative;margin: 0;">
						<template>
							<image :style="{width:widths+'upx',height:heights+'upx'}" style="border-radius:8upx;" :src="imageURL[0]"
							 :data-src="imageURL[0]" @tap="previewImage"></image>
						</template>
						<image v-if="isDel"
						src="http://lc-3resYveE.cn-n1.lcfile.com/625ef9f2f019b0cf32f6/clear.png"
						style="width: 50upx;height: 50upx;position: absolute;top: -25upx;right: -25upx;" 
						@tap.stop="DelImg"></image>
					</view>
				</template>
				<template v-if="imageURL.length==0">
					<view @tap="chooseImage">
						<slot name="imgs"></slot>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {pathToBase64} from '../../util/base64IMG.js'
	export default {
		data() {
			return {
				imageURL:[]
			}
		},
		props:{
			isDel:{
				type: Boolean,
				default: false
			},
			imgWH:{
				type: Number,
				default: 1
			},
			widths:{
				type: Number
			},
			heights:{
				type: Number
			},
			imgurl:{
				type: String,
				default: ''
			}
		},
		mounted(){
			if(this.imgurl !=''){
				this.imageURL=[this.imgurl]
				console.log('父组件传递的图片uri:',this.imageURL[0]);
			}
		},
		methods:{
			//选择上传图片
			chooseImage(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera '], //从相册选择
				    success: async res => {
						this.imageURL = res.tempFilePaths;
						uni.showLoading({
							title: '上传中...',
							mask: true
						});
						try{
							let base64 =await pathToBase64(this.imageURL[0])
							this.$emit('getUPImg',base64)
							uni.hideLoading()
						}catch(e){
							uni.hideLoading()
							uni.showToast({
								title: '上传出错了',
								icon:'none'
							});
						}
				    }
				});
			},
			//预览图片
			previewImage(e) {
				var current = e.target.dataset.src
				let urls = this.imageURL
				uni.previewImage({
					current,
					urls
				})
			},
			// 删除
			DelImg() {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imageURL.splice(0, 1)
							this.$emit('deleteImg')
						}
					}
				})
			}
		}
	}
</script>

