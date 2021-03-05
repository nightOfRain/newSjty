<template>
	<view class="login">	
		<view class="content">
			<view class="backClass" @click="backTap">
				<text class="text-black text-bold text-green">
					关闭
				</text>
			</view>
			<!-- 头部logo -->
			<view class="header">
				
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate" 
				@click="startLogin"
			></wButton>
			
			<!-- 其他登录 -->
		<!-- 	<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view> -->
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import utils from '../../utils.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '/static/images/logo.png',
				phoneData:'18202734129', //用户/电话
				passData:'pzl080125', //密码
				loginStat:false,
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
				isLogin:false //登录状态
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			
		},
		methods: {
		    startLogin(e){
                console.log(e)
				var _this = this;
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				
				console.log("登录成功")
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false;
					
					if(_this.isLogin){
						uni.$emit('update', {})
						uni.navigateBack({
							
						});
					}
					
				},2000)
				
			
			
				// var data = {
				// 	userId: _this.phoneData,
				// 	password:utils.hex_md5(_this.passData),
				// 	userType:'1'
				// }
				var data = {
					userId: '18202734129',
					password:utils.hex_md5('pzl080125'),
					userType:'1'
				}
				_this.commRequest('6001', data, function(res){
					//console.log("success in home:"+res);
					
					if(res.responseCode == 'AAAA'){
						
						_this.accessToken = res.responseData.accessToken;
						var userInfo = {};
						userInfo.userId = _this.phoneData;
						userInfo.passWd = _this.passData;
						userInfo.loginStat = true;
						userInfo.accessToken = res.responseData.accessToken;
						userInfo.sysUserDetailRelate = res.responseData.sysUserDetailRelate
						
						uni.setStorage({
							key: 'userInfo',
							data: userInfo,
							success: function () {
								console.log('userInfo success');
							}
						});
						uni.setStorage({
							key: 'loanTypeTree',
							data: res.responseData.loanTypeTree,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'sysUserDetailRelate',
							data: res.responseData.sysUserDetailRelate,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'accessToken',
							data: res.responseData.accessToken,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'appMenuList',
							data: res.responseData.appMenuList,
							success: function () {
								console.log('success');
							}
						});
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '登录成功',
							duration:2000
						});
						_this.isLogin = true;
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '登录失败：'+res.responseCode,
							duration:2000
						});
						_this.isLogin = false;
						console.log("responseCode: "+res.responseCode);
					}
				});
					
		    },
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			backTap(){
				uni.navigateBack({
					delta:1
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
