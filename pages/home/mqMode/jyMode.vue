<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交易信息</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">成交总价</view>
				<input placeholder="请输入成交总价" type="digit" name="jyAmt" :value="formdata.jyAmt"></input>
				<text class='text-orange'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款金额</view>
				<input placeholder="请输入贷款金额" type="digit" name="jyLoanAmt" :value="formdata.jyLoanAmt"></input>
				<text class='text-orange'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">付款方式</view>
				<picker @change="PickerChange" :value="formdata.jyFkfs" :range="picker">
					<view class="picker">
						{{formdata.jyFkfs>-1?picker[formdata.jyFkfs]:'请选择付款方式'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" @click="getImageTap">
				<view class="title">图片上传</view>
				<input placeholder="请上传交易图片" disabled="true"></input>
				<text class='cuIcon-camera text-orange'></text>
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
				picker:['按揭','全额付款'],
				fileNo:'',
				formdata:{
					jyFkfs:-1,
				},
			};
		},
		methods: {
			
			
			PickerChange(e){
				this.jyFkfs = e.detail.value
			},
		
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
		
		
		
			getImageTap:function(e){
				var _this = this;
				uni.navigateTo({
					url:'/pages/home/getImages?fileNo='+_this.fileNo+"&index=7&type=1"
				})
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;

				
				formdata.jyFkfs = _this.formdata.jyFkfs;
				

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
