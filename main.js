import Vue from 'vue'
import App from './App'


import home from './pages/home/home.vue'
Vue.component('home',home)

import undo from './pages/zhlb/index.vue'
Vue.component('undo',undo)

import news from './pages/undo/home.vue'
Vue.component('news',news)

import me from './pages/me/home.vue'
Vue.component('me',me)

import HMPersonalCenter from './pages/me/home.vue'
Vue.component('HMPersonalCenter',HMPersonalCenter)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.loginStat = false;

Vue.prototype.accessToken = '';
Vue.prototype.userId = '13419599632';
Vue.prototype.loanTypeTree = [];

Vue.prototype.websiteUrl = 'http://uniapp.dcloud.io';  
Vue.prototype.imgPath = "http://www.sjyjr.net/static/productinfoImage/";
Vue.prototype.now = Date.now || function () {  
    return new Date().getTime();  
};  

Vue.prototype.isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};

Vue.prototype.commRequest = function(trancode, data, succ){
	if(trancode != '/app/login'){
		data.accessToken = uni.getStorageSync('accessToken');
	}
	console.log("---------"+trancode+" send:"+JSON.stringify(data));
	uni.showLoading({
		title:"加载中"
	})
	uni.request({
	  //  url: 'http://www.sjyjr.net/sjyjf/app/'+trancode, //仅为示例，并非真实接口地址。
		url:trancode,
		data:data,
	    method:'POST',
	    dataType:'application/json',
	    header: {
	    	"Content-Type": "application/x-www-form-urlencoded",
	    },
	    success: (res) => {
	        console.log("---------"+trancode+" recv:"+res.data);
			uni.hideLoading()
			res = res.data;
			res = JSON.parse(res);
			
			console.log("---------"+trancode+" res.data.code:"+res.code);
			
			console.log("---------"+trancode+" res.data.msg:"+res.msg);
			
			if(res.code == "200"){
				succ(res);
			}else if(res.code == "A006"){	
				var userInfo = uni.getStorageSync("userInfo");
				userInfo.loginStat = false;
				uni.setStorage({
					key: 'userInfo',
					data: userInfo,
					success: function () {
						console.log('userInfo success');
					}
				});
				uni.$emit('update', {});
				uni.showModal({
					title: "交易失败："+res.msg,
					duration: 2000,
					success: (res) => {
						console.log("res:"+JSON.stringify(res));
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/login/login.vue'
							})
						}
					}
				});
			}else{
				uni.showModal({
					title: "交易失败："+res.msg,
					duration: 2000
				});
			}

	    },
	    complete: (res) => {
	    	uni.hideLoading()
	    }
	});
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



