<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo" @click="userTap">
				<view class="face"><image src="/static/images/me.png"></image></view>
				<view class="info">
					<view class="username">张三</view>
					<view class="integral">XX支行XX部门</view>
				</view>
			</view>
			<view class="setting" @click="userTap"><text class="cuIcon-settings text-white"></text></view>
			
		</view>

		<view class="orders" v-if="loginStat">
			<view class="box">
				<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" style="width: 100%;height:100%;border-radius:24upx;">
					<view class="cu-item"   v-for="(item,index) in cuIconList" :key="item.name" >
						<view @click="toOrderType(index)" hover-class="hover-class">						
							<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
								<view class="cu-tag badge" v-if="item.badge!=0">
									<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
								</view>
							</view>
							<text>{{item.name}}</text>						
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="list" v-for="(list,list_i) in severList" :key="list_i" v-if="loginStat">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"  hover-class="hover" :key="li.name" >
				<!-- <view class="icon"><image :src="'../../static/sever/'+li.icon"></image></view> -->
				<view><text :class="['cuIcon-' + li.icon,'text-' + li.color]" style="font-size: 40upx;"></text></view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="/static/images/to.png"></image>
			</view>
		</view>
		<view class="padding flex flex-direction margin-bottom-xl" @click="quitApp()" v-if="loginStat">
			<button class="cu-btn bg-red margin-tb-sm lg">退出</button>
		</view>
		<view class="margin-top-xl">
				{{''}}
		</view>
		
		<view class="padding flex flex-direction margin-top-xl" v-if="!loginStat" @click="loginApp">
			<button class="cu-btn bg-grey lg">请先登录</button>
		</view>
		
	</view>
</template>
<script>
	import utils from '../../utils.js'
	export default {
		data() {
			return {
				//#ifdef APP-PLUS
				isH5Plus:true,
				//#endif
				//#ifndef APP-PLUS
				isH5Plus:false,
				//#endif
				userinfo:{},
				loginStat:true,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 12,
					name: '我发起',
					url:'/pages/home/mqlists',
					isShow:false,
					id:'1',
				}, {
					cuIcon: 'recordfill', 
					color: 'orange',
					badge: 14,
					name: '进行中',
					url:'/pages/query/ajQuery/ajQuery',
					isShow:false,
					id:'2',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 23,
					name: '已完成',
					url:'',
					isShow:false,
					id:'6',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 40,
					name: '累计',
					url:'',
					isShow:false,
					id:'3',
				}
				],
				severList:[
					[
						{name:'修改密码',icon:'global',color: 'olive',url:'/pages/map/index'},
						{name:'我的问题',icon:'qrcode',color: 'olive',url:'/pages/plugin/tki-qrcode'},
						{name:'我的项目',icon:'pic',color: 'olive',url:'/pages/plugin/canvas'},
						//{name:'我的视频',icon:'renw.png',url:'/pages/plugin/myVideo'},
					],
					[
						//{name:'图表展示',icon:'rankfill',color: 'olive',url:'/pages/plugin/myCharts'},
						//{name:'我的棋牌室',icon:'rankfill',color: 'olive',url:'/pages/setting/myShop'},
						//{name:'注册棋牌室',icon:'rankfill',color: 'olive',url:'/pages/setting/shopLoadUp'},
						
						// {name:'抽奖',icon:'choujiang.png',url:''},
						// {name:'收货地址',icon:'addr.png',url:''},
						// {name:'银行卡',icon:'bank.png',url:''},
						// {name:'安全中心',icon:'security.png',url:''},
						// {name:'在线客服',icon:'kefu.png',url:''}
					]
				],
				gridCol: 4,
				gridBorder: false,
			};
		},
		mounted() {
			var userInfo = uni.getStorageSync("userInfo");
			var _this = this;
			// _this.loginStat = userInfo.loginStat;
			// //加载
			// this.init();
			// //页面间通讯监听
			// uni.$on('update', this.updated);
		},
		methods: {
			init() {
				//用户信息
				this.userinfo={
					face:'/static/logo.png',
					username:"VIP会员9527",
					integral:"1,888,888,888"
				}		
			},
			//用户点击订单类型
			toOrderType(index){
				uni.showToast({title: this.cuIconList[index].name});
			},
			//用户点击列表项
			toPage(list_i,li_i){
				uni.showToast({
					title:this.severList[list_i][li_i].name,
					duration:2000
				});
				// if(utils.isEmpty(this.severList[list_i][li_i].url)){
				// 	uni.showToast({
				// 		title:"该模块暂未开放",
				// 		duration:2000
				// 	});
				// 	return;
				// }
				// uni.navigateTo({
				// 	url:this.severList[list_i][li_i].url
				// })
			},
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
			loginApp:function(e){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			userTap:function(){
				uni.navigateTo({
					url:'/pages/me/userCenter'
				})
			}
		}
	}
</script>

<style lang="scss">
page{background-color:#fff}
.header{
	&.status{padding-top:var(--status-bar-height);}
	background-color:#0081ff;width:100%;height:30vw;padding:0 4%;display:flex;align-items:center;
	.userinfo{
		width:100%;display:flex;
		.face{flex-shrink:0;width:15vw;height:15vw;
			image{width:100%;height:100%;border-radius:100%}
		}
		.info{
			display:flex;flex-flow:wrap;padding-left:30upx;
			.username{width:100%;color:#fff;font-size:40upx}
			.integral{display:flex;align-items:center;padding:0 20upx;height:40upx;color:#fff;background-color:rgba(0,0,0,0.1);border-radius:20upx;font-size:24upx}
		}
	}
	.setting{
		flex-shrink:0;width:6vw;height:6vw;
		image{width:100%;height:100%}
	}
}
.hover{background-color:#eee}
.orders{
	background-color:#0081ff;width:100%;height:11vw;padding:0 4%;margin-bottom:calc(11vw + 40upx);display:flex;align-items:flex-start;border-radius:0 0 100% 100%;margin-top: -1upx;
	.box{
		width:100%;padding:0 1%;height:22vw;background-color:#fefefe;border-radius:24upx;box-shadow:0 0 20upx rgba(0,0,0,0.15);margin-bottom:40upx;display:flex;align-items:center;justify-content:center;
		.label{
			display:flex;align-items:center;justify-content:center;flex-flow:wrap;width:100%;height:16vw;color:#666666;font-size:26upx;
			.icon{
				position:relative;width:7vw;height:7vw;margin:0 1vw;
				.badge{position:absolute;width:4vw;height:4vw;background-color:#ec6d2c;top:-1vw;right:-1vw;border-radius:100%;font-size:20upx;color:#fff;display:flex;align-items:center;justify-content:center;z-index: 10;}
				image{width:7vw;height:7vw;z-index: 9;}
			}
		}
	}
}
.list{
	width:100%;border-bottom:solid 26upx #f1f1f1;
	background-color: #ffffff;
	.li{margin-left:10px ;
		width:calc(100%-10px;);height:100upx;padding:0 2%;border-bottom:solid 1upx #e7e7e7;display:flex;align-items:center;
	&.noborder{border-bottom:0}
		.icon{
			flex-shrink:0;width:50upx;height:50upx;
			image{width:50upx;height:50upx}
		}
		.text{padding-left:20upx;width:100%;color:#666}
		.to{flex-shrink:0;width:40upx;height:40upx}
	}
}
</style>
