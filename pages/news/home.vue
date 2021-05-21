<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			
			<block slot="content">产品介绍</block>
		</cu-custom>
		<view class="cu-card case" >
			<view class="cu-item shadow" v-for="(item,index) in loopResult" :key="index" @click="onImgTap" :data-item="item">
				<view class="image">
					<image :src="getImageurl(item.picon)"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">🔥 热销</view>
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
		
		
		<view class="cu-modal" :class="modalName?'show':''">
			<view class="cu-dialog">
				<scroll-view scroll-y="true"  :style="[{height:dialogHeight-40+'px'}]">
					<view class="bg-img"  :style="'height:'+imgHeight*1.2+'px;background-image: url('+bgImage+');'">
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
					</view>
				</scroll-view>
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
				modalName:false,
				bgImage:'',
				dialogHeight:0,
				imgHeight:0
			};
		},
		mounted(){
			var _this = this;
			var data = {};
			data.producttype = 1;
			uni.getSystemInfo({
				success: (res) => {
					_this.dialogHeight = res.windowHeight*0.7;
				}
			})
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
			},
			onImgTap(e){
				var _this = this;
				var item = e.currentTarget.dataset.item;
				console.log("onTap:"+JSON.stringify(item));
				this.modalName = true;
				this.bgImage = "http://www.sjyjr.net/static/productinfoImage/" + item.descpic;
				// uni.navigateTo({
				// 	url:''
				// })
				uni.getImageInfo({
					src: this.bgImage ,
					success: function(res) {
						console.log("========getImageInfo:"+JSON.stringify(res));
						
							
						_this.imgHeight = res.width;
						
						
						
					},
				});
			},
			hideModal(){
				this.modalName = false;
			}
			
		}
	}
</script>

<style>

</style>
