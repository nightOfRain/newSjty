/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
const commRequest = function(trancode, data, succ){
	console.log(trancode+" send: " + JSON.stringify(data));
	if(trancode != '6001'){
		data.accessToken = uni.getStorageSync('accessToken');	
	}
	uni.request({
	    url: 'http://www.sjyjr.net/sjyjf/app/'+trancode, //仅为示例，并非真实接口地址。
	    data:data,
		method:'POST',
		dataType:'application/json',
	    header: {
			"Content-Type": "application/x-www-form-urlencoded",
	    },
	    success: (res) => {
	        console.log(trancode+" success:"+res.data);
			succ(res);
	      //  this.text = 'request success';
	    },
		complete: (res) => {
			
		}
	});
}

const isEmpty=function(obj){     
	if(!obj || obj == 0 || obj == '' || obj== 'null' || obj == 'undefined') {
		return true;
	}
	
	if(Array.prototype.isPrototypeOf(obj) && obj.length == 0) {
		　　　return true;
	}

	return false;
}
    
const get_time_str=function(date1){
	 
    var date2 = new Date();    //结束时间  
    var date3 = date2.getTime() - new Date(date1.replace(/\-/g, '/')).getTime();   //时间差的毫秒数        
  
    //------------------------------  
  
    //计算出相差天数  
    var days=Math.floor(date3/(24*3600*1000));  
  
    //计算出小时数  
  
    var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数  
    var hours=Math.floor(leave1/(3600*1000));  
    //计算相差分钟数  
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数  
    var minutes=Math.floor(leave2/(60*1000));  
    //计算相差秒数  
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数  
    var seconds=Math.round(leave3/1000);  

    if(days > 0 ){
        var arys1 = date1.substr(0,10).split("-");
        var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
        var  week1=String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")//就是你要的星期几
        var week=date1.substr(0,10)+" 星期"+week1;
    	return week;
    }else{
    	if(hours > 0){
    		return hours + "小时前";
    	}else{
    		if(minutes > 0){
    			return minutes + "分钟前";
    		}else{
    			return "刚才";
    		}
    	}
    }
}

const getLoanName=function(ids){	
    var loanTypeTree = uni.getStorageSync('loanTypeTree');
    for(var i = 0; i < loanTypeTree.length; i++){
        for(var j = 0; j < loanTypeTree[i].children.length; j++){
            if(ids == loanTypeTree[i].children[j].id){
                return loanTypeTree[i].children[j].label;
            }
        }
    }
}
const getLoanClassid=function(ids){
	console.log("ids="+ids);
	var loanTypeTree = uni.getStorageSync('loanTypeTree');
	for(var i = 0; i < loanTypeTree.length; i++){
		for(var j = 0; j < loanTypeTree[i].children.length; j++){
			if(ids == loanTypeTree[i].children[j].id){
				return loanTypeTree[i].children[j].porgnId;
			}
		}
	}
}
const twoJsonMerge=function(json1,json2){
	var length1 = 0,length2 = 0,jsonStr,str;
	
	for(var ever in json1) length1++;
	for(var ever in json2) length2++; 
	
	if(length1 && length2)str = ',';
	else str = '';
	
	jsonStr = ((JSON.stringify(json1)).replace(/,}/,'}') + (JSON.stringify(json2)).replace(/,}/,'}')).replace(/}{/,str);
	
	return JSON.parse(jsonStr);
}
const getImgUrlList = function(imgStr,fileno){
	var imgList = imgStr.split("|");
	var resultList = [];
	var imgPath = "http://www.sjyjr.net/static/";
	for(let item of imgList){
		item = imgPath + fileno+'/'+item;
		console.log("item:"+item);
		resultList.push(item);
	}
	
	return resultList;
}

const getImgType = function(index){
	var img_map=[
	        "imgMf",
	        "imgMfdlr",
	        "imgJkrTp",
	        "imgGtjkrTp",
	        "imgJkrDlrTp",
	        "imgJy",
	        "jkhtTp",
	        "imgFc",
	        "imgFcPg",
	        "imgCwyfTp",
	        "img_jjxx",
	        "imgJkrQtzc",
	        "clTp",
	        "dkTp",
	        "jyTp",
	        "qyTp"
	    ];
	return img_map[index];
}

const getIdArrayIndex = function(idType){
	var idTypeValue=['E1','E2','I1','I2','I3','I4','I5','I6','I9','Ia','I8'];
	
	for(var i = 0; i < idTypeValue.length; i++){
		if(idTypeValue[i] == idType){
			return i;
		}
	}
	//默认就返回2
	return 2;
}

const getNowTime = function(){
var now = new Date();
    var year = now.getFullYear();       
    var month = now.getMonth() + 1;     
    var day = now.getDate();            
    var hh = now.getHours();            
    var mm = now.getMinutes();          
    var ss = now.getSeconds();          
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
}
/**
 * 图片路径转成canvas
 * @param {图片url} url
 */
 function imgToCanvas(url) {
	console.log("imgToCanvas:"+url);
	// 创建img元素
	const img = document.createElement("img");
	img.src = url;
	img.setAttribute("crossOrigin", "anonymous"); // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
	new Promise((resolve) => (img.onload = resolve));
	// 创建canvas DOM元素，并设置其宽高和图片一样
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	// 坐标(0,0) 表示从此处开始绘制，相当于偏移。
	canvas.getContext("2d").drawImage(img, 0, 0);
	return canvas;
}

/**
 * canvas添加水印
 * @param {canvas对象} canvas
 * @param {水印文字} text
 */
function addWatermark(canvas, text) {
	console.log("addWatermark:"+JSON.stringify(canvas));
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "red";
	ctx.textBaseline = "middle";
	ctx.fillText(text, 20, 20);
	return canvas;
}

/**
 * canvas转成img
 * @param {canvas对象} canvas
 */
function convasToImg(canvas) {
	console.log("convasToImg:"+JSON.stringify(canvas));
	// 新建Image对象，可以理解为DOM
	var image = new Image();
	//canvas.toDataURL 返回的是一串Base64编码的URL
	//指定格式 PNG
	image.src = canvas.toDataURL("image/png");
	return image;
	//return canvas.toDataURL("image/png");
 
}

// 运行示例
const imgAddWater = function(water, imgurl) {
	console.log("imgAddWater water:"+water+";imgurl"+imgurl);
	// 1.图片路径转成canvas
	const tempCanvas =  imgToCanvas(imgurl);
	// 2.canvas添加水印
	const canvas = addWatermark(tempCanvas, water);
	//3.canvas转成img
	const img = convasToImg(canvas);
	// 查看效果
	document.body.appendChild(img);
	//return convasToImg(canvas);
}
module.exports = {
    hex_md5,
	commRequest,
	isEmpty,
	get_time_str,
	getLoanName,
	getLoanClassid,
	twoJsonMerge,
	getImgUrlList,
	getImgType,
	getIdArrayIndex,
	imgAddWater,
	getNowTime
}