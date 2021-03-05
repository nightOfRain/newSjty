<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">渠道归属</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">合作渠道</view>
				<picker @change="PickerChange_qd" :value="formdata.dictFlag" :range="picker_qd">
					<view class="picker">
						{{formdata.dictFlag>-1?picker_qd[formdata.dictFlag]:'请选择合作渠道'}}
					</view>
				</picker>
			</view>
			<view class="margin-top" v-if="formdata.dictFlag == 0">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>机构信息
					</view>
				</view>
				<view class="cu-form-group" @click="modeShow">
					<view class="title">合作机构</view>
					<input placeholder="选择合作机构" name="hzjgName" :value="formdata.hzjgName" disabled="true"></input>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">老板姓名</view>
					<input placeholder="请输入老板姓名" name="hzjgLbName" :value="formdata.hzjgLbName" disabled="true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input placeholder="请输入联系方式" name="hzjgLbTel" :value="formdata.hzjgLbTel" disabled="true"></input>			
				</view>
				<view class="cu-form-group">
					<view class="title">结算方式</view>
					<input placeholder="请输入结算方式" name="fcPggsJsfsName" :value="fcPggsJsfsName" disabled="true"></input>
				</view>
			</view>
			<view class="margin-top"  v-if="formdata.dictFlag == 0">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>门店信息
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">合作门店</view>
					<picker @change="PickerChange" :value="index_hzmd" :range="picker_hzmd">
						<view class="picker">
							{{index_hzmd>-1?picker_hzmd[index_hzmd]:'选择具体门店'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">对接人</view>
					<input placeholder="请输入对接人" name="hzdjrName" :value="formdata.hzdjrName" disabled="true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input placeholder="请输入联系方式" name="hzdjrTel" :value="formdata.hzdjrTel" disabled="true"></input>			
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
			
			<view class="margin-top" v-if="formdata.dictFlag == 2">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>直客（盖担保函）
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">合作支行</view>
					<input placeholder="请输入合作支行" name="bankName" :value="formdata.bankName" disabled="true"></input>					
				</view>
				<view class="cu-form-group">
					<view class="title">对接人</view>
					<input placeholder="请输入对接人" name="yhJl" :value="formdata.yhJl" disabled="true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input placeholder="请输入联系方式" name="yhJlTel" :value="formdata.yhJlTel" disabled="true"></input>			
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
			
			<view class="margin-top">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>业绩归属
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">归属部门</view>
					<input placeholder="请输入具体门店"  name="yjgsGsName" :value="formdata.yjgsGsName" disabled="true"></input>					
				</view>
				<view class="cu-form-group">
					<view class="title">归属人</view>
					<input placeholder="请输入对接人" name="xsjlName" :value="formdata.xsjlName" disabled="true"></input>
					<text class="cuIcon-profile text-blue" @tap="dictShowTap"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input placeholder="请输入联系方式" name="xsjlTel" :value="formdata.xsjlTel" disabled="true"></input>			
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
			<view class="cu-modal bottom-modal" :class="modalShow?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-green" @tap="refreshTap">刷新</view>
						<view class="action text-blue" @tap="hideModal">取消</view>
					</view>
					
					<view class="cu-bar search bg-white"   style="padding-top:10upx;height:128upx;">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input @input="InputIn" :adjust-position="false" type="text" placeholder="搜索合作机构" style="text-align: left;" confirm-type="search"></input>
						</view>
						<view class="action" @click="searchTap">
							<button class="cu-btn bg-green shadow-blur round">搜索</button>
						</view>
					</view>
					<view class="cu-item" v-for="(item,index) in hzjgResultList" :key="index">
						<view class="cu-form-group" @click="hzjgTap" :data-item="item">
							<view class="title">{{item.orgnManagerName}}:{{item.orgnName}}</view>
							<text class="lg text-gray cuIcon-right"></text>
						</view>
					</view>
					
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="dictShow?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-green" @tap="refreshDictTap">刷新</view>
						<view class="action text-blue" @tap="hideDictModal">取消</view>
					</view>
					
					<view class="cu-bar search bg-white"   style="padding-top:10upx;height:128upx;">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input  @input="InputDictIn" :adjust-position="false" type="text"  placeholder="搜索直客" style="text-align: left;" confirm-type="search"></input>
						</view>
						<view class="action" @click="searchDictTap">
							<button class="cu-btn bg-green shadow-blur round">搜索</button>
						</view>
					</view>
					<view class="cu-item" v-for="(item,index) in dictResultList" :key="index">
						<view class="cu-form-group" @click="dictTap" :data-item="item">
							<view class="title">{{item.userName}}</view>
							<text class="lg text-gray cuIcon-right"></text>
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
				picker_hzmd:[],
				picker_qd:['渠道（合作机构）','直客（个人）','直客（盖担保函）'],
				fileNo:'',
				fcPggsJsfsName:'',
				index_hzmd:-1,
				searchKey:'',
				searchDictKey:'',
				hzjgList:[],
				hzjgResultList:[],
				dictList:[],
				dictResultList:[],
				hzmdList:[],
				modalShow:false,
				dictShow:false,
				formdata:{
					dictFlag:-1,
				},
			};
		},
		methods: {
			modeShow(e){
				this.modalShow = true;
			},
			hideModal(e){
				this.modalShow = false;
			},
			InputIn(e){
				this.searchKey = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 根据关键字回显评估公司信息
			 */
			searchTap(e){
				//根据关键字显示结果
				console.log("searchTap:"+this.searchKey);
				
				if(this.searchKey.length<1){
					return;
				}
				let tmpArray = this.hzjgList;
				let tmpResultArray = [];
				for(var i = 0; i < tmpArray.length; i++){
					if(tmpArray.orgnName.match(this.searchKey)){
						tmpResultArray.push(tmpArray[i]);
					}
				}
				this.hzjgResultList = tmpResultArray;
			},
			/**
			 * @param {Object} e
			 * 根据关键字回显评估公司信息
			 */
			searchDictTap(e){
				//根据关键字显示结果
				console.log("searchDictTap:"+this.searchDictKey);
				if(this.searchDictKey.length<1){
					return;
				}
				let tmpArray = this.dictList;
				let tmpResultArray = [];
				for(var i = 0; i < tmpArray.length; i++){
					if(tmpArray.userName.match(this.searchDictKey)){
						tmpResultArray.push(tmpArray[i]);
					}
				}
				this.dictResultList = tmpResultArray;
			},
			dictShowTap(e){
				this.dictShow = true;
			},
			hideDictModal(e){
				this.dictShow = false;
			},
			InputDictIn(e){
				this.searchDictKey = e.detail.value;
			},
			
			/**
			 * @param {Object} e
			 * 直客选择
			 */
			dictTap(e){
				var _this = this;
				
				let tmpZk = e.currentTarget.dataset.item;
				
				this.dictShow = false;
				
				//业绩归属
				_this.formdata.xsjlName = tmpZk.userName;
				_this.formdata.xsjlBh = tmpZk.userId;
				_this.formdata.xsjlTel = tmpZk.userTel;
				_this.formdata.yjgsGsName = tmpZk.orgnName;
				_this.formdata.yjgsGsId = tmpZk.orgnId;
				
				_this.formdata.hzdjrName = tmpZk.userName;
				_this.formdata.hzdjrBh = tmpZk.userId;
				_this.formdata.hzdjrTel = tmpZk.userTel;
			},
			/**
			 * @param {Object} e
			 * 指定合作机构
			 */
			hzjgTap(e){
				console.log("hzjgTap:"+JSON.stringify(e));
				var _this = this;
				
				let tmpHzjg = e.currentTarget.dataset.item;
				
				this.modalShow = false;
				//机构相关信息处理
				_this.formdata.hzjgName = tmpHzjg.orgnName;
				_this.formdata.hzjgBh = tmpHzjg.orgnId;
				
				//老板信息
				_this.formdata.hzjgLbName = tmpHzjg.orgnManagerName;
				_this.formdata.hzjgLbBh = tmpHzjg.orgnManager;
				_this.formdata.hzjgLbTel = tmpHzjg.orgnManagerTel;
				
				//结算方式	
				_this.fcPggsJsfsName = tmpHzjg.cycleTypeName;
				_this.formdata.fcPggsJsfs = tmpHzjg.cycleTypeCode;
				
				//获取渠道信息
				var data = {
					orgnId:_this.hzjgList[index].orgnId
				};
				_this.commRequest('6035', data, function(res){
					
					
					_this.hzmdList = res.responseData.loopResult;
					
					let tmpPicker=[];
					for(var i = 0; i < _this.hzmdList.length; i++){
						let item = _this.hzmdList[i].orgnManagerName+':'+_this.hzmdList[i].shortName;
						tmpPicker.push(item);
					}
					_this.picker_hzmd = tmpPicker;
				});
			},
			/**
			 * @param {Object} e
			 * 选择合作渠道类型
			 */
			PickerChange_qd(e){
				this.formdata.dictFlag = e.detail.value;
				this.dictShow = true;
			},
			/**
			 * @param {Object} e
			 * 选择合作门店
			 */
			PickerChange(e){
				this.index_hzmd = e.detail.value;
				//门店相关信息处理
				let tmpHzmd = _this.hzmdList[his.index_hzmd].
				//机构相关信息处理
				_this.formdata.hzmdName = tmpHzmd.shortName;
				_this.formdata.hzmdBh = tmpHzmd.orgnId;
				_this.formdata.hzdjrName = tmpHzmd.orgnManagerName;
				_this.formdata.hzdjrBh = tmpHzmd.orgnManagerId;
				_this.formdata.hzdjrTel = tmpHzmd.orgnManagerTel;
				
				//业绩归属
				_this.formdata.xsjlName = tmpHzmd.yjgsFinanceManagerName;
				_this.formdata.xsjlBh = tmpHzmd.yjgsFinanceManagerId;
				_this.formdata.xsjlTel = tmpHzmd.yjgsFinanceManagerTel;
				_this.formdata.yjgsGsName = tmpHzmd.yjgsOrgnName;
				_this.formdata.yjgsGsId = tmpHzmd.yjgsOrgnId;
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				
				console.log('表单数据内容：' +JSON.stringify(formdata));
				
				//合并两个JSON
				_this.formdata = utils.twoJsonMerge(_this.formdata, formdata);
				
				console.log("更新后案卷数据:"+JSON.stringify(_this.formdata));

				uni.setStorageSync(_this.fileNo+"_tmpData", JSON.stringify(_this.formdata));
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			refreshTap(e){
				var _this = this;
				//获取渠道信息
				var data = {};
				_this.commRequest('6041', data, function(res){
					
					
					_this.hzjgList = res.responseData.loopResult;
					uni.setStorage({
						key: "hzjgList",
						data: res.responseData.loopResult,
						success: function () {
							console.log('success');
						}
					});
				});
			},
			refreshDictTap(e){
				var _this = this;
				//获取渠道信息
				var data = {};
				_this.commRequest('6037', data, function(res){
					
					
					_this.dictList = res.responseData.loopResult;
					uni.setStorage({
						key: "dictList",
						data: res.responseData.loopResult,
						success: function () {
							console.log('success');
						}
					});
				});
			}
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			_this.fileNo = options.fileNo;
			
			var tmpData = uni.getStorageSync(options.fileNo+"_tmpData");
			console.log("channel onLoad:"+JSON.stringify(tmpData));
			if(!utils.isEmpty(tmpData)){
				 _this.formdata = utils.twoJsonMerge(_this.formdata,tmpData);
				 _this.formdata.hkFs -= 1;
			}
			
			//合作机构信息优先取本地缓存，如果没有再重新获取最新信息
			_this.hzjgList = uni.getStorageSync("hzjgList");
			
			if(utils.isEmpty(_this.hzjgList)){
				_this.refreshTap();
			}
			
			//合作机构信息优先取本地缓存，如果没有再重新获取最新信息
			_this.dictList = uni.getStorageSync("dictList");
			
			if(utils.isEmpty(_this.dictList)){
				_this.refreshDictTap();
			}
		}
	}
</script>

<style>
	input{
		text-align: right;
	}
	input:-ms-input-placeholder {
	    color: red;
	}/* Internet Explorer 10+ */
	
	input::-webkit-input-placeholder {
	    color: red;
	}/* WebKit browsers */
	
	input::-moz-placeholder {
	    color: red;
	}/* Mozilla Firefox 4 to 18 */
	
	input:-moz-placeholder {
	    color: red;
	}
	.switch-Text{
		width: 50%;
		text-align: right;
		
	}
</style>
