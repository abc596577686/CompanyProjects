(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      if (clientWidth > 1024) {
        docEl.style.fontSize = '22px';
      } else {
        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
      }
      console.log( docEl.style.fontSize)
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// (function(designWidth, maxWidth) {
// 	var doc = document,
// 	win = window,
// 	docEl = doc.documentElement,
// 	remStyle = document.createElement("style"),
// 	tid;

// 	function refreshRem() {
// 		var width = docEl.getBoundingClientRect().width;
// 		maxWidth = maxWidth || 540;
// 		width>maxWidth && (width=maxWidth);
// 		var rem = width * 100 / designWidth;
// 		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
// 	}

// 	if (docEl.firstElementChild) {
// 		docEl.firstElementChild.appendChild(remStyle);
// 	} else {
// 		var wrap = doc.createElement("div");
// 		wrap.appendChild(remStyle);
// 		doc.write(wrap.innerHTML);
// 		wrap = null;
// 	}
// 	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
// 	refreshRem();

// 	win.addEventListener("resize", function() {
// 		clearTimeout(tid); //防止执行两次
// 		tid = setTimeout(refreshRem, 300);
// 	}, false);

// 	win.addEventListener("pageshow", function(e) {
// 		if (e.persisted) { // 浏览器后退的时候重新计算
// 			clearTimeout(tid);
// 			tid = setTimeout(refreshRem, 300);
// 		}
// 	}, false);

// 	if (doc.readyState === "complete") {
// 		doc.body.style.fontSize = "22px";
// 	} else {
// 		doc.addEventListener("DOMContentLoaded", function(e) {
// 			doc.body.style.fontSize = "16px";
// 		}, false);
// 	}
// })(375, 375);