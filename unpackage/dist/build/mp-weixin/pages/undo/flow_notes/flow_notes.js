(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/undo/flow_notes/flow_notes"],{"32c7":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"6bcc":function(t,e,n){"use strict";n.r(e);var o=n("32c7"),r=n("a76b");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("e6af");var a,u=n("f0c5"),s=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=s.exports},"85e0":function(t,e,n){"use strict";(function(t){n("9d04");o(n("66fd"));var e=o(n("6bcc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"9f77":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("458e"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=a(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,i=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw i}}}}function a(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var s={data:function(){return{InputBottom:0,noteList:[],note:"",fileno:"",imgServerList:[],nowNoteList:[],tmpImgList:[]}},methods:{InputFocus:function(t){this.InputBottom=t.detail.height},InputBlur:function(t){this.InputBottom=0},InputIn:function(t){this.note=t.detail.value},savenote:function(){var t=this;console.log("savenote:"+this.note);var e={type:"0",text:t.note,createTime:o.default.getNowTime()};t.note="",t.nowNoteList.push(e)},ChooseImage:function(){var e=this;t.chooseImage({count:9,sizeType:["original","compressed"],success:function(n){console.log("\n===================\nchooseImage:"+JSON.stringify(n));var r,a=n.tempFilePaths,u=i(a);try{for(u.s();!(r=u.n()).done;){var s=r.value,c=encodeURI("http://www.sjyjr.net/sjyjf/app/6023?fileNo="+e.fileNo+"&accessToken="+t.getStorageSync("accessToken"));t.uploadFile({url:c,filePath:s,name:"file",formData:{user:"test"},success:function(t){console.log("update success:"+t.data);var n=JSON.parse(t.data),r="http://www.sjyjr.net/static/"+e.fileNo+"/"+n.responseData;e.imgServerList.push(n.responseData);var i={type:"1",imgurl:r,createTime:o.default.getNowTime()};e.nowNoteList.push(i)},complete:function(t){console.log("complete:"+JSON.stringify(t))}})}}catch(l){u.e(l)}finally{u.f()}}})},ViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){var n=this;t.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(o){o.confirm&&(n.imgList.splice(e.currentTarget.dataset.index,1),n.imgServerList.splice(e.currentTarget.dataset.index,1),t.setStorage({key:n.fileNo+"_"+n.index+"_img",data:n.imgServerList.join("|"),success:function(){console.log("success")}}))}})}},onLoad:function(t){console.log("=====flow_notes:"+JSON.stringify(t));var e=this;this.fileno=t.fileNo;var n={fileNo:t.fileNo,flowNo:t.flowNo,versionNo:t.vno};e.commRequest("6057",n,(function(t){e.noteList=t.responseData}))}};e.default=s}).call(this,n("543d")["default"])},a76b:function(t,e,n){"use strict";n.r(e);var o=n("9f77"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},d111:function(t,e,n){},e6af:function(t,e,n){"use strict";var o=n("d111"),r=n.n(o);r.a}},[["85e0","common/runtime","common/vendor"]]]);