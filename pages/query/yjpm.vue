<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">业绩排名</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
		</scroll-view>
		<view class="flex nav fixed" :style="[{top:FixedBar + 'px'}]">
			<view class="flex-twice bg-white padding-sm">No.名称</view>
			<view class="flex-sub bg-white padding-sm" :class="tapIndex==0?'text-green':''" @click="array_sort(0)">签单量</view>
			<view class="flex-sub bg-white padding-sm" :class="tapIndex==1?'text-green':''" @click="array_sort(1)">终审量</view>
			<view class="flex-sub bg-white padding-sm" :class="tapIndex==2?'text-green':''" @click="array_sort(2)">放款量</view>
		</view>
		<block v-if="TabCur==0">
			<view class="bg-white" style="margin-top:80upx;padding-bottom:160upx;">			
				<view class="flex solid-bottom" v-for="(item,index) in teamData" :key="item.orgnId" :data-id="item.orgnId" @click="teamTap" hover-class="hover-class">
					<view class="flex-twice padding-sm"  :class="index>2?' bg-white':'bg-gray'">
						<text class='cuIcon-upstagefill text-orange' v-if="index==0"></text>
						<text class='cuIcon-upstagefill text-grey' v-if="index==1"></text>
						<text class='cuIcon-upstagefill text-gray' v-if="index==2"></text>
						{{index>2?index+1+'.':''}}{{item.orgnName}}
					</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.qdNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-gray':'bg-grey'">{{item.shNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.fkNum}}</view>
				</view>
			</view>		
		</block>
		<block v-if="TabCur==1">
			<view class="bg-white" style="margin-top:80upx;padding-bottom:160upx;">			
				<view class="flex solid-bottom" v-for="(item,index) in saleData" :key="item.userId" :data-id="item.userId" @click="saleTap" hover-class="hover-class">
					<view class="flex-twice padding-sm" :class="index>2?' bg-white':'bg-gray'">
						<text class='cuIcon-upstagefill text-orange' v-if="index==0"></text>
						<text class='cuIcon-upstagefill text-grey' v-if="index==1"></text>
						<text class='cuIcon-upstagefill text-gray' v-if="index==2"></text>
						{{index>2?index+1+'.':''}}{{item.userName}}
					</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.qdNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-gray':'bg-grey'">{{item.shNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.fkNum}}</view>
				</view>
			</view>
		</block>
		<block v-if="TabCur==2">
			<view class="bg-white" style="margin-top:80upx;padding-bottom:160upx;">			
				<view class="flex solid-bottom" v-for="(item,index) in branData" :key="item.bankId" :data-id="item.bankId" @click="bankTap" hover-class="hover-class">
					<view class="flex-twice padding-sm"  :class="index>2?' bg-white':'bg-gray'">
						<text class='cuIcon-upstagefill text-orange' v-if="index==0"></text>
						<text class='cuIcon-upstagefill text-grey' v-if="index==1"></text>
						<text class='cuIcon-upstagefill text-gray' v-if="index==2"></text>
						{{index>2?index+1+'.':''}}{{item.bankName}}
					</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.qdNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-gray':'bg-grey'">{{item.shNum}}</view>
					<view class="flex-sub padding-sm" :class="index%2==0?'bg-grey':'bg-gray'">{{item.fkNum}}</view>
				</view>
			</view>
		</block>
		<view class="myfoot" :style="[{bottom:InputBottom+'px'}]">
			<view class="flex  p-xs mb-sm">
				<view class="flex-twice bg-white padding-sm">合计：</view>
				<view class="flex-sub bg-white padding-sm" :class="tapIndex==0?'text-green':''">{{totalItem[TabCur].qdTotal}}笔</view>
				<view class="flex-sub bg-white padding-sm" :class="tapIndex==1?'text-green':''">{{totalItem[TabCur].zsTotal}}笔</view>
				<view class="flex-sub bg-white padding-sm" :class="tapIndex==2?'text-green':''">{{totalItem[TabCur].fkTotal}}笔</view>
			</view>
			<view class="flex  p-xs mb-sm">
				<view class="flex-twice bg-white padding-sm">
					<picker mode="date" :value="startTime" start="2015-09-01" end="2030-09-01" @change="startDateChange">
						<view class="picker text-center padding-sm bg-gray">
							{{startTime==''?'开始时间':startTime}}
						</view>
					</picker>
				</view>
				<view class="flex-twice bg-white padding-sm">
					<picker mode="date" :value="endTime" start="2015-09-01" end="2030-09-01" @change="endTimeChange">
						<view class="picker text-center padding-sm bg-gray">
							{{endTime==''?'结束时间':endTime}}
						</view>
					</picker>
				</view>
				<view class="flex-sub bg-white padding-sm" @click="queryInfo">
					<button class="cu-btn bg-green shadow">
						查询
					</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		onLoad(options){
			var _this = this;
			console.log("layout.vue options:"+JSON.stringify(options));
			this.initData();
			console.log("TabCur:"+this.TabCur);
			uni.getSystemInfo({
				success: (res) => {
					console.log("getSystemInfo:"+JSON.stringify(res));
					_this.CustomBar = res.statusBarHeight+44;
					_this.FixedBar = res.statusBarHeight+94;
					console.log("_this.CustomBar="+_this.CustomBar);
				}
			})
		},
		data() {
			return {
				CustomBar: 20,
				FixedBar:60,
				TabCur: 0,
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				tabNav: ['团队排名', '销售经理', '支行签单'],
				startTime:'',
				endTime:'',
				teamData:[],
				saleData:[],
				branData:[],
				tmpTeamData:[],
				tmpSaleData:[],
				tmpBranData:[],
				InputBottom: 0,
				tapIndex:0,
				totalItem:[{
						qdTotal:0,
						zsTotal:0,
						fkTotal:0
				},{
						qdTotal:0,
						zsTotal:0,
						fkTotal:0
				},{
						qdTotal:0,
						zsTotal:0,
						fkTotal:0
				},],
			};
		},
		methods: {
			initData(){
				var _this = this;
				var data = {};
				data.startTime = this.startTime;
				data.endTime = this.endTime;
				_this.commRequest('6025', data, function(res){
					_this.teamData = res.responseData.branchOfficesRanking;
					_this.saleData = res.responseData.salesManagerRanking;
					_this.branData = res.responseData.branchRanking;
					_this.tmpTeamData = res.responseData.branchOfficesRanking;
					_this.tmpSaleData = res.responseData.salesManagerRanking;
					_this.tmpBranData = res.responseData.branchRanking;
				
					_this.bianLiArray(0, _this.teamData);
					_this.bianLiArray(1, _this.saleData);
					_this.bianLiArray(2, _this.branData);
				});
			},
			queryInfo(){
					this.initData();
			},
			bianLiArray:function(index, array){
				var fkTotal = 0;
				var qdTotal = 0;
				var zsTotal = 0;
				for( var i = 0; i < array.length; i++){
					qdTotal += array[i].qdNum;
					zsTotal += array[i].shNum;
					fkTotal += array[i].fkNum;
 				}
				
				this.totalItem[index].qdTotal = qdTotal;
				this.totalItem[index].zsTotal = zsTotal;
				this.totalItem[index].fkTotal = fkTotal;
			
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			teamTap:function(e){
				console.log("teamTap:"+e.currentTarget.dataset.id)
			},
			saleTap:function(e){
				console.log("saleTap:"+e.currentTarget.dataset.id)
			},
			bankTap:function(e){
				console.log("bankTap:"+e.currentTarget.dataset.id)
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			startDateChange(e) {
				this.startTime = e.detail.value
			},
			endTimeChange(e) {
				this.endTime = e.detail.value
			},
			//根据flag 0-签单量 1-批过量 2-放款量 3- 发放额 对数据源排序并跟新列表
			array_sort:function(index){
				var _this = this;
			    this.tapIndex = index;
				var tmpTeamData = _this.tmpTeamData;
				var tmpSaleData = _this.tmpSaleData;
				var tmpBranData = _this.tmpBranData;
				if(index == 0){//签单量
				   tmpTeamData.sort(function(b,a){
						return a.qdNum-b.qdNum;
					});
					tmpSaleData.sort(function(b,a){
						return a.qdNum-b.qdNum;
					});
					tmpBranData.sort(function(b,a){
						return a.qdNum-b.qdNum;
					});
				}else if(index == 1){//终审
					tmpTeamData.sort(function(b,a){
						return a.shNum-b.shNum;
					});
					tmpSaleData.sort(function(b,a){
						return a.shNum-b.shNum;
					});
					tmpBranData.sort(function(b,a){
						return a.shNum-b.shNum;
					});
				}else if(index == 2){//放款
					tmpTeamData.sort(function(b,a){
						return a.fkNum-b.fkNum;
					});
					tmpSaleData.sort(function(b,a){
						return a.fkNum-b.fkNum;
					});
					tmpBranData.sort(function(b,a){
						return a.fkNum-b.fkNum;
					});
				}
				
				_this.teamData = tmpTeamData;
				_this.saleData = tmpSaleData;
				_this.branData = tmpBranData;
			}
		}
	}
</script>

<style>
	page {
		padding-top: 45px;
		padding-bottom: 100upx;
	}
	.myfoot {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
	}
</style>
