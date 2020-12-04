<template>
	<view>
		<view :style="{height:statusBarHeight}"></view>
		<view style="height: 101upx;">点击按钮出现效果</view>
		<view class="boxbox">
			<view class="fasong" @tap="verifyFasong">{{sin==0?'发送验证码':(sin+'s后重新发送')}}</view>
		</view>
		<tfgg-verify @result='verifyResult' ref="verifyElement"></tfgg-verify>
	</view>
</template>

<script>
	var this_;
	var intv;
	import tfggVerify from "@/components/tfgg-verify/tfgg-verify.vue";
	export default {
		components: {
			"tfgg-verify":tfggVerify
		},
		data() {
			return {
				sin:0,
				statusBarHeight:'',//状态栏高度
			}
		},
		onLoad(e) {
			this_ = this;
			uni.getSystemInfo({
				success: res=>{
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		onUnload() {
			if(intv){
				clearInterval(intv);
			}
		},
		onReady() {
			this.$refs.verifyElement.show();
		},
		methods: {
			/* 校验结果回调函数 */
			verifyResult(res){
				if(res){
					this.$refs.verifyElement.reset();//校验成功重置插件
				}
				console.log(res);
			},
			verifyFasong(){
				if(this.sin>0){
					return;
				}
				this.$refs.verifyElement.show();
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();
			},
		}
	}
</script>

<style>
	.boxbox{
		width:726upx;
		border:2upx solid rgba(249,149,7,1);
		border-radius:22upx;
		padding: 16upx 0;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}
	.neiBox{
		width:689upx;
		margin: 0 auto;
		background:rgba(40,15,83,0.45);
		border-radius:24upx;
	}
	.inputBox{
		width: 515upx;
		height: 100upx;
		margin: 24upx auto 0;
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid rgba(250,251,253,1);
	}
	.tubiao{
		height: 47upx;
		width: 47upx;
		margin-right: 45upx;
		flex-shrink: 0;
	}
	.inputPlaceholder{
		font-size:24upx;
		font-weight:400;
		color:rgba(252,249,249,0.26);
	}
	input{
		width: 100%;
		font-size:24upx;
		font-weight:400;
		color:rgba(252,249,249,0.26);
	}
	.zhuce{
		width:260upx;
		height:61upx;
		margin: 25upx 0;
		display: block;
	}
	.yiyou{
		width:100%;
		font-size:26upx;
		font-weight:400;
		text-decoration:underline;
		color:rgba(84,100,225,1);
		text-align: center;
		padding-bottom: 44upx;
	}
	.fasong{
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		padding: 0 25upx;
		font-size: 24upx;
		color: #fff;
		border-radius: 50upx;
		height: 44upx;
		line-height: 44upx;
		background-color: #2c1863;
	}
	.bottomBg{
		width: 750upx;
		height: 355upx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
	}
</style>
