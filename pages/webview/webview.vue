<template>
	<web-view :src="url" @message="getMessage"></web-view>
</template>

<script>
export default {
	data() {
		return {
			url: 'http://192.168.1.156:8080/#/'
		};
	},
	methods: {
		getMessage(evt) {
			// console.log('接收到的消息：',evt.detail.data);
			let { type, action } = evt.detail.data[0]
			// console.log(type,action);
			if(type === 'back'){
				uni.showToast({
					title:'我要返回了',
					duration:800,
					icon:'success',
					success: () => {
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},800)
					}
				})
			}
		}
	}
};
</script>
