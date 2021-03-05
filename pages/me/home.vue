<template>
	<view>
		<view style="padding-bottom: 129upx;">
			<image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
			 mode="widthFix" class="response"></image>

		
			<view class="cu-list menu" >
				<view class="cu-item arrow" v-if="loginStat">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">案卷转行</text>
					</view>
				</view>
				<view class="cu-item arrow" v-if="loginStat">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">个人资料</text>
					</view>
				</view>
				<view class="cu-item arrow" >
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">APP简介+版本变动</text>
					</button>
				</view>
				<view class="cu-item arrow" >
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">检测新版本</text>
					</navigator>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-emojiflashfill text-pink"></text>
						<text class="text-grey">磁盘空间管理</text>
					</view>
					<view class="action" v-if="loginStat">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
				<view class="cu-item arrow" v-if="loginStat">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text class="text-grey">门店信息</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow">
							<text class="cuIcon-upload"></text> 上传</button>
					</view>
				</view>
<!-- 				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">标签</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view> -->
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">联系客服</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">有需要请联系客服小姐姐！</text>
					</view>
				</view>
		

				<view class="padding flex flex-direction" @click="quitApp()">
					<button class="cu-btn bg-red margin-tb-sm lg">退出</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	
	export default {
		data() {
			return {
				loginStat:false
			};
			
		},
		
		methods: {
			
			quitApp:function(e){
				var userInfo = uni.getStorageSync("userInfo");
				userInfo.loginStat = false;
				userInfo.accessToken = '';
				userInfo.sysUserDetailRelate = ''
				uni.setStorage({
					key: 'userInfo',
					data: userInfo,
					success: function () {
						console.log('userInfo success');
					}
				});
				uni.$emit('update', {});
			},
			updated:function(e){
				var userInfo = uni.getStorageSync("userInfo");
				var _this = this;
				_this.loginStat = userInfo.loginStat;
			},
		},
		mounted(){
			console.log("home created");
			var userInfo = uni.getStorageSync("userInfo");
			var _this = this;
			_this.loginStat = userInfo.loginStat;
			//页面间通讯监听
			uni.$on('update', this.updated);
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
		padding-bottom:10vh;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
