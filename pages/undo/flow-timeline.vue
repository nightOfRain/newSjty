<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">处理详情</block>
		</cu-custom>
		<!-- 案卷详情 -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>案卷详情
			</view>
		</view>
		<view class="padding bg-white text-left">
			<view class="">问题编号：{{fileNo}}</view>
			<view class="">发起时间：{{createDate}}</view>
			<view class="">发 起 人 ：{{name}}</view>
			<view class="">所属支行：{{bankName}}</view>
			<view class="">所属部门：{{dept}}</view>
			<view class="">问题标题：{{title}}</view>
			<view class="">具体描述：{{note}}</view>
		
		</view>
		
		<!-- 整体流程 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>当前进度
			</view>
		</view>
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom"  :scroll-into-view="'scroll-' + scroll"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xl" :class="index<(currentPoint-1)?'text-blue':''" v-for="(item,index) in fileFlow" :key="index" :id="'scroll-' + index">
				{{item}} <text class="num" :data-index="index + 1"></text>
			</view>
		</scroll-view>
		
		
		<!-- 时间轴显示 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>具体详情
			</view>
		</view>
		<view class="cu-timeline" >
			
			<view class="cu-item" :class="index==0?'cuIcon-roundcheck':'text-green cuIcon-roundcheckfill'" v-for="(item,index) in list" :key="index" :id="'timeline-' + index">
				<view class="content" >
					<view class="cu-capsule">
						<view class="cu-tag" :class="index==0?'bg-brown':'bg-cyan'">{{item.flowName}}</view>
						<view class="cu-tag" :class="index==0?'line-brown':'line-cyan'">{{index==0?'开始时间：'+item.beginTime:'完成时间：'+item.endTime}}</view>
						
					</view>
				</view>
				<view class="content" :class="index==0?'bg-brown':'bg-cyan'"   :data-flowno="item.flowNo" :data-vno="item.versionNo">
					<view class="">经办人：{{item.userName}}<text class="fr text-white" ></text></view>
					<view class="">联系方式：{{item.tel}}</view>
					<view class="" v-if="item.flowNote!=''">备注：{{item.flowNote}}</view>
					<view class="" v-if="index != 0">开始时间：{{item.beginTime}}</view>
					<view class="" v-if="index == 0">完成时间：{{item.endTime==''?'处理中。。。':item.endTime}}</view>
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
				fileNo:'',		
				fqr:'',
				createDate:'',
				deptName:'',
				dept:'',
				title:'',
				note:'',
				fileFlow:['发起', '处理中','完成'],
				list:[],
	

			};
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			var data = {};
			data.fileNo = options.fileNo;
			
			     
			console.log("currPage:"+JSON.stringify(this.currPage));
			this.commRequest('/app/getFileInfo',data,function(res){
				_this.fileNo = res.fileNo;	
				_this.fqr = res.fqr;	
				_this.createDate = res.createDate;	
				_this.type = res.type;	
				_this.deptName = res.deptName;	
				_this.dept = res.dept;	
				_this.title = res.title;	
				_this.note = res.note;
				_this.flow = res.flow;	

				_this.list = res.list;

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
