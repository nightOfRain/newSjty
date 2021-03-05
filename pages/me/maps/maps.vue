<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择位置</block>
		</cu-custom>
		
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map style="width: 100%; height: 400px;" :latitude="latitude" :longitude="longitude" :markers="covers">
                </map>
            </view>
        </view>
		
		<view class="padding flex flex-direction" @click="chooseMap()">
			<button class="cu-btn bg-red margin-tb-sm lg">选择地图</button>
		</view>
    </view>
</template>

<script>
export default {
    data() {
		return {
			id:0, // 使用 marker点击事件 需要填写id
            title: 'map',
            latitude: 39.909,
            longitude: 116.39742,
            covers: []
        }
    },
    methods: {
		chooseMap(){
			uni.chooseLocation({
			    success: function (res) {
					console.log("chooseLocation:"+JSON.stringify(res));
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
			    }
			});
		}
    },
	onLoad(){
		console.log("maps onLoad");
		var _this = this;
		uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
				console.log("getLocation:"+JSON.stringify(res));
		        console.log('当前位置的经度：' + res.longitude);
		        console.log('当前位置的纬度：' + res.latitude);
				_this.longitude = res.longitude;
				_this.latitude = res.latitude;
				
				var item = {
					latitude: res.latitude,
					longitude: res.longitude,
					title:"我在那里？",
					iconPath: '/static/images/img_2.png',
					width:20,
					height:20,
				};
				var array = [];
				array.push(item);
				_this.covers = array;
		    }
		});
	}
}
</script>

<style>

</style>
