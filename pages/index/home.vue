<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<undo v-if="PageCur=='undo'"></undo>
		<news v-if="PageCur=='news'"></news>
		<HMPersonalCenter v-if="PageCur=='HMPersonalCenter'"></HMPersonalCenter>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/images/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-blue':'text-gray'">Home</view>
			</view>
			<view class="action" @click="NavChange" data-cur="undo">		
				<view class='cuIcon-cu-image'>
					<view class="cu-tag badge" v-if="undos>0">{{undos}}</view>
					<image :src="'/static/images/undo' + [PageCur == 'undo'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='undo'?'text-blue':'text-gray'">综合列表</view>
			</view>
			<view class="action text-gray add-action" @click="NavChange" data-cur="add">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				
			</view>
			<view class="action" @click="NavChange" data-cur="news">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/images/news' + [PageCur == 'news'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='news'?'text-blue':'text-gray'">代办事项</view>
			</view>
			<view class="action" @click="NavChange" data-cur="HMPersonalCenter" >
				<view class='cuIcon-cu-image'>
					<image :src="'/static/images/me' + [PageCur == 'HMPersonalCenter'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='HMPersonalCenter'?'text-blue':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home',
				undos:99,
			}
		},
		methods: {
			NavChange: function(e) {
				console.log("NavChange:"+JSON.stringify(e));
				if(e.currentTarget.dataset.cur == 'add'){
					uni.navigateTo({
						url:'/pages/add/index'
					})
					//var userInfo = uni.getStorageSync("userInfo");
					// if(userInfo.loginStat){
					// 	uni.navigateTo({
					// 		url:'/pages/home/mqlists'
					// 	})
					// }else{
					// 	uni.showToast({
					// 		title:"请先登录",
					// 		duration:2000,
					// 	})
					// }
					
				}else{
					this.PageCur = e.currentTarget.dataset.cur
				}
				if(e.currentTarget.dataset.cur == 'undo'){
					this.undos = 0;
				}						
			}
		}
	}
</script>

<style>

</style>
