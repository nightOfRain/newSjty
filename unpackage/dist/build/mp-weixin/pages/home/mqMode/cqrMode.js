(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/mqMode/cqrMode"],{"1ee5":function(e,t,a){},"6a63":function(e,t,a){"use strict";var i=a("1ee5"),o=a.n(i);o.a},b57e:function(e,t,a){"use strict";a.r(t);var i=a("f86d"),o=a("e7a6");for(var n in o)"default"!==n&&function(e){a.d(t,e,(function(){return o[e]}))}(n);a("6a63");var r,u=a("f0c5"),d=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);t["default"]=d.exports},da95:function(e,t,a){"use strict";(function(e){a("9d04");i(a("66fd"));var t=i(a("b57e"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},e45d:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("458e"));function o(e){return e&&e.__esModule?e:{default:e}}var n={data:function(){return{idTypeindex:2,idTypeindex_po:2,idTypeindex_dlr:2,idTypePicker:["组织机构代码证","营业执照","身份证","护照","军人证","武警证","港澳居民来往内地通行证","户口簿","台湾居民来往大陆通行证","外国人永久居留证","其他"],idTypeValue:["E1","E2","I1","I2","I3","I4","I5","I6","I9","Ia","I8"],marryPicker:["未婚","已婚","离异","丧偶"],picker:["置换购房","投资购房","资金周转","其他"],time:"12:01",date:"2018-12-25",switchD:!1,fileNo:"",index:-1,formdata:{mfHaspo:0,housePurpose:-1},imgLocalList:[],imgServerList:[],imgList:[]}},methods:{PickerChange:function(e){console.log("PickerChange:"+JSON.stringify(e)),"0"==e.currentTarget.dataset.type?this.idTypeindex=e.detail.value:"1"==e.currentTarget.dataset.type?this.idTypeindex_po=e.detail.value:"2"==e.currentTarget.dataset.type&&(this.idTypeindex_dlr=e.detail.value)},PickerChange_zh:function(e){this.formdata.housePurpose=e.detail.value},marryPickerChange:function(e){this.formdata.mfHaspo=e.detail.value,console.log("marryPickerChange:"+this.formdata.mfHaspo)},TimeChange:function(e){this.time=e.detail.value},DateChange:function(e){this.date=e.detail.value},SwitchD:function(e){this.switchD=e.detail.value},textareaAInput:function(e){this.textareaAValue=e.detail.value},textareaBInput:function(e){this.textareaBValue=e.detail.value},getImageTap:function(t){var a=this;e.navigateTo({url:"/pages/home/getImages?fileNo="+a.fileNo+"&index=0&type=1"})},formSubmit:function(t){var a=this;console.log("form发生了submit事件，携带数据为："+JSON.stringify(t.detail.value));var o=t.detail.value;o.mfZjlx=a.idTypeValue[a.idTypeindex],o.mfpoZjlx=a.idTypeValue[a.idTypeindex_po],o.mfdlrZjlx=a.idTypeValue[a.idTypeindex_dlr],o.housePurpose=a.formdata.housePurpose,o.mfHaspo=a.formdata.mfHaspo,a.switchD?o.mfHasdlr="1":o.mfHasdlr="0",o.imgMf=a.imgServerList.join("|"),console.log("表单数据内容："+JSON.stringify(o)),a.formdata=i.default.twoJsonMerge(a.formdata,o),console.log("更新后案卷数据:"+JSON.stringify(a.formdata)),e.setStorageSync(a.fileNo+"_tmpData",JSON.stringify(a.formdata))},formReset:function(e){console.log("清空数据")}},onLoad:function(t){var a=this;console.log("options.item:"+JSON.stringify(t)),a.fileNo=t.fileNo;var o=e.getStorageSync(t.fileNo+"_tmpData");console.log("cqr onLoad:"+JSON.stringify(o)),i.default.isEmpty(o)||(a.formdata=i.default.twoJsonMerge(a.formdata,o),o.housePurpose&&--a.formdata.housePurpose,1==o.mkHasdlr?a.switchD=!0:a.switchD=!1)}};t.default=n}).call(this,a("543d")["default"])},e7a6:function(e,t,a){"use strict";a.r(t);var i=a("e45d"),o=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);t["default"]=o.a},f86d:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement;e._self._c},n=[]}},[["da95","common/runtime","common/vendor"]]]);