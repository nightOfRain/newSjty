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
						<text class="cuIcon-title text-blue">{{item.address}}</text>
					</view>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
		
				<view class="flex flex-wrap padding solid-top">
					<view class="basis-fl padding-bottom-xs" :class="item.orgnName==''?'text-red':''">合作机构：{{item.orgnName==''?'还未选定合作机构':item.orgnName}}</view>
					<view class="basis-fl padding-bottom-xs">{{'审贷银行：'+item.bankName}}</view>
					<view class="basis-fl padding-bottom-xs dashed-bottom margin-bottom-xs">{{'评估总价：'+item.totalprice+' 万'}}</view>
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
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>贷款情况-{{selectedItem.typeName}}
						</view>
					</view>
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left">
						<view class="basis-df padding-bottom-xs">{{'房屋坐落：'+selectedItem.jkrXm}}</view>
						<view class="basis-fl padding-bottom-xs">{{'银行支行名称：'+selectedItem.bankName}}</view>
						<view class="basis-fl padding-bottom-xs">{{'价值时点：'+selectedItem.bankName}}</view>
						
					</view>
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>结算情况
						</view>
					</view>
					<view class="flex flex-wrap bg-white padding padding-tb-xs solid-top text-left padding-bottom-xl">
						<view class="basis-df">{{'单价：'+selectedItem.realAmt+' 元/平方米'}}</view>
						<view class="basis-df">{{'总价：'+selectedItem.pgzj+' 万'}}</view>
						<view class="basis-df">{{'所在层数：'+selectedItem.ysTotal+' 层'}}</view>
						<view class="basis-df">{{'总层数：'+selectedItem.dsFy+' 层'}}</view>
						<view class="basis-df">{{'建筑面积：'+selectedItem.discount}}</view>
						<view class="basis-df">{{'建成年份：'+selectedItem.sfJe}}</view>
						<view class="basis-df">{{'建筑结构：'+selectedItem.discount}}</view>		
						<view class="basis-df">{{'层高：'+selectedItem.sfJe}}</view>
						<view class="basis-df">{{'朝向：'+selectedItem.discount}}</view>
						<view class="basis-df">{{'房型：'+selectedItem.sfJe}}</view>
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
				level: 3
			}
		},
		methods: {
			change(data){
				console.log("change:"+JSON.stringify(data));
				this.places = data.map(i=>i.name);
			},
			showAddress(){
				this.visible = true;
			},
			formSubmit: function(e) {
				var _this = this;
				
				var formdata = e.detail.value;
				formdata.City = _this.places[1];
				formdata.Area = _this.places[2];
				
				console.log("formSubmit:"+JSON.stringify(e));
				
			}
		}
	}
</script>

<style>

</style>
