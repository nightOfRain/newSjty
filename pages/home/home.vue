<template>
	<view>

		<!-- 	<image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
			 mode="widthFix" class="response"></image> -->
			 
			 <view class="bg-img bg-mask flex align-center" style="background-image: url('https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png');height: 414upx;">
			 	<view class="padding-xl text-white">
			 		<view class="padding-xs text-xxl text-bold">
			 			钢铁之翼
			 		</view>
			 		<view class="padding-xs text-lg">
			 			Only the guilty need fear me.
			 		</view>
			 	</view>
			 </view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 菜单列表
				</view>
				
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item"   v-for="(item,index) in cuIconNewList" :key="index" v-if="item.isShow">
					<view @click="naviTo" :data-url="item.url" hover-class="hover-class">						
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.name}}</text>						
					</view>
				</view>
			</view>

			<view class="padding flex flex-direction" v-if="!loginStat" @click="loginApp">
				<button class="cu-btn bg-grey lg">请先登录</button>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="loginStat">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 消息列表
				</view>
			</view>
			<view class="cu-list menu-avatar" style="padding-bottom: 120upx;" v-if="loginStat">
				<view class="cu-item cur"  v-for="(item,index) in msgList" :key="index" @click="queryByFileno" :data-fileno="item.fileNo">
					<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
						<view class="cu-tag badge"></view>
					</view>
					<view class="content">
						<view>
							<view class="text-cut">{{item.jkrXm}}-{{item.flowName}}</view>
							<view class="cu-tag round bg-orange sm">{{getLoanName(item.loanType)}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut"> {{item.note}}.<text class="cuIcon-locationfill text-orange margin-right-xs"></text>{{item.bankName}}</view></view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{doneTimeStr(item.dynamicTime)}}</view>
						<view class="cuIcon-notice_forbid_fill text-gray"></view>
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
				cuIconNewList:[],
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '贷款面签',
					url:'/pages/home/mqlists',
					isShow:false,
					id:'1',
				}, {
					cuIcon: 'recordfill', 
					color: 'orange',
					badge: 0,
					name: '案卷查询',
					url:'/pages/query/ajQuery/ajQuery',
					isShow:false,
					id:'2',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '案卷统计',
					url:'',
					isShow:false,
					id:'6',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '案卷评价',
					url:'',
					isShow:false,
					id:'3',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '财务查询',
					url:'/pages/query/cwcx',
					isShow:false,
					id:'5',
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '业绩排名',
					url:'/pages/query/yjpm',
					isShow:false,
					id:'4',
					},
				// }, {
				// 	cuIcon: 'discoverfill',
				// 	color: 'purple',
				// 	badge: 0,
				// 	name: '提成排名',
				// 	url:'',
				// 	isShow:false,
				// 	id:'7',
				// }, {
				// 	cuIcon: 'questionfill',
				// 	color: 'mauve',
				// 	badge: 0,
				// 	name: '还款计划',
				// 	url:'',
				// 	isShow:false,
				// 	id:'8',
				// }, {
				// 	cuIcon: 'commandfill',
				// 	color: 'purple',
				// 	badge: 0,
				// 	name: '公司排名',
				// 	url:'',
				// 	isShow:false,
				// 	id:'9',
				// }, {
				// 	cuIcon: 'brandfill',
				// 	color: 'mauve',
				// 	badge: 0,
				// 	name: '交行状态',
				// 	url:'',
				// 	isShow:false,
				// 	id:'10',
				// }, {
					{
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: 'LPR计算',
					url:'/pages/me/calculator',
					isShow:true,
					id:'13',
				}, {
					cuIcon: 'brandfill',
					color: 'yellow',
					badge: 0,
					name: '税费计算',
					url:'',
					isShow:true,
					id:'12',
				}, {
					cuIcon: 'samefill',
					color: 'olive',
					badge: 0,
					name: '洪房评估',
					url:'/pages/query/hfcx',
					isShow:true,
					id:'14',
				}],
				msgList:[],
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
			};
			
		},
		
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			naviTo(e) {
				var url = e.currentTarget.dataset.url;
				if(utils.isEmpty(url)){
					uni.showToast({
						title:"该模块暂未开放",
						duration:2000
					});
					return;
				}
				uni.navigateTo({
					url:url
				})
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			doneTimeStr(timeStr){
				return utils.get_time_str(timeStr);
			},
			getLoanName(ids){
				return utils.getLoanName(ids);
			},
			queryByFileno:function(e){
				console.log("queryByFileno:"+JSON.stringify(e));
				uni.navigateTo({
					url:'/pages/undo/flow_done?fileNo='+e.currentTarget.dataset.fileno
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
				var _this = this;
				console.log("HOME==========initPages:"+this.loginStat);
				var userInfo = uni.getStorageSync("userInfo");
				_this.loginStat = userInfo.loginStat;
				if(_this.loginStat){
					_this.accessToken = userInfo.accessToken;
									
					var appMenuList = uni.getStorageSync("appMenuList");
					
					var tmpMune = _this.cuIconList;
					var outMune = [];
					//初始化菜单
					for(var i = 0; i < appMenuList.length; i++){
						var tmpItem = tmpMune.filter((item)=>{
							return item.id == appMenuList[i].id
						});
						
						if(tmpItem.length>0){
							tmpItem[0].isShow = true;
							console.log(i+":tmpItem: " + JSON.stringify(tmpItem));
						}							
					}
					
					_this.cuIconNewList = tmpMune.filter((item)=>{
						return item.isShow == true;
					});
					var _this = this;
					//初始化页面消息
					var data = {};
					data.userId = userInfo.userId;
					data.type = 0;
					data.pages = 1;
					data.number = 20;
					_this.commRequest('6017', data, function(res){
						console.log("6017 success in home:"+res);
						
						_this.msgList = res.responseData.unDoFileDynamicList;
					});
				}else{
					_this.cuIconNewList = _this.cuIconList;
				}
			}
		},
		mounted(){
			console.log("home created");
			
			var _this = this;
			
			
				
			_this.initPages();	
	
			
			
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
