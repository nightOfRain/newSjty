<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">面签菜单</block>
		</cu-custom>
		
		<view v-for="(item,index) in loanTypeTrees" :key="index">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> {{item.label}}
				</view>
			</view>
			<view class="cu-list grid col-5" :class="['col-5 no-border']">
				<view class="cu-item" hover-class="hover-class"  v-for="(subitem,subindex) in item.children" :key="subindex" @click="muneClick" :data-id="subitem.id">
					<view class="myImage">
						<image :src="'../../static/images/img_'+subitem.id+'.png'" class="icon"></image>
					</view>
					<text>{{subitem.label}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loanTypeTrees: [],
				
			};
			
		},
		onLoad(){
			var _this = this;
			uni.getStorage({
			    key: 'loanTypeTree',
			    success: function (res) {
			        console.log(res.data);
					_this.loanTypeTrees = res.data;
			    }
			});
			
		//	_this.cuIconList = _this.loanTypeTree;
		},
		methods:{
			muneClick(e){
				console.log("subitem: " + JSON.stringify(e.currentTarget.dataset.id));
			
				var item = e.currentTarget.dataset.id;
				
				uni.redirectTo({
					url:'/pages/home/mqMode/index?fileNo=888888&loantype='+e.currentTarget.dataset.id
				});
			}
			
		}
	}
</script>

<style>
	.icon{
		width: 60rpx;
		height: 60rpx;
	}
</style>
