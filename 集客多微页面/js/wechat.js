
document.write("<script language='javascript' src='https://res.wx.qq.com/open/js/jweixin-1.3.2.js'></script>");
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
}

function wxShowOptionMenu() {
    if (isWeiXin()) {
        function onBridgeReady() {
            WeixinJSBridge.call('showOptionMenu');
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }
}

function invoteShare(res, title, link, imgUrl, desc){
	wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success() {
                console.log('分享成功')
            },
            cancel() {
            	console.log('分享11成功')
                // 用户取消分享后执行的回调函数
            }
        })
        
        
        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
            	console.log('分享成功')
            },
            cancel: function() {
            	console.log('分享111成功')
                // 用户取消分享后执行的回调函数
            }
        })
    });
});
}