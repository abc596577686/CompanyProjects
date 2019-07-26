//地址配置
var util={
		//baseURL:"/uzengroup/"
		// baseURL:"http://open.uzengroup.com/"
		baseURL:"http://192.168.10.124:8888/uzengroup/"
};
//公用方法
var commFun={
 	//获取URL上参数
    getUrlPara:function(paraName){
    	var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i"); 
    	var r = window.location.search.substr(1).match(reg); 
    	if (r != null) return unescape(r[2]); return null;  
    },
    //添加千分位
	addNode:function(s){
		var n=2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
		t = ""; 
		for ( var i = 0; i < l.length; i++) { 
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		}
		return t.split("").reverse().join("") + "." + r; 
	},
	 //无小数点添加千分位
	addNode2:function(s){
		var n=2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
		t = ""; 
		for ( var i = 0; i < l.length; i++) { 
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		} 
		return t.split("").reverse().join(""); 
	},
	//每隔四位添加空格
	strFormat:function(s){
		if(str!=null&&str!=undefined){
			var str=s.replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
			return str;
		}else{
			return "";
		}
	},
	//去除空格
	spaceFormat:function(s){
		var num=s;
	    num=num.replace(/\s+/g,"");
		return num;
	},
	//去除逗号
	douHaoFormat:function(s){
		var num=s;
		num=num.replace(/,/g,"");
		return num;
	},
	//判断设备
	getDevice:function(){
		if(Ext.os.is('iOS')){
			return true;
		}
		return false;
	},
	//判断是否微信
	isWeiXin:function(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	},
    //localStorage储存
    supports_html5_storage:function () {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	saveData:function(key,value){
        //alert(commFun.supports_html5_storage());
//		if(commFun.supports_html5_storage()){
//			var storage = window.localStorage
//			storage.setItem(key,value);
//		}else{
			this.setCookie(key,value,60*60*24*7);
//		}
	},
    getData:function(key){
//        if(commFun.supports_html5_storage()){
//            var storage = window.localStorage
//            return storage.getItem(key);
//        }else{
            return this.getCookie(key);
 //       }
    },
    delData:function(key){
   //     if(commFun.supports_html5_storage()){
  //          var storage = window.localStorage
  //          storage.removeItem(key);
  //      }else{
    		this.delCookie(key);
   //     }
    },
	//储存cookie
	//expiredays  秒
	setCookie:function (c_name,value,s){
		var exdate=new Date();
		exdate.setTime(exdate.getTime()+s);
		document.cookie=c_name+ "=" +escape(value)+
		((s==null) ? "" : ";expires="+exdate.toGMTString());
	},
	//通过key获取cookie
	getCookie:function(c_name){
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1){ 
			    c_start=c_start + c_name.length+1;
			    c_end=document.cookie.indexOf(";",c_start);
		    if (c_end==-1) c_end=document.cookie.length;
		    	return unescape(document.cookie.substring(c_start,c_end));
		    } 
		  }
		return "";
	},
	//删除cookie
	delCookie:function (name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=this.getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	},
	//清除cookie  
	clearCookie:function(name) {  
	    setCookie(name, "", -1);  
	},
	//取消冒泡事件false 冒泡 true 捕获
	stopBubble:function (e){
	    e=e||window.event;  //firefox,chrome,etc.||IE,opera
		if(e.stopPropagation){
	       e.stopPropagation();
	    }
	    else{
	      e.cancelBubble=true;
	    }
	 },
	//创建数据库
	initDatabase: function (createSql) {
		var db = this.getCurrentDb();//初始化数据库
		if(!db) {
			//console.log("您的浏览器不支持HTML5本地数据库");
			return;
		}
		db.transaction(function (trans) {//启动一个事务，并设置回调函数
			 trans.executeSql(createSql, [], function (trans, result) {}, function (trans, message) {console(message);});
            }, function (trans, result) {
            }, function (trans, message) {
		});
    },
    getCurrentDb:function (){
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("Medical", "1.0", "it's to save my data!", 1024 * 1024); ;
        return db;
    },
	allPrpos:function(obj){
	    for(var p in obj){  
	        // 方法 
	        if(typeof(obj[p])=="function"){  
	            obj[p](); 
	        }else{  
	            // p 为属性名称，obj[p]为对应属性的值 
	            if(this.containSpecial(obj[p])){
	            	return false;
	            }
        	}  
    	} 
    	return true;
	},
    sendPost:function(URL, PARAMS){
	    var temp = document.createElement("form");
	    temp.action = URL;
	    temp.method = "post";
	    temp.style.display = "none";
	    for (var items  in PARAMS){
		    var opt = document.createElement("textarea");
		    opt.name =items;
		    opt.value = PARAMS[items];
		    temp.appendChild(opt);
	    }        
	    document.body.appendChild(temp);        
	    temp.submit();    
		//console.log(temp);
	    return temp;        
	},
    Wi:[ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ],   // 加权因⼦子  
    ValideCode: [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ],            // ⾝身份证验证位值.10代表X   
    
    IdCardValidate:function (idCard) {
 	    idCard =this.trim(idCard.replace(/ /g, ""));
 	    if (idCard.length == 15) {
 	        return this.isValidityBrithBy15IdCard(idCard);
 	    } else if (idCard.length == 18) {
 	        var a_idCard = idCard.split("");
 	        if (this.isValidityBrithBy18IdCard(idCard) && this.isTrueValidateCodeBy18IdCard(a_idCard)) {
 	            return true;
 	        } else {
 	            return false;
 	        }
 	    } else {
 	        return false;
 	    }
 	    return true;
 	},
    //判断身份证号18位时最后一位是否正确
    isTrueValidateCodeBy18IdCard: function (a_idCard) {
 	    var sum = 0;
 	    if (a_idCard[17].toLowerCase() == 'x') {
 	        a_idCard[17] = 10;
 	    }
 	    for (var i = 0; i < 17; i++) {
 	        sum += this.Wi[i] * a_idCard[i];
 	    }
 	    valCodePosition = sum % 11;
 	    if (a_idCard[17] == this.ValideCode[valCodePosition]) {
 	        return true;
 	    } else {
 	        return false;
 	    }
 	},
 	 isValidityBrithBy18IdCard:function(idCard18) {
 	    var year = idCard18.substring(6, 10);
 	    var month = idCard18.substring(10, 12);
 	    var day = idCard18.substring(12, 14);
    	var temp_date = new Date();
    	temp_date.setYear(year);
    	temp_date.setMonth(parseInt(month,10)-1);
    	temp_date.setDate(parseInt(day,10));
 	    if (temp_date.getFullYear() != parseInt(year,10) || temp_date.getMonth() != parseInt(month,10) - 1 || temp_date.getDate() != parseInt(day,10)) {
 	        return true;
 	    } else {
 	        return true;
 	    }
 	},
 	isValidityBrithBy15IdCard:function(idCard15) {
 	    var year = idCard15.substring(6, 8);
 	    var month = idCard15.substring(8, 10);
 	    var day = idCard15.substring(10, 12);
    	var temp_date = new Date();
    	temp_date.setYear(year);
    	temp_date.setMonth(parseInt(month,10)-1);
    	temp_date.setDate(parseInt(day,10));
 	    if (temp_date.getYear() != parseInt(year,10) || temp_date.getMonth() != parseInt(month,10) - 1 || temp_date.getDate() != parseInt(day,10)) {
 	        return true;
 	    } else {
 	        return true;
 	    }
 	},
	trim:function(str) {       
 		return str.replace(/(^\s*)|(\s*$)/g, "");  
 	},
	getOrderStatue:function (status) {
		var statu="";
		if(status){
			switch (status){
				case 1 :
					statu="未转化"	;
					break;
				case 2 :
					statu="商家待审核"	;
					break;
				case 3 :
					statu="系统待审核"	;
					break;
				case 4 :
					statu="系统待发货"	;
					break;
				case 5 :
					statu="系统已发货"	;
					break;
				case 6 :
					statu="系统已取消"	;
					break;
				case 7 :
					statu="缺货"	;
					break;
				case 8 :
					statu="系统发货失败"	;
					break;
				default:
					break
			}
		}
		return statu;
	}
};
//1、request.getString("参数")//获取指定参数，返回字符串; 
//2、request.getStrings();//获取全部参数，并返回数组; 
//3、request.setQuery("参数","参数的值");//如果当前地址栏有此参数，那么将更新此参数，否则返回一个新的地址栏参数字符串。 
var request = {
	getString : function(val) {
		var uri = window.location.search;
		var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
		return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)): null);
	},
	getStrings : function() {
		var uri = window.location.search;
		var re = /\w*\=([^\&\?]*)/ig;
		var retval = [];
		while ((arr = re.exec(uri)) != null){retval.push(arr[0]);}
		return retval;
	},
	setQuery : function(val1, val2) {
		var a = this.getStrings();
		var retval = "";
		var seted = false;
		var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
		for ( var i = 0; i < a.length; i++) {
			if (re.test(a[i])) {
				seted = true;
				a[i] = val1 + "=" + val2;
			}
		}
		retval = a.join("&");
		return "?" + retval+ (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
	}
};
//时间格式化
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1,((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f": "/u5468"): "")+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
var itemTime = new Date();
var _t = itemTime.pattern("yyyy-MM-dd HH:mm:ss");
var _s = _t + '5Cft6c4gaw1gHYwa';

var sendAjax={
	post:function(url,data,call,error){
		// if(data!=null){
		// 	data.BDAcceptEncoding="gzip";
		// }else{
		// 	url+="&BDAcceptEncoding=gzip";
		// }
		$.ajax({
			url:url,
			async: false, 
			type: "post",
			contentType: "application/json; charset=utf-8",
			data:data,
            dataType: "json",
            success:function(data){
				call(data);
			},
			error: function (){
				if(error){
					error();
				}
            }
		});
	},
    postImage:function(url,data,call,error){
        $.ajax({
            url:url,
            async: false,
            type: "post",
            cache: false,
			processData: false,
            contentType: false,
            data:data,
            dataType: "json",
            success:function(data){
                call(data);
            },
            error: function (){
                if(error){
                    error();
                }
            }
        });
    },
	get:function(url,data,call,error){
		$.ajax({
			url:url,
			data:data,
			async: false,
			dataType: 'json',

            success:function(data){
				call(data);
			},
			error: function (){
				if(error){
					error();
				}
	        }
		});
	}
};
Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
}
function getTimeAgo(createTime){
	var systemTime=new Date().getTime();
	var result = "";
	var inv = Math.round((systemTime - createTime) / 1000);
    var mins =  Math.round(inv / 60);
	var day = Math.round(mins / 1440);
    if (day < 1) {
      if (mins >= 120) {
    	  result =  Math.round(mins / 60) + "小时前";
      } else if (mins > 60) {
    	  result = "1小时" + mins % 60 + "分钟前";
      } else if (mins == 60) {
    	  result = "1小时前";
      } else {
        if(mins < 1 || mins == 0) {
        	result = "刚刚";
        } else {
        	result = mins + "分钟前";
        }
      }
    } else if (day >= 1 && day <= 2) {
    	result = "昨天";
    } else {
    	var newDate = new Date();
    	var now = new Date();
    	newDate.setTime(createTime);
    	if(newDate.getFullYear()==now.getFullYear()){
    		result = newDate.format('MM-dd');
    	}else{
    		result = newDate.format('yyyy-MM-dd');
    	}
    }
    return result;
}
function getExpirationDate(){
	var d=new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds();
	var mm=d.getMilliseconds();
	var s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay)+" "+(h<10 ? "0"+ h : h)+":"+(m<10 ? "0" + m : m)+":"+(se<10 ? "0" +se : se)+"+"+(mm<10 ? "0" +mm : mm);
	return s;
}
var filter  = /^[0-9a-zA-Z_]{8,20}$/;//密码规则
function Map(){
	this.container = new Object();
}
Map.prototype.put = function(key, value){
	this.container[key] = value;
}
Map.prototype.get = function(key){
	return this.container[key];
}
Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for (var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend') {
			continue;
		}
		keyset[count] = key;
		count++;
	}
	return keyset;
}
Map.prototype.size = function() {
	var count = 0;
	for (var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend'){
			continue;
		}
		count++;
	}
	return count;
}
Map.prototype.remove = function(key) {
	delete this.container[key];
}
Map.prototype.clear = function() {
	for (var key in this.container) {
		delete this.container[key];
	}
}
Map.prototype.toString = function(){
	var str = "";
	for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
		str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
	}
	return str;
}
var opt={
	items_per_page:10 ,//每页显示项
	num_display_entries: 5, //主体页数
	num_edge_entries: 2, //边缘页数
	prev_text:"上一页",
	next_text:"下一页"
};
function add0(m){return m<10?'0'+m:m}
//时间戳转换成 yyyy-MM-dd HH:ss
function sjcformat(shijianchuo){
	var ss=parseInt(shijianchuo,10);
	var time = new Date(ss);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
}
function sjcformatoo(shijianchuo){
	var ss=parseInt(shijianchuo,10);
	var time = new Date(ss);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return add0(m)+'月'+add0(d)+'日   '+add0(h)+':'+add0(mm);
}
function sjcformathm(shijianchuo){
	var ss=parseInt(shijianchuo,10);
	var time = new Date(ss);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return add0(h)+':'+add0(mm);
}
//REM 手机屏幕适配
//designWidth 设计稿宽度
//rem2px 基准值  100
function adapt(designWidth, rem2px){
	  var d = window.document.createElement('div');
	  d.style.width = '1rem';
	  d.style.display = "none";
	  var head = window.document.getElementsByTagName('head')[0];
	  head.appendChild(d);
	  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
	  d.remove();
	  document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
	  var st = document.createElement('style');
	  var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
	  var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
	  st.innerHTML = portrait + landscape;
	  head.appendChild(st);
	  return defaultFontSize
};
//var defaultFontSize = adapt(640, 100);



/**
 * 弹出框插件，对jQuery方法的扩充
 * Author 刘理彬
 * Date 20160621
 */
(function($){
	$.openConfirm = {};
	/**
	 * 弹出信息框
	 * obj.title 标题
	 * obj.content 内容
	 * obj.leftbnt 左按钮字
	 * obj.rightbnt 右按钮字
	 * call 确定回调
	 * closecall 取消回调 
	 */
	$.openConfirm.info = function(obj,call,closecall){
		// 新建弹出DIV
		var box = $('<div class="weui_dialog_confirm"></div>').appendTo($("body"));
		var boxMotai=$(' <div class="weui_mask"></div>').appendTo(box);
		var dialog=$(' <div class="weui_dialog"></div>').appendTo(box);
		var titleDiv=$('<div class="weui_dialog_hd"></div>').appendTo(dialog);
		var titleTxt=$('<strong class="weui_dialog_title"></strong>').appendTo(titleDiv);
		if(obj.title!=null&&obj.title!=""&&obj.title!=undefined){
			titleTxt.html(obj.title);
		}
		var contentDiv=$('<div class="weui_dialog_bd"></div>').appendTo(dialog);
		contentDiv.html(obj.content);
		var ftDiv=$('<div class="weui_dialog_ft"></div>').appendTo(dialog);
		if(obj.leftbnt!=undefined){
			if(obj.leftbnt!=""){
				var dialogBntLeft=$('<a href="javascript:;" class="weui_btn_dialog default"></a>').appendTo(ftDiv);
				dialogBntLeft.html(obj.leftbnt);
				dialogBntLeft.click(function(){
					$(".weui_dialog_confirm").remove();
					if(closecall){
						closecall();
					}
				});
			}
		}else{
			var dialogBntLeft=$('<a href="javascript:;" class="weui_btn_dialog default"></a>').appendTo(ftDiv);
			dialogBntLeft.html("取消");
			dialogBntLeft.click(function(){
				$(".weui_dialog_confirm").remove();
				if(closecall){
					closecall();
				}
			});
		}
		var dialogBntRigth=$('<a href="javascript:;" class="weui_btn_dialog primary"></a>').appendTo(ftDiv);
		
		if(obj.rightbnt!=undefined){
			dialogBntRigth.html(obj.rightbnt);
		}else{
			dialogBntRigth.html("确定");
		}
	
		dialogBntRigth.click(function(){
			$(".weui_dialog_confirm").remove();
			if(call){
				call();
			}
		});
	};
	$.openTxt = {};
	$.openTxt.info = function(text,time){
		var box = $('<div class="weui_dialog_confirm"></div>').appendTo($("body"));
		var boxMotai=$(' <div class="weui_mask"></div>').appendTo(box);
		var dialog=$(' <div class="weui_txtdialog"></div>').appendTo(box);
		dialog.html(text);
		if(time!=undefined&&time!=null&&time!=""){
			setTimeout(function(){
				$(".weui_dialog_confirm").remove();
			},time);
		}else{
			setTimeout(function(){
				$(".weui_dialog_confirm").remove();
			},2000);
		}
		
	}
	$.loading = {};
	$.loading.info = function(txt,time){
		var box = $('<div class="weui_loading_toast">').appendTo($("body"));
		var boxMotai=$(' <div class="weui_mask_transparent"></div>').appendTo(box);
		var dialog=$(' <div class="weui_toast"></div>').appendTo(box);
		var loadings=$('<div class="weui_loading"></div>').appendTo(dialog);
		var leaf0=$('<div class="weui_loading_leaf weui_loading_leaf_0"></div>').appendTo(loadings);
		var leaf1=$('<div class="weui_loading_leaf weui_loading_leaf_1"></div>').appendTo(loadings);
		var leaf2=$('<div class="weui_loading_leaf weui_loading_leaf_2"></div>').appendTo(loadings);
		var leaf3=$('<div class="weui_loading_leaf weui_loading_leaf_3"></div>').appendTo(loadings);
		var leaf4=$('<div class="weui_loading_leaf weui_loading_leaf_4"></div>').appendTo(loadings);
		var leaf5=$('<div class="weui_loading_leaf weui_loading_leaf_5"></div>').appendTo(loadings);
		var leaf6=$('<div class="weui_loading_leaf weui_loading_leaf_6"></div>').appendTo(loadings);
		var leaf7=$('<div class="weui_loading_leaf weui_loading_leaf_7"></div>').appendTo(loadings);
		var leaf8=$('<div class="weui_loading_leaf weui_loading_leaf_8"></div>').appendTo(loadings);
		var leaf9=$('<div class="weui_loading_leaf weui_loading_leaf_9"></div>').appendTo(loadings);
		var leaf10=$('<div class="weui_loading_leaf weui_loading_leaf_10"></div>').appendTo(loadings);
		var leaf11=$('<div class="weui_loading_leaf weui_loading_leaf_11"></div>').appendTo(loadings);
		
		var text=$('<p class="weui_toast_content"></p>').appendTo(dialog);
		if(text!=undefined&&text!=null&&text!=""){
			text.html(txt);
		}else{
			text.html("数据加载中");
		}
		if(time!=undefined&&time!=null&&time!=""){
			setTimeout(function(){
				$(".weui_loading_toast").remove();
			},time);
		}else{
			setTimeout(function(){
				$(".weui_loading_toast").remove();
			},2000);
		}
		
	};
    $.loading.close = function(){
        $(".weui_loading_toast").remove();
    };
	$.openPrompt = {};
	/**
	 * 弹出信息框
	 * obj.title 标题
	 * obj.content 输入框内容
	 * obj.leftbnt 左按钮字
	 * obj.rightbnt 右按钮字
	 * obj.showPross 是否显示进度条
	 * obj.fileSize 文件字节大小
	 * call 确定回调
	 * closecall 取消回调 
	 */
	$.openPrompt.info = function(obj,call,closecall){
		// 新建弹出DIV
		var box = $('<div class="weui_dialog_confirm"></div>').appendTo($("body"));
		var boxMotai=$(' <div class="weui_mask"></div>').appendTo(box);
		var dialog=$(' <div class="weui_dialog"></div>').appendTo(box);
		var titleDiv=$('<div class="weui_dialog_hd"></div>').appendTo(dialog);
		var titleTxt=$('<strong class="weui_dialog_title"></strong>').appendTo(titleDiv);
		if(obj.title!=null&&obj.title!=""&&obj.title!=undefined){
			titleTxt.html(obj.title);
		}
		var contentDiv=$('<div class="weui_dialog_bd"></div>').appendTo(dialog);
		var inputdom=$('<input type="text" class="fileTitle" id="fileTitle"  placeholder="请输入文件标题" value="" style="width: 100%;height: 35px;margin-bottom: 20px;margin-top: 8px;">').appendTo(contentDiv);
		var progress=$('<div class="weui_progress" style="visibility:hidden;"><div class="weui_progress_bar"> <div class="weui_progress_inner_bar js_progress" style="width: 0%;"></div></div> </div>').appendTo(contentDiv);
		inputdom.val(obj.content);
		var ftDiv=$('<div class="weui_dialog_ft"></div>').appendTo(dialog);
		if(obj.leftbnt!=undefined){
			if(obj.leftbnt!=""){
				var dialogBntLeft=$('<a href="javascript:;" class="weui_btn_dialog default"></a>').appendTo(ftDiv);
				dialogBntLeft.html(obj.leftbnt);
				dialogBntLeft.click(function(){
					$(".weui_dialog_confirm").remove();
					if(closecall){
						closecall();
					}
				});
			}
		}else{
			var dialogBntLeft=$('<a href="javascript:;" class="weui_btn_dialog default"></a>').appendTo(ftDiv);
			dialogBntLeft.html("取消");
			dialogBntLeft.click(function(){
				$(".weui_dialog_confirm").remove();
				if(closecall){
					closecall();
				}
			});
		}
		var dialogBntRigth=$('<a href="javascript:;" class="weui_btn_dialog primary"></a>').appendTo(ftDiv);
		if(obj.rightbnt!=undefined){
			dialogBntRigth.html(obj.rightbnt);
		}else{
			dialogBntRigth.html("确定");
		}
		dialogBntRigth.click(function(){
			if(obj.showPross){
				$('.weui_progress').css("visibility","visible");
			}
			var progress = 0;
	        var $progress = $('.js_progress');
	        function next() {
	        	if(progress==99){
	        		$.openTxt.info("视频上传成功！",1000);
	        		$(".weui_dialog_confirm").remove();
	        	}else{
	        		$progress.css({width: progress + '%'});
		             progress = ++progress % 100;
		             setTimeout(next,parseInt(obj.fileSize/100000));
	        	}
	        }
	        if(obj.showPross){
	        	 next();
	        }else{
	        	$(".weui_dialog_confirm").remove();
	        }
	        if(call){
				call(inputdom.val());
			}
		});
	};
}(jQuery));