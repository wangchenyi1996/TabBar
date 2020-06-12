<template>
	<!-- 测试上传单张、多张图片。上传、预览、删除 -->
	<view class="uni-uploader">
		<view class="uni-uploader-body" style="margin: 0;" v-if="isMutiImgs">
			<view class="uni-uploader__files u-f u-f-wrap u-f-ac" style="margin-left: 40rpx;">
				<template v-if="imageURL.length>0">
					<view class="img-muti" v-for="(item,index) in imageURL" :key="index">
						<image :style="{width:widths+'upx',height:heights+'upx'}" style="border-radius:8upx;" :src="imageURL[index]"
						 :data-src="imageURL[index]" @tap="previewImage"></image>
						<text v-if="isDel" class="cuIcon-close closes" @tap.stop="DelImg" :data-index="index"></text>
						<!-- 进度条 -->
						<!-- {{keys}}--{{progress[index]}}--{{progress}} -->
						<block v-if="keys===progress[index]">
							<Process 
								:widths="widths"
								:loadWidth="loadWidth"
								:percent2="percent2"
							/>
						</block>
					</view>
				</template>
				<view @tap="chooseImage">
					<slot name="imgs"></slot>
				</view>
			</view>
		</view>
		<view class="uni-uploader-body" style="margin: 0;" v-if="!isMutiImgs">
			<view class="uni-uploader__files">
				<template v-if="imageURL.length>0">
					<view style="position: relative;margin-right:20upx;" v-for="(item,index) in imageURL" :key="index">
						<image :style="{width:widths+'upx',height:heights+'upx'}" style="border-radius:8upx;" :src="imageURL[index]"
						 :data-src="imageURL[index]" @tap="previewImage"></image>
						<text v-if="isDel" class="cuIcon-close closes" @tap.stop="DelImg" :data-index="index"></text>
						<block v-if="showLoad">
							<Process
								:widths="widths"
								:loadWidth="loadWidth"
								:percent2="percent2"
							/>
						</block>
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
	import {
		pathToBase64
	} from '../../util/base64IMG.js'
	import { Decimal } from '../../util/decimal/decimal.js';
	import Process from '@/components/upload-imgs/progress.vue'
	export default {
		data() {
			return {
				imageURL: [],
				loadWidth:0,
				percent:0,
				percent2:0,
				intervalId:null,
				showLoad:true,
				progress:[],
				keys:0
			}
		},
		components: {
			Process
		},
		props: {
			isDel: {
				type: Boolean,
				default: false
			},
			imgWH: {
				type: Number,
				default: 1
			},
			widths: {
				type: Number
			},
			heights: {
				type: Number
			},
			imgurl: {
				type: String,
				default: ''
			},
			mutiimgurl: {
				type: Array,
				default: () => []
			},
			isMutiImgs: {
				type: Boolean,
				default: false
			},
			isAnimation:{
				type: Boolean,
				default: false
			}
		},

		mounted() {
			// 编辑图片需要用到
			if (!this.isMutiImgs && this.imgurl != '') {
				this.imageURL = [this.imgurl]
				console.log('父组件传来的数据：', this.imgurl);
				return;
			}
			if (this.isMutiImgs && this.mutiimgurl.length > 0) {
				this.imageURL = this.mutiimgurl
				console.log('父组件传来的数据：', this.mutiimgurl);
				return;
			}
		},
		methods: {
			//选择上传图片
			chooseImage() {
				if (!this.isMutiImgs) {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera '], //从相册选择
						success: async res => {
							this.imageURL = res.tempFilePaths;
							this.intervalId = setInterval(()=>{
								if(this.percent==1){
									setTimeout(()=>{
										this.showLoad=false
										this.resetValue()
									},1000)
									// 停止计时
									clearInterval(this.intervalId)
								}else{
									this.percent = new Decimal(this.percent).add(new Decimal(0.1)).toNumber()
									this.percent2 = this.percent*100
									this.loadWidth = (this.widths*this.percent) + 'upx'
								}
							},100)
							uni.showLoading({
								title: '上传中...',
								mask: true
							});
							try {
								let base64 = await pathToBase64(this.imageURL[0])
								this.$emit('getUPImg', base64)
								uni.hideLoading()
							} catch (e) {
								uni.hideLoading()
								uni.showToast({
									title: '上传出错了',
									icon: 'none'
								});
							}
						}
					});
					return;
				}
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera '], //从相册选择
					success: res => {
						this.imageURL = this.imageURL.concat(res.tempFilePaths);
						if(res.tempFilePaths.length===1){
							// 每次上传一张图片
							this.progress = this.progress.concat(this.keys)
						}else{
							// 每次选择多张图片
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								this.progress.push(this.keys)
							}
						}
						this.intervalId = setInterval(()=>{
							if(this.percent==1){
								setTimeout(()=>{
									this.resetValue()
								},1000)
								// 停止计时
								clearInterval(this.intervalId)
							}else{
								this.percent = new Decimal(this.percent).add(new Decimal(0.1)).toNumber()
								this.percent2 = this.percent*100
								this.loadWidth = (this.widths*this.percent) + 'upx'
								// console.log('loadWidth:',this.loadWidth);
								// console.log('percent:',this.percent);
							}
						},100)
						uni.showLoading({
							title: '上传中...',
							mask: true
						});
						this.$emit('getUPImg', this.imageURL)
						uni.hideLoading()
					}
				});
				this.keys++
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
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							// #ifdef APP-PLUS
							this.imageURL.splice(e.currentTarget.dataset.index, 1)
							// #endif
							this.$emit('deleteImg', e.currentTarget.dataset.index)
							this.imageURL.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 重置操作
			resetValue(){
				this.keys++
				this.percent=0
				this.percent2=0
				this.loadWidth = 0
				// this.showLoad = false
			}
		}
	}
</script>

<style scoped>
	.closes {
		font-size: 50rpx;
		font-weight: bold;
		color: red;
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: -25rpx;
		right: -25rpx;
	}
	.img-muti{
		position: relative;
		margin-right:30upx;
		margin-bottom: 20rpx;
	}
</style>
