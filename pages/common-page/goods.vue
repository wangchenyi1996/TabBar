<template>
	<view>
		我是产品中心页面
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	 
	export default {
		data() {
			return {
				TabCur: 0,
			};
		},
		components: {},
		computed: {
			...mapState({
				themeColor: 'themeColor',
				textColor: 'textColor',
				descTextColor: "descTextColor",
				bannerDotColor: 'bannerDotColor',
				bannerDotActiveColor: "bannerDotActiveColor",
				articles: 'articles'
			})
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				uni.showToast({
					title:`切换到了 TAB${this.TabCur}`,
					icon:'none'
				})
			},
			jump_detail(id){
				uni.navigateTo({
					url:'../home/detail?id='+id
				})
			},
			 
			
		},
		mounted() {
			console.log('mounted')
			
		}
	}
</script>

<style lang="less">
 
	.nav {
		.cu-item {
			 
			.tab-text{
				height: 43px;
			}
			.tab-bottom-line {
				width: 0%;
				height: 2px;
				background-color: #0081FF;
				transition-duration: 0.3s;
			}
			.tab-bottom-line-box{
				display: flex;
				justify-content: center;
			}
		}
		.cu-item.current{
			.tab-bottom-line {
				width: 100%;
			 
			}
		}

		
	}
</style>
