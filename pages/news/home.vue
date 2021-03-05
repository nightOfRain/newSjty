<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			
			<block slot="content">产品介绍</block>
		</cu-custom>
		<view class="cu-card case" >
			<view class="cu-item shadow" v-for="(item,index) in loopResult" :key="index">
				<view class="image">
					<image :src="getImageurl(item.picon)"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">史诗</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{item.pname}}</view>
							<view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		

		</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false,
				loopResult:[],
			};
		},
		mounted(){
			var _this = this;
			var data = {};
			data.producttype = 1;
			this.commRequest('6019',data,function(res){
				console.log("res: " + JSON.stringify(res));
				
				_this.loopResult = res.responseData.loopResult;
			});
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			getImageurl(pname){
				return "http://www.sjyjr.net/static/productinfoImage/"+pname;
			}
		}
	}
</script>

<style>

</style>
