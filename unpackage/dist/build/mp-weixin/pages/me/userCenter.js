(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/userCenter"],{"1a0f":function(e,t,n){"use strict";n.r(t);var a=n("f8d4"),s=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=s.a},3548:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement;e._self._c},u=[]},4692:function(e,t,n){"use strict";var a=n("aef4"),s=n.n(a);s.a},aef4:function(e,t,n){},e27b:function(e,t,n){"use strict";(function(e){n("9d04");a(n("66fd"));var t=a(n("f619"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},f619:function(e,t,n){"use strict";n.r(t);var a=n("3548"),s=n("1a0f");for(var u in s)"default"!==u&&function(e){n.d(t,e,(function(){return s[e]}))}(u);n("4692");var r,o=n("f0c5"),i=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=i.exports},f8d4:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{userName:"",userTel:"",userStat:["试用","正式","请假","离职"],statIndex:0,entryTime:"",pos:"",userGroupName:"",imgList:[],faceIcon:"",userImage:""}},methods:{ChooseImage:function(t){var n=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){console.log("ChooseImage ["+t+"]:"+JSON.stringify(e)),0==t?n.faceIcon=e.tempFilePaths[0]:n.userImage=e.tempFilePaths[0]}})},ViewImage:function(t){console.log("ViewImage:"+JSON.stringify(t)),e.previewImage({urls:[this.userImage],current:t.currentTarget.dataset.url})},DelImg:function(t){var n=this;e.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(e){e.confirm&&(n.userImage="")}})},textareaAInput:function(e){this.textareaA.value=e.detail.value},qrCodeTap:function(){e.navigateTo({url:"/pages/plugin/tki-qrcode"})},canvasTap:function(){e.navigateTo({url:"/pages/plugin/canvas"})}},onLoad:function(){var t=e.getStorageSync("userInfo");t=t.sysUserDetailRelate,console.log("onLoad userInfo:"+JSON.stringify(t)),this.userName=t.userName,this.userTel=t.userTel,this.statIndex=t.userStatus,this.entryTime=t.entryTime,this.userGroupName=t.userGroupEntity.userGroupName;for(var n="",a=0;a<t.userPostList.length;a++)a==t.userPostList.length-1?n+=t.userPostList[a].postName:n+=t.userPostList[a].postName+"-";this.pos=n}};t.default=n}).call(this,n("543d")["default"])}},[["e27b","common/runtime","common/vendor"]]]);