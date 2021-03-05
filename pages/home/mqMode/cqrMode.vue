<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产权人信息</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">姓  名</view>
				<input placeholder="输入产权人姓名" name="mfXm" :value="formdata.mfXm"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件类型</view>
				<picker @change="PickerChange" :data-type="'0'" :value="idTypeindex" :range="idTypePicker" placeholder="请选择证件类型">
					<view class="picker">
						{{idTypeindex>-1?idTypePicker[idTypeindex]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">证件号码</view>
				<input placeholder="请输入证件号码" type="idcard" name="mfZjbh" :value="formdata.mfZjbh"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">卖房意图</view>
				<picker @change="PickerChange_zh" :value="formdata.housePurpose" :range="picker">
					<view class="picker">
						{{formdata.housePurpose>-1?picker[formdata.housePurpose]:'请选择卖房意图'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="本人手机号" type="number" name="mfLxfs1" :value="formdata.mfLxfs1"></input>
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
				<view class="title">备用号码</view>
				<input placeholder="其他联系方式" type="number" name="mfLxfs2" :value="formdata.mfLxfs2"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>

			<view class="cu-form-group" @click="getImageTap">
				<view class="title">图片上传</view>
				<input placeholder="请上传产权人图片" disabled="true"></input>
				<text class='cuIcon-camera text-orange'></text>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">婚姻状态</view>
				<picker @change="marryPickerChange" :value="formdata.mfHaspo" :range="marryPicker">
					<view class="picker">
						{{formdata.mfHaspo>-1?marryPicker[formdata.mfHaspo]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view v-if="formdata.mfHaspo == 1">	
				<view class="cu-form-group">
					<view class="title">配偶姓名</view>
					<input placeholder="输入配偶姓名" name="mfpoXm" :value="formdata.mfpoXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :data-type="'1'" :value="idTypeindex_po" :range="idTypePicker" placeholder="请选择证件类型">
						<view class="picker">
							{{idTypeindex>-1?idTypePicker[idTypeindex]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入证件号码" type="idcard" name="mfpoZjbh" :value="formdata.mfpoZjbh"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="mfpoLxfs1" :value="formdata.mfpoLxfs1"></input>
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
					<view class="title">备用号码</view>
					<input placeholder="其他联系方式" type="number" name="mfpoLxfs2" :value="formdata.mfpoLxfs2"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
			</view>
		
			<view class="cu-form-group  margin-top">
				<view class="title">是否有代理人</view>
				<view class="switch-Text">{{switchD?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
			</view>
			<view v-if="switchD">
				<view class="cu-form-group">
					<view class="title">代理人</view>
					<input placeholder="输入代理人姓名" name="mfdlrXm" :value="formdata.mfdlrXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :data-type="'2'" :value="idTypeindex_dlr" :range="idTypePicker" placeholder="请选择证件类型">
						<view class="picker">
							{{idTypeindex_dlr>-1?idTypePicker[idTypeindex_dlr]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入证件号码" type="idcard" name="mfdlrZjbh" :value="formdata.mfdlrZjbh"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="mfdlrLxfs" :value="formdata.mfdlrLxfs"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
			
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
				idTypeindex: 2,
				idTypeindex_po: 2,
				idTypeindex_dlr: 2,
				idTypePicker: ['组织机构代码证', '营业执照', '身份证','护照','军人证','武警证','港澳居民来往内地通行证','户口簿','台湾居民来往大陆通行证','外国人永久居留证','其他'],
				idTypeValue:['E1','E2','I1','I2','I3','I4','I5','I6','I9','Ia','I8'],
				marryPicker:['未婚','已婚','离异','丧偶'],
			
				picker:['置换购房','投资购房','资金周转','其他'],
				time: '12:01',
				date: '2018-12-25',
				switchD: false,
				fileNo:'',
				index: -1,
				formdata:{
					mfHaspo:0,
					housePurpose:-1,
				},
				imgLocalList:[],//存放需要上传的图片
				imgServerList:[],//存放已经上传的图片
				imgList: [],
			};
		},
		methods: {
			PickerChange(e) {
				console.log("PickerChange:"+JSON.stringify(e));
				if(e.currentTarget.dataset.type == '0'){
					this.idTypeindex = e.detail.value;
				}else if(e.currentTarget.dataset.type == '1'){
					this.idTypeindex_po = e.detail.value;
				}else if(e.currentTarget.dataset.type == '2'){
					this.idTypeindex_dlr = e.detail.value;
				}
				
			},
			PickerChange_zh(e){
				this.formdata.housePurpose = e.detail.value
			},
			marryPickerChange(e){
				this.formdata.mfHaspo = e.detail.value;
				console.log("marryPickerChange:"+this.formdata.mfHaspo);
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
		 	},
	
		
			getImageTap:function(e){
				var _this = this;
				uni.navigateTo({
					url:'/pages/home/getImages?fileNo='+_this.fileNo+"&index=0&type=1"
				})
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				
				formdata.mfZjlx = _this.idTypeValue[_this.idTypeindex];
				formdata.mfpoZjlx = _this.idTypeValue[_this.idTypeindex_po];
				formdata.mfdlrZjlx = _this.idTypeValue[_this.idTypeindex_dlr];
				
				formdata.housePurpose = _this.formdata.housePurpose;
				
				formdata.mfHaspo = _this.formdata.mfHaspo;
				
				if(_this.switchD){
					formdata.mfHasdlr = '1';
				}else{
					formdata.mfHasdlr = '0';
				}
				formdata.imgMf = _this.imgServerList.join('|');
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
			console.log("cqr onLoad:"+JSON.stringify(tmpData));
			if(!utils.isEmpty(tmpData)){
				 _this.formdata = utils.twoJsonMerge(_this.formdata,tmpData);

				if(tmpData.housePurpose){
					--_this.formdata.housePurpose;
				}
				 if(tmpData.mkHasdlr == 1){
					 _this.switchD = true;
				 }else{
					 _this.switchD = false;
				 }
			//	 _this.imgServerList = tmpData.imgMf.split("|");
			//	 _this.imgList = utils.getImgUrlList(tmpData.imgMf,options.fileNo);
				 
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
