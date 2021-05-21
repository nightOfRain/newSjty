
<template>
	<view>
		<view class="padding flex flex-direction margin-top-xl" v-if="!loginStat" @click="loginApp">
			<button class="cu-btn bg-grey lg">请先登录</button>
		</view>
<!-- 		<view class="cu-bar search bg-white fixed"   style="padding-top:40upx;height:128upx;" v-if="loginStat">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" style="text-align:left;line-height:16px;" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view> -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">待办事项</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav fixed" style="top:64px" v-if="loginStat">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					<!-- <view class="cu-tag badge" v-if="undos[index]!=0">
						<block v-if="undos[index]!=1">{{undos[index]>99?'99+':undos[index]}}</block>
					</view> -->
					{{Tab[index]+' '}}.<text class="text-xs" :class="index==TabCur?'text-orange':''">{{undos[index]>99?'99+':undos[index]}}</text>
				</view>
			</view>
		</scroll-view>
		

		<view class="cu-card dynamic no-card" style="margin-top:88upx;padding-bottom:216upx;" v-if="loginStat">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top bg-gray">
					<view class="cu-item" :class="index == 0?'':'margin-top'"  v-for="(item,index) in undoList" :key="index" :data-index="index"  @click="doBySlef" :data-item="item.fileNo">
						<view class="cu-avatar round" :style="'background-image:url(../../static/images/icon'+(index+1)+'.png);'"></view>
						<view class="content">
							<view class="flex justify-between">
								<text class="text-grey">{{item.jbr}}-{{item.deptName}}</text>
								<text class="text-grey text-xs">{{doneTimeStr(item.dynamicTime)}}</text>
							</view>
							<view class="text-gray text-content text-df" style="margin-top:24upx;">					
								<text class="text-blue">{{item.fqr}}</text>发起的<text class="text-bold">{{item.type==0?'问题':'事项'}}</text>，正在处理中
							</view>
							<view class="text-gray text-content text-df">
								{{item.note}}
							</view>
							<view class="bg-brown padding-sm radius margin-top-sm  text-sm">
								<view class="flex" v-if="item.createTime">
									<view>发起时间：</view>
									<view class="flex-sub">{{item.createTime}}</view>
								</view>
								<view class="flex" v-if="item.checkTime">
									<view>审批时间：</view>
									<view class="flex-sub">{{item.checkTime}}</view>
								</view>
								<view class="flex" v-if="item.finishTime">
									<view>完成时间：</view>
									<view class="flex-sub">{{item.finishTime}}</view>
								</view>
							</view>
							<!-- <view class="margin-top-sm flex justify-between"> -->
								<!-- <view class="text-gray text-df"></view> -->
							<view class="margin-top-sm text-center" v-if="item.isSelf">
								<text class="text-green">立即处理</text>
							</view>
							<view class="margin-top-sm text-center" v-if="!item.isSelf">
								<text class="text-orange">点击查看</text>
							</view>
							<!-- </view> -->
						</view>
					</view>

				
				</view>
			</view>
			<view class="margin-top bg-gray padding text-center">
				<view class="text-blue" style="text-decoration: underline;" @click="getData" v-if="showMore[TabCur]">更多</view>
				<view class="text-blue" v-if="!showMore[TabCur]">没有了</view>
			</view>
		</view>


		
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	export default {
		data() {
			return {
				undoList: [],
				list:[[],[],[],[]],
				undos:[0,0,0,0],
				currPage : [0,0,0,0],
				isZhongjie:false,
				loginUserId:'',
				loginStat:true,
				TabCur:0,
				Tab:['我发起','我经办','处理中','已完成'],
				showMore:[false, false, false, false]
			};
		},
		mounted(){
			var _this = this;
			// var userInfo = uni.getStorageSync("userInfo");
			// _this.loginStat = userInfo.loginStat;
			// _this.loginUserId = userInfo.userId;
			
			// if(_this.loginStat){
			// 	this.refreshData();
			// }
			// //页面间通讯监听
			uni.$on('update', this.updated);
			this.getData();
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.currPage[this.TabCur] = 0;
			this.getData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			updated:function(e){
				this.getData();
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			doBySlef(e){
				var _this = this;
				const index =  e.currentTarget.dataset.index;
				
				//判断是自己是否处理人
				if(_this.undoList[index].isSelf){
					uni.navigateTo({
						url:'/pages/undo/flow_done?fileNo='+_this.undoList[index].fileNo
					})
				}else{
					uni.navigateTo({
						url:'/pages/undo/flow-timeline?fileNo='+_this.undoList[index].fileNo
					})
				}
				
			},
			noteManage(e){
				console.log("noteManage: " + JSON.stringify(e.currentTarget.dataset.item));
			},
			tabSelect(e) {
				if(this.TabCur == e.currentTarget.dataset.id){
					return;
				}
				this.TabCur = e.currentTarget.dataset.id;
				
				//如果是切换，且页面没有数据才自动触发刷新
				if(this.currPage[this.TabCur] == 0){
					this.getData();
				}else{
					this.undoList = this.list[this.TabCur]
				}
				
			},
			getData(){
				var _this = this; 
				var data = {};
				data.userId = _this.userId;
				data.flag = this.TabCur;
				data.pages = this.currPage[this.TabCur]++;
				data.number = 20;
				     
				console.log("currPage:"+JSON.stringify(this.currPage));
				this.commRequest('/app/getUndoList',data,function(res){
					console.log("res: " + JSON.stringify(res));
					if(_this.currPage[_this.TabCur] == 1){
						_this.undoList = res.list;
						_this.list[_this.TabCur] = res.list
					}else{
						_this.undoList = _this.undoList.concat(res.list);
						_this.list[_this.TabCur] = _this.list[_this.TabCur].concat(res.list);
					}
					
					if(res.list < 9){
						_this.showMore[_this.TabCur] = false;
					}else{
						_this.showMore[_this.TabCur] = true;
					}
					_this.undos = res.unDoNum;
				})
			},
			doneTimeStr(timeStr){
				return utils.get_time_str(timeStr);
			},
			getLoanName(ids){
				return utils.getLoanName(ids);
			},
			queryQuestion(e){
				console.log("queryQuestion: " + JSON.stringify(e.currentTarget.dataset.item));
			},
			commitQuestion(e){
				console.log("commitQuestion: " + JSON.stringify(e.currentTarget.dataset.item));
			},
			loginApp:function(e){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
		}
	}
</script>

<style>

</style>
