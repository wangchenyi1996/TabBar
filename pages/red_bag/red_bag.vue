<template>
	<view>
		<!-- 左侧红包 -->
		<view class="r_bag">
			<image class="bag1" :animation="bag1animation" src="/static/icon/bag1.png" @click="openrbagbtn()"></image>
		</view>

		<!-- 红包封面 -->
		<view class="rbag_model" v-if="rbagmodelshow" @touchmove.prevent.stop>
			<view class="rbag_con hidden">
				<view class="rbag_top">
					<view class="rbag_top_info">
						<image class="rbag_logo" src="/static/icon/logo.jpg" mode=""></image>
						<view class="app_name">恭喜发财</view>
						<view class="rbag_tips">送您一个红包</view>
					</view>
				</view>
				<view class="open_rbag_btn" :animation="openbrnanimation" @click="openbtn()">開</view>
			</view>
			<view class="rbag_con">
				<view class="hide_btn" @click.stop="hidebtn">
					<icon type="cancel" color="#fbd977" size="28" />
				</view>
			</view>
		</view>

		<!-- 打开红包 -->
		<view class="open_rbag_model" v-if="openrbagmodelshow" @touchmove.prevent.stop>
			<image class="rbag_conbg" src="/static/icon/openrbag.png"></image>
			<view class="rbag_conbg open_rbag_con">
				<view class="open_title">— 恭喜您获得 —</view>
				<view class="rbag_detail">
					<view class="open_money">
						<countup :num="num" color="#c95948" width='21' height='34' fontSize='34'></countup>
						<view class="danwei">元</view>
					</view>
					<view class="open_tips">已存入钱包，可直接体现</view>
				</view>
				<view class="lookbag_box">
					<view class="lookbag_btn">
						<view class="text" @click.stop="lookbagbrn()">查看我的钱包</view>
					</view>
				</view>
				<view class="hide_btn" @click.stop="hideopenbtn()">
					<icon type="cancel" color="#fbd977" size="28" />
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	// 应用数字滚动插件
	import countup from '@/components/countUp.vue';
	export default {
		data() {
			return {
				num: 12.68,
				bag1animation: {},
				openbrnanimation: {},
				rbagmodelshow: false,
				openrbagmodelshow: false,
			};
		},
		onShow: function() {
			this.imageanimation();
		},
		methods: {
			// 侧边红包 => 动画
			imageanimation: function() {
				var that = this;
				var next = true;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.bag1animation = animation
				setInterval(function() {
					if (next) {
						animation.rotate(36).step();
						next = !next;
					} else {
						animation.rotate(6).step();
						next = !next;
					}
					that.bag1animation = animation.export()
				}, 1100)
			},
			// 侧边红包 => 点击
			openrbagbtn: function() {
				this.rbagmodelshow = true;
			},

			// 红包封面 => 关闭按钮
			hidebtn: function() {
				this.rbagmodelshow = false;
			},
			// 红包封面 => 開红包按钮
			openbtn: function() {
				var that = this;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.openbrnanimation = animation;
				// animation.rotate3d(0,1,0,360).step();
				animation.rotateY(360).step();
				that.openbrnanimation = animation.export();
				setTimeout(function() {
					that.rbagmodelshow = false;
					that.openrbagmodelshow = true;
					that.openbrnanimation = {};
				}, 1000);
			},

			// 打开红包  => 关闭按钮
			hideopenbtn: function() {
				this.openrbagmodelshow = false;
			},
			// 打开红包  => 查看钱包
			lookbagbrn: function() {

			}
		},
		components: {
			countup
		},
	}
</script>

<style lang="scss">
	@import 'scss/red_bag.scss';
</style>
