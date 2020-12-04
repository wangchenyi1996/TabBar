<template>
	<view>
		<view class="title" :class="topNavStyle.class" :style="topNavStyle.style">
			<view class="flex_grow flex_col flex_center tab">
				<view v-for="(item,index) in topNavArr" :key="index"
				 :class="{ 'active':topNavIndex==index }" 
				 :data-index="index" @tap="changeTopNav">{{item}}</view>
			</view>
		</view>
		<card-swiper></card-swiper>
		<view style="height: 600px;">
			<view style="padding-top: 50rpx;text-align: center;">向上滚动查看标题栏渐变效果</view>
		</view>
	</view>
</template>

<script>
	import cardSwiper from "@/components/helang-cardSwiper/helang-cardSwiper"
	export default {
		data() {
			return {
				topNavIndex:0,
				topNavArr:['推荐2','热门2','新作2'],
				pageScrollTop:0,	// 页面滚动距离
			}
		},
		components:{
			cardSwiper
		},
		computed:{
			topNavStyle(){
				let r = this.pageScrollTop  / 100;
				return {
					"class":r>=0.85?'style2':'',
					"style":`background-color: rgba(66, 185, 131,${r>=1?1:r});`
				}
			}
		},
		// 页面滚动监听
		onPageScroll(e){
			this.pageScrollTop = Math.floor(e.scrollTop);
		},
		methods: {
			// 顶部导航改变 
			changeTopNav(e){
				this.topNavIndex = e.currentTarget.dataset.index
			}
		}
	}
</script>

<style lang="scss">
	@import "common/style/global.scss";
	
	page{
		background-color: #fff;
	}
	/* 标题栏 */
	.title{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		padding-top: var(--status-bar-height);
		z-index: 10;
		background-color: rgba(66,185,131,0);
		color: rgba(255,255,255,0.8);
		
		.tab{
			height: 44px;
			&>view{
				margin: 0 30rpx;
				line-height: 64rpx;
				font-size: 36rpx;
				position: relative;
				letter-spacing: 0;
				transition: transform 0.3s ease-in-out 0s;
				transform: scale(1,1);
				
				&.active{
					color: rgba(255,255,255,1);
					transform: scale(1.15,1.15);
				}
			}
		}
		
		&.style2{
			color: #FFF;
			background-color: rgba(66, 185, 131,1);
			
			.tab{
				&>view{
					&.active{
						color: #FFF;
					}
				}
			}
		}
	}

</style>