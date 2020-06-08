<template>
	<view style="min-height:100vh;background-color: #F1F1F1;">
		我是新闻中心页面
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				isCard: false
			};
		},
		computed:{
			...mapState({
				textColor:'textColor',
				descTextColor:'descTextColor',
				articles:'articles',
			})
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style>

</style>
