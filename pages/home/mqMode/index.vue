<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{loanName}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">审贷银行</view>
				<input placeholder="请选择审贷银行" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">案卷编号</view>
				<input placeholder="自动获取" name="fileNo" disabled :value="fileNo"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">过户日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group margin-top" @click="NaviToPage" :data-item="'cqr'" hover-class="hover-class">
				<view class="title">产权人信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'jkr'" hover-class="hover-class">
				<view class="title">借款人信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'jy'" hover-class="hover-class">
				<view class="title">交易信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'jkht'" hover-class="hover-class">
				<view class="title">借款合同</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'dk'" hover-class="hover-class">
				<view class="title">贷款信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'house'" hover-class="hover-class">
				<view class="title">房屋信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'pg'" hover-class="hover-class">
				<view class="title">评估信息</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'channel'" hover-class="hover-class">
				<view class="title">渠道归属</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group" @click="NaviToPage" :data-item="'cw'" hover-class="hover-class">
				<view class="title">财务收付</view>
				<input placeholder="请填写相关信息" name="input" disabled :value="bankName"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>	
		</form>
		<view class="cu-form-group margin-top">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn block bg-blue margin-tb-sm lg">
				提交
			</button>
			<button class="cu-btn bg-red margin-tb-sm lg" @click="quitMq">
				退出
			</button>
		</view>
	</view>
	
</template>

<script>
	import utils from '../../../utils.js';
	export default {
		data() {
			return {
				index: -1,
				img_map:["imgMf","imgMfdlr",
					"imgJkrTp","imgGtjkrTp","imgJkrDlrTp","imgJy","jkhtTp",
					"imgFc","imgFcPg","imgCwyfTp","img_jjxx","imgJkrQtzc",
					"clTp","dkTp","jyTp","qyTp"
				],
				time: '12:01',
				date: '2018-12-25',
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				loanName:'',
				loanType:'',
				fileNo:'8888',
				bankName:'',
				tmpData:{}
			};
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		
			
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			NaviToPage(e){
				var _this = this;
				
				if(e.currentTarget.dataset.item == 'jkht'){
					var _this = this;
					uni.navigateTo({
						url:'/pages/home/getImages?fileNo='+_this.fileNo+"&index=6&type=1"
					})
				}else{
					uni.navigateTo({
						url:'/pages/home/mqMode/'+e.currentTarget.dataset.item+'Mode?fileNo='+_this.fileNo,
					})
				}	
			},
			quitMq(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			console.log("options.item:"+options.loantype);
			
			_this.loanType = options.loantype;
			_this.loanName = utils.getLoanName(_this.loanType);
			var fileNo = options.fileNo;
			
		
			
			if(fileNo == '888888'){
				//获取案卷编号
				var data = {};
				_this.commRequest('6005', data, function(res){
					
					
					_this.fileNo = res.responseData.fileNo;
				});
			}else{
				_this.fileNo = fileNo;
				//获取案卷详情
				var data = {
					fileNo : fileNo
				};
				_this.commRequest('6038', data, function(res){					
						
					_this.tmpData = res.responseData.fileDetailRelate;
					console.log("in index:"+JSON.stringify(_this.tmpData));
					//uni.setStorageSync(_this.fileNo+"_tmpData", JSON.stringify(_this.tmpData));
					uni.setStorage({
						key: fileNo+"_tmpData",
						data: res.responseData.fileDetailRelate,
						success: function () {
							console.log('success');
						}
					});
					
					//图片赋初值
					for(var i = 0; i < 14; i++){
						var str_label = _this.img_map[i];
						if(!utils.isEmpty(_this.tmpData[str_label])){
							uni.setStorage({
								key: _this.fileNo + '_'+i+'_img',
								data: _this.tmpData[str_label],
								success: function () {
									console.log('success');
								}
							})
						}
					}	
				});
			}
			
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	input{
		text-align: right;
	}
</style>
