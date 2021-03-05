<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">房屋信息</block>
		</cu-custom>
		<form @submit="formSubmit">
		
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group" @click="onAreaTap">
				<view class="title">所在片区</view>
				
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
							{{areaName==''?'请选择所在片区':areaName}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
	
			<view class="cu-form-group">
				<view class="title">房产地址</view>
				<input placeholder="请输入房产地址" name="fcDz" :value="formdata.fcDz"></input>
				
			</view>
			<view class="cu-form-group">
				<view class="title">房产面积</view>
				<input placeholder="请输入房产面积" type="digit" name="fcMj" :value="formdata.fcMj"></input>			
				<text class='text-black'>m²</text>
			</view>

			<view class="cu-form-group  margin-top">
				<view class="title">有无抵押</view>
				<view class="switch-Text">{{switchA?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			
			<view class="cu-form-group  margin-top">
				<view class="title">有无装修</view>
				<view class="switch-Text">{{switchB?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">规划用途</view>
				<picker @change="PickerChange_gh" :value="formdata.fcType" :range="picker_gh">
					<view class="picker">
						{{formdata.fcType>-1?picker_gh[formdata.fcType]:'请选择规划用途'}}
					</view>
				</picker>
				
			</view>
			<view class="cu-form-group">
				<view class="title">不动产局</view>
				<picker @change="PickerChange_bd" :value="index_bd" :range="picker">
					<view class="picker">
						{{index_bd>-1?picker[index_bd]:'请选择不动产局'}}
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
				switchB:false,
				switchA:false,
				visible:false,
				fileNo:'',
				areaName:'',
				picker_gh:['住宅','非住宅'],
				formdata:{
					fcType:-1,
					bdcjId:-1,
				},
				index_bd:-1,
				bdData:null,
				areaData:null,
				citys:null,
				areas:null,
				indicatorStyle: `height: 50px;`,
				picker:[],
				multiIndex: [0, 0],
				multiArray:[[],[]],
			};
		},
		methods: {
			onAreaTap(e){
				this.visible = true;
			},
			PickerChange_bd(e){
				this.index_bd = e.detail.value;
				this.formdata.bdcjId = this.bdData[this.index_bd].bdcjId;
			},
			PickerChange(e){
				this.formdata.hkFs = e.detail.value
			},
			PickerChange_gh(e){
				this.formdata.fcType = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			MultiChange(e) {
				var _this = this;
				console.log("MultiChange:"+JSON.stringify(e));
				var val = e.detail.value;
				
				_this.areaName = _this.areaData[val[0]].label + '-'+_this.areaData[val[0]].children[val[1]].label;
				_this.formData.areaId = _this.areaData[val[0]].children[val[1]].id;
			},
			MultiColumnChange(e) {
				var _this = this;
				console.log("MultiColumnChange:"+JSON.stringify(e));
				
				//子片区选择时不修改选择区域
				if(e.detail.column == 1){
					return;
				}
				let areaPartTree = _this.areaData;
				
				let tmpArray1 = [];
				let index = e.detail.value;
				let tmpSon = areaPartTree[index].children;
				for(var j = 0; j < tmpSon.length; j++){
					let itemSon = tmpSon[j].label;
					tmpArray1.push(itemSon);
				}
				
				_this.multiArray[1] = tmpArray1;
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

				formdata.hkFs = _this.formdata.hkFs+1;
				
				console.log('表单数据内容：' +JSON.stringify(formdata));
				//有无抵押
				if(_this.switchA){
					_this.formdata.hasPledge = 1;
				}else{
					_this.formdata.hasPledge = 0;
				}
				//有无抵押
				if(_this.switchB){
					_this.formdata.hasTrim = 1;
				}else{
					_this.formdata.hasTrim = 0;
				}
				
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
			//有无抵押
			if(_this.formdata.hasPledge == 1){
				_this.switchA = true;
			}
			//有无装修
			if(_this.formdata.hasTrim == 1){
				_this.switchB = true;
			}
			
			//获取不动产局数据+初始化
			var data = {};
			_this.commRequest('6040', data, function(res){
				
				
				let tmpbdData = res.responseData.loopResult;
				let tmpArray = [];
				_this.bdData = res.responseData.loopResult;
				for(var i = 0; i < tmpbdData.length; i++){
					let item = tmpbdData[i].bdcj;
					tmpArray.push(item);
					if(item == _this.formdata.bdcjId){
						_this.index_bd = i;
					}
				}
				_this.picker = tmpArray;
			});
			//获取片区数据+初始化
			var data = {};
			_this.commRequest('6063', data, function(res){
				
				
				_this.areaData = res.responseData.areaPartTree;
				let areaPartTree = res.responseData.areaPartTree;
				let tmpArray = [];
				let tmpArray1 = [];
				
				//如果没有选定区域
				if(!utils.isEmpty(_this.formdata.areaId)){
					
					for(var i = 0; i < areaPartTree.length; i++){

						for(var j = 0; j < areaPartTree[i].children.length; j++){
							if(areaPartTree[i].children[j].id == _this.formdata.areaId){
								_this.multiIndex[0] = i;
								_this.multiIndex[1] = j;
								break;
							}
						}
					}
					_this.areaName = _this.areaData[_this.multiIndex[0]].label + '-'+_this.areaData[_this.multiIndex[0]].children[_this.multiIndex[1]].label;
					
				}
				for(var i = 0; i < areaPartTree.length; i++){
					let item = areaPartTree[i].label;
					tmpArray.push(item);
				}
				let tmpSon = areaPartTree[_this.multiIndex[1]].children;
				for(var j = 0; j < tmpSon.length; j++){
					let itemSon = tmpSon[j].label;
					tmpArray1.push(itemSon);
				}
				_this.multiArray[0] = tmpArray;
				_this.multiArray[1] = tmpArray1;
				
			});
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
