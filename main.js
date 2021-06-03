import Vue from 'vue';
import App from './App';
import store from './store';

Vue.prototype.$store = store;

import home from './pages/home/home.vue';
Vue.component('Home',home);

import undo from './pages/zhlb/index.vue';
Vue.component('Undo',undo);

import news from './pages/undo/home.vue';
Vue.component('News',news);

import me from './pages/me/home.vue';
Vue.component('Me',me);

import HMPersonalCenter from './pages/me/home.vue';
Vue.component('HMPersonalCenter',HMPersonalCenter);

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('CuCustom',cuCustom);

Vue.config.productionTip = false;

Vue.prototype.loginStat = false;

Vue.prototype.accessToken = '';


Vue.prototype.websiteUrl = 'http://uniapp.dcloud.io';  
Vue.prototype.imgPath = 'http://www.sjyjr.net/static/productinfoImage/';
Vue.prototype.now = Date.now || function () {  
	return new Date().getTime();  
};  

Vue.prototype.isArray = Array.isArray || function (obj) {  
	return obj instanceof Array;  
};
Vue.prototype.isLogin = function(){
	var userInfo = uni.getStorageSync('userInfo');
	this.loginStat = userInfo.loginStat;
	//如果状态为登录则获取数据
	if(this.loginStat){
		return true;
	}
	
	return false;
};
const baseUrl = process.env.NODE_ENV == 'production' ? '' : 'http://101.132.71.95:8095';

Vue.prototype.commRequest = function(trancode, data, succ){
	let accessToken = '';
	if(trancode != '/login'){
		accessToken = uni.getStorageSync('accessToken');
	}
	console.log('baseURL:'+baseUrl+trancode+' send:'+JSON.stringify(data));
	uni.showLoading({
		title:'加载中'
	});
	uni.request({
	    url: baseUrl + trancode, //仅为示例，并非真实接口地址。
		//	url: 'http://127.0.0.1:8899'+trancode, //仅为示例，并非真实接口地址。
		//url:trancode,
		data:data,
	    method:'POST',
	    dataType:'application/json',
	    header: {
	    	'Content-Type': 'application/x-www-form-urlencoded',
			"X-Token": accessToken,
			"X-Requested-With": "XMLHttpRequest"

	    },
	    success: (res) => {
	        console.log('---------'+trancode+' recv:'+res.data);
			uni.hideLoading();
			//如果是登录交易，更新TOKEN
			if(trancode == '/login'){
				uni.setStorageSync('accessToken', res.token);
			}
			res = res.data;
			res = JSON.parse(res);
			
			console.log('---------'+trancode+' res.data.code:'+res.code);
			
			console.log('---------'+trancode+' res.data.msg:'+res.msg);
			
			if(res.code == '200'){
				succ(res);
			}else if(res.code == 'A006'){	
				var userInfo = uni.getStorageSync('userInfo');
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
					title: '交易失败：'+res.msg,
					duration: 2000,
					success: (res) => {
						console.log('res:'+JSON.stringify(res));
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/login/login.vue'
							});
						}
					}
				});
			}else{
				uni.showModal({
					title: '交易失败：'+res.msg,
					duration: 2000
				});
			}

	    },
	    complete: (res) => {
	    	uni.hideLoading();
	    }
	});
};

App.mpType = 'app';

const app = new Vue({
	store,
	...App
});
app.$mount();

 



