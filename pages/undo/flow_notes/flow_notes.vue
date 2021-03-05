<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">经办人留言</block>
		</cu-custom>
		<view class="cu-chat">
			<view class="cu-item self" v-for="(item,index) in noteList" :key="index">
				<view class="main">
					<view class="content bg-green shadow">
						<text>{{item.note==""?"经办人没有留言":item.note}}</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">{{item.createTime}}</view>
			</view>
			
<!-- 			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>item.note==""?"经办人没有留言"</text>
					</view>
				</view>
				<view class="date">item.createTime</view>
			</view> -->
			<view class="cu-item self" v-for="(item,index) in nowNoteList" :key="index">
				<view class="main" v-if="item.type==1">
					<image :src="item.imgurl" class="radius" mode="widthFix"></image>
				</view>
				<view class="main" v-if="item.type==0">
					<view class="content bg-green shadow">
						<text>{{item.text==""?"经办人没有留言":item.text}}</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">{{item.createTime}}</view>
			</view>
		</view>
		
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :value="note" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"  @input="InputIn"></input>
			<view class="action" @click="ChooseImage">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="savenote">发送</button>
		</view>

	</view>
</template>

<script>
	import utils from '../../../utils.js'; 
	export default {
		data() {
			return {
				InputBottom: 0,
				noteList:[],
				note:'',
				fileno:'',
				imgServerList:[],
				nowNoteList:[],
				tmpImgList:[],
			};
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			InputIn(e){
				this.note = e.detail.value;
			},
			savenote(){
				var _this = this;
				console.log("savenote:"+this.note);
				var item = {
					type:'0',
					text:_this.note,
					createTime:utils.getNowTime()
				}
				_this.note='';
				_this.nowNoteList.push(item)
				
				return;
				
				var data = {};
				
				data.fileNo = this.fileNo;
				data.note = this.note;
				data.picUrl = _this.imgServerList.join('|');
				_this.commRequest("6056", data, function(res){
				
					
				});
			},
			ChooseImage() {
				var _this = this;
			
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					//sourceType: ['album'], //从相册选择
					success: (res) => {
						
						console.log("\n===================\nchooseImage:"+JSON.stringify(res));
						const tempFilePaths = res.tempFilePaths;
						
						for(let image of tempFilePaths){
							const uri = encodeURI("http://www.sjyjr.net/sjyjf/app/6023?fileNo="+_this.fileNo+"&accessToken="+uni.getStorageSync("accessToken"));
							
							uni.uploadFile({
								url: uri, //仅为示例，非真实的接口地址
								filePath: image,
								name: 'file',
								//files:tempFilePaths,
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									console.log("update success:"+uploadFileRes.data);
									var tempData = JSON.parse(uploadFileRes.data);
									var serurl = "http://www.sjyjr.net/static/" + _this.fileNo +"/"+tempData.responseData;
									
									_this.imgServerList.push(tempData.responseData);
									
									var item = {
										type:'1',
										imgurl:serurl,
										createTime:utils.getNowTime()
									}
									_this.nowNoteList.push(item)
								},
								complete:(res)=>{
									console.log("complete:"+JSON.stringify(res));
								}
							});
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				var _this = this;
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							_this.imgList.splice(e.currentTarget.dataset.index, 1);
							_this.imgServerList.splice(e.currentTarget.dataset.index, 1);
						//	uni.setStorageSync(_this.fileNo+"_"+_this.index+"_img", _this.imgServerList.join("|"));							
							uni.setStorage({
								key: _this.fileNo + '_'+_this.index+'_img',
								data: _this.imgServerList.join("|"),
								success: function () {
									console.log('success');
								}
							})
						
						}
					}
				})
			},
		},
		onLoad(options){
			console.log("=====flow_notes:"+JSON.stringify(options));
			var _this = this;
			this.fileno = options.fileNo;
			var data = {
				fileNo:options.fileNo,
				flowNo:options.flowNo,
				versionNo:options.vno,
			};
		
			
			_this.commRequest('6057', data, function(res){
				_this.noteList = res.responseData;
			});
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
</style>
