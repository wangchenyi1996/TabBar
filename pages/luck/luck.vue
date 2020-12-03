<template>
<view class="container">
			<view class="frame_view" :style="'background-image:url(' + img + '.gif)'">
				<view class="frame_row">
					<view class="frame_item" :class="'item' + color[0]" :style="'background-image:url(' + img + color[0] + '.png)'">
						<image :src="award[0].img"></image>
						<text>{{ award[0].name }}</text>
					</view>
					<view class="frame_item" :class="'item' + color[1]" :style="'background-image:url(' + img + color[1] + '.png)'">
						<image :src="award[1].img"></image>
						<text>{{ award[1].name }}</text>
					</view>
					<view class="frame_item" :class="'item' + color[2]" :style="'background-image:url(' + img + color[2] + '.png)'">
						<image :src="award[2].img"></image>
						<text>{{ award[2].name }}</text>
					</view>
				</view>

				<view class="frame_row">
					<view class="frame_item" :class="'item' + color[7]" :style="'background-image:url(' + img + color[7] + '.png)'">
						<image :src="award[7].img"></image>
						<text>{{ award[7].name }}</text>
					</view>
					<image class="frame_item" :src="btnconfirm" @click="clickLuck"></image>
					<view class="frame_item" :class="'item' + color[3]" :style="'background-image:url(' + img + color[3] + '.png)'">
						<image :src="award[3].img"></image>
						<text>{{ award[3].name }}</text>
					</view>
				</view>

				<view class="frame_row">
					<view class="frame_item" :class="'item' + color[6]" :style="'background-image:url(' + img + color[6] + '.png)'">
						<image :src="award[6].img"></image>
						<text>{{ award[6].name }}</text>
					</view>
					<view class="frame_item" :class="'item' + color[5]" :style="'background-image:url(' + img + color[5] + '.png)'">
						<image :src="award[5].img"></image>
						<text>{{ award[5].name }}</text>
					</view>
					<view class="frame_item" :class="'item' + color[4]" :style="'background-image:url(' + img + color[4] + '.png)'">
						<image :src="award[4].img"></image>
						<text>{{ award[4].name }}</text>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
//计数器
var interval = null;
//值越大旋转时间越长  即旋转速度
var intime = 50;
export default {
	data() {
		return {
			color: [0, 0, 0, 0, 0, 0, 0, 0],
			award: [],//接收数组
			img: getApp().globalData.img_url + 'k_bg',//图片链接
			btnconfirm: getApp().globalData.img_url + '/dianjichoujiang.png',//点击图片链接
			Luck: true,//防置重复点击
			luckPosition: 0 //停止位置
		};
	},
	methods: {
		clickLuck() {
			if (this.Luck == false) {//防止过度点击
				return;
			}
			this.Luck = false;
			var arr = [];
			//根据概率循环位置
			for (var i = 0; i < this.award.length; i++) {
				for (var k = 0; k < this.award[i].chance; k++) {
					arr.push(i);
				}
			}
			console.log(arr);
			//随机打乱数组
			for (let i = 0, len = arr.length; i < len; i++) {
				let index = parseInt(Math.random() * (len - 1));
				let tempValue = arr[i];
				arr[i] = arr[index];
				arr[index] = tempValue;
			}
			console.log(arr);
			//从数组中随机抽取一个位置
			var a = Math.ceil(Math.random() * 100);
			console.log(arr[a]);
			this.luckPosition = arr[a];
			var e = this;
			//设置按钮不可点击
			e.btnconfirm = getApp().globalData.img_url + '/dianjichoujiangd.png';
			//清空计时器
			clearInterval(interval);
			var index = 0;
			//循环设置每一项的背景图
			interval = setInterval(function() {
				var c = [0, 0, 0, 0, 0, 0, 0, 0];
				if (index > 7) {
					index = 0;
				}
				c[index] = 1;
				e.color = c;
				index++;
			}, intime);
			// console.log(intime);
			//模拟网络请求时间  设为两秒
			var stoptime = 1000;
			setTimeout(function() {
				e.stop(e.luckPosition);
			}, stoptime);
		},
		stop(which) {
			var e = this;
			//清空计数器
			clearInterval(interval);
			//初始化当前位置
			var current = -1;
			var color = e.color;
			for (var i = 0; i < color.length; i++) {
				if (color[i] == 1) {
					current = i;
				}
			}
			//下标从1开始
			var index = current + 1;
			e.stopLuck(which, index, intime, 10);
		},
		/**
		 * which:中奖位置
		 * index:当前位置
		 * time：时间标记
		 * splittime：每次增加的时间 值越大减速越快
		 */
		stopLuck(which, index, time, splittime) {
			var e = this;
			//值越大出现中奖结果后减速时间越长
			var color = e.color;
			setTimeout(function() {
				//重置前一个位置
				var c = [0, 0, 0, 0, 0, 0, 0, 0];
				if (index > 7) {
					index = 0;
				}
				//当前位置为选中状态
				c[index] = 1;
				e.color = c;
				//如果旋转时间过短或者当前位置不等于中奖位置则递归执行
				//直到旋转至中奖位置
				if (time < 400 || index != which) {
					//越来越慢
					splittime++;
					time += splittime;
					//当前位置+1
					index++;
					e.stopLuck(which, index, time, splittime);
				} else {
					//1秒后显示弹窗
					setTimeout(function() {
						if (e.award[which].status == 1) {
							//中奖
							uni.showModal({
								title: '提示',
								content: '恭喜中奖',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										//设置按钮可以点击
										e.btnconfirm = getApp().globalData.img_url + '/dianjichoujiang.png';
										e.Luck = true;
									}
								}
							});
						} else {
							//中奖
							uni.showModal({
								title: '提示',
								content: '很遗憾未中奖',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										//设置按钮可以点击
										e.btnconfirm = getApp().globalData.img_url + '/dianjichoujiang.png';
										e.Luck = true;
									}
								}
							});
						}
					}, 1000);
				}
			}, time);
		}
	}
};
</script>

<style lang="scss">
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	box-sizing: border-box;
}
.frame_view {
	bottom: 160rpx;
	left: 60rpx;
	right: 60rpx;
	width: 618rpx;
	height: 660rpx;
	padding: 50rpx;
	z-index: 3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-radius: 30rpx;
	background-repeat: no-repeat;
	background-size: 100%;
}
.frame_row {
	width: 520rpx;
	height: 180rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.frame_item {
	width: 160rpx;
	height: 168rpx;
	background-repeat: no-repeat;
	background-size: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	font-size: 20px;
	padding: 10rpx 0;
}
.frame_item image {
	width: 100rpx;
	height: 100rpx;
	display: block;
}
.frame_item text {
	font-size: 14px;
	display: block;
	width: 100%;
	text-align: center;
}
.item1 {
	color: #ffffff;
}
</style>
