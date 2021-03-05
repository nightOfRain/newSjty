<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">贷款信息</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">公贷金额</view>
				<input placeholder="请输入公贷金额" type="digit" name="gjjLoanAmt" :value="formdata.gjjLoanAmt"></input>
				<text class='text-black'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">商贷金额</view>
				<input placeholder="请输入商贷金额" type="digit" name="LoanAmt" :value="formdata.LoanAmt"></input>
				<text class='text-black'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款期限</view>
				<input placeholder="请输入商贷金额" type="number" name="dkSqqx" :value="formdata.dkSqqx"></input>			
				<text class='text-black'>月</text>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款用途</view>
				<input placeholder="请输入贷款用途" name="dkYt" :value="formdata.dkYt"></input>
				<text class='text-black'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">还款方式</view>
				<picker @change="PickerChange" :value="formdata.hkFs" :range="picker_hk">
					<view class="picker">
						{{formdata.hkFs>-1?picker[formdata.hkFs]:'请选择还款方式'}}
					</view>
				</picker>
				
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
				 _this.formdata.hkFs -= 1;
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
