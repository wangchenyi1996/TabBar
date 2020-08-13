<template>
	<view class="content">
		<view class="top-bar u-f u-f-sbc">
			<input type="search" placeholder="搜索用户/群" class="search" placeholder-style="color:#aaa;font-weight:400;" @input="search" />
			<view class="text">取消</view>
		</view>
		<view class="search-user">
			<view class="title" v-if="userarr.length>0">用户</view>
			<view class="list u-f" v-for="(item,index) in userarr" :key="index" hover-class="hovers">
				<image :src="item.imgurl" class="face"></image>
				<view class="u-f-c u-f-jsb">
					<view class="name" v-html="item.name"></view>
					<view class="email" v-html="item.email"></view>
				</view>
				<view class="right-bt" v-if="item.tip>=1">发消息</view>
				<view class="right-bt" v-if="item.tip==0">加好友</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../common/datas.js';

	export default {
		data() {
			return {
				userarr: [],
				keyword:'',
			}
		},
		methods: {
			//获取关键词
			search: function(e) {
				this.userarr = [];
				let searchval = e.detail.value;
				if (searchval.length > 0) {
					this.searchUser(searchval);
				}
			},
			//寻找关键词匹配的用户
			searchUser: function(e) {
				let arr = datas.frineds();
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
						arr[i].imgurl = '../../static/images/img/' + arr[i].imgurl;
						arr[i].name = arr[i].name.replace(e, "<span style='color:#4AAAFF;'>" + e + "</span>");
						arr[i].email = arr[i].email.replace(e, "<span style='color:#4AAAFF;'>" + e + "</span>");
						this.userarr.push(arr[i]);
					}
				}
				
				// 处理搜索高亮
				// let result = this.dataList.filter((item,index)=>{
				// 	let temp = item.name.includes(this.inputVal)
				// 	if(temp){
				// 		let replace = `<span style="color:red;font-weight: bold;">${this.inputVal}</span>`
				// 		item.name = item.name.replace(this.inputVal, replace)
				// 		return item
				// 	}
				// })
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
		background-color: #FFFFFF;
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #FFFFFF;

		.top-bar {
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 24rpx;

			.search {
				background-color: #F5F5F5;
				height: 80rpx;
				line-height: 80rpx;
				flex: 1;
				padding-left: 24rpx;
				border-radius: 16rpx;
			}

			.text {
				margin-left: 20rpx;
				font-size: 32rpx;
				color: #678;
			}
		}
	}

	.search-user {
		margin-top: 20rpx;
		padding: 16rpx 24rpx;

		.title {
			font-size: 44rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			color: #333333;
		}

		.list {
			margin: 30rpx 0;

			.face {
				height: 80rpx;
				width: 80rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}

			.right-bt {
				margin-left: auto;
				width: 60px;
				height: 24px;
				border-radius: 12px;
				font-size: 12px;
				line-height: 24px;
				margin-top: 8px;
				text-align: center;
				background: rgba(74, 170, 255, 0.1);
				color: #5799ff;
			}

			.name {
				font-size: 30rpx;
			}

			.email {
				font-size: 24rpx;
			}
		}
	}

	.hovers {
		background-color: rgba(0, 0, 0, .1);
	}
</style>
