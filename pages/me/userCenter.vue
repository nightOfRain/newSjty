<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户中心</block>
		</cu-custom>
			
		<view class="cu-form-group padding " @click="ChooseImage(0)">	
			<view class="face"><image :src="faceIcon"></image></view>
			<text class='cuIcon-right text-black'></text>
		</view>
		<view class="cu-form-group">
			<view class="title">名字</view>
			<input placeholder="两字短标题" :value="userName" disabled=true></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input placeholder="三字标题" :value="userTel" disabled=true></input>
		</view>
		<view class="cu-form-group" @click="qrCodeTap">
			<view class="title">二维码</view>
			<input placeholder="我的二维码" disabled=true></input>
			<text class='cuIcon-right text-black'></text>
		</view>
		<view class="cu-form-group" @click="canvasTap">
			<view class="title">海报</view>
			<input placeholder="专属海报" disabled=true></input>
			<text class='cuIcon-right text-black'></text>
		</view>
		<view class="cu-form-group  margin-top">
			<view class="title">入职时间</view>
			<input placeholder="三字标题" :value="entryTime" disabled=true></input>
		</view>
		<view class="cu-form-group">
			<view class="title">当前状态</view>
			<input placeholder="三字标题" :value="userStat[statIndex]" disabled=true></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属机构</view>
			<input placeholder="三字标题" :value="userGroupName" disabled=true></input>
		</view>
		<view class="cu-form-group">
			<view class="title">岗位</view>
			<input placeholder="三字标题" :value="pos" disabled=true></input>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				形象照片
			</view>
			<view class="action">
				{{userImage==''?0:1}}/1
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img"  @tap="ViewImage" :data-url="userImage" v-if="userImage!=''">
				 <image :src="userImage" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage(1)" v-if="userImage==''">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:'',
				userTel:'',
				userStat:["试用","正式","请假","离职"],
				statIndex:0,
				entryTime:'',
				pos:'',
				userGroupName:'',
				imgList:[],
				faceIcon:'',
				userImage:'',
			}
		},
		methods: {
			ChooseImage(index) {
				var _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log("ChooseImage ["+index+"]:"+JSON.stringify(res));
						if(index == 0){
							_this.faceIcon = res.tempFilePaths[0];
						}else{
							_this.userImage  = res.tempFilePaths[0];
						}
					}
				});
			},
			ViewImage(e) {
				console.log("ViewImage:"+JSON.stringify(e));
				uni.previewImage({
					urls: [this.userImage],
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.userImage='';
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaA.value = e.detail.value
			},
			qrCodeTap:function(){
				uni.navigateTo({
					url:'/pages/plugin/tki-qrcode'
				})
			},
			canvasTap:function(){
				uni.navigateTo({
					url:'/pages/plugin/canvas'
				})
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync("userInfo");
			//userInfo = JSON.parse(userInfo);
			userInfo = userInfo.sysUserDetailRelate;
			console.log("onLoad userInfo:"+JSON.stringify(userInfo));
			this.userName = userInfo.userName;
			this.userTel = userInfo.userTel;
			this.statIndex = userInfo.userStatus;
			this.entryTime = userInfo.entryTime;
			this.userGroupName = userInfo.userGroupEntity.userGroupName;
			var pos = '';
			for(var i = 0; i < userInfo.userPostList.length; i++){
				if(i == (userInfo.userPostList.length-1)){
					pos += userInfo.userPostList[i].postName;
				}else{
					pos += userInfo.userPostList[i].postName+'-';
				}
			}
			this.pos = pos;
		}
	}
</script>

<style>
.face{
	flex-shrink:0;
	width:15vw;
	height:15vw;
	
}
.face image{
	width:100%;
	height:100%;
	border-radius:100%;
	background-color: #000000;
}
</style>
