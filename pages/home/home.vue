<template>
	<view>
		<cu-custom bgColor="bg-clean" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">问题跟踪</block>
		</cu-custom>
		
		 <view class="bg-img  flex align-center" style="background-image: url('/static/images/title.png');height:340px;margin-top:-64px;">
			<view class="margin-sm bg-white radius shadow" style="width: 100%;margin-top:50px;">
				<view class="flex p-xs mb-sm text-center">
					<view class="flex-sub margin" hover-class="hover-class" style="border-right: solid 1rpx #f1f1f1;" @click="queryBynum(0)">总数量：{{counts[0]}}</view>
					<view class="flex-sub margin" hover-class="hover-class" style="border-right: solid 1rpx #f1f1f1;;" @click="queryBynum(1)">已解决：{{counts[1]}}</view>
					<view class="flex-sub margin" hover-class="hover-class" style="border-right: solid 1rpx #f1f1f1;;" @click="queryBynum(2)">待处理：{{counts[2]}}</view>
				</view>
			</view>
		 </view>
			

		<view class="padding flex flex-direction" v-if="!loginStat" @click="loginApp">
			<button class="cu-btn bg-grey lg">请先登录</button>
		</view>
	<!-- 	<view class="cu-bar bg-white solid-bottom" style="margin-top:-100px" v-if="loginStat">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 消息列表
			</view>
		</view> -->
		<view class="cu-bar bg-white solid-bottom" style="margin-top:-100px;padding-right:20upx;" v-if="loginStat">
			<view class="action"><text class="cuIcon-title text-orange "></text>消息列表</view>
			<radio-group @change="SetType">
				<label class="margin-left-sm">
					<radio class="blue radio" value="0" checked></radio>
					<text class="margin-left-sm">问题</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="1" ></radio>
					<text class="margin-left-sm">事项</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-list menu-avatar" style="padding-bottom: 120upx;" v-if="loginStat">
			<block  v-for="(item,index) in msgList" :key="index">
				<view class="cu-item cur"   @click="queryByFileno" :data-fileno="item.id">
					<view class="cu-avatar radius lg" :style="'background-image:url(../../static/images/icon'+((index+1)%4+1)+'.png);'">
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
		
		
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	
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
				loginStat: true,
				listTouchStart: 0,
				listTouchDirection: null,
				type:'0'
			};
			
		},
		
		methods: {

			SetType:function(e){
				this.type = e.detail.value;
				this.initPages();
			},
			doneTimeStr(timeStr){
				return utils.get_time_str(timeStr);
			},
	
			queryByFileno:function(e){
				console.log("queryByFileno:"+JSON.stringify(e));
				uni.navigateTo({
					url:'/pages/undo/flow-timeline'
				})
			},
			updated(){
				
				this.initPages();
				console.log("HOME==========updated:"+this.loginStat);
			},
			loginApp:function(e){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			initPages:function(){
				
				console.log("HOME==========initPages:"+this.loginStat);
			
	
				var _this = this;
				//初始化页面消息
				var data = {};
				data.userId = '15071177366';
				data.type = _this.type;
			
				_this.commRequest('/app/getMsgList', data, function(res){
					console.log("/app/getMsgList success in home:"+res);
					
					_this.msgList = res.list;
				});
				
			},
			queryBynum:function(index){
				var _this = this;
				uni.navigateTo({
					url:'/pages/home/allthings?index='+index+'&type='+_this.type
				})
			}
		},
		mounted(){
			console.log("home created");
			
			var _this = this;
			
			_this.initPages();
			// var userInfo = uni.getStorageSync("userInfo");
			// _this.loginStat = userInfo.loginStat;
			// if(_this.loginStat){
			// 	_this.accessToken = userInfo.accessToken;
			// 	_this.initPages();	
			// }
	
			// uni.request({
			// 	url:'/app/login',
			// }).then(res =>{
			// 	console.log("/app/login recv:" + JSON.stringify(res));
			// })
			
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
