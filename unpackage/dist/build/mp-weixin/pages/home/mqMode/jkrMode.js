(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/mqMode/jkrMode"],{"113e":function(e,t,a){"use strict";(function(e){a("9d04");r(a("66fd"));var t=r(a("9d58"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"18ff":function(e,t,a){"use strict";a.r(t);var r=a("c74c"),i=a.n(r);for(var d in r)"default"!==d&&function(e){a.d(t,e,(function(){return r[e]}))}(d);t["default"]=i.a},"90f6":function(e,t,a){"use strict";var r;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return d})),a.d(t,"a",(function(){return r}));var i=function(){var e=this,t=e.$createElement;e._self._c},d=[]},"9d58":function(e,t,a){"use strict";a.r(t);var r=a("90f6"),i=a("18ff");for(var d in i)"default"!==d&&function(e){a.d(t,e,(function(){return i[e]}))}(d);a("d2ee");var o,n=a("f0c5"),l=Object(n["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);t["default"]=l.exports},c60f:function(e,t,a){},c74c:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(a("458e"));function i(e){return e&&e.__esModule?e:{default:e}}var d={data:function(){return{idTypeindex:2,idTypeindex_po:2,idTypeindex_gt:2,idTypeindex_gtpo:2,idTypeindex_dlr:2,idTypePicker:["组织机构代码证","营业执照","身份证","护照","军人证","武警证","港澳居民来往内地通行证","户口簿","台湾居民来往大陆通行证","外国人永久居留证","其他"],idTypeValue:["E1","E2","I1","I2","I3","I4","I5","I6","I9","Ia","I8"],marryPicker:["未婚","已婚","离异","丧偶"],picker:["受薪","公务员","自佣"],time:"12:01",date:"2018-12-25",switchA:!1,switchC:!1,switchD:!1,fileNo:"",index:-1,formdata:{jkrHaspo:0,gtjkrHaspo:0,jobType:-1},imgLocalList:[],imgServerList:[],imgList:[]}},methods:{PickerChange:function(e){console.log("PickerChange:"+JSON.stringify(e)),"0"==e.currentTarget.dataset.type?this.idTypeindex=e.detail.value:"1"==e.currentTarget.dataset.type?this.idTypeindex_po=e.detail.value:"2"==e.currentTarget.dataset.type?this.idTypeindex_gt=e.detail.value:"3"==e.currentTarget.dataset.type?this.idTypeindex_gtpo=e.detail.value:"4"==e.currentTarget.dataset.type&&(this.idTypeindex_dlr=e.detail.value)},PickerChange_sx:function(e){this.formdata.jobType=e.detail.value},marryPickerChange:function(e){"0"==e.currentTarget.dataset.type?this.formdata.jkrHaspo=e.detail.value:"1"==e.currentTarget.dataset.type&&(this.formdata.gtjkrHaspo=e.detail.value),console.log("marryPickerChange:"+e.currentTarget.dataset.type),console.log("marryPickerChange:"+this.formdata.jkrHaspo),console.log("marryPickerChange:"+this.formdata.gtjkrHaspo)},TimeChange:function(e){this.time=e.detail.value},DateChange:function(e){this.date=e.detail.value},SwitchA:function(e){this.switchA=e.detail.value},SwitchC:function(e){this.switchC=e.detail.value},SwitchD:function(e){this.switchD=e.detail.value},textareaAInput:function(e){this.textareaAValue=e.detail.value},textareaBInput:function(e){this.textareaBValue=e.detail.value},getImageTap:function(t){var a=this;console.log("getImageTap:"),e.navigateTo({url:"/pages/home/getImages?fileNo="+a.fileNo+"&index="+t.currentTarget.dataset.index+"&type=1"})},formSubmit:function(t){var a=this;console.log("form发生了submit事件，携带数据为："+JSON.stringify(t.detail.value));var i=t.detail.value;i.jkrZjlx=a.idTypeValue[a.idTypeindex],i.jkrpoZjlx=a.idTypeValue[a.idTypeindex_po],i.gtjkrZjlx=a.idTypeValue[a.idTypeindex_gt],i.gtjkrpoZjlx=a.idTypeValue[a.idTypeindex_gtpo],i.jkrDlrZjlx=a.idTypeValue[a.idTypeindex_dlr],i.jobType=++a.formdata.jobType,i.jkrHaspo=a.formdata.jkrHaspo,i.gtjkrHaspo=a.formdata.gtjkrHaspo,a.switchA?i.jkrHasqtzc="1":i.jkrHasqtzc="0",a.switchC?i.jkrHasgtjkr="1":i.jkrHasgtjkr="0",a.switchD?i.jkrHasdlr="1":i.jkrHasdlr="0",console.log("表单数据内容："+JSON.stringify(i)),a.formdata=r.default.twoJsonMerge(a.formdata,i),console.log("更新后案卷数据:"+JSON.stringify(a.formdata)),e.setStorageSync(a.fileNo+"_tmpData",JSON.stringify(a.formdata))},formReset:function(e){console.log("清空数据")}},onLoad:function(t){var a=this;console.log("options.item:"+JSON.stringify(t)),a.fileNo=t.fileNo;var i=e.getStorageSync(t.fileNo+"_tmpData");console.log("cqr onLoad:"+JSON.stringify(i)),r.default.isEmpty(i)||(a.formdata=r.default.twoJsonMerge(a.formdata,i),a.idTypeindex=r.default.getIdArrayIndex(a.formdata.jkrZjlx),a.idTypeindex_po=r.default.getIdArrayIndex(a.formdata.jkrpoZjlx),a.idTypeindex_gt=r.default.getIdArrayIndex(a.formdata.gtjkrZjlx),a.idTypeindex_gtpo=r.default.getIdArrayIndex(a.formdata.gtjkrpoZjlx),a.idTypeindex_dlr=r.default.getIdArrayIndex(a.formdata.jkrDlrZjlx),i.jobType&&(a.jobType=--a.formdata.jobType),1==i.mkHasdlr?a.jkrHasqtzc=!0:a.jkrHasqtzc=!1,1==i.mkHasdlr?a.jkrHasgtjkr=!0:a.jkrHasgtjkr=!1,1==i.mkHasdlr?a.jkrHasdlr=!0:a.jkrHasdlr=!1,r.default.isEmpty(a.formdata.gtjkrHaspo)&&(this.formdata.gtjkrHaspo=0))}};t.default=d}).call(this,a("543d")["default"])},d2ee:function(e,t,a){"use strict";var r=a("c60f"),i=a.n(r);i.a}},[["113e","common/runtime","common/vendor"]]]);