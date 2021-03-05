<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">制作海报</block>
		</cu-custom>
		<view class="canvas">
			<canvas :style="{ width: cansWidth + 'px', height: cansHeight + 'px' }" canvas-id="firstCanvas"></canvas>
		</view>

		<view class="imglist">
			<view :style="[{ width:widths+'upx'}]">
				<block v-for="(swiperLists,index) in swiperList" :key="index">
					<image @click="selseimg(swiperLists.posterImg)" :src="swiperLists.posterImg" mode="aspectFill"></image>
				</block>
			</view>
		</view>

		<view class="bottom">
			<view @click="saveCans(1)">保存海报</view>
			<view @click="saveCans(2)">一键邀请</view>
		</view>

	</view>
</template>

<script>
	var that
	export default {
		data() {
			return {
				cansWidth: 375, //海报宽度
				cansHeight: 375, //海报高度
				sysWidth:375,
				sysHeight:375,
				widths: "", //图片列表动态宽度
				imgsrc: "", //保存图片的路径
				userdata: {}, //个人数据
				swiperList: [], //海报数组
				my_qrcode:'',
			};
		},
		onLoad: function() {
			that = this

			that.swiperList = [{
					posterImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1068316074,4162025599&fm=26&gp=0.jpg"
				},
				{
					posterImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2984198739,1466087350&fm=11&gp=0.jpg"
				},
				{
					posterImg: "https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg"
				}
			];
			
		
			uni.getSystemInfo({
			    success: function (res) {
					console.log("systeminfo:"+JSON.stringify(res));
					that.sysWidth = res.windowWidth;
					that.sysHeight = res.windowHeight;
					that.cansWidth = res.windowWidth;
					that.cansHeight = res.windowWidth;
					console.log("----------cansWidth:"+that.cansWidth);
			    }
			});
			that.selseimg(that.swiperList[0].posterImg)
			that.my_qrcode = uni.getStorageSync("my_qrcode");
	
			console.log("onLoad:"+that.my_qrcode);
		},
		methods: {
			selseimg(e) { //绘制海报
				var _this = this;
				// if (that.userdata.text.length > 3) { //昵称太长加省略号
				// 	that.userdata.text = that.userdata.text.slice(0, 3) + "..."
				// }

				uni.showLoading({
					title: '生成海报中'
				});
				
				const context = uni.createCanvasContext('firstCanvas')

				uni.downloadFile({
					url: e,
					success: function(res) {
						_this.getImageInfo(e);
					
						context.drawImage(res.tempFilePath, 0, 0, _this.cansWidth, _this.cansHeight) //海报背景
					}
				})

				setTimeout(function() { //定时器，海报方法不能立即执行，等页面渲染完成
					// context.drawImage(that.userdata.img,
					// 	10, 280, 260, 110) //个人信息背景
					context.drawImage(that.my_qrcode, _this.cansWidth-85, _this.cansHeight-85, 75, 75) //二维码图片

					context.setFillStyle('#333333')
					context.setFontSize(12)
					context.fillText('我的邀请码', _this.cansWidth-80, _this.cansHeight-95)
					context.fill()

					context.setFillStyle('#666666')
					context.setFontSize(12)
					context.fillText('邀请你加入拾金，', (_this.cansWidth-106)/2, _this.cansHeight-50)
					context.fillText('手机就能赚钱！', (_this.cansWidth-106)/2, _this.cansHeight-30)
					context.fill()

					// context.save()
					// context.beginPath()
					// context.arc(44, 350, 25, 0, 2 * Math.PI)
					// context.clip()
					//context.drawImage(that.userdata.img, 17, 322, 55, 55) //头像
					context.restore()
					context.draw()

					uni.hideLoading();
				}, 1000);

			},
			saveCans(e) { //保存海报
				uni.showLoading({
					title: '保存海报中'
				});

				console.log('保存');
				let tempRatio = 1.5;

				// #ifdef H5 || APP-PLUS
				tempRatio = 1;
				// #endif

				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: that.cansWidth * tempRatio,
					height: that.cansHeight * tempRatio,
					destWidth: that.cansWidth * tempRatio * 2,
					destHeight: that.cansHeight * tempRatio * 2,
					canvasId: 'firstCanvas',
					success: function(res) {
						uni.hideLoading()
						
						
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(red) {
								uni.showToast({
									title: '保存相册成功'
								})
								that.imgsrc = res.tempFilePath
								if (e == 2) {
									console.log("自己写分享")
									uni.share({
									    provider: "weixin",
									    scene: "WXSceneSession",
									    type: 2,
									    imageUrl: res.tempFilePath,
									    success: function (res) {
									        console.log("success:" + JSON.stringify(res));
									    },
									    fail: function (err) {
									        console.log("fail:" + JSON.stringify(err));
									    }
									});
									
								}
							},
							fail(res) {
								if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {

													},
													fail(res) {
														console.log(res)
													}
												})
											}
										}
									})
								}
							}
						});
					},
					fail(res) {
						uni.hideLoading()
					}
				}, this)
			},

			// 获取图片信息
			getImageInfo(image) {
				var _this = this;
				return new Promise((req, rej) => {
					uni.getImageInfo({
						src: image,
						success: function(res) {
							console.log("========getImageInfo:"+JSON.stringify(res));
							
			
							_this.cansHeight = _this.sysWidth * res.height/res.width;
							
							console.log("----------cansHeight="+_this.cansHeight);
							req(res)
						},
					});
				})
			},
		}
		
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}

	.pageHeader {
		height: var(--status-bar-height);
		background-color: #FFFFFF;
	}

	.box-header {
		position: fixed;
		top: 0upx;
		width: 100%;
		z-index: 100;
	}

	.top-box {
		height: 100upx;
		width: 100%;
	}

	.canvas {
		display: flex;
		justify-content: center;
	}

	.bottom {
		padding: 20upx 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		background-color: #ffffff;
	}

	.bottom view:first-child {
		padding: 20upx 60upx;
		background: #FF8A00;
		border-radius: 44upx;
		font-size: 30upx;
		color: #FFFFFF;
	}

	.bottom view:last-child {
		padding: 20upx 60upx;
		background: #FF5256;
		border-radius: 44upx;
		font-size: 30upx;
		color: #FFFFFF;
	}

	.imglist {
		width: 100%;
		padding: 20upx 0;
		overflow: auto;
		/* background-color: #ffffff; */
	}

	.imglist view {
		display: flex;
		justify-content: space-around;
	}

	.imglist image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.tishi-box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 260upx;
		background: #FFFFFF;
		border-radius: 20upx 20upx 0upx 0upx;
		text-align: center;
	}

	.tishi-box view {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 50upx;
	}

	.tishi-box image {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
</style>
