<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">案卷信息</block>
		</cu-custom>
		<!-- 案卷详情 -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>案卷详情
			</view>
		</view>
		<view class="padding bg-white text-left">
			<view class="">案卷编号：{{fileNo}}</view>
			<view class="">签单时间：{{createDate}}</view>
			<view class="">借 款 人 ：{{fileDetail.jkrXm}}</view>
			<view class="" v-if="classId!=3">产 权 人 ：{{fileDetail.mfXm}}</view>
			<view class="">审贷银行：{{fileDetail.bankName}}</view>
			<view class="">产品种类：{{loanName}}</view>
			<view class="">贷款金额：{{dk_amt_s}}</view>
			<view class="">贷款期限：{{fileDetail.dkQx?fileDetail.dkQx:fileDetail.dkSqqx}} 🈷️</view>
			<view class="">还款方式：{{hkArray[fileDetail.hkFs]}}</view>
			<view class="" v-if="classId!=3">评估总价：{{fileDetail.pgzj}}万</view>		
			<view class="" v-if="classId!=3">{{mjStr}}</view>
			<view class="" v-if="classId!=3">{{fcStr}}</view>
		</view>
		
		<!-- 整体流程 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>案卷流程
			</view>
		</view>
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom"  :scroll-into-view="'scroll-' + scroll"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xl" :class="index<(currentPoint-1)?'text-blue':''" v-for="(item,index) in fileFlow" :key="index" :id="'scroll-' + index">
				{{item.flowName}} <text class="num" :data-index="index + 1"></text>
			</view>
		</scroll-view>
		
		
		<!-- 时间轴显示 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>流程详情
			</view>
		</view>
		<view class="cu-timeline" >
			
			<view class="cu-item" :class="index==0?'cuIcon-roundcheck':'text-green cuIcon-roundcheckfill'" v-for="(item,index) in fileFlowCurrent" :key="index" :id="'timeline-' + index">
				<view class="content" >
					<view class="cu-capsule">
						<view class="cu-tag" :class="index==0?'bg-brown':'bg-cyan'">{{item.flowName}}</view>
						<view class="cu-tag" :class="index==0?'line-brown':'line-cyan'">{{index==0?'开始时间：'+item.beginTime:'完成时间：'+item.endTime}}</view>
						
					</view>
				</view>
				<view class="content" :class="index==0?'bg-brown':'bg-cyan'"  @click="queryNote" :data-flowno="item.flowNo" :data-vno="item.versionNo">
					<view class="">经办人：{{item.userName}}<text class="fr text-white cuIcon-comment" ></text></view>
					<view class="">联系方式：{{item.tel}}</view>
					<view class="" v-if="item.flowNote!=''">备注：{{item.flowNote}}</view>
					<view class="" v-if="index != 0">开始时间：{{item.beginTime}}</view>
					<view class="" v-if="index == 0">完成时间：{{item.endTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	export default {
		data() {
			return {				
				fileNo:'20210106234448',
				fileDetail:{
					jkrXm:'',
					mfXm:'',
					bankName:'',
					dkQx:'',
					dkSqqx:'',
					hkFs:'',
					pgzj:'',
				},
				fileFlow:null,
				fileFlowCurrent:null,
				currentPoint:0,
				loanType:'',
				loanClass:'',
				num: 0,
				scroll: 0,
				createDate:'',
				dk_amt_s : '',
				loanName:'',
				classId:'',
				fcStr:'',
				mjStr:'',
				hkArray:['没有选择？','等额本金','等额本息','先息后本','等本等息'],
			};
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			_this.fileNo = options.fileNo;
			var sysUserDetailRelate = uni.getStorageSync("sysUserDetailRelate");
			var userId = sysUserDetailRelate.userId;
			// var data={
			// 	userId:userId,
			// 	fileNo:_this.fileNo
			// };
			//var fileNo = '20210106234448';
			var  fileNo = _this.fileNo ;
			_this.createDate = fileNo.substring(0,4)+"年"+fileNo.substring(4,6)+"月"+fileNo.substring(6,8)+"日";
			
			var data={
				userId:'18202734129',
				fileNo:_this.fileNo
			};
			_this.commRequest('6016', data, function(res){
					
				_this.fileDetail = res.responseData.fileDetailRelate;
				_this.fileFlow = res.responseData.loanFlowList;
				_this.fileFlowCurrent = res.responseData.fileFlowList.reverse();
				_this.currentPoint = _this.fileFlowCurrent.length;
				
				if(_this.fileFlowCurrent.length - 2 > 0){
					_this.scroll = _this.fileFlowCurrent.length - 2;
				}
				console.log("onLoad scroll:"+_this.scroll);
				var loaninfo = res.responseData.fileDetailRelate;
				
				//贷款金额
				var dk_gjj = 0.00;
				var dk_sd = 0.00;
				var dk_sum = 0.00;
				if(loaninfo.realAmt == 0 ){
					dk_sd = loaninfo.loanAmt;     
				}else{
					dk_sd = loaninfo.realAmt;
				}
				
				if(loaninfo.gjjRealAmt == 0 ){
					dk_gjj = loaninfo.gjjLoanAmt;      
				}else{
					dk_gjj = loaninfo.gjjRealAmt;
				}
				dk_sum = dk_gjj*1.00 + dk_sum *1.00;
				

				if( loaninfo.loanType == "8001"){
					_this.dk_amt_s = dk_gjj+'</font>万元';        
				} else if ( loaninfo.loanType == "8003"){		
					_this.dk_amt_s = dk_sum+'万元' + '； 其中 公积金：'+dk_gjj+'万元|商贷：'+dk_sd+'万元';
				} else {
					_this.dk_amt_s = dk_sd+'万元';
				}
				_this.loanType = loaninfo.loanType;
				_this.classId = utils.getLoanClassid(loaninfo.loanType);
				//贷款名称
				_this.loanName = utils.getLoanName(loaninfo.loanType);
				
				if(loaninfo.loanType == "8023"){
					_this.fcStr = "车辆品牌："+loaninfo.fcDz;
					_this.mjStr = "车辆型号："+loaninfo.fcMj;
				}else{
					_this.fcStr = "房产地址："+loaninfo.fcDz;
					_this.mjStr = "房产面积："+loaninfo.fcMj;
				}
			});
		},
		methods: {
			BasicsSteps() {
				this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1				
			},
			NumSteps() {
				this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1				
			},
			ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
			queryNote(e){
				console.log("queryNote:"+JSON.stringify(e));
				var _this = this;
				var flowno = e.currentTarget.dataset.flowno;
				var vno = e.currentTarget.dataset.vno;
				uni.navigateTo({
					url:'/pages/undo/flow_notes/flow_notes?fileNo='+_this.fileNo+'&flowNo='+flowno+'&vno='+vno
				})
				
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
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
