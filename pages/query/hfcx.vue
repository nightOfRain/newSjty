<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">在线查询</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">房屋区域</view>
				<view @click="showAddress">
				            {{ this.places.length ? this.places.join('/') : '请选择地点'}}
				        </view>
				        <jc-address-picker 
				        :level='level'
				        :places='places' 
				        :visible.sync='visible'
				        @change='change'
				        ></jc-address-picker>
			</view>
			<view class="cu-form-group">
				<view class="title">所属街道</view>
				<input placeholder="输入所属街道" name="Street" :value="Street"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">小区名称</view>
				<input placeholder="输入小区名称" name="EstateName" :value="EstateName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">楼栋号</view>
				<input placeholder="输入楼栋号" name="BuildingNo" :value="BuildingNo"></input>
			</view>
			<view class="padding-xl">
				<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
					 提交
				</button>
			</view>
		</form>

		
		<block v-if="loopResult.length>0">
	
			<view class="padding-xs bg-white margin-top" v-for="(item,index) in loopResult" :key="index" @click="findMore" :data-index="index"> 
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="text-blue">{{item.ProjectName}}</text>
					</view>
					
				</view>
		
				<view class="flex flex-wrap padding solid-top">
	
					<view class="basis-fl padding-bottom-sm"><text class="text-bold">银行名称：</text>{{item.BankNameNew}}</view>
					<view class="basis-df padding-bottom-xs"><text class="text-bold">评估总价：</text>{{item.Totalprice+' 万'}}</view>
					<view class="basis-df padding-bottom-xs"><text class="text-bold">评估类型：</text>{{item.Flag==0?'预评':'正评'}}</view>
					
				</view>
				<view class="padding flex justify-between" style="padding-top:5px;">
					<view class="text-gray text-df">价值时点：{{item.JudgeDate}}</view>
					<view>
						<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
					</view>
				</view>
		
			</view>
		</block>
		
		<view class="cu-modal bottom-modal" :class="MoreShow?'show':''" >
			<view class="cu-dialog" style="padding-bottom:128upx;" :style="[{height:dialogHeight+'px'}]">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideMore">确定</view>
					<view class="action text-blue" @tap="hideMore">关闭</view>
				</view>
				<scroll-view scroll-y="true" :style="[{height:dialogHeight-40+'px'}]">
					<view class="cu-bar bg-white solid-bottom margin-five">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>房屋情况
						</view>
					</view>
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left">
						<view class="basis-fl padding-bottom-xs"><text class="text-bold">房屋坐落：</text>{{selectedItem.ProjectName}}</view>
						<view class="basis-fl padding-bottom-xs"><text class="text-bold">银行支行名称：</text>{{selectedItem.BankNameNew}}</view>
						<view class="basis-df padding-bottom-xs"><text class="text-bold">价值时点：</text>{{selectedItem.JudgeDate}}</view>
						<view class="basis-df padding-bottom-xs"><text class="text-bold">评估类型：</text>{{selectedItem.Flag==0?'预评':'正评'}}</view>
					</view>
				
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left padding-bottom-xl margin-five">
						<view class="basis-df"><text class="text-bold">单价：</text>{{selectedItem.Unitprice+' 元/平方米'}}</view>
						<view class="basis-df"><text class="text-bold">总价：</text>{{selectedItem.Totalprice+' 万'}}</view>
						<view class="basis-df"><text class="text-bold">所在层数：</text>{{selectedItem.Layer+' 层'}}</view>
						<view class="basis-df"><text class="text-bold">总层数：</text>{{selectedItem.SumLayer+' 层'}}</view>
						<view class="basis-df"><text class="text-bold">建筑面积：</text>{{selectedItem.Area}}平米</view>
						<view class="basis-df"><text class="text-bold">公摊面积：</text>{{selectedItem.ApportionArea}}平米</view>
						<view class="basis-df"><text class="text-bold">建成年份：</text>{{selectedItem.BuildYear}}</view>
						<view class="basis-df"><text class="text-bold">建筑结构：</text>{{selectedItem.BuildStructure}}</view>		
						<view class="basis-df"><text class="text-bold">层高：</text>{{selectedItem.FloorHeight}}米</view>
						<view class="basis-df"><text class="text-bold">朝向：</text>{{selectedItem.Orientation}}</view>
						<view class="basis-df"><text class="text-bold">房型：</text>{{selectedItem.HouseStyle}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import jcAddressPicker from '@/components/jc-address-picker/jc-address-picker.vue'
	export default {
		data() {
			return {
				loopResult:[],
				City:'',
				Area:'',
				Street:'',
				EstateName:'',
				BuildingNo:'',
				Key:'',
				Secret:'',
				places: ['湖北省','武汉市','武昌区'],
				visible: false,
				level: 3,
				hftoken:'',
				selectedItem:{
					ProjectName:'',
					BankNameNew:'',
					Flag:0,
					UnitPrice:0,
					TotalPrice:0,
					JudgeDate:'',
					Layer:'',
					SumLayer:'',
					BuildYear:'',
					BuildStructure:'',
					FloorHeight:'',
					Orientation:'',
					HouseStyle:'',
					Area:'',
					ApportionArea:''
					
				},
				MoreShow:false,
				dialogHeight:0
			}
		},
		onLoad() {
			var _this = this;
			//获取TOEKN
			this.getToken();
			
			uni.getSystemInfo({
				success: (res) => {
					_this.dialogHeight = res.windowHeight*0.7;
				}
			})
				
		},
		methods: {
			change(data){
				console.log("change:"+JSON.stringify(data));
				this.places = data.map(i=>i.name);
			},
			showAddress(){
				this.visible = true;
			},
			findMore(e){
				console.log("findMore:"+JSON.stringify(e));
				var index = e.currentTarget.dataset.index;
				this.selectedItem = this.loopResult[index];
				this.MoreShow = true;
			},
			hideMore(){
					this.MoreShow = false;
			},
			/**
			 * 获取Token
			 */
			getToken(){
				var data = {};
				var _this = this;
				data.HandlerType = "GetToken";
				data.Key = 'F7B5283A7C514B34A62C';
				data.Secret = '3F4F3EB4F58E4FA2817E56A13A4E94A3';
				
				uni.request({
				    url: 'http://www.hongfang.cc/ERPV3/API/SJYJR/SJYJRHandler.ashx', //仅为示例，并非真实接口地址。
				    data:data,
				    method:'POST',
				    dataType:'application/json',
				    header: {
				    	"Content-Type": "application/x-www-form-urlencoded",
				    },
				    success: (res) => {
						console.log("gettoken sucess:"+res.data);
						res = res.data;
						res = JSON.parse(res);
						_this.hftoken = res.data;
					},
					complete: (res) => {
					    	console.log("gettoken complete:"+JSON.stringify(res))
					}
				});
			},
			/**
			 * @param {Object} e
			 * 获取评估信息
			 */
			formSubmit: function(e) {
				var _this = this;
				
				var formdata = e.detail.value;
				
				
				var data={}
				data.HandlerType="GetReportInfo";

				 data.City = _this.places[1].replace("市","");
				 data.Area = _this.places[2].replace("区","");
				//data.City = '';
				//data.Area = '';
				data.Token = _this.hftoken;
				data.EstateName = formdata.EstateName;
				data.Street = formdata.Street;
				data.BuildingNo = formdata.BuildingNo;
				console.log("formSubmit:"+JSON.stringify(data));
				uni.request({
				    url: 'http://www.hongfang.cc/ERPV3/API/SJYJR/SJYJRHandler.ashx', //仅为示例，并非真实接口地址。
				    data:data,
				    method:'POST',
				    dataType:'application/json',
				    header: {
				    	"Content-Type": "application/x-www-form-urlencoded",
				    },
				    success: (res) => {
						console.log("gettoken sucess:"+JSON.stringify(res))
						res = res.data;
						res = JSON.parse(res);
						if(res.success){
							_this.loopResult = res.data;
						}else{
							if(res.msg.match('Token')){
								_this.getToken();
								uni.showModal({
									title:"房易通",
									content:res.msg+";系统已自动获取，请重新提交。"
								})
							}else{
								uni.showModal({
									title:"房易通",
									content:res.msg
								})
							}
						}
						
					},
					complete: (res) => {
					    	console.log("gettoken complete:"+JSON.stringify(res))
					}
				});
			}
		}
	}
</script>

<style>
.margin-five{
	margin-top:5px;
}
</style>
