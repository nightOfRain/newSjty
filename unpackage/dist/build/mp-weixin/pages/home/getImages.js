(global['webpackJsonp']=global['webpackJsonp']||[]).push([['pages/home/getImages'],{'0afb':function(e,t,n){'use strict';(function(e){n('5c7b');o(n('66fd'));var t=o(n('ac76'));function o(e){return e&&e.__esModule?e:{default:e};}e(t.default);}).call(this,n('543d')['createPage']);},'35d8':function(e,t,n){'use strict';(function(e){Object.defineProperty(t,'__esModule',{value:!0}),t.default=void 0;var o=r(n('a34a')),a=r(n('85c3'));function r(e){return e&&e.__esModule?e:{default:e};}function s(e,t,n,o,a,r,s){try{var i=e[r](s),c=i.value;}catch(l){return void n(l);}i.done?t(c):Promise.resolve(c).then(o,a);}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function i(e){s(r,o,a,i,c,'next',e);}function c(e){s(r,o,a,i,c,'throw',e);}i(void 0);}));};}function c(e,t){var n;if('undefined'===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=l(e))||t&&e&&'number'===typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]};},e:function(e){throw e;},f:a};}throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');}var r,s=!0,i=!1;return{s:function(){n=e[Symbol.iterator]();},n:function(){var e=n.next();return s=e.done,e;},e:function(e){i=!0,r=e;},f:function(){try{s||null==n.return||n.return();}finally{if(i)throw r;}}};}function l(e,t){if(e){if('string'===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return'Object'===n&&e.constructor&&(n=e.constructor.name),'Map'===n||'Set'===n?Array.from(e):'Arguments'===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0;}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o;}var f={data:function(){return{index:-1,fileNo:'',type:0,imgIndex:0,imgServerList:[],imgList:[],canvasW:0,canvasH:0,SystemInfo:{},goodsImg:{},ewmImg:{},ewmW:120,title:'COCOSILIYA抖音爆款男女士鎏金沙香水持久自然淡香流沙金香水',price:'158.00',Oldprice:'350.00',name:'天涯过客'};},methods:{ChooseImage:function(){var t=this;e.chooseImage({count:9,sizeType:['original','compressed'],success:function(n){console.log('\n===================\nchooseImage:'+JSON.stringify(n));var o,a=n.tempFilePaths,r=c(a);try{for(r.s();!(o=r.n()).done;){var s=o.value,i=encodeURI('http://www.sjyjr.net/sjyjf/app/6023?fileNo='+t.fileNo+'&accessToken='+e.getStorageSync('accessToken'));e.uploadFile({url:i,filePath:s,name:'file',formData:{user:'test'},success:function(n){console.log('update success:'+n.data);var o=JSON.parse(n.data),a='http://www.sjyjr.net/static/'+t.fileNo+'/'+o.responseData;console.log('serurl:'+a),t.imgServerList.push(o.responseData),t.imgList.push(a),e.setStorageSync(t.fileNo+'_'+t.index+'_img',t.imgServerList.join('|')),e.setStorage({key:t.fileNo+'_'+t.index+'_img',data:t.imgServerList.join('|'),success:function(){console.log('success');}});},complete:function(e){console.log('complete:'+JSON.stringify(e));}});}}catch(l){r.e(l);}finally{r.f();}}});},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url});},DelImg:function(t){var n=this;e.showModal({title:'召唤师',content:'确定要删除这段回忆吗？',cancelText:'再看看',confirmText:'再见',success:function(o){o.confirm&&(n.imgList.splice(t.currentTarget.dataset.index,1),n.imgServerList.splice(t.currentTarget.dataset.index,1),e.setStorage({key:n.fileNo+'_'+n.index+'_img',data:n.imgServerList.join('|'),success:function(){console.log('success');}}));}});},addWaterImg:function(t){var n=this;return i(o.default.mark((function a(){var r;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return r=n,console.log('==========addWaterImg:'+t),o.next=4,n.getSystemInfo();case 4:return n.SystemInfo=o.sent,o.next=7,n.getImageInfo('http://api.yoronglife.com//uploads/attach/2020/10/20201020/7f0ecf34d9408f7fc3b789894483ab75.jpg');case 7:return n.goodsImg=o.sent,o.next=10,n.getImageInfo('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg');case 10:n.ewmImg=o.sent,n.canvasW=n.SystemInfo.windowWidth,n.canvasH=n.goodsImg.height+n.ewmW+50,'getImageInfo:ok'==n.goodsImg.errMsg&&'getImageInfo:ok'==n.ewmImg.errMsg&&'getSystemInfo:ok'==n.SystemInfo.errMsg?(console.log('==============ok'),e.showToast({icon:'loading',mask:!0,duration:1e4,title:'海报绘制中'}),setTimeout((function(){console.log('=================setTimeout=============='),console.log('=================canvasW:'+r.canvasW),console.log('=================canvasH:'+r.canvasH);var t=e.createCanvasContext('myCanvas',r);t.fillRect(0,0,r.canvasW,r.canvasH),t.drawImage(n.goodsImg.path,0,0,n.canvasW,n.canvasW),t.drawImage(n.ewmImg.path,n.canvasW-130,n.canvasW+10,n.ewmW,n.ewmW),t.setFontSize(16),t.setFillStyle('#ffffff'),t.font='10px sans-serif',t.setTextAlign('center'),t.fillText('联系我们：0731-89572689',r.canvasW/2,50),t.save(),console.log('222222=================setTimeout=============='),console.log('33333333=================setTimeout=============='),t.draw(!0,(function(t){console.log('=============draw finish=========='+t),e.showToast({icon:'success',mask:!0,title:'绘制完成'}),e.canvasToTempFilePath({canvasId:'myCanvas',complete:function(e){console.log('=========canvasToTempFilePath:'+JSON.stringify(e));}});}));}),1e4)):console.log('==================err');case 14:case'end':return o.stop();}}),a);})))();},getImageInfo:function(t){return new Promise((function(n,o){e.getImageInfo({src:t,success:function(e){console.log('========getImageInfo:'+JSON.stringify(e)),n(e);}});}));},getSystemInfo:function(){return new Promise((function(t,n){e.getSystemInfo({success:function(e){console.log('========getSystemInfo:'+JSON.stringify(e)),t(e);}});}));}},onLoad:function(t){var n=this;n.fileNo=t.fileNo,n.imgIndex=t.index,n.type=t.type,console.log('getImages onLoad:'+JSON.stringify(t));a.default.getImgType(t.index);var o=e.getStorageSync(t.fileNo+'_'+t.index+'_img');n.imgServerList=o.split('|'),console.log('tmpData:'+JSON.stringify(o)),console.log('imgServerList:'+JSON.stringify(n.imgServerList)),a.default.isEmpty(o)||(n.imgList=a.default.getImgUrlList(o,t.fileNo)),console.log('imgList:'+JSON.stringify(n.imgList));}};t.default=f;}).call(this,n('543d')['default']);},'50fe':function(e,t,n){'use strict';n.r(t);var o=n('35d8'),a=n.n(o);for(var r in o)'default'!==r&&function(e){n.d(t,e,(function(){return o[e];}));}(r);t['default']=a.a;},'84b3':function(e,t,n){'use strict';var o;n.d(t,'b',(function(){return a;})),n.d(t,'c',(function(){return r;})),n.d(t,'a',(function(){return o;}));var a=function(){var e=this,t=e.$createElement;e._self._c;},r=[];},ac76:function(e,t,n){'use strict';n.r(t);var o=n('84b3'),a=n('50fe');for(var r in a)'default'!==r&&function(e){n.d(t,e,(function(){return a[e];}));}(r);var s,i=n('f0c5'),c=Object(i['a'])(a['default'],o['b'],o['c'],!1,null,null,null,!1,o['a'],s);t['default']=c.exports;}},[['0afb','common/runtime','common/vendor']]]);