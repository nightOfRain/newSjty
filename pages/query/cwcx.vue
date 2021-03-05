<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">财务查询</block>
		</cu-custom>
		
		<view class="cu-form-group">
			<view class="title">借款人</view>
			<input placeholder="输入借款人姓名"  :value="jkrXm"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售经理</view>
			<input placeholder="输入销售经理姓名"  :value="xsjlName"></input>
		</view>
		<view class="cu-form-group" @click="modeShow">
			<view class="title">合作机构</view>
			<input placeholder="请输入合作机构"  :value="hzjgName" disabled="true"></input>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<radio-group class="block solid-top" @change="RadioChange">
			<view class="cu-form-group">
				<view class="title">付款状态</view>
				<view class="flex">
					<radio class='flex-sub padding-sm blue radio' :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0">全部</radio>
					<radio class='flex-sub padding-sm blue radio' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1">未付</radio>
					<radio class='flex-sub padding-sm blue radio' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2">已付</radio>
				</view>
			</view>
		</radio-group>
		<view class="flex  p-xs mb-sm solid-top">
			<view class="flex-twice bg-white padding-sm">
				<picker mode="date" :value="startDate" start="2015-09-01" end="2030-09-01" @change="startDateChange">
					<view class="picker text-center padding-sm bg-gray">
						{{startDate==''?'开始时间':startDate}}
					</view>
				</picker>
			</view>
			<view class="flex-twice bg-white padding-sm">
				<picker mode="date" :value="endDate" start="2015-09-01" end="2030-09-01" @change="endDateChange">
					<view class="picker text-center padding-sm bg-gray">
						{{endDate==''?'结束时间':endDate}}
					</view>
				</picker>
			</view>
		</view>
		<view class="padding-xs bg-white padding-lr-xl">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="initData()">
				 提交
			</button>
		</view>
		
		<block v-if="loopResult.length>0">
			<view class="flex flex-wrap padding solid-top bg-white">
				<view class="basis-df padding-bottom-xs text-center">{{'总笔数：'+loopResult.length+' 笔'}}</view>
				<view class="basis-df padding-bottom-xs text-center">{{'总金额：'+totalAmt+' 元'}}</view>
			</view>
			<view class="padding-xs bg-white margin-top" v-for="(item,index) in loopResult" :key="index" @click="findMore" :data-index="index"> 
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue">{{item.typeName}}</text>
					</view>
					<text class="lg text-gray cuIcon-right"></text>
				</view>

				<view class="flex flex-wrap padding solid-top">
					<view class="basis-fl padding-bottom-xs" :class="item.orgnName==''?'text-red':''">合作机构：{{item.orgnName==''?'还未选定合作机构':item.orgnName}}</view>
					<view class="basis-fl padding-bottom-xs">{{'审贷银行：'+item.bankName}}</view>
					<view class="basis-fl padding-bottom-xs dashed-bottom margin-bottom-xs">{{'终审时间：'+item.checkTime}}</view>
					
					<view class="basis-df padding-bottom-xs">{{'借款人：'+item.jkrXm}}</view>
					<view class="basis-df padding-bottom-xs" :class="item.mfXm==''?'text-red':''">产权人：{{item.mfXm==''?'未知':item.mfXm}}</view>	
					<view class="basis-df padding-bottom-xs">{{'评估总价：'+item.pgzj+' 万'}}</view>
					<view class="basis-df padding-bottom-xs">{{'贷款金额：'+item.realAmt+' 万'}}</view>
					<view class="basis-df">{{'应缴费用：'+item.ysTotal+' 元'}}</view>
					<view class="basis-df">{{'实缴金额：'+item.sfJe+' 元'}}</view>
					<view class="basis-df">{{'会员优惠金额：'+item.discount+' 元'}}</view>
					<view class="basis-df" :class="item.flag==0?'text-red':'text-green'">{{item.flag=='0'?'未付款':'已🌧于'+item.skTime+'结清'}}</view>
				</view>
		
			</view>
		</block>
		<view class="cu-modal bottom-modal" :class="modalShow?'show':''" >
			<view class="cu-dialog" style="padding-bottom:128upx;" :style="[{height:dialogHeight+'px'}]">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="refreshTap">刷新</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				
				<view class="cu-bar search bg-white solid-bottom"   style="padding-top:10upx;height:128upx;">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @input="InputIn" :adjust-position="false" type="text" placeholder="搜索合作机构" style="text-align: left;" confirm-type="search"></input>
					</view>
					<view class="action" @click="searchTap">
						<button class="cu-btn bg-green shadow-blur round">搜索</button>
					</view>
				</view>
				
				<view class="cu-item solid-bottom" v-for="(item,index) in hzjgResultList" :key="index">
					<view class="cu-form-group" @click="hzjgTap" :data-name="item.orgnName" :data-orgnid="item.orgnId">
						<view class="title">{{item.orgnManagerName}}:{{item.orgnName}}</view>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				<view  class="padding-xs" v-if="searchKey.length < 2">
					<text class="text-blue">请输入两个以上关键字搜索</text>
				</view>
				
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="MoreShow?'show':''" >
			<view class="cu-dialog" style="padding-bottom:128upx;" :style="[{height:dialogHeight+'px'}]">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideMore">确定</view>
					<view class="action text-blue" @tap="hideMore">关闭</view>
				</view>
				<scroll-view scroll-y="true" :style="[{height:dialogHeight-40+'px'}]">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>贷款情况-{{selectedItem.typeName}}
						</view>
					</view>
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left">
						<view class="basis-df padding-bottom-xs">{{'借款人：'+selectedItem.jkrXm}}</view>
						<view class="basis-df padding-bottom-xs">销售经理：{{selectedItem.mfXm}}</view>	
						<view class="basis-fl padding-bottom-xs " :class="selectedItem.orgnName==''?'text-red':''">合作机构：{{selectedItem.orgnName==''?'还未选定合作机构':selectedItem.orgnName}}</view>
						<view class="basis-fl padding-bottom-xs">{{'审贷银行：'+selectedItem.bankName}}</view>
						<view class="basis-fl padding-bottom-xs">{{'房产地址：'+selectedItem.fcDz}}</view>
						<view class="basis-fl padding-bottom-xs">{{'终审时间：'+selectedItem.checkTime}}</view>
						<view class="basis-fl padding-bottom-xs">{{'抵押时间：'+selectedItem.pledgeTime}}</view>
						<view class="basis-fl padding-bottom-xs">{{'放款时间：'+selectedItem.loanTime}}</view>
					</view>
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>结算情况
						</view>
					</view>
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left padding-bottom-xl">
						<view class="basis-df">{{'贷款金额：'+selectedItem.realAmt+' 万'}}</view>
						<view class="basis-df">{{'评估总价：'+selectedItem.pgzj+' 万'}}</view>
						<view class="basis-df">{{'应缴费用：'+selectedItem.ysTotal+' 元'}}</view>
						<view class="basis-df">{{'代收金额：'+selectedItem.dsFy+' 元'}}</view>
						<view class="basis-df">{{'实缴金额：'+selectedItem.sfJe+' 元'}}</view>
						<view class="basis-df">{{'优惠金额：'+selectedItem.discount+' 元'}}</view>
						<view class="basis-df padding-bottom-xs">{{'会员余额：'+selectedItem.balance+' 元'}}</view>
						<view class="basis-df padding-bottom-xs" :class="selectedItem.flag==0?'text-red':'text-green'">{{selectedItem.flag=='0'?'未付款':'已于'+selectedItem.skTime+'结清'}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils.js'
	export default {
		data() {
			return {
				jkrXm:'',
				xsjlName:'',
				hzjgId:'',
				startDate:'',
				endDate:'',
				radio:0,
				hzjgName:'',
				modalShow:false,
				MoreShow:false,
				loopResult:[],
				searchKey:'',
				hzjgList:[],
				hzjgResultList:[],
				totalAmt:'',
				selectedItem:'',
				dialogHeight:0
			}
		},
		methods: {
			initData:function(){
				var _this = this;
				var data = {
					jkrXm:_this.jkrXm,
					xsjlName:_this.xsjlName,
					startDate:_this.startDate,
					endDate:_this.endDate,
					flag:_this.radio
				};
				if(!utils.isEmpty(_this.hzjgId)){
					data.hzjgId = _this.hzjgId
				}
				_this.commRequest('6027', data, function(res){
					
					_this.loopResult = res.responseData.loopResult;
					var amt = 0.00;
					for(var i = 0; i < res.responseData.loopResult.length; i++){
						amt+=res.responseData.loopResult[i].ysTotal*1.00;
					}
					_this.totalAmt = amt;
				});
			},
			startDateChange(e) {
				this.startDate = e.detail.value
			},
			endDateChange(e) {
				this.endDate = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			modeShow(e){
				this.modalShow = true;
			},
			hideModal(e){
				this.modalShow = false;
			},
			InputIn(e){
				this.searchKey = e.detail.value;
				if(this.searchKey.length > 1){
					this.searchTap();
				}else{
					this.hzjgResultList=[];
					this.hzjgId = '';
					this.hzjgName = '';
				}
			},
			/**
			 * @param {Object} e
			 * 根据关键字回显评估公司信息
			 */
			searchTap(e){
				//根据关键字显示结果
				console.log("searchTap:"+this.searchKey);
				
				if(this.searchKey.length<1){
					return;
				}
				let tmpArray = this.hzjgList;
				let tmpResultArray = [];
				for(var i = 0; i < tmpArray.length; i++){
					if(tmpArray[i].orgnName.match(this.searchKey)){
						tmpResultArray.push(tmpArray[i]);
					}
				}
				this.hzjgResultList = tmpResultArray;
			},
			refreshTap(e){
				var _this = this;
				//获取渠道信息
				var data = {};
				_this.commRequest('6041', data, function(res){
					
					
					_this.hzjgList = res.responseData.loopResult;
					//_this.hzjgResultList = _this.hzjgList;
					uni.setStorage({
						key: "hzjgList",
						data: res.responseData.loopResult,
						success: function () {
							console.log('success');
						}
					});
				});
			},
			/**
			 * @param {Object} e
			 * 选择合作机构
			 */
			hzjgTap:function(e){
				console.log("hzjgTap:"+JSON.stringify(e));
				this.hzjgId = e.currentTarget.dataset.orgnid;
				this.hzjgName = e.currentTarget.dataset.name;
				this.modalShow = false;
			},
			/**
			 * @param {Object} e
			 * 查看详情
			 */
			findMore:function(e){
				console.log("findMore:"+JSON.stringify(e));
				var tmpItem = this.loopResult[e.currentTarget.dataset.index];
				console.log("tmpItem:"+JSON.stringify(tmpItem));
				this.MoreShow = true;
				this.selectedItem = tmpItem;
			},
			/**
			 * @param {Object} options
			 * 关闭详情
			 */
			hideMore:function(){
				this.MoreShow = false
			}
		},
		onLoad(options) {
			var _this = this;
			//合作机构信息优先取本地缓存，如果没有再重新获取最新信息
			this.hzjgList = uni.getStorageSync("hzjgList");
			
			if(utils.isEmpty(_this.hzjgList)){
				_this.refreshTap();
			}
			uni.getSystemInfo({
				success: (res) => {
					_this.dialogHeight = res.windowHeight*0.7;
				}
			})
		}
	}
</script>

<style>

</style>
