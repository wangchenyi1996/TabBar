<template>
	<view>
		<view style="text-align: center;font-size: 20px;">演示展开收起---APP、H5可以兼容</view>
		
		<view :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
			<view class="intro-content" :title="introduce">
				<text class="merchant-desc" v-if="introduce">{{ introduce }}</text>
				<view class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
					<!-- #ifndef MP-WEIXIN -->
					<view>{{ exchangeButton ? '展开' : '收起' }}</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view v-if="exchangeButton">
						<text style="color: #434343;">...</text>
						<text>展开</text>
					</view>
					<view v-else>
						收起
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Spread',
	data() {
		return {
			introduce: '',
			// 是否展示所有文本内容
			showTotal: true,
			// 显示展开还是收起
			exchangeButton: true,
			// 是否显示展开收起按钮
			showExchangeButton: false,
			rem: ''
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.introduce =
				`拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。`
		},
		showTotalIntro() {
			this.showTotal = !this.showTotal;
			this.exchangeButton = !this.exchangeButton;
		},
		getRem() {
			try {
			    const res = uni.getSystemInfoSync();
				const defaultRem = 16;
				let winWidth = res.windowWidth;
				let rem = (winWidth / 375) * defaultRem;
				return rem;
			} catch (e) {
				console.log('出错了');
			}
		}
	},
	watch: {
		introduce() {
			this.$nextTick(
				() => {
					// 判断介绍是否超过四行
					let rem = parseFloat(this.getRem());
					const query = uni.createSelectorQuery().in(this);
					query.select('.intro-content').boundingClientRect(data => {
					  let descHeight = descHeight = data.height
					  if (descHeight > 5.25 * rem) {
					  	console.log('超过了四行');
					  	// 显示展开收起按钮
					  	this.showExchangeButton = true;
					  	this.exchangeButton = true;
					  	// 不是显示所有
					  	this.showTotal = false;
					  } else {
					  	// 不显示展开收起按钮
					  	this.showExchangeButton = false;
					  	// 没有超过四行就显示所有
					  	this.showTotal = true;
					  }
					}).exec();
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.total-introduce {
	height: auto;
	overflow: hidden;
	font-size: 14px;
	color: #434343;
	margin: 10px;
	.intro-content {
		.merchant-desc {
			width: 100%;
			line-height: 21px;
		}
	}
	.unfold {
		display: block;
		z-index: 11;
		float: right;
		width: 40px;
		height: 21px;
		view {
			margin: 0;
			line-height: 21px;
			color: #7fbe87;
		}
	}
}
.detailed-introduce {
	font-size: 14px;
	color: #434343;
	position: relative;
	overflow: hidden;
	margin: 10px;
	.intro-content {
		// 最大高度设为4倍的行间距
		max-height: 84px;
		line-height: 21px;
		word-wrap: break-word;
		/*强制打散字符*/
		word-break: break-all;
		background: #ffffff;
		/*同背景色*/
		// 如果设置颜色小程序不起作用,APP H5正常
		/* #ifdef APP-PLUS || H5 */
			color: #FFFFFF;
		/* #endif */
		overflow: hidden;
		.merchant-desc {
			width: 100%;
			line-height: 21px;
		}
		&:after,
		  // 这是展开前实际显示的内容
		&:before {
			content: attr(title);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			color: #434343;
			// // overflow: hidden;
		}
		// 把最后最后一行自身的上面三行遮住
		&:before {
			display: block;
			overflow: hidden;
			z-index: 1;
			max-height: 63px;
			background: #ffffff;
		}
		&:after {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			height: 81px;
			/*截取行数*/
			-webkit-line-clamp: 4;
			text-overflow: ellipsis;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			/*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
			text-indent: -12em;
			/*尾部留空字符数*/
			padding-right: 4em;
		}
		.unfold {
			z-index: 11;
			width: 40px;
			height: 21px;
			outline: 0;
			position: absolute;
			right: 0;
			bottom: 0;
			view {
				margin: 0;
				line-height: 21px;
				color: #7fbe87;
				background-color: #FFFFFF;
			}
		}
	}
}
</style>
