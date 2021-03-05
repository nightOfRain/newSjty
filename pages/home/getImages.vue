<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">图片模块</block>
		</cu-custom>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/30
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" v-if="type == 1">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<30 && type==1">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view style='width:0px;height:0px;overflow:hidden;'>
			<canvas canvas-id="myCanvas" class="">
			</canvas>
		</view>
	</view>
</template>

<script>
	import utils from "../../utils.js";
	export default {
		data() {
			return {
				index: -1,
				fileNo:'',
				type:0,
				imgIndex:0,
				imgServerList:[],//存放已经上传的图片
				imgList: [],
				canvasW:0, // 画布宽
				canvasH:0, // 画布高
				SystemInfo:{}, // 设备信息
				goodsImg: {}, // 商品主图
				ewmImg:{}, // 二维码图片
				ewmW:120, // 二维码大小
				title:'COCOSILIYA抖音爆款男女士鎏金沙香水持久自然淡香流沙金香水', // 商品标题
				price:'158.00', // 价格
				Oldprice:'350.00', // 原价
				name:'天涯过客', // 推荐人
			}
		},
		methods: {
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
									console.log("serurl:"+serurl);
									_this.imgServerList.push(tempData.responseData);
									_this.imgList.push(serurl)
										
									
									uni.setStorageSync(_this.fileNo+"_"+_this.index+"_img", _this.imgServerList.join("|"));
									uni.setStorage({
										key: _this.fileNo + '_'+_this.index+'_img',
										data: _this.imgServerList.join("|"),
										success: function () {
											console.log('success');
										}
									})
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
			/**
			 * @param {Object} goodsImgUrl
			 * 图片加水印：目前还有问题
			 * 1、图片只截取了部分
			 * 2、水印没加上去
			 */
			async addWaterImg(goodsImgUrl){
				var _this = this;
				console.log("==========addWaterImg:"+goodsImgUrl);
				// 获取设备信息，主要获取宽度，赋值给canvasW 也就是宽度：100%
				this.SystemInfo = await this.getSystemInfo();
				// 获取商品主图，二维码信息，APP端会返回图片的本地路径（H5端只能返回原路径）
				this.goodsImg = await this.getImageInfo('http://api.yoronglife.com//uploads/attach/2020/10/20201020/7f0ecf34d9408f7fc3b789894483ab75.jpg');
				this.ewmImg = await this.getImageInfo('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg');
				this.canvasW = this.SystemInfo.windowWidth; // 画布宽度
							this.canvasH = this.goodsImg.height + this.ewmW + 50;  // 画布高度 = 主图高度+二维码高度 + 文字图片的间距（大概50）
			
				// 如果主图，二维码图片，设备信息都获取成功，开始绘制海报，这里需要用setTimeout延时绘制，否则可能会出现图片不显示。
				if(this.goodsImg.errMsg == 'getImageInfo:ok' && this.ewmImg.errMsg == 'getImageInfo:ok' && this.SystemInfo.errMsg == 'getSystemInfo:ok'){
				//if(this.goodsImg.errMsg == 'getImageInfo:ok' && this.SystemInfo.errMsg == 'getSystemInfo:ok'){
				
					console.log('==============ok')
					uni.showToast({
						icon:'loading',
						mask:true,
						duration:10000,
						title: '海报绘制中',
					});
					setTimeout(()=>{
						console.log("=================setTimeout==============");
						console.log("=================canvasW:"+_this.canvasW);
						console.log("=================canvasH:"+_this.canvasH);
						var ctx = uni.createCanvasContext('myCanvas', _this);
						// 填充背景色，白色
						
						ctx.fillRect(0, 0, _this.canvasW, _this.canvasH) // fillRect(x,y,宽度，高度)
						
						// 绘制商品主图，二维码
						// 绘制商品主图，二维码
											ctx.drawImage(this.goodsImg.path, 0, 0, this.canvasW, this.canvasW) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度)
											ctx.drawImage(this.ewmImg.path, this.canvasW-130, this.canvasW+10, this.ewmW, this.ewmW) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度,二维码的宽,高)
											
				// 3、绘制商品标题，多余文字自动换行
						ctx.setFontSize(16); // setFontSize() 设置字体字号
						ctx.setFillStyle('#ffffff'); // setFillStyle() 设置字体颜色
						ctx.font='10px sans-serif'  
					 
						ctx.setTextAlign("center")  
					
						ctx.fillText('联系我们：0731-89572689', _this.canvasW/2, 50)    
						ctx.save()
						/* end */
						console.log("222222=================setTimeout==============")
						
						
	
						console.log("33333333=================setTimeout==============")
						ctx.draw(true,(ret)=>{ // draw方法 把以上内容画到 canvas 中。
							console.log("=============draw finish=========="+ret); 
							uni.showToast({
								icon:'success',
								mask:true,
								title: '绘制完成',
							});
							uni.canvasToTempFilePath({ // 保存canvas为图片
								canvasId: 'myCanvas',
								complete: function(res) {
									// 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
									console.log("=========canvasToTempFilePath:"+JSON.stringify(res));
									
								} ,
							})
						});
					},10000)
				}else{
					
					console.log('==================err')
					
				}
			},
			// 获取图片信息
			getImageInfo(image) {
				return new Promise((req, rej) => {
					uni.getImageInfo({
						src: image,
						success: function(res) {
							console.log("========getImageInfo:"+JSON.stringify(res));
							req(res)
						},
					});
				})
			},
			
			// 获取设备信息
			getSystemInfo(){
				return new Promise((req, rej) => {
					uni.getSystemInfo({
						success: function (res) {
							console.log("========getSystemInfo:"+JSON.stringify(res));
							req(res)
						}
					});
				})
			},
			
		},
		onLoad(options){
			var _this = this;
			_this.fileNo = options.fileNo;
			_this.imgIndex = options.index;
			_this.type = options.type;//0-只读 1-可编辑
			console.log("getImages onLoad:"+JSON.stringify(options));
			var imgType = utils.getImgType(options.index);
			var tmpData = uni.getStorageSync(options.fileNo+"_"+options.index+"_img");
			_this.imgServerList = tmpData.split("|");
			console.log("tmpData:"+JSON.stringify(tmpData));
			
			console.log("imgServerList:"+JSON.stringify(_this.imgServerList));
			if(!utils.isEmpty(tmpData)){
				_this.imgList = utils.getImgUrlList(tmpData,options.fileNo);
			}
			
			console.log("imgList:"+JSON.stringify(_this.imgList));
		}
	}
</script>

<style>
</style>
