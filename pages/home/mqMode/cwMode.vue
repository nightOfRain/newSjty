<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">财务信息</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">评估费</view>
				<input placeholder="请输入评估费" type="digit" name="ysPgf" :value="formdata.ysPgf"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">担保费</view>
				<input placeholder="请输入担保费" type="digit" name="ysDbf" :value="formdata.ysDbf"></input>
				
			</view>
			<view class="cu-form-group">
				<view class="title">服务费</view>
				<input placeholder="请输入服务费" type="digit" name="ysFwf" :value="formdata.ysFwf"></input>			
				
			</view>
			<view class="cu-form-group">
				<view class="title">资料费</view>
				<input placeholder="请输入资料费" type="digit" name="ysZlf" :value="formdata.ysZlf"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">其他费用</view>
				<input placeholder="请输入其他费用" type="digit" name="ysQtfy" :value="formdata.ysQtfy"></input>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">代收金额</view>
				<input placeholder="请输入代收金额" type="digit" name="dsFy" :value="formdata.dsFy"></input>			
			</view>
			<view class="cu-form-group">
				<view class="title">应返金额</view>
				<input placeholder="请输入应返金额" type="digit" name="yfFy" :value="formdata.yfFy"></input>
			</view>
			
			<view class="padding-xl">
				<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
					 提交
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import utils from '../../../utils.js'; 
	export default {
		data() {
			return {				
				picker_gq:['按揭','全额付款'],
				picker_hk:['等额本金','等额本息','先息后本','等本等息','一次性还款'],
				fileNo:'',
				formdata:{
					jyFkfs:-1,
				},
			};
		},
		methods: {
			
			
			PickerChange(e){
				this.formdata.hkFs = e.detail.value
			},
		
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;

				formdata.hkFs = _this.formdata.hkFs+1;
				
				console.log('表单数据内容：' +JSON.stringify(formdata));
				
				//合并两个JSON
				_this.formdata = utils.twoJsonMerge(_this.formdata, formdata);
				
				console.log("更新后案卷数据:"+JSON.stringify(_this.formdata));

				uni.setStorageSync(_this.fileNo+"_tmpData", JSON.stringify(_this.formdata));
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			_this.fileNo = options.fileNo;
			
			var tmpData = uni.getStorageSync(options.fileNo+"_tmpData");
			console.log("jy onLoad:"+JSON.stringify(tmpData));
			if(!utils.isEmpty(tmpData)){
				 _this.formdata = utils.twoJsonMerge(_this.formdata,tmpData);
			}
		}
	}
</script>

<style>
	input{
		text-align: right;
	}
	.switch-Text{
		width: 50%;
		text-align: right;
		
	}
</style>
