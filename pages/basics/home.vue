
<template name="basics">

	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">首页</block>
		</cu-custom>
		<button type="default" v-on:click="openCamara">相机</button>
		<scroll-view scroll-y class="page">
			<image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad: (options) => {
			console.log("basics home onLoad");
		},
		data() {
			return {
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						cuIcon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						cuIcon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						cuIcon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						cuIcon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						cuIcon: 'loading2'
					}
				],
			};
		},
		mounted() {
			console.log("mounted success");
			uni.setNavigationBarTitle({
				title:'wodeshouye'
			})
			uni.showToast({
			    title: '标题',
			    duration: 2000
			});
		},
		
		methods:{
		
		openCamara(){
			console.log("openCamara");
			uni.navigateTo({
				url:'/pages/basics/layout?id=11111'
			})
			// uni.chooseImage({
			//     count: 6, //默认9
			//     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			//     sourceType: ['album'], //从相册选择
			//     success: function (res) {
			//         console.log(JSON.stringify(res.tempFilePaths));
			//     }
			// });
		}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
