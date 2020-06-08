<template>
	<view class="navTabBox">
		<!-- 标题数量小于5 -->
		<view class="shortTab" v-if="tabTitle.length<=5">
			<!-- 导航栏 -->
			<view class='navTab'>
				<view v-for="(item,index) in tabTitle" :key="index" class='navTabItem' :class="index===tabClick?'click':''" @click='navClick(index)'>{{item}}</view>
			</view>
			<!-- 下划线 -->
			<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
				<view class="underline"></view>
			</view>
		</view>
		<!-- 标题数量大于5 开启长导航栏模式 -->
		<view class="longTab" v-if="tabTitle.length>5">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation :scroll-into-view="toView">
				<view class="longItem" :data-index="index" :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index)">{{item}}</view>
				<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);"'>
					<view class="underline"></view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			tabTitle: {
				type: Array,
				default: ()=>[]
			}

		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				toView:'',
				isLongWidth:0
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					that.isWidth = e.windowWidth / that.tabTitle.length //宽度除以导航标题个数=一个导航所占宽度
					that.isLongWidth = e.windowWidth / 5 
				}
			})
			this.toView = 'id0'
		},
		methods: {
			// 导航栏点击
			navClick(index) {
				// this.$parent.currentTab = index 
				this.$emit('changeTab', index);//设置swiper的第几页
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
			},
			longClick(index){
				    var tempIndex = index - 2
					tempIndex = tempIndex<=0 ? 0 : tempIndex 
					this.toView = `id${tempIndex}` //动画滚动,滚动至中心位置
					this.tabClick = index //设置导航点击了哪一个
					this.isLeft = index * this.isLongWidth //设置下划线位置
					this.$emit('changeTab', index);//设置swiper的第几页
					// this.$parent.currentTab = index //设置swiper的第几页
			}
		}
	}
</script>

<style lang="scss">
	.navTabBox {
		width: 100vw;
		color: rgba(255, 255, 255, 0.50);
		.click {
			color: white;
		}
		.longTab {
			width: 100%;
			.longItem{
				width:20vw; 
				height: 90upx; 
				display: inline-block;
				line-height: 90upx;
				text-align: center;
			}
			.underlineBox {
				height: 3px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;
				.underline {
					width: 84upx;
					height: 4px;
					background-color: white;
				}
			}
		}
		.shortTab {
			width: 100%;
			.navTab {
				display: flex;
				width: 100%;
				height: 90upx;
				position: relative;
				.navTabItem {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					font-size: 28upx;
				}
			}
			.underlineBox {
				height: 3px;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;
				.underline {
					width: 84upx;
					height: 3px;
					background-color: white;
				}
			}
		}
	}
</style>
