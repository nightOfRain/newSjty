
<template>
	<view>
		<view class="padding flex flex-direction margin-top-xl" v-if="!loginStat" @click="loginApp">
			<button class="cu-btn bg-grey lg">请先登录</button>
		</view>
		<view class="cu-bar search bg-white fixed"   style="padding-top:40upx;height:128upx;" v-if="loginStat">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" style="text-align:left;line-height:16px;" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav fixed" style="top:128upx" v-if="loginStat">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					<!-- <view class="cu-tag badge" v-if="undos[index]!=0">
						<block v-if="undos[index]!=1">{{undos[index]>99?'99+':undos[index]}}</block>
					</view> -->
					{{Tab[index]+' '}}<text class="text-xs" :class="index==TabCur?'text-orange':''">{{undos[index]>99?'99+':undos[index]}}</text>
				</view>
			</view>
		</scroll-view>
		

		<view class="cu-card dynamic no-card" style="margin-top:216upx;padding-bottom:216upx;" v-if="loginStat">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item"  v-for="(item,index) in undoList" :key="index">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="flex justify-between">
								<text class="text-grey">{{getLoanName(item.loanType)}}-{{item.bankName}}</text>
								<text class="text-grey text-xs">{{doneTimeStr(item.dynamicTime)}}</text>
							</view>
							<view class="text-gray text-content text-df" style="margin-top:24upx;">
								{{item.jkrXm}}的案卷：目前处于【{{item.flowName}}】环节!
									
							
							</view>
							<view class="bg-brown padding-sm radius margin-top-sm  text-sm">
								<view class="flex" v-if="item.createTime">
									<view>签单时间：</view>
									<view class="flex-sub">{{item.createTime}}</view>
								</view>
								<view class="flex" v-if="item.reportTime">
									<view>报批时间：</view>
									<view class="flex-sub">{{item.reportTime}}</view>
								</view>
								<view class="flex" v-if="item.checkTime">
									<view>终审时间：</view>
									<view class="flex-sub">{{item.checkTime}}</view>
								</view>
								<view class="flex" v-if="item.loanTime">
									<view>放款时间：</view>
									<view class="flex-sub">{{item.loanTime}}</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df"></view>
								<view>
									<text class="cuIcon-appreciatefill" :class="item.dynamicState==1?'text-red':'text-green'" v-if="loginUserId==item.userId" @click="doBySlef" :data-item="item.fileNo">{{item.flowNo == '1'?'补充资料':'立即处理'}}</text>
									<text class="cuIcon-appreciatefill" :class="item.dynamicState==1?'text-red':'text-green'" v-else @click="doByOther" :data-item="item.fileNo">查看详情</text>
									
									<text class="cuIcon-messagefill text-gray margin-left-sm" v-if="!isZhongjie && (item.question == 1)" @click="queryQuestion" :data-item="item">中介问题</text>
									<text class="cuIcon-messagefill text-gray margin-left-sm" v-if="isZhongjie" @click="commitQuestion" :data-item="item">案卷加急</text>
								</view>
							</view>
						</view>
					</view>

				
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
				undoList: [],
				undos:['0','0','0','0'],
				isZhongjie:false,
				loginUserId:'',
				loginStat:false,
				TabCur:0,
				Tab:['面签','待终审','待放款','其他']
			};
		},
		mounted(){
			var _this = this;
			var userInfo = uni.getStorageSync("userInfo");
			_this.loginStat = userInfo.loginStat;
			_this.loginUserId = userInfo.userId;
			
			if(_this.loginStat){
				this.refreshData();
			}
			//页面间通讯监听
			uni.$on('update', this.updated);
		},
		methods: {
			updated:function(e){
				this.refreshData();
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			doBySlef(e){
				console.log("doBySlef: " + JSON.stringify(e.currentTarget.dataset.item));
				uni.navigateTo({
					url:'/pages/undo/flow_done?fileNo='+e.currentTarget.dataset.item
				})
			},
			doByOther(e){
				var _this = this;
				console.log("doByOther: " + JSON.stringify(e.currentTarget.dataset.item));
				uni.navigateTo({
					url:'/pages/undo/flow-timeline?fileNo='+e.currentTarget.dataset.item
				})
				
				// uni.navigateTo({
				// 	url:'/pages/undo/flow_done?fileNo='+e.currentTarget.dataset.item
				// })
			},
			noteManage(e){
				console.log("noteManage: " + JSON.stringify(e.currentTarget.dataset.item));
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				//this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.refreshData();
			},
			refreshData(){
				var _this = this; 
				var data = {};
				data.userId = _this.userId;
				data.type = this.TabCur;
				data.pages = 1;
				data.number = 20;
				     
				this.commRequest('6017',data,function(res){
					console.log("res: " + JSON.stringify(res));
					
					_this.undoList = res.responseData.unDoFileDynamicList;
					var unDoNum = res.responseData.unDoFileNum;
					var tmpNum = [];
					tmpNum.push(unDoNum.mqNum);
					tmpNum.push(unDoNum.zsNum);
					tmpNum.push(unDoNum.fkNum);
					tmpNum.push(unDoNum.qtNum);
					console.log("tmpNum: ",tmpNum);
					_this.undos = tmpNum;
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
