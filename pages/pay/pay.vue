<template>
	<view>
		<key-words :show_key="show_key" :price="maqAllPrice" @closeFuc="closeFuc" @getPassword="getPassword"></key-words>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show_key: true,
				maqAllPrice:'123456'
			}
		},
		methods: {
			closeFuc() {
				 this.show_key = false;
			},
			getPassword(msg){
				console.log(msg);
			}
		},
	}
</script>