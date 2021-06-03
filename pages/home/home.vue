<template>
	<view>
		<cu-custom bgColor="bg-clean" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">随手办</block>
		</cu-custom>
		
		 <view class="bg-img  flex align-center" style="background-image: url('https://7869-xiyutool-5op3h-1300784412.tcb.qcloud.la/icon/title.png');height:340px;margin-top:-84px;" >
 			<view class="bg-white margin-sm radius shadow" style="width: 100%;margin-top:50px;">
				<view class="flex  text-center"  v-if="loginStat">					
					<view class="flex-sub padding-sm text-xl text-gray"  :class="btnCheck?'bg-blue text-white text-bold':''" @click="tabChange(1)">
						管理部门
					</view>
					<view class="flex-sub padding-sm text-xl text-gray" style="border-right: solid 1rpx #f1f1f1;" :class="!btnCheck?'bg-blue text-white text-bold':''" @click="tabChange(0)">
						经营机构
					</view>
				</view>
			</view> 
	
		 </view>
		<view class="margin-sm bg-white radius shadow mb-sm text-center padding" v-if="!loginStat" style="margin-bottom:50px;margin-top:-100px;">
			<view class="padding flex flex-direction" v-if="!loginStat" @click="loginApp">
				<button class="cu-btn bg-grey lg">请先登录</button>
			</view>
			登录后获取更多信息
		</view>

		
	<!-- 	<view class="cu-bar bg-white solid-bottom" style="margin-top:-100px" v-if="loginStat">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 消息列表
			</view>
		</view> -->
		<view class="cu-bar bg-white solid-bottom" style="margin-top:-100px;padding-right:20upx;" v-if="loginStat">
	<!--		<view class="action"><text class="cuIcon-title text-orange "></text>消息列表</view>
	 		<radio-group @change="SetType">
				<label class="margin-left-sm">
					<radio class="blue radio" value="0" checked></radio>
					<text class="margin-left-sm">经营机构</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="1" ></radio>
					<text class="margin-left-sm">管理部门</text>
				</label>
			</radio-group> -->
			<view class="flex p-xs mb-sm text-center padding"  v-if="loginStat" style="width: 100%;">
				<view class="flex-sub " hover-class="hover-class" style="border-right: solid 1rpx #f1f1f1;" @click="queryBynum(0)">总数量：<text class="text-underline">{{counts[0]}}</text></view>
				<view class="flex-sub " hover-class="hover-class" style="border-right: solid 1rpx #f1f1f1;" @click="queryBynum(1)">已解决：<text class="text-underline">{{counts[1]}}</text></view>
				<view class="flex-sub " hover-class="hover-class" style="" @click="queryBynum(2)">待处理：<text class="text-underline">{{counts[2]}}</text></view>
			</view>
			
		</view>
		
		<view class="cu-list menu-avatar" style="padding-bottom: 120upx;" v-if="loginStat">
			<block  v-for="(item,index) in msgList" :key="index">
				<view class="cu-item cur"   @click="queryByFileno" :data-fileno="item.id">
					<view class="cu-avatar radius lg" :style="'background-image:url(https://7869-xiyutool-5op3h-1300784412.tcb.qcloud.la/icon/icon'+((index+1)%4+1)+'.png);'">
						<!-- <view class="cu-tag badge"></view> -->
					</view>
					<view class="content" hover-class="hover-class">
						<view>
							<view class="text-cut">{{item.title}}</view>
							<view class="cu-tag round  sm" :class="item.flow == 1?'bg-orange':'bg-blue'">{{flowName[item.flow]}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut"> {{item.deptName}}.<text class="cuIcon-peoplefill  margin-right-xs" :class="item.flow == 1?'text-orange':'text-blue'"></text>经办人：{{item.jbr}}</view></view>
					</view>
					<view class="action" >
						<view class="text-grey text-xs">{{doneTimeStr(item.startDate)}}</view>
						<view :class="item.flow==1?'cuIcon-questionfill text-orange':'cuIcon-roundcheckfill text-blue'"></view>
					</view>
				</view>
			</block>
			<view class="padding-xl bg-white text-center" v-if="msgList.length==0">
				目前还没有问题或事项提交
			</view>
			<view class="padding-xl bg-white text-center" v-if="msgList.length>9">
				<view class="text-blue" style="text-decoration: underline;" @click="queryBynum(0)">更多</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="authMode?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">授权登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					微信需要获取您的登录权限。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">确定授权</button>
<!-- 		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">小程序登录授权</button> -->
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	import Vue from 'vue'
	export default {
		data() {
			return {
				msgList:[],
				flowName:['已提交','正在处理','已完成'],
				counts:[96,78,18],
				modalName: null,
				gridCol: 5,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				loginStat: false,
				listTouchStart: 0,
				listTouchDirection: null,
				type:'1',
				btnCheck:true,
				authMode:true
			};
			
		},
		
		methods: {
			tabChange:function(index){
				
				if(index == 1){
					this.btnCheck = true;
				}else{
					this.btnCheck = false;
				}
				
				this.type = index;
				this.initPages();
			},
			SetType:function(e){
				this.type = e.detail.value;
				this.initPages();
			},
			doneTimeStr(timeStr){
				return utils.get_time_str(timeStr);
			},
	
			queryByFileno:function(e){
				console.log("queryByFileno:"+JSON.stringify(e));
				var _this = this;
				uni.navigateTo({
					url:'/pages/undo/flow-timeline?type='+_this.type
				})
			},
			hideModal:function(){
					this.authMode = false;
			},
			updated(){
		
				//如果状态为登录则获取数据
				if(this.isLogin()){
					this.initPages();
				}
			},
			loginApp:function(e){
				uni.navigateTo({
					url:'/pages/login/index'
				})
			},
			initPages:function(){
				
				var _this = this;
				//初始化页面消息
				var data = {};
				data.userId = 'admin';
				data.type = _this.type;
				
				const url = '/wei/getMsgList?pageNum=0&pageSize=20'
				_this.commRequest(url, data, function(res){
					console.log("/wei/getMsgList success in home:"+res);
					
					_this.msgList = res.list;
				});
				
			},
			queryBynum:function(index){
				var _this = this;
				uni.navigateTo({
					url:'/pages/home/allthings?index='+index+'&type='+_this.type
				})
			},
			appLoginWx:function(e){
				var _this = this;
				// #ifdef MP-WEIXIN
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										console.log(res2);
										console.log(info);
										uni.setStorageSync("userInfo_wx", info.userInfo);
										_this.authMode = false;
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
										
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
				//#endif
			}
		},
		mounted(){
			console.log("home created");
			
			
			var _this = this;
			
			// uni.authorize({
			//     scope: 'scope.userInfo',
			// 	success() {
			// 	    // 获取用户信息
			// 	    uni.getUserInfo({
			// 	      provider: 'weixin',
			// 	      success: function (infoRes) {
			// 	    	console.log('用户昵称为：' + JSON.stringify(infoRes));
			// 			uni.setStorageSync("userInfo_wx", infoRes.userInfo);
			// 	      }
			// 	    });
			// 	}  
			// })
			// #ifdef MP-WEIXIN
			uni.getSetting({
			 success(res) {
				console.log("授权：",res);
			   if (!res.authSetting['scope.userInfo']) {
					//这里调用授权
					console.log("当前未授权");
					_this.authMode = true;
			   } else {
					//用户已经授权过了
					console.log("当前已授权");
					_this.authMode = false;
					_this.appLoginWx();
			   }
			 }
		   })
		   //#endif
			
			
			//如果状态为登录则获取数据
			if(_this.isLogin()){
				_this.initPages();
			}

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
