<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{type == 0?'问题':'事项'}}处理</block>
		</cu-custom>
		
			<form @submit="formSubmit">
			<!-- 经办人 -->
			<view class="cu-form-group">
				<view class="title">{{type == 0?'问题':'事项'}}编号</view>
				<input placeholder="请输入案卷编号" name="fileNo" :value="fileNo"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">发起人</view>
				<input placeholder="请输入上一经办人" name="fqr" :value="fqr"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">内容</view>
				<textarea maxlength="-1"  :value="currNote" placeholder="" disabled="true" style="text-align: right;"></textarea>
			</view>
			
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1"  @input="textareaAInput" name="note" :value="note"  placeholder="填写备注:注意事项（500字以内）"></textarea>
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
				fileNo:'',
				title:'',
				fqr:'',
				currNote:'',
				note:'',
				type:0,
				list:['张三','李四','王五','赵六'],
				xylzrIndex:-1,
				userId:''
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

			textareaAInput(e) {
				this.note = e.detail.value
			},

			/**
			 * @param {Object} e
			 * 提交处理
			 */
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				formdata.jbr = userId;
				formdata.nextJbr = this.list[this.xylzrIndex].userid;
				
				console.log("currPage:"+JSON.stringify(this.currPage));
				this.commRequest('/app/problemUpdate',data,function(res){
				
					
				});
					
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			var data = {};
			data.fileNo = options.fileNo;
			
			this.fileNo = options.fileNo;
			this.type = options.type;
			
			/**
			 * 根据FILENO获取问题｜事项 处理信息
			 */
			console.log("currPage:"+JSON.stringify(this.currPage));
			this.commRequest('/app/getDetailInFlow',data,function(res){
				_this.title = res.title;
				_this.fqr = res.fqr;
				_this.currNote = res.note;
				_this.lzrPicker = res.list;
				
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
