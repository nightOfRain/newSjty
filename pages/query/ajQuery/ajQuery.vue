<template>
	<view>
		<scroll-view :scroll-y="true" class="page show">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">案卷查询</block>
			</cu-custom>
			<form @submit="formSubmit">
				<view class="cu-form-group">
					<view class="title">姓  名</view>
					<input placeholder="输入产权人姓名" name="jkrXm" :value="jkrXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入证件号码" type="idcard" name="jkrSfzh" :value="jkrSfzh"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="jkrLxfs" :value="jkrLxfs"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				
				<view class="cu-form-group">
					<view class="title">开始日期</view>
					<picker mode="date" :value="begin_date" start="2015-09-01" end="2020-09-01" @change="DateBeginChange">
						<view class="picker">
							{{begin_date==''?'请选择开始日期':begin_date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">结束日期</view>
					<picker mode="date" :value="end_date" start="2015-09-01" end="2020-09-01" @change="DateEndChange">
						<view class="picker">
							{{end_date==''?'请选择结束日期':end_date}}
						</view>
					</picker>
				</view>
				<view class="padding-xl">
					<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
						 提交
					</button>
				</view>
			</form>
			<view class="cu-bar bg-white solid-bottom" v-if="resultList.length > 0">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 查询结果
				</view>
			</view>
			<view class="cu-list  menu-avatar">
				<view class="cu-item" v-for="(item,index) in resultList" :key="index" @click="findInfoByFineNo" :data-fileno="item.fileNo">
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="text-grey" style="width: 100%;">{{'借款人：'+item.jkrXm==''?'面签人员还未录入借款人姓名':item.jkrXm}}				
	
						</view>
						<view class="text-gray text-sm flex ">
							<view class="text-cut">
								{{item.orgnName==''?'面签人员还未录入合作机构':item.orgnName}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.fileNo.substring(4,6)+'-'+item.fileNo.substring(6,8)}}</view>
						
					</view>
					
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import utils from '../../../utils.js'; 
	export default {
		data() {
			return {
				begin_date:'',
				end_date:'',
				resultList:[],
				fileNo:'',
				jkrLxfs:'',
				jkrSfzh:'',
				jkrXm:''
			}
		},
		methods: {
			//开始时间
			DateBeginChange:function(e){
				this.begin_date = e.detail.value
			},
			//结束时间
			DateEndChange:function(e){
				this.end_date = e.detail.value
			},
			//跳转到详细信息页面
			findInfoByFineNo:function(e){
				var fileNo = e.currentTarget.dataset.fileno;
				
				uni.navigateTo({
					url:'/pages/undo/flow-timeline?fileNo='+fileNo
				})
			},
			formSubmit: function(e) {
				var _this = this;
				
				var formdata = e.detail.value;
				
				var data={
					userType:'1',
				};
				
				if(!utils.isEmpty(_this.begin_date)){
					data.startDate = _this.begin_date;
				}
				
				if(!utils.isEmpty(_this.end_date)){
					data.endDate = _this.end_date;
				}
				
				data = utils.twoJsonMerge(data, formdata);
				
				_this.commRequest('6021', data, function(res){
					
					_this.resultList = res.responseData.fileStreamlineInfoList;
					
				});
				
			}
		},
		onLoad(options){
			var _this = this;

		
		}
	}
</script>

<style>
.cu-list.menu-avatar>.cu-item .content {
	position: absolute;
	left: 146upx;
	width: calc(100% - 96upx );
	line-height: 1.6em;
}
</style>
