<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">贷款计算器</block>
		</cu-custom>

		<form>			
			<view class="cu-form-group">
				<view class="title">贷款金额</view>
				<input placeholder="请输入公贷金额" type="digit" @input="loanAmtInput" :value="loanamt"></input>
				<text class='text-black'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款期限</view>
				<input placeholder="请输入公贷金额" type="digit" @input="termInput" :vaule="term"></input>
				<text class='text-black'>年</text>
			</view>
			<view class="cu-form-group">
				<view class="title">还款方式</view>
				<picker @change="hkPickerChange"  :range="hkPicker">
					<view class="picker">
						{{hkIndex>-1?hkPicker[hkIndex]:'请选择还款方式'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">利率方式</view>
				<picker @change="lvPickerChange"  :range="lvPicker">
					<view class="picker">
						{{lvIndex>-1?lvPicker[lvIndex]:'请选择利率方式'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{lvIndex==1?'最新LPR':'基准利率'}}</view>
				<input placeholder="请输入最新利率" type="digit" @input="perInput" :value="per" @blur="updateLv"></input>
				<text class='text-black'>%</text>
			</view>
			<view class="cu-form-group">
				<view class="title">{{lvIndex==1?'加点基数':'浮动比例'}}</view>
				<input placeholder="请输入浮动基数" type="digit" @input="floatSInput" :value="float_s" @blur="updateLv"></input>
				<text class='text-black'>{{lvIndex==1?'‱':'%'}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">实际利率</view>
				<input placeholder="计算出实际利率" type="digit" :value="per_result" disabled="true"></input>
				<text class='text-black'>%</text>
			</view>
			
			<view class="padding-xl" @tap="get_result">
				<button  class="cu-btn block bg-blue margin-tb-sm lg">
					 计算
				</button>
			</view>
			
		</form>
		<!--计算结果-->
	
	
		<view class="flex bg-gray" v-if="mybj.length>0">
			<view class="flex-sub  padding-sm">月份</view>
			<view class="flex-sub  padding-sm">月供（元）</view>
			<view class="flex-sub  padding-sm">本金（元）</view>
			<view class="flex-sub  padding-sm">利息（元）</view>
		</view>
		<view class="bg-white" style="padding-bottom:160upx;" v-if="mybj.length>0">
			<view class="flex solid-bottom" v-for="(item,index) in mybj" :key="index" :class="index%2?'bg-gray':'bg-white'">
				<view class="flex-sub padding-sm">
					{{(index+1)+'月'}}
				</view>
				<view class="flex-sub padding-sm">{{'¥'+myyg[index]}}</view>
				<view class="flex-sub padding-sm">{{'¥'+item}}</view>
				<view class="flex-sub padding-sm">{{'¥'+mylx[index]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lvPicker:['固定利息','LPR'],
				lvIndex:-1,
				hkPicker:['等额本息','等额本金'],
				hkIndex:-1,
				loanamt:'',
				term:'',
				per:'',
				float_s:0,
				per_result:'',
				mylv:[],
				myyg:[],
				mybj:[]
				
			}
		},
		methods: {
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e))
			},
			/**
			 * @param {Object} e
			 * 选择利率类型 0-传统利率 1-LPR利率
			 */
			lvPickerChange:function(e){
				console.log("lvPickerChange:"+e.detail.value)
				this.lvIndex = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 选择还款方式 0-等额本息 1-等额本金
			 */
			hkPickerChange:function(e){
				console.log("hkPickerChange:"+e.detail.value)
				this.hkIndex = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 贷款金额
			 */
			loanAmtInput:function(e){
				this.loanamt = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 贷款期限
			 */
			termInput:function(e){
				this.term = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 贷款基准利率
			 */
			perInput:function(e){
				this.per = e.detail.value;
			},
			/**
			 * @param {Object} e
			 * 浮动比例或LPR基点
			 */
			floatSInput:function(e){
				this.float_s = e.detail.value;
			},
			/**
			 * 
			 * 计算实际贷款利率
			 */
			updateLv:function(){
				var sum = 0.000;
				if(this.isEmpty(this.per)){
					return;
				}
				if(this.lvIndex == 0){
					sum = (parseFloat(this.per)*(1 + parseFloat(this.float_s)/100)).toFixed(2);
				}else{
					sum = (parseFloat(this.per) + parseFloat(this.float_s)/100).toFixed(2);
				}
				
				this.per_result = parseFloat(sum);
				//$("#per_result").val(per+'% + '+float_sd+'‱ = '+sum);
			
			},
			isEmpty:function(obj) {
			        
				if(!obj || obj == 0 || obj == '' || obj== 'null' || obj == 'undefined') {
					return true;
				}
				
				if(Array.prototype.isPrototypeOf(obj) && obj.length == 0) {
					　　　return true;
				}
		
				return false;
			},
			//等额本金
			get_result_bj:function (flag){
				var yg = 0.00;//月供
		
				var bj_total = 0.00//已归还本金
				var lx_total =0.00; //总利息
				var months = 0;;
		
				var amt = 0.00;
				
				var per = 0.00;
				var float_p = 0.00;
				
				per = this.per_result/1200;
				months = this.term*12.0;
				amt = this.loanamt * 10000.00;
				
				var mylx = [];//每月应还利息
				var myyg = []; //月供
				var mybj = []; //本金
		
				var bj = amt/months;//每月应还本金
		
				for(var i = 0; i < months; i++){
					var yg_tmp = bj + (amt - bj_total)*per;
					var lx_tmp = (amt - bj_total)*per;
		
					mylx.push(lx_tmp.toFixed(2));
					myyg.push(yg_tmp.toFixed(2));
					mybj.push(bj.toFixed(2));
				
					bj_total += bj;
					lx_total += lx_tmp;
				}
				
				this.mylx = mylx;
				this.myyg = myyg;
				this.mybj = mybj;
				this.bj_total = bj_total.toFixed(2);
				this.lx_total = lx_total.toFixed(2);
			},
			
			    //等额本息
			get_result_bx:function (flag){
				var yg = 0.00;//月供	
				var months = 0;;
				var amt = 0.00;
				var per = 0.00;
				var bj_total = 0.00//已归还本金
				var lx_total =0.00; //总利息
				
				per = this.per_result/1200;
				months = this.term*12.0;
				amt = this.loanamt * 10000.00;
			
				var mylx = [];//每月应还利息
				var myyg = []; //月供
				var mybj = []; //本金
			
				yg = (amt*per*cifang((1+per), months))/(cifang((1+per), months)-1);
		
				for(var i = 0; i < months; i++){
					var lx_tmp = amt*per*(cifang((1+per),months) - cifang((1+per), i))/(cifang((1+per),months) -1.0);
					var bj_tmp = amt*per*(cifang((1+per), i))/(cifang((1+per),months) -1.0);
		
					mylx.push(lx_tmp.toFixed(2));
					myyg.push(yg.toFixed(2));
					mybj.push(bj_tmp.toFixed(2));
					
					bj_total += bj_tmp;
					lx_total += lx_tmp;
				}
				this.mylx = mylx;
				this.myyg = myyg;
				this.mybj = mybj;
				this.bj_total = bj_total.toFixed(2);
				this.lx_total = lx_total.toFixed(2);
				
			},
			
			get_result:function(){
		

				if(this.isEmpty(this.loanamt)){
					console.log("贷款金额不能为空");
					return;
				}
				if(this.isEmpty(this.term)){
					console.log("贷款期限不能为空");
					return;
				}
				if(this.isEmpty(this.per)){
					console.log("贷款利率不能为空");
					return;
				}
	
			
				if(this.hkIndex == '0'){
					this.get_result_bj();
				}else{
					this.get_result_bx();
				}

		
		console.log("======mylx:"+JSON.stringify(this.mylv));
		console.log("======myyg:"+JSON.stringify(this.myyg));
		console.log("======mybj:"+JSON.stringify(this.mybj));
		
	
		
		// 		$("#p2").html('');
		// 		var p2_html = '<div class="mui-row"><div class="mui-col-xs-2 mui-center">月份</div><div class="mui-col-xs-3 mui-center">月供(元)</div><div class="mui-col-xs-3 mui-center">本金(元)</div><div class="mui-col-xs-3 mui-center">利息(元)</div></div>';
		// 		 var lx_total = 0.00;
		// 		 var amt = 0.00;
		// 		 var months = 0;
		// 		if(loan_type == '1'){
		// 			months = $("#term_gjj").val()*12.0;
		// 		}else{
		// 			months = $("#term").val()*12.0;
		// 		}
		// 		 for(var i = 0 ; i < months; i++ ){
		// 			var tmp_yg = parseFloat(myyg[i])+parseFloat(myyg_gjj[i]);
		// 			var tmp_lx = parseFloat(mylx[i])+parseFloat(mylx_gjj[i]);
		// 			var tmp_bj = parseFloat(mybj[i])+parseFloat(mybj_gjj[i]);
		
		// 			lx_total += tmp_lx;
		// 			amt += tmp_yg;
		// 			p2_html += '<div class="mui-row"><div class="mui-col-xs-2 mui-center">'+(i+1)+'月</div><div class="mui-col-xs-3 mui-center">¥'+tmp_yg.toFixed(2)+'</div><div class="mui-col-xs-3 mui-center">¥'+tmp_bj.toFixed(2)+'</div><div class="mui-col-xs-3 mui-center" >¥'+tmp_lx.toFixed(2)+'</div></div>';
		// 		 }
		
		
		
		// 		$("#p2").append(p2_html+'<div class="mui-col-xs-12">利息总额：¥'+lx_total.toFixed(2)+'(元)</div><div class="mui-col-xs-12">还款总额：¥'+amt.toFixed(2)+'(元)</div>')
		// 		$("#lx_total").val(lx_total.toFixed(2));
		// 		$("#amt_total").val(amt.toFixed(2));
		

		
		// 			//发送报文给后台用于计数
		// 		var groupid = localStorage.getItem("groupid");
		
		// 		if(groupid == '2' && top.Settings.loginState){ //合作机构用户
		// 			var data = {};
		
		// 			data.type = '1';
		// 			data.accessToken = localStorage.getItem("accessToken");
		// 			$.ajax({
		// 				type : "post",
		// 				timeout: 2000,
		// 				url: "http://"+top.comm_url+"/app/6067",
		// 				data : data,
		// 				datatype : "application/json",
		// 				success : function(msg){}
		// 			});
		// 		}
			},
			cifang:function(val, times){
				var result_val = 1.00;
		
				for(var i = 0; i < times; i++){
					result_val *= val;
				}
		
				return result_val;
			}
		},
		onLoad: (options) => {
			var _this = this;
	
		}
	}
</script>

<style>

</style>
