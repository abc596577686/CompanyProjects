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