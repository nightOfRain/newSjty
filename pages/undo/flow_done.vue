<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">案卷流转</block>
		</cu-custom>
		
			<form @submit="formSubmit">
			<!-- 经办人 -->
			<view class="cu-form-group">
				<view class="title">案卷编号</view>
				<input placeholder="请输入案卷编号" name="fileNo" :value="fileNo"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上一经办人</view>
				<input placeholder="请输入上一经办人" name="syjbr" :value="lastUserInfo.userName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="请输入联系方式" name="lxfs" :value="lastUserInfo.userTel"></input>
			</view>
			
			<!-- 贷款金额 -->
			<view v-if="majourNode == 2">
				<view class="cu-form-group margin-top">
					<view class="title">商贷金额</view>
					<input placeholder="请输入商贷金额" type="digit" name="realAmt" :value="formdata.realAmt"></input>
					<text class='text-black'>万</text>
				</view>
				<view class="cu-form-group">
					<view class="title">公贷金额</view>
					<input placeholder="请输入公贷金额" type="digit" name="gjjRealAmt" :value="formdata.gjjRealAmt"></input>
					<text class='text-black'>万</text>
				</view>
				<view class="cu-form-group">
					<view class="title">还款期限</view>
					<input placeholder="请输入还款期限" type="digit" name="dkQx" :value="formdata.dkQx"></input>
					<text class='text-black'>月</text>
				</view>
			</view>
			<!-- 评估公司信息 -->
			<view v-if="majourNode==2">
				<view class="cu-form-group">
					<view class="title">评估公司</view>
					<picker @change="PickerChange_pg" :data-type="'0'" :value="pgIndex" :range="pgPicker" placeholder="请选择评估公司">
						<view class="picker">
							{{pgIndex>-1?pgPicker[pgIndex]:'请选择评估公司'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">评估联系人</view>
					<input placeholder="请输入评估联系人" type="digit" name="fcPglxr" :value="formdata.fcPglxr"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">本人手机号</view>
					<input placeholder="其他联系方式" type="number" name="fcPglxfs1" :value="formdata.jkrLxfs3"></input>
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
					<view class="title">联系方式2</view>
					<input placeholder="其他联系方式" type="number" name="fcPglxfs2" :value="formdata.jkrLxfs3"></input>
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
					<view class="title">联系方式3</view>
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
			</view>
			<!-- 还款计划-贷款利率、期限 -->
			<view v-if="majourNode == 4">
				<view class="cu-form-group margin-top">
					<view class="title">贷款利率</view>
					<input placeholder="请输入贷款利率" type="digit" name="dkLv" :value="dkLv"></input>
					<text class='text-black'>%</text>
				</view>
				<view class="cu-form-group">
					<view class="title">首期还款</view>
					<input placeholder="请输入首期还款" type="digit" name="hkSq" :value="hkSq"></input>
					<text class='text-black'>元</text>
				</view>	
				<view class="cu-form-group">
					<view class="title">每期金额</view>
					<input placeholder="请输入每期金额" type="digit" name="hkAj" :value="hkAj"></input>
					<text class='text-black'>元</text>
				</view>
				<view class="cu-form-group">
					<view class="title">还款时间</view>
					<picker mode="date" :value="hkSj" start="2021-01-01" end="2030-01-01" @change="DateChange">
						<view class="picker">
							{{hkSj}}
						</view>
					</picker>
				</view>
			</view>
			
			<!-- 评估结果 -->
			<view v-if="majourNode==7">
				<view class="cu-form-group margin-top">
					<view class="title">评估总价</view>
					<input placeholder="请输入评估总价" type="digit" name="pgzj" :value="dkLv"></input>
					<text class='text-black'>万</text>
				</view>
				<view class="cu-form-group">
					<view class="title">评估结果</view>
					<input placeholder="点击查看评估结果" disabled="true"></input>
					<text class='cuIcon-right text-black'></text>
				</view>
			</view>


			<!-- 绩效A+放开利率+利息收入 -->
			<view v-if="majourNode==3">
				<view class="cu-form-group margin-top">
					<view class="title">绩效A</view>
					<input placeholder="请输入绩效A" type="digit" name="xsyjA" :value="xsyjA"></input>
					<text class='text-black'>元</text>
				</view>
				<view class="cu-form-group">
					<view class="title">放款利率</view>
					<input placeholder="请输入放款利率" type="digit" name="fkRate" :value="fkRate"></input>
					<text class='text-black'>%</text>
				</view>
				<view class="cu-form-group">
					<view class="title">利息收入</view>
					<input placeholder="请输入资方利息收入" type="digit" name="zjIncome" :value="zjIncome"></input>
					<text class='text-black'>元</text>
				</view>		
			</view>

			
			<view class="cu-form-group margin-top" @click="getImageTap">
				<view class="title">图片上传</view>
				<input placeholder="请上传交易图片" disabled="true"></input>
				<text class='cuIcon-camera text-black'></text>
			</view>
			
			<view class="cu-form-group">
				<view class="title">流转备注</view>
				<input placeholder="有流程备注，点击查看" disabled="true"></input>
				<text class='cuIcon-right text-black'></text>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1"  @input="textareaAInput" placeholder="填写备注:注意事项（500字以内）"></textarea>
			</view>
			<!-- 下一流程 -->
			<view class="cu-form-group margin-top">
				<view class="title">下一流程</view>
				<input placeholder="下一流程名称" name="nextFlowName" :value="nextLoanFlow.flowName" disabled="true"></input>
				
			</view>
	
			<view class="cu-form-group">
				<view class="title">流转给</view>
				<picker @change="PickerChange_lzr" :data-type="'0'" :value="xylzrIndex" :range="lzrPicker" placeholder="请选择下一经办人">
					<view class="picker">
						{{xylzrIndex>-1?lzrPicker[xylzrIndex]:'请选择下一经办人'}}
					</view>
				</picker>
			</view>
			<view class="padding-xl margin-top">
				<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
					 提交
				</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	export default {
		data() {
			return {				
				picker:['按揭','全额付款'],
				fileNo:'',
				flowNote:'',
				hkSj:'',
				nextFlowName:'',
				zjIncome:'',
				fkRate:'',
				xsyjA:'',
				dkLv:'',
				hkSj:'',
				hkAj:'',
				hkSq:'',
				dkQx:'',
				syjbr:'',
				lxfs:'',
				lastUserInfo:{
					userName:''
				},//上一经办人	
				currentLoanFlow:null,//当前流程信息
				financeInfoMap:null,//绩效信息
				nextLoanFlow:{
					flowName:''
				},//下一流程信息
				majourNode:'',//主节点编号
				classId:'',//贷款大类
				loantype:'',//贷款产品类型
				pgList:[], //评估公司数据集合
				pgPicker:[],
				pgIndex:-1,
				nextManagerList:null,//下一经办人列表
				lzrPicker:[],
				xylzrIndex:-1,
				idEnd:0, //是否最后一步0-不是 1-是
				isRequired:0,//是否需要图片
				formdata:{}
			};
		},
		methods: {
			/**
			 * @param {Object} e
			 * 下一经办人选择
			 */
			PickerChange_lzr(e){
				this.xylzrIndex = e.detail.value;	 
			},
			/**
			 * @param {Object} e
			 * 评估公司选择
			 */
			PickerChange_pg(e){
				this.pgIndex = e.detail.value;	 
			},
			textareaAInput(e) {
				this.flowNote = e.detail.value
			},
			//选择评估公司
			selectPggs:function(e){
				
			},
		
			//获取图片
			getImageTap:function(e){
				var _this = this;
				uni.navigateTo({
					url:'/pages/home/getImages?fileNo='+_this.fileNo+"&index=99&type=1"
				})
			},
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				var trancode = "6007";
				var data = {
					fileNo: formdata.fileNo,
				};
				data = utils.twoJsonMerge(data, formdata);
				//关键节点判断
				switch(_this.majourNode){
					case '2':
						//公积金贷款
						if(_this.loantype == "8001"){
							
							if(utils.isEmpty(formdata.gjjRealAmt)){
								uni.alert("公积金贷款金额不能为空");
								return;
							}
							data.realAmt = 0.00;
						}else if(_this.loantype == "8003"){//组合贷
							if(utils.isEmpty(formdata.realAmt)){
								uni.alert("商业贷款金额不能为空");
								return;
							}
							if(utils.isEmpty(formdata.gjjRealAmt)){
								uni.alert("公积金贷款金额不能为空");
								return;
							}
						}else{
							if(utils.isEmpty(formdata.realAmt)){
								uni.alert("商业贷款金额不能为空");
								return;
							}
						}
						//贷款期限
						if(utils.isEmpty(formdata.dkQx)){
							uni.alert("贷款期限不能为空");
							return;
						}
						
						//评估信息
						if(_this.classId == "1" || _this.classId == "8"){
							if(_this.loantype == "8031"||_this.loantype=="8043"){
								data.pgzj = 0;
							}
						}else{
							data.pgzj = 0;
						}
						
						break;
					case '4':
						if(utils.isEmpty(formdata.dkLv)){
							uni.alert("贷款利率不能为空");
							return;
						}
						if(utils.isEmpty(formdata.hkSq)){
							uni.alert("首期还款金额不能为空");
							return;
						}
						if(utils.isEmpty(formdata.hkAj)){
							uni.alert("按揭金额不能为空");
							return;
						}
						if(utils.isEmpty(formdata.hkSj)){
							uni.alert("还款时间不能为空");
							return;
						}
						break;
					case '3':
						data.xsyjA = null;
						data.xsyjB = null;
						break;
					case '7':
						if(utils.isEmpty(data.pgzj)){
							uni.alert("本流程需要上传图片");
							return 0;
						}
						break;
		
					default:
						break;								
				};
				
				//需要图片
				if(_this.isRequired){
					var imgList = uni.getStorageSync(_this.fileNo+"_99_img");
					if(utils.isEmpty(imgList)){
						uni.alert("本流程需要上传图片");
						return 0;
					}
					data.picPath = imgList;
				};
				
				//最后一步
				if(_this.isEnd){
					trancode = "6010";
					if(_this.xylzrIndex == -1){
						uni.alert("请指定下一经办人");
						return 0;
					}
					if(utils.isEmpty(data.xsyjA)){
						data.xsyjA = 0;
					}
					
					data.xsyjB = null;
					if(class_id == '4'){
						if(utils.isEmpty(formdata.zjIncome)){
							uni.alert("本流程需要上传图片");
							return 0;
						}else{
							if(data.zjIncome == 0){
								data.zjIncome = null;
							}
						}
					}
				};
				
				console.log("nextUserID = "+_this.nextManagerList[_this.xylzrIndex].userId);
				data.nextFlowUserId = _this.nextManagerList[_this.xylzrIndex].userId;
					
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			_this.fileNo = options.fileNo;
		
			var data={
				fileNo:_this.fileNo
			};
			_this.commRequest('6013', data, function(res){
				
				_this.lastUserInfo=res.responseData.lastUserInfo;//上一经办人
				_this.currentLoanFlow=res.responseData.currentLoanFlow;//当前流程信息
				_this.financeInfoMap=res.responseData.financeInfoMap;//绩效信息
				_this.nextManagerList=res.responseData.nextManagerList;
				_this.nextLoanFlow=res.responseData.nextLoanFlow;
				
				var tmpArray=[];
				for(var i = 0; i < res.responseData.nextManagerList.length; i++){
					tmpArray.push(res.responseData.nextManagerList[i].userName);
				}
				
				//下一流转人列表
				_this.lzrPicker = tmpArray;
				//主节点
				_this.majourNode = res.responseData.currentLoanFlow.majourNode;
				
				//是否最后一步
				_this.idEnd = res.responseData.currentLoanFlow.isend;
				//是否需要图片
				_this.isRequired = res.responseData.currentLoanFlow.isPic;
				//产品种类+获取产品大类
				_this.loantype = res.responseData.currentLoanFlow.loanType;
				_this.classId = utils.getLoanClassid(_this.loantype);
				//获取评估公司信息
				if(_this.majourNode == 2){
					var data={
					};
					_this.commRequest('6039', data, function(res){
						let tempArr = [];
						_this.pgList = res.responseData;
						for(var j = 0; j < res.responseData.length; j++){
							tempArr.push(res.responseData[j].pggsName)
						}
						_this.pgPicker = tempArr;
					});
				}
			
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
