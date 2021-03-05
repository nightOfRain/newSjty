<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">借款人信息</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group ">
				<view class="title">姓  名</view>
				<input placeholder="输入借款人姓名" name="jkrXm" :value="formdata.jkrXm"></input>
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
				<input placeholder="请输入证件号码" type="idcard" name="jkrZjhm" :value="formdata.jkrZjhm"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">受薪类型</view>
				<picker @change="PickerChange_sx" :value="formdata.jobType" :range="picker">
					<view class="picker">
						{{formdata.jobType>-1?picker[formdata.jobType]:'请选择受薪类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="本人手机号" type="number" name="jkrLxfs1" :value="formdata.jkrLxfs1"></input>
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
				<input placeholder="其他联系方式" type="number" name="jkrLxfs2" :value="formdata.jkrLxfs2"></input>
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
				<input placeholder="其他联系方式" type="number" name="jkrLxfs3" :value="formdata.jkrLxfs3"></input>
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
				<input placeholder="其他联系方式" type="number" name="jkrLxfs4" :value="formdata.jkrLxfs4"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group" @click="getImageTap" :data-index="'2'">
				<view class="title">图片上传</view>
				<input placeholder="请上传借款人图片" disabled="true"></input>
				<text class='cuIcon-camera text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">其他资产</view>
				<view class="switch-Text">{{switchA?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group" @click="getImageTap" :data-index="'11'" v-if="switchA">
				<view class="title">图片上传</view>
				<input placeholder="请上传其他资产图片" disabled="true"></input>
				<text class='cuIcon-camera text-orange'></text>
			</view>
			
			<view class="cu-form-group">
				<view class="title">婚姻状态</view>
				<picker @change="marryPickerChange" :data-type="'0'" :value="formdata.jkrHaspo" :range="marryPicker">
					<view class="picker">
						{{formdata.jkrHaspo>-1?marryPicker[formdata.jkrHaspo]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view v-if="formdata.jkrHaspo == 1">	
				<view class="cu-form-group">
					<view class="title">配偶姓名</view>
					<input placeholder="输入配偶姓名" name="jkrpoXm" :value="formdata.jkrpoXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :data-type="'1'" :value="idTypeindex_po" :range="idTypePicker" placeholder="请选择证件类型">
						<view class="picker">
							{{idTypeindex_po>-1?idTypePicker[idTypeindex_po]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入证件号码" type="idcard" name="jkrpoZjhm" :value="formdata.jkrpoZjhm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="jkrpoLxfs1" :value="formdata.jkrpoLxfs1"></input>
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
					<input placeholder="其他联系方式" type="number" name="jkrpoLxfs2" :value="formdata.jkrpoLxfs2"></input>
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
				<view class="title">共同借款人</view>
				<view class="switch-Text">{{switchC?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<view v-if="switchC">
				<view class="cu-form-group">
					<view class="title">姓  名</view>
					<input placeholder="输入共同借款人姓名" name="gtjkrXm" :value="formdata.gtjkrXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :data-type="'2'" :value="idTypeindex_gt" :range="idTypePicker" placeholder="请选择共同借款人证件类型">
						<view class="picker">
							{{idTypeindex_gt>-1?idTypePicker[idTypeindex_gt]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入共同借款人证件号码" type="idcard" name="gtjkrZjbh" :value="formdata.gtjkrZjbh"></input>
				</view>
			
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="gtjkrLxfs1" :value="formdata.gtjkrLxfs1"></input>
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
					<input placeholder="其他联系方式" type="number" name="gtjkrLxfs2" :value="formdata.gtjkrLxfs2"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group" @click="getImageTap" :data-index="'3'">
					<view class="title">图片上传</view>
					<input placeholder="请上传共同借款人图片" disabled="true"></input>
					<text class='cuIcon-camera text-orange'></text>
				</view>

				
				<view class="cu-form-group">
					<view class="title">婚姻状态</view>
					<picker @change="marryPickerChange" :data-type="'1'" :value="formdata.gtjkrHaspo" :range="marryPicker">
						<view class="picker">
							{{formdata.gtjkrHaspo>-1?marryPicker[formdata.gtjkrHaspo]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view v-if="formdata.gtjkrHaspo == 1">	
					<view class="cu-form-group">
						<view class="title">配偶姓名</view>
						<input placeholder="输入配偶姓名" name="jkrpoXm" :value="formdata.gtjkrpoXm"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">证件类型</view>
						<picker @change="PickerChange" :data-type="'3'" :value="idTypeindex_gtpo" :range="idTypePicker" placeholder="请选择证件类型">
							<view class="picker">
								{{idTypeindex_gtpo>-1?idTypePicker[idTypeindex_gtpo]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">证件号码</view>
						<input placeholder="请输入证件号码" type="idcard" name="gtjkrpoZjbh" :value="formdata.gtjkrpoZjbh"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input placeholder="本人手机号" type="number" name="gtjkrpoLxfs1" :value="formdata.gtjkrpoLxfs1"></input>
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
						<input placeholder="其他联系方式" type="number" name="gtjkrpoLxfs2" :value="formdata.gtjkrpoLxfs2"></input>
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
				
			</view>
			<view class="cu-form-group  margin-top">
				<view class="title">借款代理人</view>
				<view class="switch-Text">{{switchD?'有':'无'}}</view>
				<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
			</view>
			<view v-if="switchD">
				<view class="cu-form-group">
					<view class="title">代理人</view>
					<input placeholder="输入代理人姓名" name="jkrDlrXm" :value="formdata.jkrDlrXm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :data-type="'4'" :value="idTypeindex_dlr" :range="idTypePicker" placeholder="请选择证件类型">
						<view class="picker">
							{{idTypeindex_dlr>-1?idTypePicker[idTypeindex_dlr]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input placeholder="请输入证件号码" type="idcard" name="jkrDlrZjhm" :value="formdata.jkrDlrZjhm"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="本人手机号" type="number" name="jkrDlrLxfs" :value="formdata.jkrDlrLxfs"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group" @click="getImageTap" :data-index="'4'">
					<view class="title">图片上传</view>
					<input placeholder="请上传代理人图片" disabled="true"></input>
					<text class='cuIcon-camera text-orange'></text>
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
				idTypeindex_gt: 2,
				idTypeindex_gtpo: 2,
				idTypeindex_dlr: 2,
				idTypePicker: ['组织机构代码证', '营业执照', '身份证','护照','军人证','武警证','港澳居民来往内地通行证','户口簿','台湾居民来往大陆通行证','外国人永久居留证','其他'],
				idTypeValue:['E1','E2','I1','I2','I3','I4','I5','I6','I9','Ia','I8'],
				marryPicker:['未婚','已婚','离异','丧偶'],	
				
				picker:['受薪','公务员','自佣'],
				time: '12:01',
				date: '2018-12-25',
				switchA: false,
				switchC: false,
				switchD: false,
				fileNo:'',
				index: -1,
				formdata:{
					jkrHaspo:0,
					gtjkrHaspo:0,
					jobType:-1
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
					this.idTypeindex_gt = e.detail.value;
				}else if(e.currentTarget.dataset.type == '3'){
					this.idTypeindex_gtpo = e.detail.value;
				}else if(e.currentTarget.dataset.type == '4'){
					this.idTypeindex_dlr = e.detail.value;
				}
				
			},
			PickerChange_sx(e){
				this.formdata.jobType = e.detail.value
			},
			marryPickerChange(e){
				
				if(e.currentTarget.dataset.type == '0'){
					this.formdata.jkrHaspo = e.detail.value;
				}else if(e.currentTarget.dataset.type == '1'){
					this.formdata.gtjkrHaspo = e.detail.value;
				}
				console.log("marryPickerChange:"+e.currentTarget.dataset.type);
				console.log("marryPickerChange:"+this.formdata.jkrHaspo);
				console.log("marryPickerChange:"+this.formdata.gtjkrHaspo);
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
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
				console.log("getImageTap:");
				uni.navigateTo({
					url:'/pages/home/getImages?fileNo='+_this.fileNo+'&index='+e.currentTarget.dataset.index+'&type=1'
				})
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				
				formdata.jkrZjlx = _this.idTypeValue[_this.idTypeindex];
				formdata.jkrpoZjlx = _this.idTypeValue[_this.idTypeindex_po];
				formdata.gtjkrZjlx = _this.idTypeValue[_this.idTypeindex_gt];
				formdata.gtjkrpoZjlx = _this.idTypeValue[_this.idTypeindex_gtpo];
				formdata.jkrDlrZjlx = _this.idTypeValue[_this.idTypeindex_dlr];
				
				formdata.jobType = ++_this.formdata.jobType;
				
				formdata.jkrHaspo = _this.formdata.jkrHaspo;
				formdata.gtjkrHaspo = _this.formdata.gtjkrHaspo;
				
				if(_this.switchA){
					formdata.jkrHasqtzc = '1';
				}else{
					formdata.jkrHasqtzc = '0';
				}
				if(_this.switchC){
					formdata.jkrHasgtjkr = '1';
				}else{
					formdata.jkrHasgtjkr = '0';
				}
				if(_this.switchD){
					formdata.jkrHasdlr = '1';
				}else{
					formdata.jkrHasdlr = '0';
				}
				
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

				//证件类型处理
				_this.idTypeindex = utils.getIdArrayIndex(_this.formdata.jkrZjlx);
				_this.idTypeindex_po = utils.getIdArrayIndex(_this.formdata.jkrpoZjlx);
				_this.idTypeindex_gt = utils.getIdArrayIndex(_this.formdata.gtjkrZjlx);
				_this.idTypeindex_gtpo = utils.getIdArrayIndex(_this.formdata.gtjkrpoZjlx);
				_this.idTypeindex_dlr = utils.getIdArrayIndex(_this.formdata.jkrDlrZjlx);
		
				//受薪类型处理
				if(tmpData.jobType){
					_this.jobType = --_this.formdata.jobType;
				}
				
				//开关处理
				if(tmpData.mkHasdlr == 1){
					_this.jkrHasqtzc = true;
				}else{
					_this.jkrHasqtzc = false;
				}
				if(tmpData.mkHasdlr == 1){
					_this.jkrHasgtjkr = true;
				}else{
					_this.jkrHasgtjkr = false;
				}
				if(tmpData.mkHasdlr == 1){
					_this.jkrHasdlr = true;
				}else{
					_this.jkrHasdlr = false;
				}
				
				//共同借款人婚姻状态
				if(utils.isEmpty(_this.formdata.gtjkrHaspo)){
					this.formdata.gtjkrHaspo = 0;
				}
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
