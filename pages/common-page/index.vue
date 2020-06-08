<template>
	<view style="height: 100%;">
		我是首页
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import scrollCard from "@/components/scrollCard.vue"
	export default {
		computed: {
			...mapState({
				themeColor:'themeColor',
				textColor:'textColor',
				descTextColor:"descTextColor",
				bannerDotColor:'bannerDotColor',
				bannerDotActiveColor:"bannerDotActiveColor",
				articles:'articles'
			})
		},
		components:{
			scrollCard
		},
		data() {
			return {
				cardCur: 0,
			};
		},
		methods:{
			jump_detail(id){
				uni.navigateTo({
					url:'../home/detail?id='+id
				})
			}
		},
		created() {
			console.log("created")
		 
		}
	}
</script>

<style lang="less">

</style>
